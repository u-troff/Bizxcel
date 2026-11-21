"use client";

import { useSyncExternalStore } from "react";

import { WhatsAppIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/lib/content";
import { nextStep } from "@/lib/sars-content";
import { readLead } from "@/lib/sars-session";
import { trackWhatsAppContact } from "./SarsTracking";

/** First word of the name they typed, capitalised, if it looks like a name. */
const firstName = (): string | null => {
  const word = readLead().name?.trim().split(/\s+/)[0];
  if (!word || word.length > 30 || !/^[\p{L}'-]+$/u.test(word)) return null;
  return word.charAt(0).toLocaleUpperCase() + word.slice(1);
};

// sessionStorage never changes while this page is open, so there is nothing
// to subscribe to.
const subscribe = () => () => {};

/**
 * The thank-you page body. The first name comes from the form, saved in
 * sessionStorage. Server render, and anyone without a saved name, get the
 * plain headline. The name only ever appears in the wa.me message text, never
 * in a page URL.
 */
export default function NextStepContent() {
  const name = useSyncExternalStore(subscribe, firstName, () => null);

  const headline = name ? nextStep.headlineNamed.replace("{name}", name) : nextStep.headline;
  const message = name
    ? nextStep.whatsappMessage.replace("{name}", name)
    : nextStep.whatsappMessageNoName;
  const href = `${site.whatsappHref}?text=${encodeURIComponent(message)}`;

  return (
    <section className="bg-white py-12 md:py-20">
      <Container className="max-w-2xl">
        <Eyebrow>{nextStep.eyebrow}</Eyebrow>
        <h1 className="mt-3 text-[2rem] font-semibold leading-[1.15] text-ink md:text-5xl">
          {headline}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-body">{nextStep.sub}</p>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackWhatsAppContact}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-[6px] bg-[#25D366] px-6 py-5 font-sans text-lg font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto sm:inline-flex"
        >
          <WhatsAppIcon className="h-6 w-6" />
          {nextStep.whatsappButton}
        </a>

        <div className="mt-12 rounded-[10px] border border-border bg-cream p-6">
          <h2 className="font-serif text-xl font-semibold text-ink">{nextStep.prepTitle}</h2>
          <ul className="mt-4 space-y-3">
            {nextStep.prep.map((item) => (
              <li key={item} className="flex items-start gap-3 text-body">
                <svg
                  viewBox="0 0 24 24"
                  className="mt-0.5 h-5 w-5 shrink-0 text-gold"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m5 12 5 5 9-10" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-body">{nextStep.reassurance}</p>
      </Container>
    </section>
  );
}
