"use client";

import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";

/** Smooth-scrolls to an element on the page. Used for every CTA that leads to the form. */
export default function ScrollButton({
  targetId,
  children,
  className = "",
}: {
  targetId: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Button
      type="button"
      className={className}
      onClick={() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document
          .getElementById(targetId)
          ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      }}
    >
      {children}
    </Button>
  );
}
