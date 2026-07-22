import { Resend } from "resend";
import { site } from "@/lib/content";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || `BizXcel Website <no-reply@${new URL(site.url).hostname}>`;
const NOTIFY_EMAIL = process.env.LEAD_NOTIFICATION_EMAIL || site.email;

export async function sendNotificationEmail({
  subject,
  html,
  replyTo,
}: {
  subject: string;
  html: string;
  replyTo?: string;
}) {
  if (!resend) {
    console.warn(
      "[email] RESEND_API_KEY is not set — skipping send. Configure it in Vercel env vars to enable lead emails."
    );
    return { sent: false as const };
  }

  await resend.emails.send({
    from: FROM_EMAIL,
    to: NOTIFY_EMAIL,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });

  return { sent: true as const };
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
