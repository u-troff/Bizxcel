import { NextResponse } from "next/server";
import { CAPTURE_LEAD_TOOL, OPENAI_MODEL, SYSTEM_PROMPT, handleCaptureLead } from "@/lib/chat";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_HISTORY = 16;
const MAX_MESSAGE_LENGTH = 2000;

function sanitizeMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return [];

  return input
    .filter(
      (item): item is ChatMessage =>
        item &&
        typeof item === "object" &&
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string" &&
        item.content.trim().length > 0
    )
    .slice(-MAX_HISTORY)
    .map((item) => ({ role: item.role, content: item.content.slice(0, MAX_MESSAGE_LENGTH) }));
}

async function callOpenAI(apiKey: string, messages: unknown[]) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages,
      tools: [CAPTURE_LEAD_TOOL],
      tool_choice: "auto",
      temperature: 0.4,
      reasoning_effort: "none",
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`OpenAI request failed (${res.status}): ${text}`);
  }

  return res.json();
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("[api/chat] OPENAI_API_KEY is not configured.");
    return NextResponse.json({ error: "Chat is not configured." }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const history = sanitizeMessages((body as { messages?: unknown })?.messages);
  if (history.length === 0) {
    return NextResponse.json({ error: "No message provided." }, { status: 400 });
  }

  const conversation: Array<Record<string, unknown>> = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history,
  ];

  try {
    const first = await callOpenAI(apiKey, conversation);
    const message = first.choices?.[0]?.message;
    const toolCalls = message?.tool_calls as
      | Array<{ id: string; function: { name: string; arguments: string } }>
      | undefined;

    if (toolCalls?.length) {
      conversation.push(message);

      for (const toolCall of toolCalls) {
        let result: unknown = { sent: false, reason: "Unknown tool." };

        if (toolCall.function.name === "capture_lead") {
          try {
            const args = JSON.parse(toolCall.function.arguments || "{}");
            result = await handleCaptureLead(args);
          } catch (error) {
            console.error("[api/chat] Failed to handle capture_lead tool call.", error);
            result = { sent: false, reason: "Failed to process lead details." };
          }
        }

        conversation.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: JSON.stringify(result),
        });
      }

      const second = await callOpenAI(apiKey, conversation);
      const reply = second.choices?.[0]?.message?.content?.trim();
      return NextResponse.json({
        reply: reply || "Thanks! I've passed your details on to the team.",
      });
    }

    const reply = message?.content?.trim();
    return NextResponse.json({
      reply: reply || "Sorry, could you rephrase that?",
    });
  } catch (error) {
    console.error("[api/chat] Chat request failed.", error);
    return NextResponse.json({ error: "Chat request failed." }, { status: 502 });
  }
}
