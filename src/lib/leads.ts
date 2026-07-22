// Durable backup log for captured leads, independent of the email send.
// Uses the Upstash/Vercel KV REST API when configured; otherwise falls back
// to a structured console log so nothing is silently lost during local dev
// or before KV is provisioned.

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

export async function logLead(record: Record<string, unknown>) {
  const entry = { ...record, capturedAt: new Date().toISOString() };

  if (!KV_URL || !KV_TOKEN) {
    console.warn("[leads] KV_REST_API_URL/TOKEN not set — logging lead to console only.", entry);
    return;
  }

  const key = `lead:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`;

  try {
    await fetch(`${KV_URL}/set/${encodeURIComponent(key)}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    });
  } catch (error) {
    console.error("[leads] Failed to write backup record to durable store.", error);
  }
}
