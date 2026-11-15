/**
 * All copy for /sars and /sars/next-step.
 * Rules: see CLAUDE.md. No dashes, no invented numbers, no promises about SARS outcomes.
 * Every figure below has its source next to it.
 */

import { site } from "@/lib/content";

export const hero = {
  eyebrow: "For business owners and taxpayers in Cape Town",
  headline: "Behind with SARS? Here's how to get back up to date.",
  sub: "A short video from a registered SARS Tax Practitioner. Then tell us where you stand, and we'll WhatsApp you.",
  cta: "Check where I stand",
  ctaNote: "About a minute. Free, no obligation.",
};

/** Shown as a row of badges under the video. All from site content and the team page. */
export const credentials = [
  { label: "SAIPA member firm" },
  { label: "Registered SARS Tax Practitioner" },
  { label: `Since ${site.foundingYear}` },
  { label: "Team of 9 in Kuils River" },
];

export interface SarsFact {
  stat: string;
  detail: string;
  source: string;
  sourceUrl: string;
}

/** "The cost of waiting". Only figures SARS itself publishes. */
export const costOfWaiting = {
  eyebrow: "The cost of waiting",
  title: "The penalty runs every month until the return is in.",
  facts: [
    {
      stat: "R250 to R16,000",
      detail: "a month, depending on your taxable income",
      source: "SARS, administrative penalties page, updated 2 April 2026",
      sourceUrl:
        "https://www.sars.gov.za/individuals/what-if-i-do-not-agree/request-for-remission-of-administrative-non-compliance-penalty/",
    },
    {
      stat: "Up to 35 months",
      detail: "the penalty can keep coming back every month",
      source: "SARS, administrative penalties page, updated 2 April 2026",
      sourceUrl:
        "https://www.sars.gov.za/individuals/what-if-i-do-not-agree/request-for-remission-of-administrative-non-compliance-penalty/",
    },
    {
      stat: "It stops",
      detail: "when the outstanding return is submitted. SARS advises filing it to stop further penalties.",
      source: "SARS, administrative penalties page, updated 2 April 2026",
      sourceUrl:
        "https://www.sars.gov.za/individuals/what-if-i-do-not-agree/request-for-remission-of-administrative-non-compliance-penalty/",
    },
  ] satisfies SarsFact[],
  note: "This is the penalty for a late return only. Tax owed and interest are separate.",
};

export interface Testimonial {
  /** Wistia media ID. Items starting with TODO are hidden. */
  videoId: string;
  /** Business type and area only. First names only with written consent. */
  label: string;
  duration: string;
  poster?: string;
  portrait?: boolean;
}

/** [YOU] Replace with real Wistia IDs once the testimonial cards are made. */
export const testimonials: Testimonial[] = [
  { videoId: "TODO_TESTIMONIAL_1", label: "Business owner, Cape Town", duration: "0:20", portrait: true },
  { videoId: "TODO_TESTIMONIAL_2", label: "Employer, Kuils River", duration: "0:20", portrait: true },
  { videoId: "TODO_TESTIMONIAL_3", label: "Side business, Northern suburbs", duration: "0:20", portrait: true },
];

/** [WAYNE] Confirm these five steps match how the team works. */
export const howItWorks = {
  eyebrow: "How it works",
  title: "Five steps. You don't phone SARS once.",
  steps: [
    { n: "01", name: "A free chat", body: "We find out where you are. No cost, no obligation." },
    { n: "02", name: "We check your SARS profile", body: "With your permission, we see exactly what's outstanding." },
    { n: "03", name: "We file what's outstanding", body: "We tell you which documents we need, and help you find them." },
    { n: "04", name: "We deal with SARS for you", body: "Queries, letters and payment arrangements if you can't pay it all at once." },
    { n: "05", name: "We keep you up to date", body: "We track the dates, so this doesn't happen again." },
  ],
};

export interface PenaltyBand {
  label: string;
  monthly: number;
}

/**
 * Fixed penalty scale for a late return, by taxable income.
 * Source: Sage South Africa summary of the SARS scale, 2026.
 * SARS's own page confirms only the R250 to R16,000 range and the 35-month limit.
 * The calculator stays hidden until confirmedBy is set.
 * [WAYNE] Confirm the bands AND that each outstanding return carries its own penalty.
 */
export const penaltyScale = {
  confirmedBy: "" as string, // e.g. "Wayne Du Toit, 18 Nov 2026"
  maxMonths: 35,
  bands: [
    { label: "R0 to R250,000", monthly: 250 },
    { label: "R250,001 to R500,000", monthly: 500 },
    { label: "R500,001 to R1 million", monthly: 1000 },
    { label: "R1 million to R5 million", monthly: 2000 },
    { label: "R5 million to R10 million", monthly: 4000 },
    { label: "R10 million to R50 million", monthly: 8000 },
    { label: "Above R50 million", monthly: 16000 },
  ] satisfies PenaltyBand[],
};

export const calculator = {
  eyebrow: "Do the maths",
  title: "What is waiting costing you?",
  sub: "An estimate from SARS's fixed penalty scale. Nothing is saved or sent.",
  income: "Your taxable income last year",
  returns: "Returns still outstanding",
  months: "Months late",
  outSoFar: "Penalties so far",
  outWait: "If you wait 3 more months",
  outMax: "If it runs the full 35 months",
  note: "An estimate, not your actual bill. Your SARS statement shows the real amount. Tax owed and interest are separate.",
  ctaLine: "Want a registered practitioner to check your real numbers?",
  ctaButton: "Check where I stand",
};

export const formSection = {
  eyebrow: "Step 1 of 2",
  title: "Tell us where you stand.",
  sub: "A few quick questions. About a minute. Then we WhatsApp you.",
};

export interface Faq {
  q: string;
  a: string;
}

/** [WAYNE] Read every answer before launch. */
export const faqs: Faq[] = [
  {
    q: "Is it too late if I'm years behind?",
    a: "No. SARS penalties run monthly, so the sooner the returns are filed, the sooner they stop growing.",
  },
  {
    q: "Can the penalties be cancelled?",
    a: "In some cases SARS will consider a request to remit a penalty. We'll tell you honestly if yours qualifies. We can't promise it.",
  },
  {
    q: "I can't pay what I owe. Now what?",
    a: "SARS asks people who can't pay in full to make contact and arrange payment. We handle deferred payment and compromise applications for you.",
  },
  {
    q: "What does it cost?",
    a: "The first conversation is free. Once we know what's outstanding, we tell you the cost before any work starts.",
  },
  {
    q: "My paperwork is a mess. Can you still help?",
    a: "Yes. Hardly anyone arrives with a neat file. We tell you exactly what we need and help you find it.",
  },
  {
    q: "Do I need to come to your office?",
    a: "No. Most of it can be done on WhatsApp and email. You're welcome to visit us in Kuils River if you prefer.",
  },
  {
    q: "What happens after I fill in the form?",
    a: "Someone from our team WhatsApps you to arrange your free consultation. You can also message us straight away from the next page.",
  },
];

export const finalCta = {
  title: "The sooner we look, the more options you have.",
  cta: hero.cta,
};

export const nextStep = {
  eyebrow: "Step 2 of 2",
  headline: "Thanks. We've got your details.",
  /** "{name}" is replaced with the first name from the form. */
  headlineNamed: "Thanks, {name}. We've got your details.",
  /** [WAYNE] Only promise a time the team can keep every time, December included. */
  sub: "Someone from our team will WhatsApp you within one business day. Want to start now? Message us below.",
  whatsappButton: "Message us on WhatsApp",
  /** "{name}" is replaced. Goes into the wa.me link text, never the page URL. */
  whatsappMessage: "Hi BizXcel, I just filled in the SARS form on your website. My name is {name}.",
  whatsappMessageNoName: "Hi BizXcel, I just filled in the SARS form on your website.",
  prepTitle: "Have these handy for your consultation",
  prep: [
    "Any SARS letters or emails you've had",
    "Your SARS eFiling login, if you have one",
    "Which tax years you think are outstanding",
  ],
  reassurance: "No judgement. Most people who come to us are a little behind.",
};

export const privacyNote = {
  formLine:
    "BizXcel Kuils River collects these details to contact you about your enquiry. We don't share them or sell them.",
  linkLabel: "Privacy notice",
};

/** Small interface strings used around the page. */
export const ui = {
  videoComingSoon: "Video coming soon",
  soundOn: "Sound on",
  soundOff: "Tap for sound",
  videoHintMuted: "tap anywhere for sound",
  videoHintSound: "sound on",
  callLabel: "Call us",
  testimonialsLabel: "Client video testimonials",
  playTestimonial: "Play video",
  railBack: "Previous videos",
  railNext: "More videos",
  formFallback:
    "The form is taking a moment to load. You can message us on WhatsApp instead.",
  formFallbackButton: "Message us on WhatsApp",
  formTitle: "SARS check form",
  footerLine: "SAIPA member firm. Registered SARS Tax Practitioner.",
  sourceLabel: "Source",
  skipToForm: "Skip to the form",
};

/** Starting values and the look-ahead for the penalty calculator. */
export const calculatorDefaults = {
  /** Index into penaltyScale.bands: R250,001 to R500,000. */
  bandIndex: 1,
  returns: 1,
  months: 12,
  extraMonths: 3,
};
