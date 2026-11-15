# BizXcel SARS Funnel: Claude Code Playbook

Prepared 15 Nov 2026 by U-Flow Solutions. Repo: `~/Desktop/Bizxcel` (the bizxcelkr.com site: Next.js 16.2, React 19, Tailwind v4, Vercel).

Built from the U-Flow `/remodel` page (`~/Desktop/Landing page/migration-next/u-flow-web/u-flow-website/src/app/remodel`). Same funnel, BizXcel brand, SARS offer.

Companion file: `docs/sars-ads-and-vsl.md` (the two new ads, and the VSL edit plan).

## How to use this file

1. Open Claude Code in `~/Desktop/Bizxcel`.
2. Run the prompts in order. Each one is a block you copy and paste whole.
3. After each step: `npm run dev`, check the page at 375px wide, then commit. Don't move on from a broken step.
4. All copy lives in one file, `src/lib/sars-content.ts` (Step 2). To change words later, change that file, not the components.
5. Anything marked **[YOU]** needs you or Wayne.

## Locked decisions

| Decision | Value |
|---|---|
| Offer | Free consultation for anyone behind with SARS or unsure where they stand |
| Routes | `/sars` (landing page) and `/sars/next-step` (thank-you page). Both noindex, not in the sitemap. |
| Funnel | Meta ad > `/sars` (VSL, proof, how it works, form, penalty calculator, FAQ) > `/sars/next-step` (plain thank-you page + WhatsApp button) > BizXcel WhatsApps the lead |
| After the form | No calendar. Thank-you page with a WhatsApp button. The lead also goes to the CRM and the WhatsApp assistant. |
| Look | The bizxcelkr.com brand: navy #13293D, gold #B4813C, cream #F7F4EE, Lora headings, Inter body. The page lives on their domain, so it uses their site tokens. |
| Video host | Wistia (the remodel `WistiaVsl` component and milestone tracking already work with it) |
| Pixel | A **new Meta dataset** used only on `/sars` and `/sars/next-step`, with Conversions API. Nothing else on the site gets a pixel. |
| Form | A new Tally form, duplicated from the SARS form `LZBlYy`, so the live form is never edited |
| Build tool | Claude Code in this repo |

## Flags before you build

1. **The repo has uncommitted work.** `git status` shows 21 changed files (about, contact, faq, insights, services, layout, content.ts, seo.ts and others). Step 0 deals with them first. Don't let Claude Code branch on top of work you haven't looked at.
2. **No privacy page exists.** The site has no `/privacy` route, and the form collects names and WhatsApp numbers. POPIA needs a notice. Step 7 adds a draft. **Wayne approves the wording before ads go live.**
3. **The penalty calculator is gated.** SARS's own page confirms only the range (R250 to R16,000 a month) and the 35-month limit. The band table (R500 for R250,001 to R500,000, and so on) comes from Sage, and SARS does not state outright that each outstanding return carries its own penalty. The calculator only shows once Wayne confirms both (`penaltyScale.confirmedBy` in the content file). Until then the section is hidden, not wrong.
4. **No client proof yet.** Testimonials come from the calls this week. The page works without them (credentials and SARS facts carry it), and testimonial videos appear the moment real IDs are added.
5. **Speed to contact decides this.** The page promises a WhatsApp reply. If leads wait two days, the page wastes the ad spend. Confirm who replies and how fast before launch, and put that exact promise in `nextStep.sub`.
6. **The VSL footage is portrait.** Wayne was told to film upright. Export the page VSL as **4:5 (1080 x 1350)** so it fits on a phone with the button still visible. Step 3 makes the player take an aspect ratio.

---

## Step 0: Clean start, branch and rules

**[YOU] first, in the terminal:** run `git status`. Commit the 21 in-progress files to `main` yourself if they're finished, or stash them (`git stash -u -m "site wip"`) if they're not. Then:

```text
Read AGENTS.md first. This is Next.js 16: before writing any code, read the relevant guides in node_modules/next/dist/docs/ (app router layouts, route groups, metadata, Script, usePathname) and follow them over anything you remember.

1. Run git status. If there are uncommitted changes, STOP and list them. Do not continue until I say so.
2. Create a branch funnel-sars-nov from main and switch to it.
3. Add a new section at the top of CLAUDE.md (keep the @AGENTS.md line):

# BizXcel landing page rules

## Who reads the /sars pages
South African business owners and individual taxpayers, mostly in Cape Town, reading on a phone after tapping a Facebook or Instagram ad. Many are behind with SARS and a bit anxious about it. They are not accountants. They think in "SARS letters", "outstanding returns", "penalties", "eFiling", "my accountant", "WhatsApp".

## Copy rules (non-negotiable)
- No em-dashes or en-dashes in any copy. Use full stops or commas.
- Short sentences. Plain words. One idea per sentence. Calm, not scary.
- Never invent numbers. Every figure shown comes from src/lib/sars-content.ts, where each one has its source and date.
- Never promise a refund, a penalty waiver or an outcome from SARS.
- No hype words: revolutionary, game-changing, unlock, supercharge, skyrocket, leverage, seamless, cutting-edge, hassle-free.
- Banned on public pages: Next.js, React, Vercel, Tally, pixel, dataset, funnel, conversion, CRM, API, AI, chatbot, automation.
- South African English (realise, organise, enquiry). Rand as R16,000 with a comma.

## Colours and type (match bizxcelkr.com exactly)
Use only the tokens in src/app/globals.css, through their Tailwind classes. Never type a hex value in a /sars component.
- navy #13293D (bg-navy, text-navy): headings, dark bands, the final CTA band
- gold #B4813C (bg-gold, hover:bg-gold-hover #9C6E30): buttons, numbers, links
- cream #F7F4EE (bg-cream): alternate section backgrounds
- white #FFFFFF: page background. ink #1E2A35: strong text. body #4A5560: paragraphs. muted #6B7580: small print. border #E9E4DA: lines and inputs
- on-navy rgba(255,255,255,0.78): text on navy
- Headings font-serif (Lora). Body font-sans (Inter). Buttons and inputs use the site's 6px radius.
- The only colour outside the tokens is WhatsApp green #25D366 on the next-step button.
- Components copied from U-Flow bring their own "trade" theme classes, shadcn variables and lucide icons. Replace every one of them with the tokens above before committing. If a copied file still contains a hex value or a U-Flow colour class, it fails review.

## Build rules
- Mobile first. Check every section at 375px wide.
- Respect prefers-reduced-motion for every animation.
- /sars and /sars/next-step are noindex and stay out of sitemap.ts.
- All /sars copy lives in src/lib/sars-content.ts, never hardcoded in components.
- Do not change the existing site pages, header, footer, chat widget or GA setup except where a step says so.

Commit: "chore: branch + landing page rules".
```

---

## Step 1: Audit (read-only)

```text
Read-only. Change nothing.

Report, under 50 lines:
1. src/app/layout.tsx: what it renders around every page (Header, Footer, WhatsAppButton, ChatWidget, GA).
2. The components in src/components/ui and src/components/sections that a landing page could reuse as they are (Button, Container, Eyebrow, SectionHeading, Accordion, TrustBar, TrustBadge, Reveal, InitialsAvatar, PersonAvatar). One line each on props.
3. src/lib/analytics.ts and TrackedLink: how GA events are sent.
4. In the U-Flow repo at ~/Desktop/Landing page/migration-next/u-flow-website, read src/app/remodel/ (page.tsx, layout.tsx, track.ts, remodel-pixel.ts, TRACKING.md, every file in _components) plus src/app/growth-audit/_components/TallyEmbed.tsx and src/app/api/meta-event/route.ts. List which files can be copied into this repo with only import and class-name changes, and which depend on things this repo doesn't have (framer-motion, shadcn, the "trade" theme classes, lucide-react).

Do not copy anything yet.
```

---

## Step 2: The content file

```text
Create src/lib/sars-content.ts with exactly this content. Components import from it. Do not change the wording.
```

```ts
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
```

```text
Then add src/lib/penalty.ts with pure functions:
- penaltySoFar(monthly, returns, months, maxMonths) = monthly x returns x min(months, maxMonths)
- penaltyIfWait(monthly, returns, months, extraMonths, maxMonths) = monthly x returns x min(months + extraMonths, maxMonths)
- penaltyMax(monthly, returns, maxMonths) = monthly x returns x maxMonths
Inputs are clamped: returns 1 to 10, months 0 to maxMonths.

And src/lib/penalty.test.ts using node:test, run with: node --experimental-strip-types --test src/lib/penalty.test.ts
Add it to package.json as "test". Cases:
- 500, 2 returns, 12 months: so far 12,000, wait 3 = 15,000, max 35,000.
- 500, 2 returns, 34 months: wait 3 is capped at 35,000.
- 250, 1 return, 0 months: 0.
Commit: "feat: sars content + penalty maths".
```

> Check the test values yourself: R500 x 2 x 12 = R12,000. Three more months is R500 x 2 x 15 = R15,000. The cap is R500 x 2 x 35 = R35,000.

---

## Step 3: The `/sars` page

```text
Read the Next.js 16 docs in node_modules/next/dist/docs/ on route groups, nested layouts and usePathname before starting.

PART A: keep the site header and footer off the landing pages without moving any existing page files.
- Create src/components/layout/SiteChrome.tsx, a client component that takes header, footer and floating (ReactNode props) plus children, reads usePathname(), and when the path starts with "/sars" renders only children. Otherwise it renders header, children, footer, floating as today.
- In src/app/layout.tsx, pass <Header />, <Footer /> and <><WhatsAppButton /><ChatWidget /></> into SiteChrome as props. Keep the skip link, JSON-LD, <main id="main-content"> and GoogleAnalytics exactly as they are. Every other page must look identical. Check /, /services and /contact after.

PART B: the route.
- src/app/sars/sars-pixel.ts: export SARS_PIXEL_ID = process.env.NEXT_PUBLIC_META_SARS_PIXEL_ID. No fallback. In development, warn once if missing, and skip every fbq call.
- src/app/sars/track.ts: copy the U-Flow remodel track.ts, pointing at SARS_PIXEL_ID. Only trackSingle / trackSingleCustom, never bare fbq('track').
- src/app/sars/layout.tsx: like the U-Flow remodel layout. Inline Meta base code, init ONLY SARS_PIXEL_ID, PageView with trackSingle, noscript image. Metadata: title "Behind with SARS? | BizXcel Kuils River", description hero.sub, robots noindex nofollow, canonical "/sars".
- Add NEXT_PUBLIC_META_SARS_PIXEL_ID, META_SARS_CAPI_TOKEN and META_SARS_TEST_EVENT_CODE to .env.example with one-line comments.

PART C: src/app/sars/page.tsx. All copy from src/lib/sars-content.ts. Use the site's tokens and components (navy, gold, cream, font-serif headings, Container, Button, Eyebrow, SectionHeading, Accordion, Reveal). Follow the "Colours and type" rules in CLAUDE.md. Copied U-Flow components must be restyled to those tokens, with no hex values and no U-Flow theme classes left. No new colours. No navigation. The only way forward is the form.

Section order:
1. Slim header bar: BizXcel logo (public/images/logo.png) left, phone number right as a tel: link. Nothing else.
2. Hero: eyebrow, h1 headline, sub (sub hidden under 640px so the video stays above the fold).
3. VSL: copy WistiaVsl.tsx and useWistiaMilestones.ts from the U-Flow remodel _components into src/app/sars/_components/. Add an aspect prop ("4/5" | "16/9", default "4/5"). For 4/5, cap the player at max-w-[480px] and centre it. If the videoId starts with TODO, render a cream 4:5 box saying "Video coming soon" instead of a broken player. Directly under it: a gold button (hero.cta) that smooth-scrolls to #sars-form, then hero.ctaNote in small text. Constants in page.tsx: SARS_VSL_ID = "TODO_SARS_VSL", VSL_TRACK_AS = "sars_vsl_v1".
4. Credentials row: the four credentials as small badges (reuse TrustBadge if it fits).
5. Cost of waiting: costOfWaiting as three cards. Big stat, detail, then the source as a small link to sourceUrl. The note underneath. Cream background.
6. Testimonials: copy VideoRail.tsx from U-Flow remodel. Click-to-load only. Render only items whose videoId does not start with TODO. If none are ready, render nothing (no empty heading).
7. How it works: the five steps as numbered rows, gold number, navy name, body.
8. Form: section id="sars-form" with formSection copy and the Tally embed (Step 4). Under the form: privacyNote.formLine and a link to /privacy.
9. Penalty calculator: section id="calculator". Render ONLY if penaltyScale.confirmedBy is not empty. Step 5 builds it.
10. FAQ: Accordion with faqs, plus FAQPage JSON-LD.
11. Final CTA band, navy background: finalCta.title + gold button to #sars-form.
12. Footer: logo, address lines and phone from site in src/lib/content.ts, "SAIPA member firm. Registered SARS Tax Practitioner.", link to /privacy, copyright year.

Also a mobile-only sticky bottom bar (under 768px): appears after the VSL scrolls out of view, hides when #sars-form is on screen. One gold button, hero.cta. Copy StickyCta.tsx from U-Flow and restyle it.

Motion: reuse the site's Reveal for headings and cards only. Never animate the VSL, the form or the h1.

Run npm run build and fix errors. Commit: "feat: /sars landing page".
```

---

## Step 4: The form and the redirect

**[YOU] first, in Tally.** Duplicate the SARS form `LZBlYy` (never edit the live one). Name the copy **"BizXcel: SARS Check"**. Check that the duplicate kept the webhook to the Expert Partner app. If it didn't, reconnect it before publishing. All questions **single-select**:

1. First name (short text)
2. WhatsApp number (phone)
3. Email (email)
4. What best describes you? Employed with side income / Sole proprietor or freelancer / Company (Pty) Ltd or CC / I employ staff and run payroll
5. What do you need most? Behind on returns or penalties / SARS letter or audit / Monthly bookkeeping or payroll / Company or CIPC registration / Not sure, I want a check-up
6. How soon? This week / This month / Just looking
7. Where are you? Cape Town northern suburbs / Rest of Cape Town / Rest of Western Cape / Elsewhere in South Africa
8. Consent checkbox (required): "I agree that BizXcel Kuils River may contact me about my enquiry."
9. Hidden fields: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `fbclid`, `event_id`

Settings: no redirect inside Tally, Tally branding off if your plan allows. Publish, copy the form ID.

```text
New Tally form ID for /sars: PASTE_FORM_ID_HERE

1. Copy TallyEmbed.tsx from the U-Flow repo (src/app/growth-audit/_components/) into src/app/sars/_components/. Keep its hidden-field logic: utm_source, utm_medium, utm_campaign, utm_content and fbclid from the page URL, plus event_id = crypto.randomUUID() made once per page load. Use the new form ID.
2. Copy RemodelLead.tsx from U-Flow into src/app/sars/_components/SarsLead.tsx. On Tally.FormSubmitted only:
   a. fire Lead in the browser (trackSingle to SARS_PIXEL_ID, eventID = event_id) and post the same event to /api/meta-event with pixel "sars", using fetch keepalive,
   b. save first name, email and WhatsApp number to sessionStorage key "bizxcel_lead" (JSON). Never in a URL,
   c. after 400ms, router.push("/sars/next-step?eid=" + event_id).
3. Create src/app/api/meta-event/route.ts, adapted from the U-Flow one. Accepts { pixel: "sars", event_name, event_id, event_source_url, user_data }. Looks up the pixel ID and token from env server-side and never trusts either from the browser. Hashes email, phone (E.164 with 27) and first name with SHA-256, lowercased and trimmed. Sends fbc, fbp, client_ip_address, client_user_agent, action_source "website", and test_event_code when META_SARS_TEST_EVENT_CODE is set. Allows only Lead and Contact. Anything else returns 400.

Commit: "feat: sars form + redirect".
```

---

## Step 5: The penalty calculator

Build this now. It stays hidden until Wayne confirms the scale.

```text
Build src/app/sars/_components/PenaltyCalculator.tsx, a client component. No new libraries. Copy from src/lib/sars-content.ts (calculator, penaltyScale). Maths from src/lib/penalty.ts only.

Inputs:
- Taxable income band: a select from penaltyScale.bands, default the second band (R250,001 to R500,000).
- Returns still outstanding: stepper 1 to 10, default 1.
- Months late: slider 0 to 35 with a number field kept in sync, default 12.

Outputs (large, update live, formatted R12,000):
- Penalties so far
- If you wait 3 more months
- If it runs the full 35 months

Under the outputs: calculator.note in small text, then calculator.ctaLine and a gold button to #sars-form.

Rules:
- Numbers count up when they change, and snap instantly under prefers-reduced-motion.
- Nothing stored, nothing sent, except the tracking callback below.
- onEngaged() fires the first time any input changes (once).
- Mobile: inputs stacked, outputs as three cards.

Commit: "feat: penalty calculator".
```

**[WAYNE] To switch it on:** once Wayne confirms the bands and the per-return rule, set `penaltyScale.confirmedBy` to his name and the date, then redeploy.

---

## Step 6: `/sars/next-step` + tracking

```text
Build src/app/sars/next-step/page.tsx. It inherits src/app/sars/layout.tsx (pixel, noindex). Copy from nextStep in src/lib/sars-content.ts.

Top to bottom:
1. Slim header bar, same as /sars.
2. "Step 2 of 2", headline (headlineNamed with the first name from sessionStorage "bizxcel_lead" when present), sub.
3. A large green WhatsApp button (#25D366, white text), nextStep.whatsappButton. Link: site.whatsappHref + "?text=" + encodeURIComponent(whatsappMessage with {name}, or whatsappMessageNoName). Opens in a new tab.
4. The prep list as a short checklist.
5. nextStep.reassurance.
6. The same footer as /sars.

Tracking (src/app/sars/_components/SarsTracking.tsx, used on both routes). Everything goes to SARS_PIXEL_ID with trackSingle / trackSingleCustom:

On /sars:
- VSL milestones from useWistiaMilestones: VSL_Play, VSL_25, VSL_40, VSL_50, VSL_75, VSL_95, params { video: VSL_TRACK_AS, percent }. Same rules as U-Flow: only when unmuted, at least 50% on screen, no seeks. A muted autoplay scrolled past fires nothing.
- CalculatorUsed (custom), once, from onEngaged.
- FormViewed (custom), once, when #sars-form is 50% in view.

On /sars/next-step:
- WhatsApp button click: standard event Contact in the browser with eventID "wa_" + eid, AND the same to /api/meta-event with user_data from sessionStorage. Once only. Also send the existing GA whatsapp_click event via trackWhatsAppClick({ location: "sars_next_step" }).

Write src/app/sars/TRACKING.md (event, type, where, when, dedupe ID), like the U-Flow one.

Run npm run build. Commit: "feat: next-step page + tracking".
```

**[YOU] before going live:**
1. In BizXcel's Meta Business account, Events Manager: create a dataset **"BizXcel SARS Funnel"**, generate a Conversions API token, and copy the dataset ID.
2. In Vercel (BizXcel project) > Settings > Environment Variables: add `NEXT_PUBLIC_META_SARS_PIXEL_ID` and `META_SARS_CAPI_TOKEN`. For testing, add `META_SARS_TEST_EVENT_CODE` (remove it before ads go live). Redeploy.
3. Verify `bizxcelkr.com` under Business Settings > Brand safety > Domains, if it isn't already.

---

## Step 7: Privacy notice

```text
Create src/app/privacy/page.tsx: a plain POPIA privacy notice for BizXcel Kuils River, using the site's normal layout (header and footer show here). Sections: who we are (name, address, email, phone from src/lib/content.ts), what we collect from the website forms (name, email, WhatsApp number, answers to the form questions, and basic visit data from Google Analytics and Meta), why (to respond to the enquiry and arrange a consultation), who we share it with (service providers who host the form, the website and our messaging, and Meta for advertising measurement, with names and phone numbers hashed before they are sent), how long we keep it, your rights (access, correction, deletion, objection, complaint to the Information Regulator), and how to contact us. Add a line at the top: "Last updated: [DATE]". Add /privacy to the footer links and to sitemap.ts.
Commit: "feat: privacy notice".
```

**[WAYNE]** reads and approves this page before any ad goes live. This is a starting draft, not legal advice.

---

## Step 8: QA before you point ads at it

```text
QA pass on branch funnel-sars-nov. Pass or fail for each:

1. npm run build, npm run lint and npm test pass.
2. No em-dash (U+2014) or en-dash (U+2013) in any string under src/app/sars or src/lib/sars-content.ts. No banned words from CLAUDE.md on /sars, /sars/next-step or /privacy.
3. Every number on /sars comes from src/lib/sars-content.ts. List any hardcoded numbers in components.
4. /sars and /sars/next-step: noindex, not in sitemap.ts, no site header, footer, chat widget or floating WhatsApp button. Every other page renders exactly as on main (compare /, /services, /contact, /about).
5. At 375px: the top of the VSL is visible without scrolling, no horizontal scroll, sticky bar shows and hides correctly, form usable with a thumb.
6. The calculator is hidden while penaltyScale.confirmedBy is empty, and shows when it's set.
7. No name, email or phone in any page URL at any point. The first name only appears in the wa.me message text.
8. Only SARS_PIXEL_ID is initialised, only on /sars routes. VSL events need sound on. /api/meta-event rejects anything except Lead and Contact.
9. Lighthouse mobile on /sars: performance 85+, CLS under 0.1.
10. Colours: grep src/app/sars for hex values (#) and for U-Flow classes. The only hex allowed is #25D366 on the next-step WhatsApp button. Compare /sars side by side with / at 375px: same navy, gold, cream, fonts and button style.

Then a one-paragraph summary and the open [YOU] and [WAYNE] items.
```

Then merge to `main`, let Vercel deploy, and in **Events Manager > Test Events**: load `/sars`, unmute and watch past 50%, submit the form, tap the WhatsApp button. You should see PageView, VSL_Play, VSL_25/40/50, FormViewed, Lead (browser + server, deduplicated) and Contact (browser + server, deduplicated). Muted autoplay with no click must fire nothing.

---

## Appendix: Launch checklist

**[YOU]**
- [ ] In-progress site work committed or stashed before Step 0
- [ ] Tally "BizXcel: SARS Check" duplicated, webhook to the Expert Partner app confirmed, form ID in Step 4
- [ ] Meta dataset + CAPI token created, env vars in Vercel, domain verified
- [ ] VSL edited (4:5) and uploaded to Wistia, ID swapped for TODO_SARS_VSL
- [ ] Testimonial cards made and uploaded, IDs swapped
- [ ] Test Events pass (Step 8)

**[WAYNE]**
- [ ] The five steps in howItWorks
- [ ] Every FAQ answer
- [ ] The reply-time promise in nextStep.sub
- [ ] The penalty scale and the per-return rule (switches the calculator on)
- [ ] The privacy notice
- [ ] Written consent from each testimonial client

**Ads (see `docs/sars-ads-and-vsl.md`)**
- Destination: `https://www.bizxcelkr.com/sars`
- URL parameters: `utm_source=meta&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}`
- Optimise for Landing Page Views for the first week (the new dataset has no history), with Lead firing the whole time. Move to Lead once it has 15 to 20 Leads a week.
- Keep the current Instant Form campaign running alongside at the same budget until the page beats it on cost per booked consultation.
