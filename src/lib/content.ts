// Centralised, real content from the brief. Nothing here is invented —
// anything not supplied by the client is a clearly labelled placeholder.

export const site = {
  name: "BizXcel",
  location: "Kuils River",
  fullName: "BizXcel Kuils River",
  // No custom domain yet. Falls back to the live Vercel deployment URL (set
  // automatically on every deploy, no config needed) so metadata/sitemap/robots
  // always point somewhere real, then to localhost for local dev. Once a real
  // domain is bought and attached in Vercel, set NEXT_PUBLIC_SITE_URL to it
  // (as an env var, in the Vercel project settings) and this takes over.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  phone: "021 903 1612",
  phoneHref: "tel:+27219031612",
  email: "info@bizxcel.co.za",
  hours: "Monday–Friday, 08:00–17:00",
  addressPlaceholder: "Kuils River, Cape Town: [exact street address to be added]",
  whatsappHref: "https://wa.me/27219031612",
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

export const insights = [
  {
    category: "PAYROLL & STATUTORY",
    title: "UIF registration: what small employers must do",
    slug: "uif-registration-small-employers",
  },
  {
    category: "TAX & SARS",
    title: "SARS provisional tax dates for 2026 and how to plan",
    slug: "sars-provisional-tax-dates-2026",
  },
  {
    category: "BUSINESS STRUCTURE",
    title: "Sole proprietor vs (Pty) Ltd: which is right for you?",
    slug: "sole-proprietor-vs-pty-ltd",
  },
  {
    category: "BOOKKEEPING",
    title: "Getting your books audit-ready",
    slug: "getting-your-books-audit-ready",
  },
] as const;

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
