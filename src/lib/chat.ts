import { sendNotificationEmail, escapeHtml } from "@/lib/email";
import { logLead } from "@/lib/leads";
import { serviceGroups, team } from "@/lib/content";

export const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5.6-luna";
// ^ Placeholder model id per the build brief — confirm the exact id in the
// OpenAI dashboard before going live and set OPENAI_MODEL in Vercel env vars.

// Routes a visitor's need to the team member who actually owns that work, sourced
// from src/lib/content.ts so the chat prompt can never drift from the team page.
function routingLine(name: string, topic: string) {
  const person = team.find((member) => member.name === name);
  if (!person) {
    throw new Error(`chat.ts TEAM_ROUTING references a name not in src/lib/content.ts team[]: "${name}"`);
  }
  return `- ${topic}: ${person.name} (${person.role}), ${person.contact.label} ${person.contact.display}`;
}

// Same reasoning as TEAM_ROUTING: sourced from content.ts so the assistant can never
// offer a service the practice's flyer doesn't list.
const SERVICES = serviceGroups
  .map((group) => `${group.title.toLowerCase()} — ${group.items.join(", ")}`)
  .join("; ");

const TEAM_ROUTING = [
  routingLine("Jermaine Pick", "Bookkeeping"),
  routingLine("Athini Gqwira", "Payroll"),
  routingLine("Clinton Rademeyer", "Annual financial statements"),
  routingLine("Wendy-Lee Mothoa", "General enquiries or not sure who to ask"),
].join("\n");

export const SYSTEM_PROMPT = `You are the virtual assistant for BizXcel Kuils River, a SAIPA-registered accounting and
tax firm in Kuils River, Cape Town (established 2014, registered SARS Tax Practitioner,
serving Cape Town's northern suburbs). You appear as a chat widget on the website. Be
warm, clear and helpful: answer questions about the firm's services, build trust, and
where there's a real need, guide the visitor to book a free consultation and capture their
details for the team.

SERVICES: ${SERVICES}. That list is exhaustive — if a visitor asks for something not on
it, say it's not a service the practice lists and offer to have the team confirm.

FEES: don't quote fixed prices, pricing depends on the client's situation; the best next
step is a free, no-obligation consultation. Never invent prices.

GOALS, IN ORDER: (1) answer clearly; (2) understand their situation, business or
individual, what they need, how urgent; (3) when there's a genuine need, offer the free
consultation and collect details; (4) call capture_lead once you have enough.

COLLECT (naturally, not as an interrogation): name; best contact (email and/or
phone/WhatsApp); business name if applicable; what they need; rough urgency. Once you have
a name, at least one contact method, and a clear need, confirm it back, then call
capture_lead and reassure them the team will be in touch.

TEAM CONTACTS: once you understand what the visitor needs, if it clearly matches one of the
areas below, tell them who on the team handles that and share that person's contact details
from this list, so they know exactly who will help them (this is in addition to, not instead
of, collecting their details and calling capture_lead):
${TEAM_ROUTING}
For anything outside this list (SARS/tax compliance, registrations, advisory, individual tax
returns), don't invent a name, just say a member of the team will be in touch.

GUARDRAILS: Do NOT give definitive tax, legal or financial advice or numbers on someone's
tax position, explain services generally and hand specifics to a human. NEVER share the
Managing Director's (Wayne Du Toit's) contact details; he is not a point of contact. NEVER
invent prices, guarantees, deadlines, or facts. If someone is stressed (behind on SARS,
facing penalties), be calm and reassuring, it's fixable, BizXcel handles it often, and
move them toward a consultation. Stay on topic. Keep replies short, friendly and human.`;

export const CAPTURE_LEAD_TOOL = {
  type: "function" as const,
  function: {
    name: "capture_lead",
    description:
      "Send a qualified lead to the BizXcel team's shared inbox. Call once you have the visitor's name, at least one contact method (email or phone), and a clear sense of what they need.",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        business_name: { type: "string" },
        client_type: { type: "string", enum: ["business", "individual"] },
        need: { type: "string" },
        urgency: { type: "string" },
        category: {
          type: "string",
          enum: [
            "bookkeeping",
            "financial_statements",
            "payroll",
            "tax_sars",
            "company_registration",
            "individual_tax",
            "other",
          ],
        },
        summary: { type: "string" },
      },
      required: ["name", "need", "category"],
    },
  },
};

export type CaptureLeadArgs = {
  name?: string;
  email?: string;
  phone?: string;
  business_name?: string;
  client_type?: "business" | "individual";
  need?: string;
  urgency?: string;
  category?: string;
  summary?: string;
};

/**
 * Executes the capture_lead tool call: emails the shared inbox and logs a
 * durable backup record. Enforced server-side regardless of what the model
 * decided, per the brief: only send if there's a name AND a contact method.
 */
export async function handleCaptureLead(args: CaptureLeadArgs) {
  const hasContact = Boolean(args.email || args.phone);

  if (!args.name || !hasContact) {
    return {
      sent: false,
      reason: "Missing name or a contact method (email or phone). Ask the visitor for the missing detail before calling capture_lead again.",
    };
  }

  const rows: Array<[string, string | undefined]> = [
    ["Name", args.name],
    ["Email", args.email],
    ["Phone", args.phone],
    ["Business name", args.business_name],
    ["Client type", args.client_type],
    ["Need", args.need],
    ["Urgency", args.urgency],
    ["Category", args.category],
    ["Summary", args.summary],
  ];

  const html = `
    <h2 style="font-family: sans-serif; color: #13293D;">New website lead: BizXcel Kuils River</h2>
    <table style="font-family: sans-serif; font-size: 14px; border-collapse: collapse;">
      ${rows
        .filter(([, value]) => Boolean(value))
        .map(
          ([label, value]) => `
        <tr>
          <td style="padding: 6px 12px; font-weight: 600; color: #1E2A35; vertical-align: top;">${label}</td>
          <td style="padding: 6px 12px; color: #4A5560;">${escapeHtml(String(value))}</td>
        </tr>`
        )
        .join("")}
    </table>
    <p style="font-family: sans-serif; font-size: 12px; color: #6B7580;">Captured via the website chat assistant.</p>
  `;

  await sendNotificationEmail({
    subject: `New lead: ${args.name}, ${args.category ?? "general enquiry"}`,
    html,
    replyTo: args.email,
  });

  await logLead({ source: "chat_widget", ...args });

  return { sent: true };
}
