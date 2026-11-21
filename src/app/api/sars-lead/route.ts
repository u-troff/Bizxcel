import { after, NextRequest, NextResponse } from "next/server";

import { escapeHtml, sendNotificationEmail } from "@/lib/email";
import { logLead } from "@/lib/leads";
import {
  CHOICE_KEYS,
  CONTACT_KEYS,
  TOTAL_STEPS,
  cleanContact,
  isQualified,
  isValidChoice,
  type ApplyAnswers,
} from "@/lib/sars-apply";

/**
 * Saves the /sars/apply answers, one step at a time.
 *
 * Every step goes to the sars_leads table in the CRM's Supabase project, through
 * the sars_lead_save function (see supabase/sars-leads.sql). The anon key is used
 * from the server only and can do nothing except run that function.
 *
 * On the final submit, after the response is sent:
 *  1. the lead goes into the CRM through its /api/leads/intake endpoint,
 *  2. an email goes to the BizXcel inbox,
 *  3. a backup record is written (KV, or the log).
 * None of these can slow down or fail the visitor's screen.
 */

export const runtime = "nodejs";

const SUPABASE_URL = process.env.SARS_SUPABASE_URL?.trim().replace(/\/$/, "");
const SUPABASE_KEY = process.env.SARS_SUPABASE_ANON_KEY?.trim();
const CRM_INTAKE_URL = process.env.CRM_INTAKE_URL?.trim();
const CRM_INTAKE_SECRET = process.env.CRM_INTAKE_SECRET?.trim();

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "fbclid"] as const;
type UtmKey = (typeof UTM_KEYS)[number];

// Best-effort throttle, per instance. A speed bump, not a guarantee.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 30;
const recentByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recentByIp.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  hits.push(now);
  recentByIp.set(ip, hits);
  if (recentByIp.size > 5000) {
    for (const [key, times] of recentByIp) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) recentByIp.delete(key);
    }
  }
  return hits.length > RATE_LIMIT_MAX;
}

function shortString(value: unknown, max: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed && trimmed.length <= max ? trimmed : undefined;
}

function bad(message: string) {
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}

async function callRpc<T>(name: string, body: unknown): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${name}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY as string,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8000),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Supabase ${name} answered ${res.status}`);
  }
  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}

interface SubmittedLead {
  sessionId: string;
  eventId?: string;
  answers: ApplyAnswers;
  qualified: boolean;
  utm: Partial<Record<UtmKey, string>>;
}

/** Puts the lead into the CRM. Returns the CRM's client id, or null. */
async function sendToCrm(lead: SubmittedLead): Promise<string | null> {
  if (!CRM_INTAKE_URL || !CRM_INTAKE_SECRET) {
    console.warn("[sars-lead] CRM_INTAKE_URL / CRM_INTAKE_SECRET not set. Lead not sent to the CRM.");
    return null;
  }

  const { answers } = lead;
  const res = await fetch(CRM_INTAKE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CRM_INTAKE_SECRET}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: answers.first_name,
      phoneE164: answers.whatsapp,
      email: answers.email || null,
      source: "website_sars_landing",
      campaign: lead.utm.utm_campaign ?? null,
      // Read by the CRM once it supports sending the welcome from this route
      // (see docs/crm-intake-welcome-prompt.md). Ignored until then.
      sendWelcome: true,
      problem: answers.need ?? null,
      whatsappConsent: true,
      answers: {
        "What do you need help with most?": answers.need,
        "How soon do you want it sorted?": answers.timing,
        "Where are you based?": answers.area,
        qualified: lead.qualified,
        utm_source: lead.utm.utm_source,
        utm_medium: lead.utm.utm_medium,
        utm_campaign: lead.utm.utm_campaign,
        utm_content: lead.utm.utm_content,
        fbclid: lead.utm.fbclid,
        event_id: lead.eventId,
        website_session_id: lead.sessionId,
      },
    }),
    signal: AbortSignal.timeout(8000),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`CRM intake answered ${res.status}`);
  }
  const data = (await res.json().catch(() => null)) as { clientId?: unknown } | null;
  return typeof data?.clientId === "string" ? data.clientId : null;
}

function emailHtml(lead: SubmittedLead): string {
  const a = lead.answers;
  const rows: [string, string | undefined][] = [
    ["First name", a.first_name],
    ["WhatsApp", a.whatsapp],
    ["Email", a.email],
    ["Needs help with", a.need],
    ["How soon", a.timing],
    ["Based in", a.area],
    ["Ad", lead.utm.utm_content],
    ["Campaign", lead.utm.utm_campaign],
  ];
  const body = rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0">${escapeHtml(k)}</td><td style="padding:4px 0"><strong>${escapeHtml(v as string)}</strong></td></tr>`,
    )
    .join("");
  return `<p>New enquiry from the SARS page on bizxcelkr.com.</p><table>${body}</table>`;
}

async function afterSubmit(lead: SubmittedLead, supabaseOn: boolean) {
  const a = lead.answers;

  try {
    const clientId = await sendToCrm(lead);
    if (clientId && supabaseOn) {
      await callRpc("sars_lead_mark_synced", {
        p_session_id: lead.sessionId,
        p_client_id: clientId,
      });
    }
  } catch (err) {
    console.error("[sars-lead] CRM intake failed", err);
  }

  try {
    await sendNotificationEmail({
      subject: `SARS lead: ${a.first_name} (${a.need}, ${a.timing})${lead.qualified ? "" : " JUST LOOKING"}`,
      html: emailHtml(lead),
      replyTo: a.email || undefined,
    });
  } catch (err) {
    console.error("[sars-lead] notification email failed", err);
  }

  await logLead({ type: "sars_landing", ...a, qualified: lead.qualified, ...lead.utm });
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body !== "object") return bad("Invalid JSON");

  const sessionId = shortString(body.session_id, 64);
  if (!sessionId) return bad("session_id is required");
  const eventId = shortString(body.event_id, 128);

  const action = body.action === "submit" ? "submit" : "answer";
  const step = typeof body.step === "number" && Number.isInteger(body.step) ? body.step : 0;
  if (step < 0 || step > TOTAL_STEPS) return bad("Invalid step");

  // Answers: only known keys, only allowed values.
  const raw = (body.answers ?? {}) as Record<string, unknown>;
  if (typeof raw !== "object" || Array.isArray(raw)) return bad("Invalid answers");

  const answers: ApplyAnswers = {};
  for (const key of CHOICE_KEYS) {
    if (raw[key] === undefined) continue;
    if (!isValidChoice(key, raw[key])) return bad(`Invalid answer for ${key}`);
    answers[key] = raw[key] as string;
  }
  for (const key of CONTACT_KEYS) {
    if (raw[key] === undefined) continue;
    const clean = cleanContact(key, raw[key]);
    if (clean === null) return bad(`Invalid ${key}`);
    if (clean) answers[key] = clean;
  }

  const utmIn = (body.utm ?? {}) as Record<string, unknown>;
  const utm: Partial<Record<UtmKey, string>> = {};
  for (const key of UTM_KEYS) {
    const value = shortString(utmIn?.[key], key === "fbclid" ? 500 : 200);
    if (value) utm[key] = value;
  }

  let qualified: boolean | undefined;
  if (action === "submit") {
    const missing = [...CHOICE_KEYS, "first_name", "whatsapp"].filter(
      (k) => !answers[k as keyof ApplyAnswers],
    );
    if (missing.length) return bad(`Missing: ${missing.join(", ")}`);
    if (body.consent !== true) return bad("Consent is required");
    qualified = isQualified(answers);
  }

  const supabaseOn = Boolean(SUPABASE_URL && SUPABASE_KEY);
  let newlySubmitted = action === "submit";

  if (supabaseOn) {
    try {
      const result = await callRpc<{ newly_submitted?: boolean }>("sars_lead_save", {
        p: {
          session_id: sessionId,
          event_id: eventId,
          status: action === "submit" ? "submitted" : "partial",
          last_step: step,
          ...answers,
          whatsapp_consent: action === "submit" ? true : undefined,
          qualified,
          ...utm,
          user_agent: request.headers.get("user-agent")?.slice(0, 400),
        },
      });
      newlySubmitted = action === "submit" && result?.newly_submitted === true;
    } catch (err) {
      console.error("[sars-lead] save failed", err);
      // A failed partial save is fine: the next step saves everything again.
      // A failed submit still has to reach the CRM and the inbox.
      if (action !== "submit") {
        return NextResponse.json({ ok: false, error: "Could not save" }, { status: 502 });
      }
    }
  } else if (action === "answer") {
    console.warn("[sars-lead] SARS_SUPABASE_URL / SARS_SUPABASE_ANON_KEY not set. Step not stored.");
  }

  // Only the first submit for a visitor notifies, so a retry never double-texts.
  if (newlySubmitted) {
    const lead: SubmittedLead = {
      sessionId,
      eventId,
      answers,
      qualified: qualified ?? false,
      utm,
    };
    after(() => afterSubmit(lead, supabaseOn));
  }

  return NextResponse.json({ ok: true, qualified: qualified ?? null });
}
