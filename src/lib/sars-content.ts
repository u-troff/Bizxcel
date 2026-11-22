/**
 * All copy for /sars, /sars/apply and /sars/next-step.
 * Rules: see CLAUDE.md. No dashes, no invented numbers, no promises about SARS outcomes.
 * Every figure below has its source next to it.
 *
 * The option lists in applyQuestions are also the server's allow-list
 * (src/lib/sars-apply.ts). Change an option here and the server follows.
 */

/** {{gold}} and __underlined__ markers are rendered by RichText; stripMarkup() removes them. */
export const hero = {
  eyebrow: "For business owners and taxpayers in Cape Town",
  headline: "{{Behind with SARS}}, or not sure where you stand? Watch this first.",
  sub: "SARS can charge a __penalty for every month__ a __return is late__. In about 3 minutes, see how a registered SARS Tax Practitioner gets you back up to date.",
  cta: "Check where I stand",
  ctaNote: "Takes about a minute. Then we WhatsApp you. Free, no obligation.",
};

/** The headline above the embedded form. {{gold}} markers are rendered by RichText. */
export const formSection = {
  title: "{{Fill in the form}} below to check where you stand.",
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

/**
 * Real Wistia videos. Label is business type and area only: add a first name
 * only with the client's written consent. Duration and poster come from Wistia.
 */
export const testimonials: Testimonial[] = [
  {
    videoId: "pefvhrb7lg",
    label: "Client testimonial",
    duration: "0:41",
    poster:
      "https://embed-ssl.wistia.com/deliveries/461b928aa946e8338e5848f546fb18b0.jpg?image_crop_resized=960x540",
  },
  {
    videoId: "a8nbzyceds",
    label: "Client testimonial",
    duration: "1:06",
    poster:
      "https://embed-ssl.wistia.com/deliveries/11ceca5d28dd9f9296923d4238263faa.jpg?image_crop_resized=960x540",
  },
];

export const testimonialsSection = {
  title: "What our clients say",
};

/* ------------------------------------------------------------------ */
/* /sars/apply: one question per screen                                */
/* ------------------------------------------------------------------ */

export type ChoiceKey = "need" | "timing" | "area";
export type ContactKey = "first_name" | "whatsapp" | "email";

export interface ChoiceStep {
  kind: "choice";
  key: ChoiceKey;
  question: string;
  options: readonly string[];
}

export interface ContactField {
  key: ContactKey;
  label: string;
  input: "text" | "tel" | "email";
  placeholder: string;
  autoComplete: string;
  required: boolean;
  /** Shown when the field is missing or not valid. */
  error: string;
}

export interface ContactStep {
  kind: "contact";
  question: string;
  sub: string;
  fields: ContactField[];
  consent: string;
  consentError: string;
  button: string;
}

export type ApplyStep = ChoiceStep | ContactStep;

export const needOptions = [
  "Behind on returns or penalties",
  "A SARS letter or audit",
  "Monthly bookkeeping or payroll",
  "Company or CIPC registration",
  "Not sure, I want a check-up",
] as const;

/** The last option marks the visitor as not ready yet (see isQualified). */
export const timingOptions = ["This week", "This month", "Just looking"] as const;

export const areaOptions = [
  "Cape Town northern suburbs",
  "Rest of Cape Town",
  "Rest of the Western Cape",
  "Elsewhere in South Africa",
] as const;

export const applyQuestions: ApplyStep[] = [
  {
    kind: "choice",
    key: "need",
    question: "What do you need help with most?",
    options: needOptions,
  },
  {
    kind: "choice",
    key: "timing",
    question: "How soon do you want it sorted?",
    options: timingOptions,
  },
  {
    kind: "choice",
    key: "area",
    question: "Where are you based?",
    options: areaOptions,
  },
  {
    kind: "contact",
    question: "Where should we WhatsApp you?",
    sub: "Someone from our team will message you to set up your free consultation.",
    fields: [
      {
        key: "first_name",
        label: "First name",
        input: "text",
        placeholder: "Your first name",
        autoComplete: "given-name",
        required: true,
        error: "Please add your first name.",
      },
      {
        key: "whatsapp",
        label: "WhatsApp number",
        input: "tel",
        placeholder: "082 123 4567",
        autoComplete: "tel",
        required: true,
        error: "Please add a South African mobile number, for example 082 123 4567.",
      },
      {
        key: "email",
        label: "Email (optional)",
        input: "email",
        placeholder: "you@example.co.za",
        autoComplete: "email",
        required: false,
        error: "That email address doesn't look right.",
      },
    ],
    consent: "I agree that BizXcel Kuils River may contact me on WhatsApp about my enquiry.",
    consentError: "Please tick the box so we can WhatsApp you.",
    button: "Send",
  },
];

export const applyUi = {
  back: "Back",
  /** "{n}" and "{total}" are replaced. */
  progress: "{n} of {total}",
  pageTitle: "Check where you stand | BizXcel Kuils River",
};

/* ------------------------------------------------------------------ */
/* /sars/next-step                                                     */
/* ------------------------------------------------------------------ */

export const nextStep = {
  eyebrow: "All done",
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

/* ------------------------------------------------------------------ */
/* Penalty calculator: not on the page right now, kept for later.      */
/* ------------------------------------------------------------------ */

export interface PenaltyBand {
  label: string;
  monthly: number;
}

/**
 * Fixed penalty scale for a late return, by taxable income.
 * Source: Sage South Africa summary of the SARS scale, 2026.
 * SARS's own page confirms only the R250 to R16,000 range and the 35-month limit.
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

/** Starting values and the look-ahead for the penalty calculator. */
export const calculatorDefaults = {
  /** Index into penaltyScale.bands: R250,001 to R500,000. */
  bandIndex: 1,
  returns: 1,
  months: 12,
  extraMonths: 3,
};

/** Small interface strings used around the pages. */
export const ui = {
  videoComingSoon: "Video coming soon",
  soundOn: "Sound on",
  soundOff: "Tap for sound",
  videoHintMuted: "tap anywhere for sound",
  videoHintSound: "sound on",
  testimonialsLabel: "Client video testimonials",
  playTestimonial: "Play video",
  railBack: "Previous videos",
  railNext: "More videos",
  footerLine: "SAIPA member firm. Registered SARS Tax Practitioner.",
};
