import type { Metadata } from "next";
import { FAQ } from "@/components/sections/FAQ";
import { CTABand } from "@/components/sections/CTABand";
import { buildPageMetadata, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { faqs } from "@/lib/content";

export const metadata: Metadata = buildPageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about SARS submissions, falling behind on tax, fees, and who BizXcel Kuils River works with.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "FAQ", path: "/faq" }])),
        }}
      />
      <FAQ titleAs="h1" background="cream" />
      <CTABand />
    </>
  );
}
