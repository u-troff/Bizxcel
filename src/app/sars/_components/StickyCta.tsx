"use client";

import { useEffect, useState } from "react";

import { hero } from "@/lib/sars-content";
import ApplyCta from "./ApplyCta";

/**
 * Bottom bar with the one button. Hidden while the hero button is on screen
 * or still below it, shown once the hero button has scrolled away upwards.
 */
export default function StickyCta({ heroCtaId }: { heroCtaId: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = document.getElementById(heroCtaId);
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      setShow(!entry.isIntersecting && entry.boundingClientRect.bottom < 0);
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [heroCtaId]);

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-200 motion-reduce:transition-none ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-md">
        <ApplyCta className="w-full py-4 text-base">{hero.cta}</ApplyCta>
      </div>
    </div>
  );
}
