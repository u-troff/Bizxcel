/**
 * Rules for the /sars/apply answers, shared by the browser and the server.
 * No Node or browser-only imports here: both sides load this file.
 */

import {
  applyQuestions,
  areaOptions,
  needOptions,
  timingOptions,
  type ChoiceKey,
  type ContactKey,
} from "@/lib/sars-content";

export type ApplyAnswers = Partial<Record<ChoiceKey | ContactKey, string>>;

/** The allowed options for each choice question. Anything else is rejected. */
export const CHOICE_OPTIONS: Record<ChoiceKey, readonly string[]> = {
  need: needOptions,
  timing: timingOptions,
  area: areaOptions,
};

export const CHOICE_KEYS = Object.keys(CHOICE_OPTIONS) as ChoiceKey[];
export const CONTACT_KEYS: ContactKey[] = ["first_name", "whatsapp", "email"];

/** Number of screens in the flow. */
export const TOTAL_STEPS = applyQuestions.length;

/**
 * "Just looking" is not counted as a Lead, so the ad campaign optimises for
 * people who want it sorted. They still get the thank-you page and the
 * WhatsApp follow-up.
 */
export function isQualified(answers: ApplyAnswers): boolean {
  return answers.timing !== undefined && answers.timing !== "Just looking";
}

/**
 * South African mobile or landline to E.164: "082 123 4567", "+27 82 123 4567",
 * "0027821234567" and "27821234567" all become "+27821234567".
 * Returns null when it cannot be a real number.
 */
export function toE164Za(raw: string): string | null {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("0")) digits = "27" + digits.slice(1);
  return /^27[1-9]\d{8}$/.test(digits) ? `+${digits}` : null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Cleans one contact answer.
 * Returns the clean value, "" for an empty optional field, or null when the
 * value is not acceptable.
 */
export function cleanContact(key: ContactKey, raw: unknown): string | null {
  const value = typeof raw === "string" ? raw.trim().replace(/\s+/g, " ") : "";

  if (key === "first_name") {
    if (!value || value.length > 60) return null;
    return value;
  }
  if (key === "whatsapp") {
    return value ? toE164Za(value) : null;
  }
  // email: optional
  if (!value) return "";
  if (value.length > 200 || !EMAIL_RE.test(value)) return null;
  return value.toLowerCase();
}

/** True when a choice answer is one of that question's options. */
export function isValidChoice(key: ChoiceKey, value: unknown): value is string {
  return typeof value === "string" && CHOICE_OPTIONS[key].includes(value);
}
