// Centralised, real content from the brief. Nothing here is invented —
// anything not supplied by the client is a clearly labelled placeholder.

export const site = {
  name: "BizXcel",
  location: "Kuils River",
  fullName: "BizXcel Kuils River",
  // Canonical production host. NEXT_PUBLIC_SITE_URL can override this (e.g. for a
  // staging environment), but must never be left unset in production: falling back
  // to VERCEL_URL here previously leaked preview-deployment URLs into canonical
  // tags, og:url, sitemap.xml and robots.txt. Falls back to localhost for local dev.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production" ? "https://www.bizxcelkr.com" : "http://localhost:3000"),
  phone: "021 903 1612",
  phoneHref: "tel:+27219031612",
  email: "info@bizxcel.co.za",
  hours: "Monday–Thursday, 08:00–16:30 , Friday, 07:30–15:00",
  address: {
    // `lines` is the display form; the individual fields feed the LocalBusiness
    // structured data, which needs street and postal code separated out.
    lines: [
      "9 Albertersia Crescent, Casa Bella 2",
      "Hunters Retreat, Kuils River",
      "Cape Town, Western Cape 7580",
    ],
    street: "9 Albertersia Crescent, Casa Bella 2, Hunters Retreat",
    locality: "Kuils River",
    region: "Western Cape",
    postalCode: "7580",
    country: "ZA",
  },
  whatsappHref: "https://wa.me/27600160834",
  foundingYear: 2014,
  areaServed: [
    "Kuils River",
    "Kraaifontein",
    "Brackenfell",
    "Durbanville",
    "Cape Town",
  ],
  description:
    "BizXcel Kuils River is a SAIPA-registered accounting practice and registered SARS Tax Practitioner, established in 2014, serving businesses and individuals across Cape Town's northern suburbs.",
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Insights", href: "/insights" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const socialLinks = [
  {
    label: "Facebook",
    icon: "facebook",
    href: "https://www.facebook.com/profile.php?id=61563080360102",
  },
  { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/bizxcelkr/" },
  { label: "Google", icon: "google", href: "https://share.google/gCxxUVdABxD0gEz5b" },
  // No LinkedIn profile supplied yet — add the URL here and it appears in the header
  // and footer automatically.
] as const;

export const trustBadges = [
  "SAIPA Member Firm",
  "Registered SARS Tax Practitioner",
  "Established 2014",
  "15+ Years' Experience",
] as const;

export const serviceBadges = [
  "Monthly Bookkeeping",
  "Payroll Administration",
  "Management & Financial Reporting",
  "SARS Tax Compliance",
  "Company Registrations",
  "BBBEE Letters",
  "WCA/COIDA",
  "UIF",
  "Personal Tax Returns",
] as const;

export type ServiceGroup = {
  title: string;
  items: string[];
  image: string;
  imageAlt: string;
};

// These three groups and their items mirror the practice's services flyer exactly.
// Keep them in step with it — the flyer is the source of truth for what we offer.
export const serviceGroups: ServiceGroup[] = [
  {
    title: "Accounting",
    items: [
      "Monthly bookkeeping",
      "Payroll administration",
      "Management and financial reporting",
      "BBBEE letters",
      "SARS tax compliance and submissions",
      "SARS deferred payment arrangements and compensation",
    ],
    image: "/images/services/accounting-payroll.jpg",
    imageAlt: "Monthly bookkeeping and payroll administration at BizXcel Kuils River",
  },
  {
    title: "Business",
    items: [
      "Company registration and amendments",
      "SARS registrations — companies, individuals and trusts",
      "Workman's compensation commission (WCA/COIDA)",
      "Unemployment Insurance Fund (UIF)",
    ],
    image: "/images/services/registrations-statutory.jpg",
    imageAlt: "Company registration and SARS statutory registrations for South African businesses",
  },
  {
    title: "Individual",
    items: [
      "Personal tax registration and returns",
      "Tax compliance and advisory",
      "Financial planning guidance",
      "Assistance with SARS queries and audits",
    ],
    image: "/images/services/tax-sars-compliance.jpg",
    imageAlt: "Personal tax returns and SARS compliance for individuals in Cape Town",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Book a free consultation",
    description:
      "A no-obligation conversation to understand your business and where you stand with SARS.",
  },
  {
    number: "02",
    title: "We assess and plan",
    description:
      "We review your books, registrations and outstanding obligations, then set out a clear, prioritised plan.",
  },
  {
    number: "03",
    title: "You get clean, current numbers",
    description:
      "We keep your accounting and compliance up to date, so you can make decisions with confidence.",
  },
] as const;

export const leadership = {
  name: "Wayne Du Toit",
  title: "Managing Director",
  bio: "Wayne Du Toit has led BizXcel since founding the practice in 2014. A SAIPA member and registered SARS Tax Practitioner, he holds an Accounting Technician qualification and oversees the firm's accounting, tax and advisory work, building a team that treats every client's compliance as seriously as its own.",
  credentials: [
    "SAIPA Member",
    "Registered SARS Tax Practitioner",
    "Accounting Technician Qualification",
    "Managing Director since 2014",
  ],
} as const;

export type TeamMember = {
  name: string;
  role: string;
  blurb: string;
  contact: {
    label: "Call" | "WhatsApp";
    display: string;
    href: string;
  };
};

// Headshots are optional and picked up automatically from public/team/ — see
// src/lib/team-photos.ts. Name each file after the person, lowercase and
// hyphenated, in .jpg/.jpeg/.png/.webp:
//   public/team/danielle-pick.jpg
//   public/team/clinton-rademeyer.jpg
//   public/team/jermaine-pick.jpg
//   public/team/tamia-jacobs.jpg
//   public/team/jade-jacobs.jpg
//   public/team/athini-gqwira.jpg
//   public/team/darryl-mars.jpg
//   public/team/wendy-lee-mothoa.jpg
//   public/team/wayne-du-toit.jpg  (leadership headshot)
// No file yet — falls back to the initials avatar / placeholder block.
export const team: TeamMember[] = [
  {
    name: "Danielle Pick",
    role: "Office Manager",
    blurb: "Keeps the practice running and clients looked after.",
    contact: { label: "Call", display: "021 931 2240", href: "tel:+27219312240" },
  },
  {
    name: "Clinton Rademeyer",
    role: "Financial Statements",
    blurb: "Prepares annual financial statements.",
    contact: { label: "WhatsApp", display: "081 346 0686", href: "https://wa.me/27813460686" },
  },
  {
    name: "Jermaine Pick",
    role: "Bookkeeper",
    blurb: "Monthly bookkeeping and record-keeping.",
    contact: { label: "WhatsApp", display: "066 206 0112", href: "https://wa.me/27662060112" },
  },
  {
    name: "Tamia Jacobs",
    role: "Bookkeeper",
    blurb: "Bookkeeping and client accounts.",
    contact: { label: "Call", display: "021 931 2240", href: "tel:+27219312240" },
  },
  {
    name: "Jade Jacobs",
    role: "Bookkeeper",
    blurb: "Bookkeeping and client accounts.",
    contact: { label: "WhatsApp", display: "077 388 1469", href: "https://wa.me/27773881469" },
  },
  {
    name: "Athini Gqwira",
    role: "Payroll Administrator",
    blurb: "Payroll processing and administration.",
    contact: { label: "Call", display: "021 931 2240", href: "tel:+27219312240" },
  },
  {
    name: "Darryl Mars",
    role: "Payroll Management and Marketing",
    blurb: "Payroll management and marketing for the practice.",
    contact: { label: "WhatsApp", display: "068 588 6605", href: "https://wa.me/27685886605" },
  },
  {
    name: "Wendy-Lee Mothoa",
    role: "Client Administration",
    blurb: "A first point of contact for clients.",
    contact: { label: "Call", display: "062 354 0505", href: "tel:+27623540505" },
  },
];

export type InsightBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; text: string };

export type InsightPost = {
  category: string;
  title: string;
  slug: string;
  /** A direct, 40–60 word answer-first summary — shown under the title and used for AEO/snippet targeting. */
  summary: string;
  body: InsightBlock[];
  publishedAt: string;
  updatedAt: string;
  /**
   * DRAFT CONTENT — written from BizXcel's own 2026/27 Tax Guide and SARS Budget
   * Tax Guide (see /content), pending the practice's review and sign-off before
   * it's treated as published, factual guidance. Flip to false once reviewed.
   */
  draft: boolean;
};

export const insights: InsightPost[] = [
  {
    category: "PAYROLL & STATUTORY",
    title: "UIF registration: what small employers must do",
    slug: "uif-registration-small-employers",
    summary:
      "If you employ anyone for 24 hours or more a month, you must register as an employer for UIF and pay over 2% of their remuneration each month — 1% deducted from the employee, 1% matched by you — on top of registering them individually.",
    publishedAt: "2026-10-14",
    updatedAt: "2026-10-14",
    draft: true,
    body: [
      {
        type: "p",
        text: "The Unemployment Insurance Fund (UIF) gives employees short-term relief if they lose income — through retrenchment, dismissal, illness, maternity or adoption leave, or the death of a breadwinner. As a small employer, UIF brings two separate jobs: registering as an employer, and registering (and keeping registered) every employee who qualifies.",
      },
      { type: "h2", text: "Who has to register?" },
      {
        type: "p",
        text: "As a general rule, any employer with one or more employees working 24 hours or more a month for them must register for UIF, and must register those employees too. This includes domestic workers. A small number of categories are excluded (for example, learners on certain learnerships, and some foreign nationals on limited contracts) — if you're not sure whether a specific role qualifies, it's worth checking before you assume either way.",
      },
      { type: "h2", text: "What you pay" },
      {
        type: "p",
        text: "UIF contributions are 2% of an employee's remuneration in total: 1% deducted from the employee's pay, matched by a further 1% from you as the employer, both paid over monthly.",
      },
      { type: "h2", text: "When to register" },
      {
        type: "p",
        text: "Register as soon as you take on your first qualifying employee — the commonly cited window is within 7 days of starting to employ someone. If you're already registered for PAYE with SARS, UIF registration and monthly payment is usually bundled in through your EMP201 submission. If you're not registered for PAYE (for example, you only employ someone below the PAYE threshold), you register and pay UIF separately through the Department of Employment and Labour's uFiling system or at a labour centre.",
      },
      { type: "h2", text: "Keep it current, not just open" },
      {
        type: "ul",
        items: [
          "Declare new employees and update details (start dates, remuneration, ID numbers) as they change — this is what makes a future claim possible for the employee.",
          "File a declaration of employment status when someone leaves, so they can claim UIF benefits without delay.",
          "Keep your monthly declarations and payments in step with your PAYE/EMP201 submissions if you're SARS-registered — mismatches are one of the most common things that hold up an employee's claim.",
        ],
      },
      {
        type: "callout",
        text: "UIF registration and payroll administration is part of what we handle for clients month to month, so it never becomes a scramble when someone leaves or needs to claim. If you're not sure whether your business or a specific role is UIF-registered correctly, book a free consultation and we'll check it for you.",
      },
    ],
  },
  {
    category: "TAX & SARS",
    title: "SARS provisional tax dates for 2026 and how to plan",
    slug: "sars-provisional-tax-dates-2026",
    summary:
      "Provisional taxpayers submit estimated taxable income twice a year — roughly end of August and end of February — plus an optional top-up by end of September, instead of waiting for one annual assessment. Missing a date or underestimating income can mean interest and penalties.",
    publishedAt: "2026-10-14",
    updatedAt: "2026-10-14",
    draft: true,
    body: [
      { type: "h2", text: "Who's actually a provisional taxpayer?" },
      {
        type: "p",
        text: "SARS treats you as a provisional taxpayer if you earn income that isn't remuneration, an allowance, or an advance from a registered employer — think freelance or consulting income, rental income, or investment income. You're not a provisional taxpayer purely from a salary with one registered employer. If you don't carry on a business, you're also excluded if your taxable income won't exceed the annual tax threshold, or if your income from interest, dividends, rental and remuneration from an unregistered employer is R30 000 or less for the year.",
      },
      { type: "h2", text: "The three payment dates" },
      {
        type: "p",
        text: "Instead of one annual assessment, provisional tax is paid in up to three instalments, each based on an estimate of your taxable income for the year:",
      },
      {
        type: "ul",
        items: [
          "First period — an estimate submitted and paid around six months into the tax year, typically by the end of August.",
          "Second period — a revised, more accurate estimate submitted and paid at the end of the tax year, typically by the end of February.",
          "Third period (optional top-up) — a voluntary payment around six months after year-end, typically by the end of September, to true up any shortfall and reduce interest before final assessment.",
        ],
      },
      {
        type: "p",
        text: "These are the standard dates for taxpayers on the usual March–February tax year. SARS shifts the exact calendar date when one falls on a weekend or public holiday, so always confirm the specific date on eFiling or with us rather than assuming — this guide is a planning reference, not a substitute for checking the current deadline.",
      },
      { type: "h2", text: "Why the second-period estimate matters most" },
      {
        type: "p",
        text: "SARS can charge an underestimation penalty if your second-period estimate comes in too low against your actual assessed taxable income. As a general rule, your estimate needs to be reasonably close to — broadly, not less than 90% of — your final taxable income, or in line with your 'basic amount' (usually your most recently assessed taxable income), to stay clear of a penalty. If your income has grown since your last assessment, lean toward the more accurate estimate rather than the lower one.",
      },
      { type: "h2", text: "What a late or short payment costs you" },
      {
        type: "p",
        text: "Under the current SARS rates, late or underpaid tax attracts interest at 10.25% a year, while an overpayment of provisional tax is refunded with interest at only 6.25% a year — so there's a real cost to guessing low and a real (if smaller) cost to overpaying. Getting the estimate right, not just paid on time, is what keeps that gap from working against you.",
      },
      {
        type: "callout",
        text: "If you're not sure whether you should be registered as a provisional taxpayer, or want help getting your estimate right before a deadline, book a free consultation — we'll work through your numbers with you.",
      },
    ],
  },
  {
    category: "BUSINESS STRUCTURE",
    title: "Sole proprietor vs (Pty) Ltd: which is right for you?",
    slug: "sole-proprietor-vs-pty-ltd",
    summary:
      "A sole proprietorship is simpler to run and taxed at your personal rate, but you're personally liable for business debts. A (Pty) Ltd separates you from the business legally and can be more tax-efficient once profits grow, at the cost of more admin and CIPC compliance.",
    publishedAt: "2026-10-14",
    updatedAt: "2026-10-14",
    draft: true,
    body: [
      {
        type: "p",
        text: "This is one of the first real decisions a new business makes, and it's worth revisiting even if you've been trading a while — the right structure can change as the business grows. Here's how the two compare on the things that actually matter.",
      },
      { type: "h2", text: "Liability: where the risk sits" },
      {
        type: "p",
        text: "As a sole proprietor, there's no legal separation between you and the business — its debts are your debts, and your personal assets are exposed if things go wrong. A (Pty) Ltd is a separate legal person: in general, shareholders' liability is limited to what they've invested in the company, though this protection isn't absolute (for example, if you've personally signed surety for a loan, or the business has traded recklessly).",
      },
      { type: "h2", text: "Tax: how the numbers shift as you grow" },
      {
        type: "p",
        text: "A sole proprietor's business profit is taxed as part of their personal income, at the individual marginal rates — up to 45% at the top bracket for the 2026/27 tax year. A company pays a flat 27% on its taxable income, or the lower, progressive Small Business Corporation (SBC) rates if it qualifies (0% up to R99 000, rising to 27% above R550 000). At lower profit levels, the sole proprietor route is often more tax-efficient; as profit grows, a company structure can start to work out better — though extracting money from a company as a dividend brings a further 20% dividends tax, so the full picture needs to be modelled, not assumed.",
      },
      { type: "h2", text: "Admin and compliance" },
      {
        type: "ul",
        items: [
          "Sole proprietor: no CIPC registration or annual return, lighter recordkeeping, but still needs proper records for your tax return.",
          "(Pty) Ltd: CIPC registration and annual returns, a registered office and company secretarial basics, and more formal financial recordkeeping — annual financial statements at minimum, and potentially an independent review or audit depending on the company's size and public interest score.",
        ],
      },
      { type: "h2", text: "Other things that tip the decision" },
      {
        type: "ul",
        items: [
          "Credibility: some clients, landlords, tenders and funders simply prefer or require dealing with a registered company.",
          "Continuity: a (Pty) Ltd continues to exist independently of its owners, which matters for succession or bringing in a partner or investor.",
          "Turnover Tax: very small businesses under R1 million turnover may qualify for the simplified Turnover Tax system regardless of structure — worth checking if your admin burden is the main concern.",
        ],
      },
      {
        type: "callout",
        text: "There's no single right answer — it depends on your liability exposure, your growth plans and where your profit sits right now. Book a free consultation and we'll model both options against your actual numbers.",
      },
    ],
  },
  {
    category: "BOOKKEEPING",
    title: "Getting your books audit-ready",
    slug: "getting-your-books-audit-ready",
    summary:
      "Audit-ready bookkeeping means every figure on your financials can be backed up with a source document in minutes, not days. That comes down to monthly reconciliation, separated business and personal finances, and organised records — not a scramble once a year.",
    publishedAt: "2026-10-14",
    updatedAt: "2026-10-14",
    draft: true,
    body: [
      {
        type: "p",
        text: "'Audit-ready' doesn't only mean ready for a formal audit — it means that if SARS, a bank, a funder or your own accountant asked you to justify any number on your financials tomorrow, you could. That's a habit built monthly, not a push once a year.",
      },
      { type: "h2", text: "Separate business and personal finances" },
      {
        type: "p",
        text: "A dedicated business bank account is the single biggest thing that makes bookkeeping tractable. Mixing personal and business transactions in one account is the most common reason records take far longer to reconcile than they should.",
      },
      { type: "h2", text: "Reconcile monthly, not annually" },
      {
        type: "p",
        text: "Match your bank statement to your books every month, while the transactions are still fresh and the person who made them can still remember what a vague entry was for. Left until year-end, reconciliation turns into forensic work.",
      },
      { type: "h2", text: "Keep source documents as you go" },
      {
        type: "ul",
        items: [
          "Invoices and receipts for every transaction, filed (digitally or physically) in a system you'll actually use again.",
          "A fixed asset register for anything the business owns longer-term — equipment, vehicles, fittings.",
          "Payroll records that tie back to your EMP201/EMP501 submissions and UIF declarations.",
          "VAT input and output reconciled monthly if you're VAT-registered, not just at filing time.",
        ],
      },
      { type: "h2", text: "How long to keep records" },
      {
        type: "p",
        text: "As a general rule, SARS requires financial records to be retained for five years from the date of the relevant tax return or assessment. Keep both the underlying documents and your working records for at least that long — and check the specific retention period for anything unusual (a capital asset sale, a dispute, a loan agreement) with us.",
      },
      { type: "h2", text: "Signs your books aren't audit-ready" },
      {
        type: "ul",
        items: [
          "You can't produce the invoice behind a specific expense without searching for it.",
          "Your bank balance and your books' cash balance don't match, and nobody's sure why.",
          "A full tax year's bookkeeping gets done in the weeks before a deadline, not through the year.",
        ],
      },
      {
        type: "callout",
        text: "Monthly bookkeeping is one of our core services precisely because of this — it's far easier (and cheaper) to stay current than to reconstruct a year after the fact. Book a free consultation if you'd like us to take a look at where your records stand.",
      },
    ],
  },
];

// Shared by Insights.tsx (thumbnails) and app/insights/[slug]/page.tsx (featured
// image), so each post's category maps to the same photo in both places.
export const insightCategoryImages: Record<string, string> = {
  "PAYROLL & STATUTORY": "/images/insights/payroll-statutory.jpg",
  "TAX & SARS": "/images/insights/tax-sars.jpg",
  "BUSINESS STRUCTURE": "/images/insights/business-structure.jpg",
  BOOKKEEPING: "/images/insights/bookkeeping.jpg",
};

export const faqs = [
  {
    question: "Do you handle SARS submissions?",
    answer:
      "Yes: income tax, VAT, PAYE and provisional tax submissions are part of what we do, along with keeping you registered and compliant.",
  },
  {
    question: "I've fallen behind on my SARS submissions. Can you help?",
    answer:
      "Absolutely. We regularly help clients get back up to date, including deferred payment and compromise arrangements with SARS. The sooner we look, the more options you have.",
  },
  {
    question: "Do you only work with Kuils River businesses?",
    answer:
      "No, we're based in Kuils River but work with businesses and individuals across Cape Town's northern suburbs and beyond.",
  },
  {
    question: "Do you work with small businesses and sole proprietors?",
    answer:
      "Yes. Much of our work is with small and medium businesses, sole proprietors and individuals.",
  },
  {
    question: "How do your fees work?",
    answer:
      "Every client is different, so we don't quote fixed prices upfront. Book a free consultation and we'll give you a clear quote based on what you actually need.",
  },
] as const;

export const serviceDropdownOptions = serviceGroups.map((g) => g.title);
