# BizXcel Kuils River — Website Build Brief

**For:** Claude Code
**Deliverable:** A production-ready marketing website.
**Stack:** Next.js (App Router) + TypeScript + Tailwind CSS, deployed on Vercel.

Build a polished, conversion-focused marketing site for an established South African
accounting firm. Match the design system below **exactly** — it's a fixed visual direction,
not a starting point. Use clean, reusable components. Use only the real content provided;
where something isn't provided, leave a clearly-labelled placeholder (never invent
credentials, statistics, testimonials, or contact details).

---

## The business

**BizXcel Kuils River** — an accounting and tax practice in Kuils River, Cape Town,
established 2014. SAIPA member firm and registered SARS Tax Practitioner. 15+ years'
experience. Serves small and medium businesses and individuals across Cape Town's northern
suburbs (Kuils River, Kraaifontein, Brackenfell, Durbanville).

**Hard constraints:**
- The Managing Director, **Wayne Du Toit**, appears for credibility only — **name and
  title, no email or phone anywhere on the site.** (The Leadership section should be easy
  to remove if he'd rather not be featured at all.)
- **Do NOT use the domain `bizxcelkr.com`** — it belongs to a third party. Use
  `info@bizxcel.co.za` as the placeholder contact email and mark the final domain as TBD.
- One consistent email domain across the whole site.
- No fabricated testimonials, client numbers, or stats.

---

## Design system (match exactly)

### Colour tokens
```
--navy:        #13293D   /* hero, CTA band, footer, dark sections */
--gold:        #B4813C   /* accent: buttons, eyebrows, bullets, numbers, links */
--gold-hover:  #9C6E30
--cream:       #F7F4EE   /* alternating light section background */
--white:       #FFFFFF
--ink:         #1E2A35   /* serif headings, dark text */
--body:        #4A5560   /* body copy */
--muted:       #6B7580   /* secondary/captions */
--border:      #E9E4DA   /* card + hairline borders */
--on-navy:     rgba(255,255,255,0.78)  /* body text on navy */
```

### Typography
- **Display / headings:** an elegant transitional **serif** — use **Lora** (fallback
  Georgia, serif). Weights 500–700. All section titles and hero headline are serif.
- **Body / UI / nav:** a clean **sans-serif** — use **Inter** (fallback system-ui). Weights
  400–600.
- **Eyebrows** (the small labels above each section title, e.g. `SERVICES`, `ABOUT`):
  Inter, uppercase, `letter-spacing: 0.14em`, weight 600, ~0.75rem, colour `--gold`.
- Generous type scale: hero headline large (~3.25rem desktop), section titles ~2.25rem,
  comfortable line-height on body (~1.6).

### Layout & components
- Max content width ~1200px, centred, with responsive side padding.
- Section vertical rhythm ~96px desktop / ~64px mobile. **Alternate** `--cream` and
  `--white` backgrounds between sections; `--navy` for hero, CTA band, footer.
- **Buttons:** solid gold pill-ish button (`--gold`, white text, subtle radius ~6px) for
  primary CTAs; outline button (thin `--border`, ink text) for secondary.
- **Cards:** white, thin `--border`, small radius (~10px), soft shadow, comfortable
  padding. Service/list cards use **gold bullet points**.
- **Trust badges:** pill-shaped outline chips (rounded-full, thin border).
- **Numbered process cards:** large gold serif numbers `01 / 02 / 03`.
- **Placeholder images:** tasteful blocks in the palette (soft navy/cream tint) with a
  small centred caption noting what photo goes there — do not hotlink stock photos.
- Motion: subtle only — a gentle fade/slide-up on scroll (IntersectionObserver), hover
  micro-interactions on buttons/cards. **Respect `prefers-reduced-motion`.**

---

## Global elements

**Sticky header** (light cream/white, thin bottom border):
- Left: wordmark — **"BizXcel"** in `--ink` serif bold + **"Kuils River"** in `--gold` serif.
- Centre/right: nav links — Services · About · Team · Insights · FAQ · Contact.
- Then a row of small square outline icon-buttons: LinkedIn, Facebook, Google, chat.
- Then a solid gold **"Book a free consultation"** button.
- Collapses to a hamburger menu on mobile.

**Floating WhatsApp button:** green circle, bottom-right, fixed. (This is also where the AI
chat widget mounts — see the AI Assistant appendix.)

**Footer** (navy, four columns):
1. Wordmark + line: "Accounting, tax and SARS compliance for businesses and individuals
   across Kuils River and Cape Town's northern suburbs." + social icons.
2. **Explore:** Services, About, Team, Insights, FAQ, Contact.
3. **Contact:** address, phone `021 903 1612`, `info@bizxcel.co.za`, hours Mon–Fri 08:00–17:00.
4. **Get started:** short line + gold "Book a free consultation" button.
- Bottom bar: `© 2026 BizXcel Kuils River. All rights reserved.` +
  `SAIPA Member · Registered SARS Tax Practitioner`.

---

## Sections (in this order, with copy)

### 1. Hero — navy, split (text left / image right)
- Eyebrow: `KUILS RIVER · CAPE TOWN`
- Headline (serif): **"Clarity, compliance, and confidence for Cape Town's businesses."**
- Sub: "BizXcel Kuils River is a SAIPA-registered accounting practice and registered SARS
  Tax Practitioner, established in 2014 — keeping businesses and individuals across the
  northern suburbs compliant, organised, and in control of their numbers."
- Primary CTA: **"Book a free consultation"**
- Small line under CTA: "No obligation — just a clear picture of where you stand with SARS."
- Right: rounded image placeholder (accountant with a client).

### 2. Trust bar — white, centred
- Eyebrow: `REGISTERED, CERTIFIED & COMPLIANT`
- Pill badges: **SAIPA Member Firm · Registered SARS Tax Practitioner · Established 2014 ·
  15+ Years' Experience**
- Small dashed logo placeholder: `SAIPA LOGO`.

### 3. Services "What we do" — cream, 4 white cards with gold-bullet lists
- Eyebrow `SERVICES`, title **"What we do"**.
- **Accounting & Payroll:** Monthly Bookkeeping · Payroll Administration · Management &
  Financial Reporting · Annual Financial Statements
- **Tax & SARS Compliance:** SARS Tax Compliance · Income Tax Consulting & Submissions ·
  Deferred Payment & Compromise Arrangements · SARS Queries & Audits · Personal Tax Returns
- **Registrations & Statutory:** Company Registration & Amendments · SARS Registrations
  (Companies, Individuals & Trusts) · UIF · Workmen's Compensation (WCA/COIDA) · BBBEE Letters
- **Advisory & Growth:** Business Plans & Valuations · Tender Process Assistance · Financial
  Planning Guidance · Legal Assistance

### 4. About — white, split (text left / image right)
- Eyebrow `ABOUT`, title **"About BizXcel Kuils River"**.
- Para: "Since 2014, BizXcel has helped small and medium businesses and individuals across
  Kuils River and Cape Town's northern suburbs keep their books accurate, their tax in
  order, and their SARS obligations met. As a SAIPA member firm and registered SARS Tax
  Practitioner, we pair proper accounting discipline with straight, practical advice — so
  you always know exactly where your business stands."

### 5. Why BizXcel — cream, split (title left / paragraph right)
- Eyebrow `WHY BIZXCEL`, title **"Why business owners trust us with their numbers"**.
- Para: "Good accounting is quiet — it's the reason nothing goes wrong. For more than a
  decade we've handled bookkeeping, payroll, financial statements and SARS submissions for
  businesses across the northern suburbs, and much of our work still comes by referral from
  clients who've been with us for years. Our team is cross-trained across bookkeeping,
  payroll, financials and tax, so your work is never stuck with one person and there's
  always someone who knows your file. No jargon, no surprises — just clean, current numbers
  and clear next steps."

### 6. How we work — white, three numbered cards (01/02/03)
- Eyebrow `HOW WE WORK`, title **"A clear path to compliance"**.
- **01 Book a free consultation** — "A no-obligation conversation to understand your
  business and where you stand with SARS."
- **02 We assess and plan** — "We review your books, registrations and outstanding
  obligations, then set out a clear, prioritised plan."
- **03 You get clean, current numbers** — "We keep your accounting and compliance up to
  date, so you can make decisions with confidence."

### 7. Leadership — cream, split (headshot placeholder left / bio + credentials right)
*(Credibility only — no contact. Easy to remove as a block.)*
- Eyebrow `LEADERSHIP`, title **"Meet Wayne Du Toit, Managing Director"**.
- Headshot placeholder: "Add headshot — Wayne Du Toit".
- Bio: "Wayne Du Toit has led BizXcel since founding the practice in 2014. A SAIPA member
  and registered SARS Tax Practitioner, he holds an Accounting Technician qualification and
  oversees the firm's accounting, tax and advisory work — building a team that treats every
  client's compliance as seriously as its own."
- Credential bullets (two columns, gold bullets): SAIPA Member · Registered SARS Tax
  Practitioner · Accounting Technician Qualification · Managing Director since 2014.

### 8. Team "Meet the team behind your numbers" — white, member cards
- Eyebrow `OUR TEAM`, title **"Meet the team behind your numbers"**.
- Cards (initials avatar placeholder, name serif, role in gold, one-line blurb — **no
  contact details**):
  - **Danielle Pick** — Office Manager — "Keeps the practice running and clients looked after."
  - **Clinton Rademeyer** — Financial Statements — "Prepares annual financial statements."
  - **Jermaine Pick** — Bookkeeper — "Monthly bookkeeping and record-keeping."
  - **Tamia Jacobs** — Bookkeeper — "Bookkeeping and client accounts."
  - **Athini Gqwira** — Payroll Administrator — "Payroll processing and administration."
  - **Wendy-Lee Mothoa** — Client Administration — "A first point of contact for clients."
- Caption: "Placeholder photos shown until headshots are added."

### 9. Testimonials — cream
- Eyebrow `CLIENT FEEDBACK`, title **"What our clients say"**.
- Right side: "Reviewed on Google" + outline button "Leave us a Google review".
- Placeholder line: "Client reviews will appear here once published." **(No invented reviews.)**

### 10. Insights — white, 4 blog cards (image / category / title / "Read more →")
- Eyebrow `INSIGHTS`, title **"Guidance for Cape Town businesses"**.
- `PAYROLL & STATUTORY` — "UIF registration: what small employers must do"
- `TAX & SARS` — "SARS provisional tax dates for 2026 and how to plan"
- `BUSINESS STRUCTURE` — "Sole proprietor vs (Pty) Ltd: which is right for you?"
- `BOOKKEEPING` — "Getting your books audit-ready"
- (Cards link to placeholder article routes.)

### 11. FAQ — cream, centred accordion (+/− toggle)
- Eyebrow `FAQ`, title **"Questions we're often asked"**.
- "Do you handle SARS submissions?" → "Yes — income tax, VAT, PAYE and provisional tax
  submissions are part of what we do, along with keeping you registered and compliant."
- "I've fallen behind on my SARS submissions — can you help?" → "Absolutely. We regularly
  help clients get back up to date, including deferred payment and compromise arrangements
  with SARS. The sooner we look, the more options you have."
- "Do you only work with Kuils River businesses?" → "No — we're based in Kuils River but
  work with businesses and individuals across Cape Town's northern suburbs and beyond."
- "Do you work with small businesses and sole proprietors?" → "Yes. Much of our work is
  with small and medium businesses, sole proprietors and individuals."
- "How do your fees work?" → "Every client is different, so we don't quote fixed prices
  upfront. Book a free consultation and we'll give you a clear quote based on what you
  actually need."

### 12. CTA band — split (image left / navy right)
- Heading (serif, on navy): **"Not sure where your business stands with SARS?"**
- Text: "Start with a free consultation. We'll give you a clear, honest picture — no obligation."
- Gold button: **"Book your free consultation"**.

### 13. Contact "Book your free consultation" — white/cream, form left / details right
- Eyebrow `CONTACT`, title **"Book your free consultation"**.
- Form fields: First name · Last name · Email · Phone · Select a service (dropdown of the
  four service groups) · Message · gold submit button **"Request consultation"**.
- Right column: **Address** (Kuils River, Cape Town — leave exact street as a placeholder) ·
  **Phone** 021 903 1612 · **Email** info@bizxcel.co.za · **Hours** Monday–Friday, 08:00–17:00 ·
  a map placeholder block ("Open in Maps" style link).

---

## Technical requirements
- Next.js App Router + TypeScript; components cleanly separated; Tailwind for styling with
  the tokens above defined as CSS variables / Tailwind theme values.
- Also create `/services`, `/about`, `/team`, `/contact` routes reusing the same section
  components (home is a single scroll with anchored sections).
- **SEO:** per-page metadata, titles/descriptions, Open Graph tags, and JSON-LD structured
  data for `AccountingService` / `LocalBusiness` (name, areaServed = Cape Town northern
  suburbs, foundingDate 2014). Target keywords naturally: accountant Kuils River, SARS tax
  practitioner Cape Town, bookkeeping, payroll, company registration.
- **Accessibility:** semantic HTML, strong colour contrast, visible keyboard focus,
  keyboard-operable accordion and mobile menu.
- **Performance:** `next/image`, lazy-load below-the-fold images, lightweight.
- Fully responsive down to mobile; `prefers-reduced-motion` respected.

## Content rules
- Use only the real details above. Clearly label every placeholder (team photos, Wayne's
  headshot, testimonials, exact street address, final domain, SAIPA logo).
- Do NOT invent credentials, statistics, or client quotes.
- Never render Wayne's contact details. Never use `bizxcelkr.com`.

---

## Appendix — AI assistant (website chat widget)

Build the chat widget UI now (the launcher can share the bottom-right corner with WhatsApp,
or replace it — a small chat bubble opening a panel). Wire the backend as follows; it's a
custom, website-only assistant on this same Vercel stack.

- **Frontend:** `<ChatWidget />` React component — holds the conversation client-side, calls
  our own `/api/chat` route only (never the model directly).
- **Backend:** a Vercel serverless route `/api/chat` that calls the **OpenAI API**
  (model: a GPT-5.6 small/volume tier, e.g. `gpt-5.6-luna`; confirm exact ID in the OpenAI
  dashboard) with the system prompt below and the `capture_lead` tool. Key stored as
  `OPENAI_API_KEY` in Vercel env vars — server-side only.
- **Lead capture:** when the model calls `capture_lead`, the route emails the shared inbox
  via **Resend** (structured email, not a chat dump) and logs the lead to a durable store as
  backup. Only send if there's a name **and** at least one contact method.

**System prompt:**
```
You are the virtual assistant for BizXcel Kuils River, a SAIPA-registered accounting and
tax firm in Kuils River, Cape Town (established 2014, registered SARS Tax Practitioner,
serving Cape Town's northern suburbs). You appear as a chat widget on the website. Be
warm, clear and helpful: answer questions about the firm's services, build trust, and
where there's a real need, guide the visitor to book a free consultation and capture their
details for the team.

SERVICES: bookkeeping, payroll, management & financial reporting, annual financial
statements; SARS tax compliance, income tax consulting & submissions, deferred payment /
compromise arrangements, SARS queries & audits, personal tax returns; company registration
& amendments, SARS registrations, UIF, WCA/COIDA, BBBEE letters; business plans &
valuations, tender assistance, financial planning guidance, legal assistance.

FEES: don't quote fixed prices — pricing depends on the client's situation; the best next
step is a free, no-obligation consultation. Never invent prices.

GOALS, IN ORDER: (1) answer clearly; (2) understand their situation — business or
individual, what they need, how urgent; (3) when there's a genuine need, offer the free
consultation and collect details; (4) call capture_lead once you have enough.

COLLECT (naturally, not as an interrogation): name; best contact (email and/or
phone/WhatsApp); business name if applicable; what they need; rough urgency. Once you have
a name, at least one contact method, and a clear need, confirm it back, then call
capture_lead and reassure them the team will be in touch.

GUARDRAILS: Do NOT give definitive tax, legal or financial advice or numbers on someone's
tax position — explain services generally and hand specifics to a human. NEVER share the
Managing Director's (Wayne Du Toit's) contact details; he is not a point of contact. NEVER
invent prices, guarantees, deadlines, or facts. If someone is stressed (behind on SARS,
facing penalties), be calm and reassuring — it's fixable, BizXcel handles it often — and
move them toward a consultation. Stay on topic. Keep replies short, friendly and human.
```

**`capture_lead` tool (OpenAI format):**
```json
{
  "type": "function",
  "function": {
    "name": "capture_lead",
    "description": "Send a qualified lead to the BizXcel team's shared inbox. Call once you have the visitor's name, at least one contact method (email or phone), and a clear sense of what they need.",
    "parameters": {
      "type": "object",
      "properties": {
        "name":          { "type": "string" },
        "email":         { "type": "string" },
        "phone":         { "type": "string" },
        "business_name": { "type": "string" },
        "client_type":   { "type": "string", "enum": ["business", "individual"] },
        "need":          { "type": "string" },
        "urgency":       { "type": "string" },
        "category":      { "type": "string", "enum": ["bookkeeping","financial_statements","payroll","tax_sars","company_registration","individual_tax","other"] },
        "summary":       { "type": "string" }
      },
      "required": ["name", "need", "category"]
    }
  }
}
```
Note: `tool_calls[0].function.arguments` returns as a JSON **string** — `JSON.parse()` it
before emailing.
```
