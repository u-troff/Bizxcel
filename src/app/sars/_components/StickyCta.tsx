"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { hero } from "@/lib/sars-content";

/**
 * Bottom bar with the one button. It appears once the video has scrolled out
 * of view upwards, hides while the form is on screen, and scrolls to the form.
 */
export default function StickyCta({ vslId, formId }: { vslId: string; formId: string }) {
  const [pastVsl, setPastVsl] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const vsl = document.getElementById(vslId);
    const form = document.getElementById(formId);
    if (!vsl || !form) return;

    const vslObserver = new IntersectionObserver(([entry]) => {
      // Past the video means it has left the screen upwards, not that it has
      // not scrolled into view yet.
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
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-200 motion-reduce:transition-none ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-md">
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
    </div>
  );
}
