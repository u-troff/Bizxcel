import { NextResponse } from "next/server";
import { escapeHtml, sendNotificationEmail } from "@/lib/email";
import { logLead } from "@/lib/leads";

export const runtime = "nodejs";

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { firstName, lastName, email, phone, service, message } = body;

  if (!isNonEmptyString(firstName) || !isNonEmptyString(lastName) || !isNonEmptyString(email) || !isNonEmptyString(service)) {
    return NextResponse.json(
      { error: "First name, last name, email and a service are required." },
      { status: 400 }
    );
  }

  const rows: Array<[string, string | undefined]> = [
    ["Name", `${firstName} ${lastName}`],
    ["Email", email],
    ["Phone", phone],
    ["Service", service],
    ["Message", message],
  ];

  const html = `
    <h2 style="font-family: sans-serif; color: #13293D;">New consultation request: BizXcel Kuils River</h2>
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
    <p style="font-family: sans-serif; font-size: 12px; color: #6B7580;">Submitted via the website contact form.</p>
  `;

  try {
    await sendNotificationEmail({
      subject: `New consultation request: ${firstName} ${lastName}`,
      html,
      replyTo: email,
    });
    await logLead({ source: "contact_form", firstName, lastName, email, phone, service, message });
  } catch (error) {
    console.error("[api/contact] Failed to send notification email.", error);
    return NextResponse.json({ error: "Could not send your request. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
