"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { hero } from "@/lib/sars-content";

/**
 * Mobile-only bottom bar. Appears once the visitor has scrolled past the VSL
 * and disappears while the form is on screen.
 */
export default function StickyCta({
  vslId,
  formId,
}: {
  vslId: string;
  formId: string;
}) {
  const [pastVsl, setPastVsl] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const vsl = document.getElementById(vslId);
    const form = document.getElementById(formId);
    if (!vsl || !form) return;

    const vslObserver = new IntersectionObserver(([entry]) => {
      // Past the VSL means it has left the screen upwards, not that it has not
      // scrolled into view yet.
      setPastVsl(!entry.isIntersecting && entry.boundingClientRect.bottom < 0);
    });
    const formObserver = new IntersectionObserver(([entry]) => {
      setFormVisible(entry.isIntersecting);
    });

    vslObserver.observe(vsl);
    formObserver.observe(form);
    return () => {
      vslObserver.disconnect();
      formObserver.disconnect();
    };
  }, [vslId, formId]);

  const show = pastVsl && !formVisible;

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white px-4 py-3 transition-transform duration-200 motion-reduce:transition-none md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Button
        type="button"
        className="w-full py-4 text-base"
        onClick={() => {
          const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          document
            .getElementById(formId)
            ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
        }}
      >
        {hero.cta}
      </Button>
    </div>
  );
}
