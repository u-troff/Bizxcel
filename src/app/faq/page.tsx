import type { Metadata } from "next";
import { FAQ } from "@/components/sections/FAQ";
import { CTABand } from "@/components/sections/CTABand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about SARS submissions, falling behind on tax, fees, and who BizXcel Kuils River works with.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <>
      <FAQ titleAs="h1" background="cream" />
      <CTABand />
    </>
  );
}
