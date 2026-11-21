import { NextRequest, NextResponse } from "next/server";

import { firstNameOf, normalizeZaPhone, sendCapiEvent } from "@/lib/meta-capi";

/**
 * Server-side Meta events for the /sars funnel.
 *
 * The browser fires the same event with the same event id, and Meta collapses
 * the pair into one conversion.
 *
 * The browser never chooses the dataset or the token. It names a pixel
 * ("sars") and the server looks the real values up from env.
 */

const ALLOWED_EVENTS = ["Lead", "Contact"] as const;
type AllowedEvent = (typeof ALLOWED_EVENTS)[number];

const CUSTOM_DATA: Record<AllowedEvent, Record<string, string>> = {
  Lead: { content_name: "SARS Check", content_category: "Lead" },
  Contact: { content_name: "SARS WhatsApp", content_category: "Contact" },
};

// Best-effort throttle, per instance. A speed bump, not a guarantee.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
const recentByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recentByIp.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  hits.push(now);
  recentByIp.set(ip, hits);

  if (recentByIp.size > 5000) {
    for (const [key, times] of recentByIp) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        recentByIp.delete(key);
      }
    }
  }

  return hits.length > RATE_LIMIT_MAX;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asShortString(value: unknown, maxLength = 256): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > maxLength) return undefined;
  return trimmed;
}

export async function POST(request: NextRequest) {
  try {
    const clientIpAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(clientIpAddress)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await request.json();

    // Only the SARS dataset exists on this route.
    if (body?.pixel !== "sars") {
      return NextResponse.json({ error: "Unknown pixel" }, { status: 400 });
    }

    const eventName = ALLOWED_EVENTS.find((e) => e === body?.event_name);
    if (!eventName) {
      return NextResponse.json({ error: "Event not allowed" }, { status: 400 });
    }

    // Must match the eventID passed to fbq in the browser, or dedup fails
    // silently and the conversion counts twice.
    const eventId = asShortString(body?.event_id, 128);
    if (!eventId) {
      return NextResponse.json({ error: "Missing event_id" }, { status: 400 });
    }

    const pixelId = process.env.NEXT_PUBLIC_META_SARS_PIXEL_ID;
    const accessToken = process.env.META_SARS_CAPI_TOKEN;

    // Browser-only mode. Nothing to send without credentials, and the browser
    // pixel has already fired, so report success rather than a red 5xx.
    if (!pixelId || !accessToken) {
      return NextResponse.json({ ok: true, capi: "disabled" }, { status: 200 });
    }

    const userData =
      body?.user_data && typeof body.user_data === "object" ? body.user_data : {};

    const email = asShortString(userData.email);
    const rawPhone = asShortString(userData.phone, 32);
    const rawName = asShortString(userData.name);

    // Use the first-party cookies the server can see over anything the client
    // claims, and fall back to the body when they are not readable.
    const fbp = request.cookies.get("_fbp")?.value ?? asShortString(userData.fbp, 128);
    const fbc = request.cookies.get("_fbc")?.value ?? asShortString(userData.fbc, 512);

    // Source URL must be on this site and on a /sars page. Anything else falls
    // back to /sars. The query string is dropped.
    let eventSourceUrl = new URL("/sars", request.nextUrl.origin).toString();
    const claimedUrl = asShortString(body?.event_source_url, 512);
    if (claimedUrl) {
      try {
        const parsed = new URL(claimedUrl);
        const onSars = parsed.pathname === "/sars" || parsed.pathname.startsWith("/sars/");
        if (parsed.origin === request.nextUrl.origin && onSars) {
          eventSourceUrl = parsed.origin + parsed.pathname;
        }
      } catch {
        // keep the fallback
      }
    }

    const result = await sendCapiEvent({
      pixelId,
      accessToken,
      testEventCode: process.env.META_SARS_TEST_EVENT_CODE || undefined,
      eventName,
      eventId,
      eventSourceUrl,
      clientIpAddress,
      clientUserAgent: request.headers.get("user-agent") || "unknown",
      // First name only goes to Meta.
      firstName: rawName ? firstNameOf(rawName) || undefined : undefined,
      email: email && EMAIL_RE.test(email) ? email : undefined,
      phone: rawPhone ? normalizeZaPhone(rawPhone) : undefined,
      fbp,
      fbc,
      customData: CUSTOM_DATA[eventName],
    });

    if (!result.success) {
      console.error(`Meta CAPI ${eventName} failed:`, result.error);
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    return NextResponse.json({ ok: true, eventId }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/meta-event:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
