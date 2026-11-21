import type { Metadata } from "next";

import { applyUi } from "@/lib/sars-content";
import SarsHeader from "../_components/SarsHeader";
import ApplyFlowLoader from "./ApplyFlowLoader";

// Inherits noindex and the pixel from ../layout.tsx.
export const metadata: Metadata = {
  title: applyUi.pageTitle,
  alternates: { canonical: "/sars/apply" },
};

export default function SarsApplyPage() {
  return (
    <>
      <SarsHeader />
      <main id="main-content" className="bg-white">
        <ApplyFlowLoader />
      </main>
    </>
  );
}
