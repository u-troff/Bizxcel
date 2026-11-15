import Link from "next/link";

import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { site } from "@/lib/content";
import {
  calculator,
  costOfWaiting,
  credentials,
  faqs,
  finalCta,
  formSection,
  hero,
  howItWorks,
  penaltyScale,
  privacyNote,
  testimonials,
  ui,
} from "@/lib/sars-content";
import ScrollButton from "./_components/ScrollButton";
import SarsFooter from "./_components/SarsFooter";
import SarsHeader from "./_components/SarsHeader";
import SarsLead from "./_components/SarsLead";
import FormViewedTracker, { TrackedCalculator } from "./_components/SarsTracking";
import StickyCta from "./_components/StickyCta";
import TallyEmbed from "./_components/TallyEmbed";
import VideoRail from "./_components/VideoRail";
import WistiaVsl from "./_components/WistiaVsl";

/** [YOU] Swap for the real Wistia media ID once the VSL is uploaded. */
const SARS_VSL_ID = "TODO_SARS_VSL";
/** Bump to v2 when the video is replaced, so old and new watch data stay apart. */
const VSL_TRACK_AS = "sars_vsl_v1";

const FORM_ID = "sars-form";
const VSL_SECTION_ID = "sars-vsl";
const CALCULATOR_ID = "calculator";

/** The Tally form for this page. Set in the environment, never hardcoded. */
const tallyFormId = process.env.NEXT_PUBLIC_SARS_TALLY_FORM_ID?.trim();

const calculatorConfirmed = penaltyScale.confirmedBy.trim() !== "";
const hasTestimonials = testimonials.some((t) => !t.videoId.startsWith("TODO"));

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function SarsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SarsHeader />

      <main id="main-content">
        {/* 2 + 3. Hero and VSL */}
        <section className="bg-white pb-10 pt-6 sm:pt-10 md:pb-14">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow>{hero.eyebrow}</Eyebrow>
              <h1 className="mt-3 text-[2rem] font-semibold leading-[1.12] text-ink sm:text-5xl">
                {hero.headline}
              </h1>
              <p className="mx-auto mt-4 hidden max-w-2xl text-lg leading-relaxed text-body sm:block">
                {hero.sub}
              </p>
            </div>

            <div id={VSL_SECTION_ID} className="mt-6 sm:mt-8">
              <WistiaVsl
                videoId={SARS_VSL_ID}
                title={hero.headline}
                aspect="4/5"
                trackAs={VSL_TRACK_AS}
              />
              <div className="mx-auto mt-6 max-w-[480px] text-center">
                <ScrollButton targetId={FORM_ID} className="w-full py-4 text-base">
                  {hero.cta}
                </ScrollButton>
                <p className="mt-3 text-sm text-muted">{hero.ctaNote}</p>
              </div>
            </div>
          </Container>
        </section>

        {/* 4. Credentials */}
        <section className="border-y border-border bg-white">
          <Container className="flex flex-wrap justify-center gap-3 py-6">
            {credentials.map((c) => (
              <TrustBadge key={c.label}>{c.label}</TrustBadge>
            ))}
          </Container>
        </section>

        {/* 5. Cost of waiting */}
        <section className="bg-cream py-14 md:py-20">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow={costOfWaiting.eyebrow}
                title={costOfWaiting.title}
                align="center"
                className="mx-auto max-w-2xl"
              />
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {costOfWaiting.facts.map((fact, i) => (
                <Reveal key={fact.stat} delay={i * 80}>
                  <div className="h-full rounded-[10px] border border-border bg-white p-6">
                    <p className="font-serif text-3xl font-semibold text-navy">{fact.stat}</p>
                    <p className="mt-3 leading-relaxed text-body">{fact.detail}</p>
                    <p className="mt-4 text-xs text-muted">
                      {ui.sourceLabel}:{" "}
                      <a
                        href={fact.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-gold"
                      >
                        {fact.source}
                      </a>
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted">
              {costOfWaiting.note}
            </p>
          </Container>
        </section>

        {/* 6. Testimonials: nothing at all until real video IDs are added */}
        {hasTestimonials ? (
          <section className="bg-white py-10 md:py-14">
            <VideoRail videos={testimonials} />
          </section>
        ) : null}

        {/* 7. How it works */}
        <section className="bg-cream py-14 md:py-20">
          <Container className="max-w-3xl">
            <Reveal>
              <SectionHeading eyebrow={howItWorks.eyebrow} title={howItWorks.title} />
            </Reveal>
            <ol className="mt-8 divide-y divide-border rounded-[10px] border border-border bg-white">
              {howItWorks.steps.map((step) => (
                <li key={step.n} className="flex gap-5 p-5 sm:p-6">
                  <span className="font-serif text-3xl font-semibold leading-none text-gold">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-sans text-lg font-semibold text-navy">{step.name}</h3>
                    <p className="mt-1 leading-relaxed text-body">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* 8. Form */}
        <section id={FORM_ID} className="scroll-mt-4 bg-white py-14 md:py-20">
          <Container className="max-w-2xl">
            <Reveal>
              <SectionHeading
                eyebrow={formSection.eyebrow}
                title={formSection.title}
                align="center"
              />
              <p className="mt-3 text-center text-body">{formSection.sub}</p>
            </Reveal>
            <div className="mt-8 rounded-[10px] border border-border bg-white p-3 sm:p-5">
              {tallyFormId ? (
                <>
                  <TallyEmbed formId={tallyFormId} />
                  <SarsLead />
                  <FormViewedTracker formId={FORM_ID} />
                </>
              ) : (
                <div className="px-3 py-8 text-center">
                  <p className="text-body">{ui.formFallback}</p>
                  <a
                    href={site.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex rounded-[6px] bg-gold px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold-hover"
                  >
                    {ui.formFallbackButton}
                  </a>
                </div>
              )}
            </div>
            <p className="mt-4 text-center text-xs leading-relaxed text-muted">
              {privacyNote.formLine}{" "}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-gold">
                {privacyNote.linkLabel}
              </Link>
            </p>
          </Container>
        </section>

        {/* 9. Penalty calculator: hidden until Wayne confirms the scale */}
        {calculatorConfirmed ? (
          <section id={CALCULATOR_ID} className="scroll-mt-4 bg-cream py-14 md:py-20">
            <Container className="max-w-4xl">
              <Reveal>
                <SectionHeading
                  eyebrow={calculator.eyebrow}
                  title={calculator.title}
                  align="center"
                />
                <p className="mt-3 text-center text-body">{calculator.sub}</p>
              </Reveal>
              <div className="mt-8">
                <TrackedCalculator />
              </div>
            </Container>
          </section>
        ) : null}

        {/* 10. FAQ */}
        <section className="bg-white py-14 md:py-20">
          <Container className="max-w-3xl">
            <Accordion items={faqs.map((f) => ({ question: f.q, answer: f.a }))} />
          </Container>
        </section>

        {/* 11. Final CTA */}
        <section className="bg-navy py-14 text-center md:py-20">
          <Container className="max-w-2xl">
            <h2 className="text-[1.75rem] font-semibold leading-[1.2] text-white md:text-4xl">
              {finalCta.title}
            </h2>
            <ScrollButton targetId={FORM_ID} className="mt-8 w-full py-4 text-base sm:w-auto">
              {finalCta.cta}
            </ScrollButton>
          </Container>
        </section>
      </main>

      {/* 12. Footer */}
      <SarsFooter stickyPad />
      <StickyCta vslId={VSL_SECTION_ID} formId={FORM_ID} />
    </>
  );
}
