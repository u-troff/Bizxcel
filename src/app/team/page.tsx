import type { Metadata } from "next";
import { Team } from "@/components/sections/Team";
import { Leadership } from "@/components/sections/Leadership";
import { CTABand } from "@/components/sections/CTABand";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Meet the Team",
  description:
    "Meet the BizXcel Kuils River team behind your bookkeeping, payroll, financial statements and client administration.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <>
      <Team titleAs="h1" background="white" />
      <Leadership background="cream" />
      <CTABand />
    </>
  );
}
