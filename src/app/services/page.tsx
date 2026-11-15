import type { Metadata } from "next";
import { Services } from "@/components/sections/Services";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { CTABand } from "@/components/sections/CTABand";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Accounting, Tax & SARS Compliance Services",
  description:
    "Bookkeeping, payroll, SARS tax compliance, company registration and business advisory services from BizXcel Kuils River - serving Cape Town's northern suburbs since 2014.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Services", path: "/services" }])),
        }}
      />
      <Services titleAs="h1" background="cream" />
      <HowWeWork background="white" />
      <CTABand />
    </>
  );
}
