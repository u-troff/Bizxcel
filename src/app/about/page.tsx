import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { WhyBizxcel } from "@/components/sections/WhyBizxcel";
import { Leadership } from "@/components/sections/Leadership";
import { CTABand } from "@/components/sections/CTABand";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About BizXcel Kuils River",
  description:
    "Established in 2014, BizXcel Kuils River is a SAIPA member firm and registered SARS Tax Practitioner serving small and medium businesses and individuals across Cape Town's northern suburbs.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "About", path: "/about" }])),
        }}
      />
      <About titleAs="h1" background="white" />
      <WhyBizxcel background="cream" />
      <Leadership background="white" />
      <CTABand />
    </>
  );
}
