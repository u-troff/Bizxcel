import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar, ServiceBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { WhyBizxcel } from "@/components/sections/WhyBizxcel";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { Leadership } from "@/components/sections/Leadership";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { Insights } from "@/components/sections/Insights";
import { FAQ } from "@/components/sections/FAQ";
import { CTABand } from "@/components/sections/CTABand";
import { Contact } from "@/components/sections/Contact";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Accountant & SARS Tax Practitioner in Kuils River, Cape Town",
  description:
    "BizXcel Kuils River is a SAIPA-registered accounting practice and registered SARS Tax Practitioner serving Kuils River, Kraaifontein, Brackenfell, Durbanville and Cape Town's northern suburbs since 2014.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <ServiceBar />
      <About />
      <WhyBizxcel />
      <HowWeWork />
      <Leadership />
      <Team />
      <Testimonials />
      <Insights />
      <FAQ />
      <CTABand />
      <Contact />
    </>
  );
}
