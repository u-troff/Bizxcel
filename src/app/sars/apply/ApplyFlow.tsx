"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  applyQuestions,
  applyUi,
  privacyNote,
  type ChoiceKey,
  type ContactKey,
  type ContactStep,
} from "@/lib/sars-content";
import { cleanContact, isQualified, type ApplyAnswers } from "@/lib/sars-apply";
import {
  readCookie,
  readUtm,
  saveLead,
  type UtmParams,
} from "@/lib/sars-session";
import { trackCustom, trackStandard } from "../track";

/**
 * The question flow: one question per screen.
 *
 * Choice questions save and move on at the tap. The last screen holds the
 * contact fields and the consent box, and Enter sends it. Every answer is
 * saved in the background (see /api/sars-lead), one request at a time and in
 * order, and the screen never waits for it.
 *
 * After the last screen everyone goes to /sars/next-step. Lead fires only for
 * people who want it sorted this week or this month, not "Just looking".
 *
 * Progress is kept in sessionStorage, so a reload (common inside the Facebook
 * and Instagram browsers) carries on where they were, with the same event id.
 */

const STORAGE_KEY = "bizxcel_apply";
const ENDPOINT = "/api/sars-lead";

/** Gives the Meta pixel request time to leave before the page changes. */
const NAVIGATE_DELAY_MS = 600;

/** Long enough to see which option was tapped, short enough to feel instant. */
const TAP_DELAY_MS = 140;

interface Saved {
  sessionId: string;
  eventId: string;
  utm: UtmParams;
  step: number;
  answers: ApplyAnswers;
  done: boolean;
  startFired: boolean;
  leadFired: boolean;
}

const total = applyQuestions.length;

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `s_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;

function freshState(): Saved {
  return {
    sessionId: newId(),
    eventId: newId(),
    utm: readUtm(),
    step: 0,
    answers: {},
    done: false,
    startFired: false,
    leadFired: false,
  };
}

function loadState(): Saved {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as Saved;
      // Someone who finished and comes back gets a clean start.
      if (saved.done) return freshState();
      // Keep the tags from the first visit, but pick up new ones if the URL has them.
      const fresh = readUtm();
      if (Object.keys(fresh).length) saved.utm = { ...saved.utm, ...fresh };
      return saved;
    }
  } catch {
    // Storage can be blocked or corrupt. Start over.
  }
  return freshState();
}

function persist(state: Saved): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Without storage a reload starts again. Nothing else breaks.
  }
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** One save. Retries once on a network error or a server error. */
async function save(body: unknown): Promise<void> {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Still completes if the page changes while it is in flight.
        keepalive: true,
        body: JSON.stringify(body),
      });
      // A 4xx will not get better by sending it again.
      if (res.ok || (res.status < 500 && res.status !== 429)) return;
    } catch {
      // Offline for a moment. Try once more below.
    }
    if (attempt === 0) await wait(1000);
  }
}

const inputClass =
  // 18px: anything smaller makes iPhones zoom in on focus.
  "w-full rounded-[6px] border-2 border-border bg-white px-4 py-3.5 font-sans text-lg text-ink placeholder:text-muted focus:border-gold focus:outline-none aria-[invalid=true]:border-navy";

function ErrorText({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} role="alert" className="mt-2 flex items-start gap-2 text-base font-semibold text-navy">
      <span
        aria-hidden="true"
        className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy text-xs text-white"
      >
        !
      </span>
      {children}
    </p>
  );
}

/** The contact screen: every field on one page, Enter sends it. */
function ContactForm({
  step,
  initial,
  onSubmit,
}: {
  step: ContactStep;
  initial: ApplyAnswers;
  onSubmit: (values: ApplyAnswers) => void;
}) {
  const [errors, setErrors] = useState<Partial<Record<ContactKey | "consent", string>>>({});

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const values: ApplyAnswers = {};
        const found: Partial<Record<ContactKey | "consent", string>> = {};

        for (const field of step.fields) {
          const clean = cleanContact(field.key, data.get(field.key));
          if (clean === null) found[field.key] = field.error;
          // An empty optional field is simply left out.
          else if (clean) values[field.key] = clean;
        }
        if (data.get("consent") !== "yes") found.consent = step.consentError;

        setErrors(found);
        const firstBad = [...step.fields.map((f) => f.key), "consent"].find(
          (k) => found[k as ContactKey | "consent"],
        );
        if (firstBad) {
          (e.currentTarget.elements.namedItem(firstBad) as HTMLElement | null)?.focus();
          return;
        }
        onSubmit(values);
      }}
    >
      <p className="mb-6 text-base leading-relaxed text-body">{step.sub}</p>

      <div className="space-y-5">
        {step.fields.map((field, i) => {
          const error = errors[field.key];
          return (
            <div key={field.key}>
              <label
                htmlFor={`apply-${field.key}`}
                className="mb-2 block font-sans text-base font-semibold text-ink"
              >
                {field.label}
              </label>
              <input
                id={`apply-${field.key}`}
                name={field.key}
                type={field.input}
                inputMode={field.input === "tel" ? "tel" : field.input === "email" ? "email" : "text"}
                autoCapitalize={field.input === "text" ? "words" : "off"}
                autoComplete={field.autoComplete}
                defaultValue={initial[field.key] ?? ""}
                placeholder={field.placeholder}
                required={field.required}
                autoFocus={i === 0}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `apply-${field.key}-error` : undefined}
                className={inputClass}
              />
              {error ? <ErrorText id={`apply-${field.key}-error`}>{error}</ErrorText> : null}
            </div>
          );
        })}

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-base leading-snug text-body">
            <input
              type="checkbox"
              name="consent"
              value="yes"
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? "apply-consent-error" : undefined}
              className="mt-0.5 h-6 w-6 shrink-0 accent-gold"
            />
            <span>{step.consent}</span>
          </label>
          {errors.consent ? <ErrorText id="apply-consent-error">{errors.consent}</ErrorText> : null}
        </div>
      </div>

      <button
        type="submit"
        className="mt-7 w-full rounded-[6px] bg-gold px-6 py-5 font-sans text-lg font-semibold text-white transition-colors hover:bg-gold-hover"
      >
        {step.button}
      </button>

      <p className="mt-4 text-center text-xs leading-relaxed text-muted">
        {privacyNote.formLine}{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-gold">
          {privacyNote.linkLabel}
        </Link>
      </p>
    </form>
  );
}

export default function ApplyFlow() {
  const router = useRouter();
  const [state, setState] = useState<Saved>(loadState);
  const [tapped, setTapped] = useState<string | null>(null);

  // The latest state, readable from timers and callbacks. Only update() writes it.
  const latest = useRef(state);

  // Saves go out one at a time, in the order they were made, so a slow request
  // can never land after a later one.
  const queue = useRef<Promise<void>>(Promise.resolve());
  const timers = useRef<number[]>([]);
  const startFired = useRef(state.startFired);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => window.clearTimeout(t));
  }, []);

  // Apply_Start: once per visitor, however many times the page reloads.
  useEffect(() => {
    if (startFired.current) return;
    startFired.current = true;
    trackCustom("Apply_Start");
    latest.current = { ...latest.current, startFired: true };
    persist(latest.current);
  }, []);

  function update(patch: Partial<Saved>): Saved {
    const next = { ...latest.current, ...patch };
    latest.current = next;
    persist(next);
    setState(next);
    return next;
  }

  function enqueue(body: unknown) {
    queue.current = queue.current.then(() => save(body));
  }

  function answer(key: ChoiceKey, value: string) {
    const s = latest.current;
    const step = s.step + 1;
    const answers = { ...s.answers, [key]: value };

    trackCustom("Apply_Step", { step, key });
    // The tags go on every save: the server keeps the first ones it sees.
    enqueue({
      session_id: s.sessionId,
      event_id: s.eventId,
      utm: s.utm,
      action: "answer",
      step,
      answers: { [key]: value },
    });
    update({ answers, step });
  }

  function submitContact(values: ApplyAnswers) {
    const s = latest.current;
    const answers = { ...s.answers, ...values };
    const qualified = isQualified(answers);
    const name = answers.first_name;
    const phone = answers.whatsapp;
    const email = answers.email;

    trackCustom("Apply_Step", { step: total, key: "contact" });

    // Every answer again, so the row is complete even if an earlier save failed.
    enqueue({
      session_id: s.sessionId,
      event_id: s.eventId,
      utm: s.utm,
      action: "submit",
      step: total,
      consent: true,
      answers,
    });

    // For the thank-you page and the Contact event. Never put in a URL.
    saveLead({ name, phone, email });

    if (qualified && !s.leadFired) {
      // Lead is what the campaign optimises for. Browser and server copies
      // share the event id, so Meta counts it once.
      trackStandard("Lead", {}, s.eventId);
      void fetch("/api/meta-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          pixel: "sars",
          event_name: "Lead",
          event_id: s.eventId,
          event_source_url: window.location.href,
          user_data: {
            email,
            phone,
            name,
            fbp: readCookie("_fbp"),
            fbc: readCookie("_fbc"),
          },
        }),
      }).catch(() => {
        // The browser event already fired. A failed mirror must not show.
      });
    } else if (!qualified) {
      trackCustom("Apply_JustLooking");
    }

    update({ answers, done: true, leadFired: s.leadFired || qualified });

    const timer = window.setTimeout(() => {
      router.push(`/sars/next-step?eid=${encodeURIComponent(s.eventId)}`);
    }, NAVIGATE_DELAY_MS);
    timers.current.push(timer);
  }

  function onTap(key: ChoiceKey, value: string) {
    if (tapped) return;
    setTapped(value);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(
      () => {
        setTapped(null);
        answer(key, value);
      },
      reduced ? 0 : TAP_DELAY_MS,
    );
    timers.current.push(timer);
  }

  function back() {
    if (state.step === 0) return;
    setTapped(null);
    update({ step: state.step - 1 });
  }

  const question = applyQuestions[Math.min(state.step, total - 1)];
  const progress = state.done ? 1 : state.step / total;

  return (
    <div className="flex min-h-[calc(100dvh-57px)] flex-col sm:min-h-[calc(100dvh-65px)]">
      <div
        role="progressbar"
        aria-label="Progress"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={state.done ? total : state.step}
        className="h-1.5 w-full bg-cream"
      >
        <div
          className="h-full bg-gold transition-[width] duration-300 motion-reduce:transition-none"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="mx-auto w-full max-w-xl flex-1 px-5 pb-16 pt-5 sm:px-8 sm:pt-10">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={back}
            className={`inline-flex items-center gap-1.5 py-2 font-sans text-sm font-semibold text-body hover:text-ink ${
              state.step === 0 || state.done ? "invisible" : ""
            }`}
            tabIndex={state.step === 0 || state.done ? -1 : 0}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {applyUi.back}
          </button>
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            {applyUi.progress
              .replace("{n}", String(Math.min(state.step + 1, total)))
              .replace("{total}", String(total))}
          </span>
        </div>

        {/* key restarts the fade for every question */}
        <div key={state.step} className="mt-6 motion-safe:animate-[fadeSlideUp_0.35s_ease-out] sm:mt-10">
          <h1 className="text-[1.75rem] font-semibold leading-[1.15] text-ink sm:text-4xl">
            {question.question}
          </h1>

          <div className="mt-6 sm:mt-8">
            {question.kind === "choice" ? (
              <ul className="space-y-3">
                {question.options.map((option) => {
                  const picked = tapped === option || state.answers[question.key] === option;
                  return (
                    <li key={option}>
                      <button
                        type="button"
                        onClick={() => onTap(question.key, option)}
                        aria-pressed={picked}
                        disabled={state.done}
                        className={`w-full rounded-[6px] border-2 px-5 py-4 text-left font-sans text-lg font-semibold leading-snug text-ink transition-colors motion-reduce:transition-none ${
                          picked
                            ? "border-gold bg-cream"
                            : "border-border bg-white hover:border-navy"
                        }`}
                      >
                        {option}
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <ContactForm step={question} initial={state.answers} onSubmit={submitContact} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
