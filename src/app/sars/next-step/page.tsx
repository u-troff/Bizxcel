import type { Metadata } from "next";

import NextStepContent from "../_components/NextStepContent";
import SarsFooter from "../_components/SarsFooter";
import SarsHeader from "../_components/SarsHeader";

// Inherits noindex and the pixel from ../layout.tsx.
export const metadata: Metadata = {
  title: "Thanks | BizXcel Kuils River",
  alternates: { canonical: "/sars/next-step" },
};

export default function SarsNextStepPage() {
  return (
    <>
      <SarsHeader />
      <main id="main-content">
        <NextStepContent />
      </main>
      <SarsFooter />
    </>
  );
}
