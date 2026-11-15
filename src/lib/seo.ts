import type { Metadata } from "next";
import { site, socialLinks } from "@/lib/content";

/** Square brand mark, used as the default social-share image and schema logo. */
const logoUrl = new URL("/images/logo.png", site.url).toString();
const logoDimensions = { width: 640, height: 640 };

export function buildPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = new URL(path, site.url).toString();
  const fullTitle = path === "/" ? title : `${title} | ${site.fullName}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.fullName,
      locale: "en_ZA",
      type: "website",
      images: [{ url: logoUrl, ...logoDimensions, alt: `${site.fullName} logo` }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [logoUrl],
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": `${site.url}/#organization`,
    name: site.fullName,
    description: site.description,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    logo: logoUrl,
    image: logoUrl,
    foundingDate: String(site.foundingYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: site.areaServed.map((area) => ({
      "@type": "City",
      name: area,
    })),
    // Matches site.hours exactly (Mon–Thu 08:00–16:30, Fri 07:30–15:00) — keep both
    // in sync if trading hours change.
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "16:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday"],
        opens: "07:30",
        closes: "15:00",
      },
    ],
    memberOf: {
      "@type": "Organization",
      name: "South African Institute of Professional Accountants (SAIPA)",
    },
    // Links the site to the practice's verified social and Google Business profiles.
    sameAs: socialLinks.map((social) => social.href),
  };
}

export type BreadcrumbItem = { name: string; path: string };

/** `items` excludes "Home" — it's prepended automatically. */
export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  const allItems: BreadcrumbItem[] = [{ name: "Home", path: "/" }, ...items];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, site.url).toString(),
    })),
  };
}

export function faqPageJsonLd(faqs: ReadonlyArray<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleJsonLd({
  title,
  description,
  path,
  image,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  dateModified: string;
}) {
  const url = new URL(path, site.url).toString();

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: new URL(image, site.url).toString(),
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: site.fullName,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.fullName,
      logo: { "@type": "ImageObject", url: logoUrl, ...logoDimensions },
    },
  };
}
