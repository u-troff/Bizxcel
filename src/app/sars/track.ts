import { SARS_PIXEL_ID } from "./sars-pixel";

/**
 * Every /sars event goes to the SARS dataset by name, never through a bare
 * fbq('track'). With no pixel ID configured these do nothing.
 */

/** Standard event (Lead, Contact). Pass eventId when the server sends a twin. */
export function trackStandard(
  name: string,
  params: Record<string, unknown> = {},
  eventId?: string,
): void {
  if (!SARS_PIXEL_ID) return;
  window.fbq?.(
    "trackSingle",
    SARS_PIXEL_ID,
    name,
    params,
    eventId ? { eventID: eventId } : undefined,
  );
}

/** Custom event (VSL_50, Apply_Step, CalculatorUsed). */
export function trackCustom(
  name: string,
  params: Record<string, unknown> = {},
): void {
  if (!SARS_PIXEL_ID) return;
  window.fbq?.("trackSingleCustom", SARS_PIXEL_ID, name, params);
}
