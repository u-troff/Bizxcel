/**
 * SDK Chartered Accountants — single source of truth for ALL site copy.
 *
 * Extracted 16 Oct 2026 from https://www.sdkca.co.za (index, about, service, join-our-services,
 * careers, news, contact). Copy is carried over as published; nothing here is invented.
 *
 * Conventions:
 *  - `// SOURCE:` marks the page a block came from.
 *  - `// CHECK:` marks something the client should confirm before launch (typos, conflicts, gaps).
 *  - `PLACEHOLDER` marks content the client has not supplied. Never replace these with made-up text.
 */

export const site = {
  name: "SDK|CA",
  legalName: "SDK Chartered Accountants",
  // The current site is plain .html pages; the rebuild uses clean routes.
  currentSiteUrl: "https://www.sdkca.co.za",
  // SOURCE: index.html hero/about, about.html
  descriptor: "Assurance, Accounting and Advisory",
  description:
    "SDK|CA is a small- to medium-sized firm operating through three associated entities. Built on trust, long-term relationships and shared value, we provide practical, forward-thinking advice to businesses and start-ups across a wide range of industries.",
  // SOURCE: news.html tagline / careers.html tagline (secondary lines the firm already uses)
  taglines: {
    news: "Accounting. Act. Count. Think.",
    careers: "Behind every great business is a great accountant.",
  },
} as const;

// SOURCE: footer + contact.html
export const contact = {
  receptionPhone: "+27 21 970 4600",
  receptionPhoneHref: "tel:+27219704600",
  fax: "+27 21 975 6780",
  email: "info@sdkca.co.za",
  emailHref: "mailto:info@sdkca.co.za",
  accountsEmail: "accounts@sdkca.co.za", // SOURCE: join-our-services.html (Debtor's Department)
  address: {
    lines: ["22A Church Street", "Durbanville"],
    // CHECK: postal code 7550 appears only in the privacy statement ("registered office, 7550").
    postalCode: "7550",
    country: "ZA",
  },
  hours: [
    { days: "Monday – Thursday", time: "08h00 – 16h45" },
    { days: "Friday", time: "08h00 – 15h30" },
  ],
  // SOURCE: contact form dropdown "Enquiring About"
  enquiryOptions: [
    "General Question",
    "Audit & Assurance",
    "Accounting & Cloud Accounting",
    "System Implementations",
    "Payroll",
    "Taxation",
    "Secretarial",
    "Advisory",
    "Estate & Administration",
    "Careers",
  ],
  contactBlurb: "Use the form below to drop us an e-mail. Old fashioned phone calls work too.",
  // Homepage variant (no form on the homepage yet) — same sentence minus the reference to the form.
  contactBlurbShort: "Drop us an e-mail. Old fashioned phone calls work too.",
} as const;

// SOURCE: footer
export const social = [
  { label: "Facebook", href: "https://www.facebook.com/sdkca/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/10954599/" },
  { label: "Instagram", href: "https://www.instagram.com/sdkca_sa/" },
] as const;

// SOURCE: index.html "In Association with:"
// Three entities. `id` is used to group services below.
export const entities = [
  {
    id: "ca",
    name: "SDK Chartered Accountants (SA)",
    registrationLabel: "Practice No",
    registration: "902047",
  },
  {
    id: "ps",
    name: "SDK Professional Services Proprietary Limited",
    registrationLabel: "Reg No",
    registration: "2000/022751/07",
    // CHECK: privacy statement calls this "SDK Professional Services (Pty) Ltd" — same entity, different styling.
  },
  {
    id: "cloud",
    name: "SDK Cloud Accounting Incorporated",
    registrationLabel: "Reg No",
    registration: "2003/0200071/21",
  },
] as const;

// SOURCE: service.html. Order = homepage order (7 services).
// `entity` is INFERRED from the logo that heads each block on service.html
// (Chartered Accountants → Audit; Cloud Accounting → Accounting/Payroll/Taxation returns;
// Professional Services → Estate/Secretarial/Taxation/Advisory). CHECK with client.
export const services = [
  {
    slug: "audit-assurance",
    title: "Audit & Assurance",
    entity: "ca",
    items: [
      "Statutory and non-statutory engagements",
      "System evaluations and recommendations",
      "Agreed upon procedures",
      "Forensic audits",
      "Special purpose assurance reports",
      "Independent Reviews",
    ],
  },
  {
    slug: "accounting",
    title: "Accounting/Cloud Accounting",
    entity: "cloud",
    items: [
      "Monthly bookkeeping",
      "Calculation of VAT, completion and submission of VAT201 returns",
      "Compilation of financial statements",
      "Independent Reviews",
      "Preparation of routine management reports and budgets",
    ],
  },
  {
    slug: "payroll",
    title: "Payroll",
    entity: "cloud",
    items: [
      "Monthly retainer of payroll",
      "Submission of returns (EMP201 – monthly submission, EMP501 – half yearly submission)",
      "Compilation of payslips",
      "UIF declaration electronic submission",
      "Facilitate registrations for PAYE, UIF and COIDA",
      "Completion and submission of COIDA returns",
    ],
  },
  {
    slug: "tax",
    title: "Tax",
    // service.html lists "Taxation" twice: a one-line version under Cloud Accounting and the full
    // list under Professional Services. The full list is used here.
    entity: "ps",
    items: [
      "Submission of returns (annual return, provisional return, dividend withholding return)",
      "Taxpayer Registrations (Individual, Trust, Company & Close Corporation)",
      "Other Registrations (VAT, Diesel, PAYE, UIF, SDL, Compensation Commissioner, Customs)",
      "Applications (Directive, exemption, tax clearance)",
      "Ad hoc services (Penalty waiver, request for correction, notice of objection, notice of appeal)",
      "SARS appointment",
    ],
  },
  {
    slug: "secretarial",
    title: "Secretarial",
    entity: "ps",
    items: [
      "Write up of Company Register/ Retainer",
      "Submission of annual return (CIPC)",
      "Submission of AFS (XBRL) & FAS",
      "Submission of Companies Compliance Checklist",
      "Submission of Beneficial Ownership (CIPC & Master)",
      "Registrations (Company, Trust)",
      "Memorandum of Incorporation (Long/Short)",
      "Conversions (M&A to MOI/ Close Corporation to Company)",
      "Name reservation/change",
      "Shares (Allotment, buy back, transfer, increase, section 42)",
      "Appointment/ Resignation/ Change (Director, Trustee, Member)",
      "Confirmation letters",
      "Resolutions",
    ],
  },
  {
    slug: "advisory",
    title: "Advisory",
    entity: "ps",
    items: [
      "Advisory services to new and existing businesses",
      "Group restructuring",
      "Valuations",
      "Advance tax planning and advice",
    ],
  },
  {
    slug: "estate-administration",
    title: "Estate & Administration",
    entity: "ps",
    items: ["Estate planning", "Estate administration", "Wills"],
  },
] as const;

// SOURCE: services page intro
export const servicesIntro =
  "Our high-quality services and expertise are combined with our policy to add value and give personal attention so that we deliver maximum benefit to our clients.";

// SOURCE: index.html "About Us" (identical text on careers.html "WHY SDK|CA")
export const about = {
  heading: "About Us",
  body: "SDK|CA is a small‑ to medium‑sized firm operating through three associated entities. Built on trust, long‑term relationships and shared value, we provide practical, forward‑thinking advice to businesses and start‑ups across a wide range of industries. Our team is committed to continuous professional development, embraces innovative technologies, and delivers service with care, integrity, and a strong focus on meaningful human connection.",
  // SOURCE: about.html intro line
  intro:
    "SDK|CA is a small‑ to medium‑sized Assurance, Accounting and Advisory firm operating through three associated entities with a dynamic team which consults clients across a wide spectrum of industries.",
  // SOURCE: about.html, below the leadership grid
  team: [
    "The assurance teams consists of professionally qualified assurance managers, as well as trainee accountants who are mostly at a post-graduate level and registered with the South African Institute of Chartered Accountants (SAICA).",
    "The accounting teams are managed by qualified professional accountants, who are supported by trainee accountants registered with the South African Institute of Professional Accountants (SAIPA).",
    "The administrative team takes care of tax administration, secretarial services, estate administration and general office matters.",
    "Continuous training and professional development ensures that our staff acquires and maintains a high level of technical expertise and meets the most recent requirements as dictated by our professional and regulatory bodies: SAICA, SAIPA, CIMA and the Independent Regulatory Board for Auditors (IRBA).",
    "We pride ourselves in using advanced technology to operate in a paperless environment.",
  ],
} as const;

// SOURCE: index.html. CHECK: vision says "outmost best" (likely "utmost best"); values list ends "Loyal" (not "Loyalty").
// Carried over verbatim — flag to client, do not silently rewrite.
export const vision =
  "We want to be the outmost best in what we do. We want to take pride in providing a close working relationship with our clients and relevant stakeholders by adding value through application of our expertise, knowledge and experience.";

export const mission =
  "It is our mission to be the best professional service firm amongst our peers, providing an excellent, all-inclusive service with commitment and integrity to all current and prospective clients.";

export const values = [
  "Integrity",
  "Service of Excellence",
  "Teamwork",
  "Respect",
  "Attitude",
  "Loyal",
] as const;

// SOURCE: about.html "Meet Our Leadership Team". Names/credentials are the firm's own published details.
// Photos intentionally not hotlinked — client to supply approved images.
export const leadership = [
  { name: "Johan Smit", credentials: "CA(SA) | Registered Auditor", role: "Partner" },
  { name: "Madeleine Smit", credentials: "CA(SA) | Registered Auditor", role: "Partner" },
  { name: "Lize-Marie Boltman", credentials: "CA(SA) | Registered Auditor", role: "Partner" },
  { name: "Dirk Truter", credentials: "CA(SA) | Registered Auditor", role: "Partner" },
  { name: "Paul Fick", credentials: "Professional Accountant (SA)", role: "Director" },
  { name: "Line Neumeyer", credentials: "AGA(SA)", role: "Director" },
  { name: "Néecke Gee", credentials: "", role: "Human Resource Coordinator" },
  { name: "Johanette Strydom", credentials: "AGA(SA)", role: "Practice Manager" },
] as const;

/**
 * Testimonials — the live site shows lorem ipsum attributed to "Jane Galadriel, CEO Tengkurep".
 * NOT carried over. These are clearly marked placeholders; the UI renders a visible
 * "Placeholder — awaiting client testimonial" label. Never invent quotes.
 */
export const testimonials = [
  { id: 1, status: "placeholder", quote: null, author: null, role: null },
  { id: 2, status: "placeholder", quote: null, author: null, role: null },
  { id: 3, status: "placeholder", quote: null, author: null, role: null },
] as const;

// SOURCE: join-our-services.html
export const joinSteps = [
  {
    step: 1,
    title: "Introduction Meeting",
    body: "Prior to completing the SIGN UP forms, please make sure that you contact our office for an introduction meeting to discuss your service’s needs. A fee estimate or proposal will be compiled based upon the introduction meeting or discussion.",
    cta: { label: "Contact Us", href: "/contact" },
  },
  {
    step: 2,
    title: "Sign Up",
    body: "Follow the easy step-by-step instructions to send us everything we need. We will also assist you with any questions you may have.",
    // CHECK: the "Sole Proprietor" link on the live site has a typo ("hhttps://") and is broken. Fixed here.
    forms: [
      {
        label: "Company / Close Corporation / Trust",
        href: "https://docs.google.com/forms/d/e/1FAIpQLSecAA0OKaMW3X_TUfsJ4OzmVlZfABSTJOneeoWxMtf2CMV4rw/viewform?usp=sf_link",
      },
      {
        label: "Sole Proprietor",
        href: "https://docs.google.com/forms/d/e/1FAIpQLSfm4YiRzCCXMROuGIR4Xel2gEcwpIjkwMhl5xxwg5HwbFgRyQ/viewform?usp=sf_link",
      },
      {
        label: "Individual",
        href: "https://docs.google.com/forms/d/e/1FAIpQLSev-Lr2f3igtlEq1OgOjOgNWjHmvBK71UWdlkhUgR0ePGcAGw/viewform?usp=sf_link",
      },
    ],
  },
  {
    step: 3,
    title: "Choose your payment method",
    body: "Please note that due to security reasons and the safety of your information, we will not require you to give your banking or credit card information online. Our Debtor’s Department will contact you for the required information.",
    options: [
      { label: "Option 1: Debit order", href: "https://forms.gle/pK1GcGmbUeQEbcb56", linkLabel: "Application form" },
      { label: "Option 2: EFT / Bank Deposit" },
      { label: "Option 3: YOCO inhouse card machine" },
      { label: "Option 4: Alternative arrangement", note: "Contact our Debtor’s Department at accounts@sdkca.co.za" },
    ],
  },
  {
    step: 4,
    title: "Sign our engagement letter",
    body: "Your Engagement Manager or our Onboarding Team will be in contact with you to sign our engagement letter. Please note that no services will be rendered before we receive a signed copy.",
  },
] as const;

// SOURCE: careers.html
export const careers = {
  heading: "Careers/Training",
  tagline: "Behind every great business is a great accountant.",
  why: [
    "We actively integrate technology into our practice and processes to enhance efficiency, accuracy, and service delivery. Innovation and continuous improvement are central to how we operate, enabling us to meet the evolving needs of our clients and the broader business environment.",
    "We are deeply invested in the growth and development of our people, and we are passionate about supporting each individual in realising and mastering their full potential. Our team members are given opportunities to gain broad exposure across a variety of business disciplines, while developing strong soft skills and a clear sense of ownership and responsibility.",
    "Integrity underpins everything we do, and we strive to uphold the highest professional and ethical standards at all times. We value a strong sense of collaboration and family within the firm, recognising that our people are our greatest asset and the foundation of our continued success.",
  ],
  // CHECK: source has typos ("polies", "continues training", "were a variety") — carried verbatim.
  benefits: [
    { title: "Family", body: "Togetherness is a happy feeling of closeness. SDK|CA Group is where co-workers become friends, who becomes family." },
    { title: "Open door policy", body: "We strive to be accessible to our employees to perform work as effectively and efficient as possible. Communication is the best way forward." },
    { title: "Study Leave", body: "We believe in the future of our employees. Study leave is granted according to the relevant SAICA/ SAIPA/CIMA etc manuals and polies." },
    { title: "Training", body: "We are committed to continues training and development through webinars, on-the-job training, events, recordings, internal structured training etc." },
    { title: "Medical Aid", body: "We are part of CAMAF (Chartered Aid Medical Aid Fund) which offers a variety of benefit option plans. You also get a free comprehensive health risk assessment per year." },
    { title: "Exposure", body: "We have a broad spectrum of clients were a variety of services are performed from 1st year level to senior level. You get to learn how to manage your own business/practice." },
  ],
  departments: [
    {
      name: "Accounting Department (SAIPA/CIMA/ACCA)",
      designations: ["Professional Accountant (SA)", "Chartered Global Management Accountant – CGMA", "Certified Accounting Technician"],
      scope: ["Monthly accounting", "Management accounting", "Management reports", "SARS calculations & submissions", "Preparation of Annual financial statements", "Valuations", "Cashflow forecasts", "Independent reviews"],
    },
    {
      name: "Audit Department (SAICA/IRBA/ACCA)",
      designations: ["Chartered Accountant (SA) – CA SA / Assistant General Accountant (SA) – AGA SA", "Chartered Certified Accountant; Certified Accounting Technician"],
      scope: ["Statutory & Non-statutory audits", "Agreed upon procedures", "SARS calculations & submissions", "Preparation of Annual financial statements", "Valuations", "Cashflow forecasts", "Independent reviews"],
    },
    {
      name: "Tax Department (SAIT)",
      designations: ["General Tax Practitioner; Tax Technician Practitioner"],
      scope: ["Submission of returns", "Taxpayer registrations", "Applications", "Ad hoc services", "Tax administration", "SARS appointments", "Advance tax planning and advice", "Other registrations", "Calculations"],
    },
  ],
  applyHref:
    "https://docs.google.com/forms/d/e/1FAIpQLScromgXaZ45zUNxsyvicAZwkzUGqwi8s3BHjmvDDSqZTZdBfw/viewform",
  vacanciesNote: "For current vacancies, please follow us on Facebook, LinkedIn and Instagram.",
} as const;

// SOURCE: news.html. The live page archives 100+ posts (2017 → Oct 2026), all hosted on dotnews.co.za.
// Only the five most recent are carried over for the stub; the rest stay linked from the live archive.
// CHECK: dotnews.co.za is a third-party newsletter host; client to confirm they want to keep linking out.
export const news = {
  heading: "News",
  tagline: "Accounting. Act. Count. Think.",
  disclaimer:
    "Receive important updates/news. Please note that this is purely news related directly from trusted sources. This is not marketing material.",
  recent: [
    { title: "SARS Scams and eFiling Profile Hijacking: Taxpayers Beware", month: "2026-10" },
    { title: "Cut Your Tax Bill: Rebates and Incentives Available This Tax Season", month: "2026-09" },
    { title: "Ensure Your Legacy is Protected This Wills Month", month: "2026-09" },
    { title: "Provisional Tax Time: First Payment for 2027 Tax Year Due 31 Aug", month: "2026-08" },
    { title: "2026 Tax Season Opens: Experience the Power of Done", month: "2026-07" },
  ],
  archiveHref: "https://www.sdkca.co.za/news.html",
  usefulLinks: [
    { label: "South African Revenue Services (SARS)", href: "http://www.sars.gov.za/Pages/default.aspx" },
    { label: "South African Institute of Chartered Accountants (SAICA)", href: "https://www.saica.co.za/Default.aspx" },
    { label: "Independent Regulatory Board of Auditors (IRBA)", href: "https://www.irba.co.za/" },
    { label: "Seta for the Financial Sector (FASSET)", href: "http://www.fasset.org.za/default" },
    { label: "Companies and Intellectual Property Commission (CIPC)", href: "http://www.cipc.co.za/za/" },
    { label: "South African Institute of Professional Accountants (SAIPA)", href: "https://www.saipa.co.za/" },
    { label: "Department of Trade and Industry", href: "http://www.dti.gov.za/" },
    { label: "South African Legislation", href: "https://www.acts.co.za/home" },
    // Omitted on purpose: "Financial Services Board" (link points to fsb.co.ca — dead/typo; body superseded by FSCA) and
    // "Department of Labour" (legacy URL). CHECK with client.
  ],
} as const;

// SOURCE: footer + news.html "Downloads"
// CHECK: the footer links the PAIA manual dated 10-02-2022 (SDK-PAIA-Manual-Updated-10-02-2022.pdf) while the news page
// links an older one (Final 29.06.21). Ask the client which is current; defaulting to the newer file.
export const legal = {
  paiaManual: {
    label: "PAIA & POPI Manual",
    href: "https://www.sdkca.co.za/downloads/SDK-PAIA-Manual-Updated-10-02-2022.pdf",
    olderVersionHref: "https://www.sdkca.co.za/downloads/SDK%20PAIA%20and%20POPIA%20Manual%20(Final%2029.06.21).pdf",
  },
  paiaForms: [
    {
      label: "Request for Access to Records (Form 2)",
      href: "https://www.sdkca.co.za/downloads/Form-2-PAIA%20(Request%20for%20Access%20to%20Records%20-%20Regulation%207).pdf",
    },
    {
      label: "Outcome of Request and of Fees Payable (Form 3)",
      href: "https://www.sdkca.co.za/downloads/Form-3-PAIA%20(Outome%20of%20request%20and%20of%20fees%20payable%20-%20Regulation%208).pdf",
    },
  ],
  downloads: [
    { label: "Tax Guide – SDK 2026-2027", href: "https://www.sdkca.co.za/downloads/SDKCA-2026-2027-Tax-Guide.pdf" },
    { label: "Covid19 Reliefs", href: "https://www.sdkca.co.za/downloads/Covid19-Reliefs.pdf" }, // CHECK: probably stale
    { label: "SARS Travel Logbook (2017-18)", href: "https://www.sdkca.co.za/downloads/2017-18-SARS-eLogbook.pdf" }, // CHECK: probably stale
  ],
  privacy: {
    label: "Website Privacy Statement",
    lastUpdated: "9 December 2021",
    informationOfficerEmail: "ficcompliance@sdkca.co.za",
    informationOfficerPhone: "021 970 4600",
    // CHECK: this is a SUMMARY of the live statement, not the verbatim legal text. Copy the full text across
    // from the live site (or have the client supply it) before launch. Do not paraphrase legal copy.
    summary: [
      "Covers visitors to the website and the information they voluntarily submit, such as names, email, phone numbers, ID numbers, company details, CVs and qualifications.",
      "Processing relies on contracts, legal obligations, legitimate interests, or consent.",
      "Information is generally not shared, except with service providers under service agreements, or when required by law or regulators, including SARS. It is not passed to third parties for their direct marketing.",
      "The site is not intended for anyone 18 or under.",
      "Cookies are limited to what is necessary for operation. The site does not use Google Analytics.",
      "Users can object to processing, withdraw consent and make requests; allow at least 30 days for a response.",
    ],
  },
} as const;

// SOURCE: footer
export const nav = [
  { label: "Home", href: "/" },
  { label: "Our Team", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Join our services", href: "/join" },
  { label: "Careers/Training", href: "/careers" },
  { label: "News", href: "/news" },
  { label: "Contact Us", href: "/contact" },
] as const;

/**
 * Hero scroll copy — three short cues over the scrubbed frames. Every line is lifted from published copy above
 * (no new claims). The CTA targets the existing introduction-meeting flow on /join.
 */
export const hero = {
  eyebrow: "Durbanville · Cape Town",
  headline: "Assurance, Accounting and Advisory.",
  cues: [
    { id: "intro", text: "Assurance, Accounting and Advisory." },
    { id: "trust", text: "Built on trust, long-term relationships and shared value." },
    { id: "cta", text: "Practical, forward-thinking advice for businesses and start-ups across a wide range of industries." },
  ],
  cta: { label: "Book an introduction meeting", href: "/join" },
  secondaryCta: { label: "Our services", href: "/services" },
} as const;

export type Service = (typeof services)[number];
export type Entity = (typeof entities)[number];
