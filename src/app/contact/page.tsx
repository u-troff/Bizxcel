import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact & Book a Free Consultation",
  description:
    "Book a free, no-obligation consultation with BizXcel Kuils River - accounting, tax and SARS compliance for Cape Town's northern suburbs.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Contact", path: "/contact" }])),
        }}
      />
      <Contact titleAs="h1" background="white" />
      <FAQ background="cream" />
    </>
  );
}
