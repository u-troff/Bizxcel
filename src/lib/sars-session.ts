/**
 * Small browser-side helpers shared by the /sars pages.
 *
 * Contact details live in sessionStorage only. They are never put in a URL:
 * Meta flags pages that carry personal details in query strings.
 */

const LEAD_KEY = "bizxcel_lead";

export interface StoredLead {
  name?: string;
  email?: string;
  phone?: string;
}

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  fbclid?: string;
}

const UTM_KEYS: (keyof UtmParams)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "fbclid",
];

let pageEventId: string | undefined;

/**
 * One id per page load, shared by the Lead event and the saved row so the
 * browser and server copies of the event deduplicate. Kept in module memory
 * on purpose: a fresh load gets a fresh id. /sars/apply keeps its own copy in
 * sessionStorage so a reload carries on with the same id.
 */
export function getPageEventId(): string {
  if (!pageEventId) {
    pageEventId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `lead_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
  }
  return pageEventId;
}

/** The ad tags in the current address bar. Only the five we track. */
export function readUtm(): UtmParams {
  const out: UtmParams = {};
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of UTM_KEYS) {
      const value = params.get(key)?.trim();
      if (value) out[key] = value.slice(0, key === "fbclid" ? 500 : 200);
    }
  } catch {
    // No window or a broken URL. No tags.
  }
  return out;
}

export function saveLead(lead: StoredLead): void {
  try {
    sessionStorage.setItem(LEAD_KEY, JSON.stringify(lead));
  } catch {
    // Storage can be blocked. The pages still work, only the first name is lost.
  }
}

export function readLead(): StoredLead {
  try {
    const raw = sessionStorage.getItem(LEAD_KEY);
    return raw ? (JSON.parse(raw) as StoredLead) : {};
  } catch {
    return {};
  }
}

export function readCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}
