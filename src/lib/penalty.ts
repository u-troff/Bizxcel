/**
 * Late-return penalty maths for the /sars calculator. Pure functions, no imports,
 * so they run under node:test without the app's path aliases.
 */

export const MIN_RETURNS = 1;
export const MAX_RETURNS = 10;

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(Math.max(Math.trunc(value), min), max);
}

/** monthly x returns x min(months, maxMonths) */
export function penaltySoFar(
  monthly: number,
  returns: number,
  months: number,
  maxMonths: number,
): number {
  const r = clamp(returns, MIN_RETURNS, MAX_RETURNS);
  const m = clamp(months, 0, maxMonths);
  return monthly * r * m;
}

/** monthly x returns x min(months + extraMonths, maxMonths) */
export function penaltyIfWait(
  monthly: number,
  returns: number,
  months: number,
  extraMonths: number,
  maxMonths: number,
): number {
  const r = clamp(returns, MIN_RETURNS, MAX_RETURNS);
  const m = clamp(months, 0, maxMonths);
  const total = Math.min(m + Math.max(0, extraMonths), maxMonths);
  return monthly * r * total;
}

/** monthly x returns x maxMonths */
export function penaltyMax(
  monthly: number,
  returns: number,
  maxMonths: number,
): number {
  const r = clamp(returns, MIN_RETURNS, MAX_RETURNS);
  return monthly * r * maxMonths;
}
