"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ChatIcon, CloseIcon, SendIcon } from "@/components/icons";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hi, I'm the BizXcel virtual assistant. Ask me about bookkeeping, tax, payroll, registrations or anything SARS-related, and I can help book you a free consultation.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener("bizxcel:open-chat", openHandler);
    return () => window.removeEventListener("bizxcel:open-chat", openHandler);
  }, []);

  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else if (wasOpen.current) {
      launcherRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) throw new Error("Chat request failed");

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong on our end. Please try again, or reach us directly via WhatsApp or the contact form.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        aria-controls="bizxcel-chat-panel"
        className="fixed bottom-20 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white shadow-lg transition-transform duration-200 hover:scale-105 sm:bottom-24 sm:right-6 sm:h-14 sm:w-14"
      >
        {open ? <CloseIcon className="h-6 w-6" /> : <ChatIcon className="h-6 w-6" />}
      </button>

      {open && (
        <div
          id="bizxcel-chat-panel"
          role="dialog"
          aria-modal="true"
          aria-label="BizXcel chat assistant"
          className="fixed bottom-[136px] right-5 z-40 flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-[10px] border border-border bg-white shadow-2xl motion-safe:animate-[fadeSlideUp_0.2s_ease-out] sm:bottom-[168px] sm:right-6"
        >
          <div className="flex items-center justify-between bg-navy px-5 py-4">
            <p className="font-serif text-base font-semibold text-white">BizXcel Assistant</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-on-navy transition-colors hover:text-white"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>

          <div ref={logRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[85%] rounded-[10px] px-3.5 py-2.5 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "ml-auto bg-gold text-white"
                    : "bg-cream text-ink"
                }`}
              >
                {message.content}
              </div>
            ))}
            {loading && (
              <div className="max-w-[85%] rounded-[10px] bg-cream px-3.5 py-2.5 text-sm text-muted">
                Typing…
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border p-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your question…"
              aria-label="Type your message"
              className="flex-1 rounded-[6px] border border-border px-3 py-2 text-sm text-ink placeholder:text-muted focus-visible:border-gold"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] bg-gold text-white transition-colors hover:bg-gold-hover disabled:opacity-50"
            >
              <SendIcon />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
