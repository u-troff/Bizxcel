import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Book Your Free Consultation",
  description:
    "Book a free, no-obligation consultation with BizXcel Kuils River - accounting, tax and SARS compliance for Cape Town's northern suburbs.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Contact titleAs="h1" background="white" />
      <FAQ background="cream" />
    </>
  );
}
