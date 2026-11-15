import type { Metadata } from "next";
import { Insights } from "@/components/sections/Insights";
import { CTABand } from "@/components/sections/CTABand";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Insights & Guidance for Cape Town Businesses",
  description:
    "Practical guidance on bookkeeping, payroll, SARS deadlines and business structure from BizXcel Kuils River.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Insights", path: "/insights" }])),
        }}
      />
      <Insights titleAs="h1" background="white" />
      <CTABand />
    </>
  );
}
