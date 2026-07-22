import type { Metadata } from "next";
import { site } from "@/lib/content";

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
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: site.fullName,
    description: site.description,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    foundingDate: String(site.foundingYear),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location,
      addressRegion: "Western Cape",
      addressCountry: "ZA",
    },
    areaServed: site.areaServed.map((area) => ({
      "@type": "City",
      name: area,
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    memberOf: {
      "@type": "Organization",
      name: "South African Institute of Professional Accountants (SAIPA)",
    },
  };
}
