/**
 * Meta dataset (pixel) for the /sars funnel only: /sars and /sars/next-step.
 * Nothing else on the site loads a pixel.
 *
 * There is deliberately no hardcoded fallback. If the env var is missing the
 * pages still render and every fbq call is skipped.
 */
const rawId = process.env.NEXT_PUBLIC_META_SARS_PIXEL_ID;

/** Meta pixel IDs are digits only. Anything else is treated as not set. */
export const SARS_PIXEL_ID: string | undefined =
  rawId && /^\d+$/.test(rawId.trim()) ? rawId.trim() : undefined;

if (!SARS_PIXEL_ID && process.env.NODE_ENV === "development") {
  console.warn(
    "[sars] NEXT_PUBLIC_META_SARS_PIXEL_ID is not set. Tracking is off on /sars.",
  );
}
