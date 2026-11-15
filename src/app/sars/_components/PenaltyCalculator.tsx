"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

import { calculator, calculatorDefaults, penaltyScale } from "@/lib/sars-content";
import { MAX_RETURNS, MIN_RETURNS, penaltyIfWait, penaltyMax, penaltySoFar } from "@/lib/penalty";
import ScrollButton from "./ScrollButton";

const COUNT_MS = 450;

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(reducedQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const usePrefersReducedMotion = () =>
  useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(reducedQuery).matches,
    () => false,
  );

/** Rand with a comma, e.g. R16,000. */
const rand = (n: number) => `R${Math.round(n).toLocaleString("en-US")}`;

/** Counts up to the target when it changes. Snaps instantly under reduced motion. */
function useCountUp(target: number, reduced: boolean) {
  const [animated, setAnimated] = useState(target);
  const fromRef = useRef(target);

  useEffect(() => {
    if (reduced) return;
    const from = fromRef.current;
    if (from === target) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(from + (target - from) * eased);
      fromRef.current = value;
      setAnimated(value);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, reduced]);

  return reduced ? target : animated;
}

function Output({ label, value, reduced }: { label: string; value: number; reduced: boolean }) {
  const shown = useCountUp(value, reduced);
  return (
    <div className="rounded-[10px] border border-border bg-white p-5">
      <p className="font-sans text-sm text-body">{label}</p>
      <p aria-hidden="true" className="mt-2 font-serif text-3xl font-semibold text-navy">
        {rand(shown)}
      </p>
      <p className="sr-only">{rand(value)}</p>
    </div>
  );
}

const fieldClass =
  "w-full rounded-[6px] border border-border bg-white px-4 py-3 font-sans text-base text-ink";

export default function PenaltyCalculator({ onEngaged }: { onEngaged?: () => void }) {
  const ids = useId();
  const reduced = usePrefersReducedMotion();
  const engaged = useRef(false);

  const [bandIndex, setBandIndex] = useState(calculatorDefaults.bandIndex);
  const [returns, setReturns] = useState(calculatorDefaults.returns);
  const [months, setMonths] = useState(calculatorDefaults.months);

  const { bands, maxMonths } = penaltyScale;
  const monthly = bands[bandIndex].monthly;

  /** Fires onEngaged the first time any input changes. */
  const touch = () => {
    if (engaged.current) return;
    engaged.current = true;
    onEngaged?.();
  };

  const clamp = (n: number, min: number, max: number) =>
    Number.isFinite(n) ? Math.min(Math.max(Math.trunc(n), min), max) : min;

  const soFar = penaltySoFar(monthly, returns, months, maxMonths);
  const ifWait = penaltyIfWait(monthly, returns, months, calculatorDefaults.extraMonths, maxMonths);
  const atMax = penaltyMax(monthly, returns, maxMonths);

  return (
    <div className="rounded-[10px] border border-border bg-white p-5 sm:p-8">
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label htmlFor={`${ids}-income`} className="mb-2 block font-sans text-sm font-semibold text-ink">
            {calculator.income}
          </label>
          <select
            id={`${ids}-income`}
            className={fieldClass}
            value={bandIndex}
            onChange={(e) => {
              touch();
              setBandIndex(Number(e.target.value));
            }}
          >
            {bands.map((band, i) => (
              <option key={band.label} value={i}>
                {band.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${ids}-returns`} className="mb-2 block font-sans text-sm font-semibold text-ink">
            {calculator.returns}
          </label>
          <div className="flex items-stretch gap-2">
            <button
              type="button"
              aria-label={`${calculator.returns}: one less`}
              disabled={returns <= MIN_RETURNS}
              onClick={() => {
                touch();
                setReturns((r) => clamp(r - 1, MIN_RETURNS, MAX_RETURNS));
              }}
              className="h-12 w-12 shrink-0 rounded-[6px] border border-border bg-white text-xl text-ink transition-colors hover:border-gold hover:text-gold disabled:opacity-40"
            >
              -
            </button>
            <input
              id={`${ids}-returns`}
              type="number"
              inputMode="numeric"
              min={MIN_RETURNS}
              max={MAX_RETURNS}
              value={returns}
              onChange={(e) => {
                touch();
                setReturns(clamp(Number(e.target.value), MIN_RETURNS, MAX_RETURNS));
              }}
              className={`${fieldClass} text-center`}
            />
            <button
              type="button"
              aria-label={`${calculator.returns}: one more`}
              disabled={returns >= MAX_RETURNS}
              onClick={() => {
                touch();
                setReturns((r) => clamp(r + 1, MIN_RETURNS, MAX_RETURNS));
              }}
              className="h-12 w-12 shrink-0 rounded-[6px] border border-border bg-white text-xl text-ink transition-colors hover:border-gold hover:text-gold disabled:opacity-40"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <label htmlFor={`${ids}-months`} className="mb-2 block font-sans text-sm font-semibold text-ink">
            {calculator.months}
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              aria-label={calculator.months}
              min={0}
              max={maxMonths}
              value={months}
              onChange={(e) => {
                touch();
                setMonths(clamp(Number(e.target.value), 0, maxMonths));
              }}
              className="h-12 min-w-0 flex-1 accent-gold"
            />
            <input
              id={`${ids}-months`}
              type="number"
              inputMode="numeric"
              min={0}
              max={maxMonths}
              value={months}
              onChange={(e) => {
                touch();
                setMonths(clamp(Number(e.target.value), 0, maxMonths));
              }}
              className={`${fieldClass} w-20 text-center`}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Output label={calculator.outSoFar} value={soFar} reduced={reduced} />
        <Output label={calculator.outWait} value={ifWait} reduced={reduced} />
        <Output label={calculator.outMax} value={atMax} reduced={reduced} />
      </div>

      <p className="mt-6 text-sm leading-relaxed text-muted">{calculator.note}</p>

      <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-sans text-base font-semibold text-ink">{calculator.ctaLine}</p>
        <ScrollButton targetId="sars-form" className="w-full sm:w-auto">
          {calculator.ctaButton}
        </ScrollButton>
      </div>
    </div>
  );
}
