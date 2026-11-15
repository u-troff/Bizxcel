"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import {
  getPageEventId,
  readCookie,
  saveLead,
  type StoredLead,
} from "@/lib/sars-session";
import { SARS_PIXEL_ID } from "../sars-pixel";

type TallyField = {
  key?: string;
  label?: string;
  type?: string;
  value?: unknown;
};

type TallyMessage = {
  event?: string;
  payload?: { fields?: TallyField[]; [key: string]: unknown };
};

/** Gives the Meta pixel request time to leave before the page changes. */
const NAVIGATE_DELAY_MS = 400;

/**
 * On Tally.FormSubmitted only, it:
 *  1. fires Lead to the SARS dataset, from the browser and the server, with
 *     one shared event id so Meta counts it once,
 *  2. keeps first name, email and WhatsApp number in sessionStorage (never the URL),
 *  3. moves the visitor on to /sars/next-step.
 */
export default function SarsLead() {
  const router = useRouter();
  const hasFired = useRef(false);

  useEffect(() => {
    let timer: number | undefined;

    const parseTallyMessage = (data: unknown): TallyMessage | null => {
      if (typeof data === "string") {
        if (!data.includes("Tally.")) return null;
        try {
          return JSON.parse(data) as TallyMessage;
        } catch {
          return null;
        }
      }
      if (data && typeof data === "object" && "event" in data) {
        return data as TallyMessage;
      }
      return null;
    };

    const isTallyOrigin = (origin: string) => {
      try {
        const { hostname } = new URL(origin);
        return hostname === "tally.so" || hostname.endsWith(".tally.so");
      } catch {
        return false;
      }
    };

    /** Pull contact details out of the submission when Tally includes them. */
    const extractContact = (message: TallyMessage): StoredLead => {
      const fields = Array.isArray(message.payload?.fields)
        ? message.payload.fields
        : [];

      const valueOf = (field: TallyField) =>
        typeof field.value === "string" && field.value.trim()
          ? field.value.trim()
          : undefined;

      const find = (typePattern: RegExp, labelPattern: RegExp) => {
        const byType = fields.find(
          (f) => typeof f.type === "string" && typePattern.test(f.type),
        );
        if (byType && valueOf(byType)) return valueOf(byType);

        const byLabel = fields.find(
          (f) => typeof f.label === "string" && labelPattern.test(f.label),
        );
        return byLabel ? valueOf(byLabel) : undefined;
      };

      return {
        email: find(/EMAIL/i, /e-?mail/i),
        phone: find(/PHONE/i, /whatsapp|phone|mobile|cell|number/i),
        name: find(/^INPUT_TEXT$/i, /^first name$|^your name$|^name$|\bfull name\b/i),
      };
    };

    const handleMessage = (event: MessageEvent) => {
      if (!isTallyOrigin(event.origin)) return;

      const message = parseTallyMessage(event.data);
      if (message?.event !== "Tally.FormSubmitted") return;

      if (hasFired.current) return;
      hasFired.current = true;

      // Same id that went into the form as the event_id hidden field.
      const eventId = getPageEventId();
      const contact = extractContact(message);

      // Browser half. trackSingle, so it only reaches the SARS dataset.
      if (SARS_PIXEL_ID) {
        window.fbq?.(
          "trackSingle",
          SARS_PIXEL_ID,
          "Lead",
          {},
          { eventID: eventId },
        );
      }

      saveLead(contact);

      // Server half. keepalive so it completes even as the page changes.
      void fetch("/api/meta-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          pixel: "sars",
          event_name: "Lead",
          event_id: eventId,
          event_source_url: window.location.href,
          user_data: {
            email: contact.email,
            phone: contact.phone,
            name: contact.name,
            fbp: readCookie("_fbp"),
            fbc: readCookie("_fbc"),
          },
        }),
      }).catch(() => {
        // The browser event already fired. A failed mirror must not show.
      });

      timer = window.setTimeout(() => {
        router.push(`/sars/next-step?eid=${encodeURIComponent(eventId)}`);
      }, NAVIGATE_DELAY_MS);
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
      window.clearTimeout(timer);
    };
  }, [router]);

  return null;
}
