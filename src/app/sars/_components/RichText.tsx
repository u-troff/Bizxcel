import { Fragment } from "react";

/**
 * Tiny inline emphasis for /sars copy, so the wording stays in sars-content.ts:
 *   {{like this}}  -> gold text
 *   __like this__  -> underlined in gold
 * Anywhere the plain text is needed (metadata, aria labels), use stripMarkup().
 */
const MARKUP = /(\{\{[^}]+\}\}|__[^_]+__)/g;

export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(MARKUP).map((part, i) => {
        if (part.startsWith("{{")) {
          return (
            <span key={i} className="text-gold">
              {part.slice(2, -2)}
            </span>
          );
        }
        if (part.startsWith("__")) {
          return (
            <span
              key={i}
              className="font-semibold text-ink underline decoration-gold decoration-2 underline-offset-4"
            >
              {part.slice(2, -2)}
            </span>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

/** The same text with the markers removed. */
export function stripMarkup(text: string): string {
  return text.replace(/\{\{([^}]+)\}\}/g, "$1").replace(/__([^_]+)__/g, "$1");
}
