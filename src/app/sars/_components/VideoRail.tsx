"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { loadWistia } from "@/lib/wistia";
import { ui, type Testimonial } from "@/lib/sars-content";

/**
 * Video testimonials in one row that scrolls sideways: swipe on a phone, arrow
 * buttons on larger screens. Click-to-load only: nothing from Wistia is fetched
 * until someone taps a card. Items whose videoId starts with TODO are hidden, and
 * with none ready the whole rail renders nothing.
 */
export default function VideoRail({ videos }: { videos: Testimonial[] }) {
  const ready = videos.filter((v) => !v.videoId.startsWith("TODO"));
  const railRef = useRef<HTMLUListElement>(null);
  const [canBack, setCanBack] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    setCanBack(rail.scrollLeft > 8);
    setCanNext(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    update();
    rail.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      rail.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update, ready.length]);

  const scrollBy = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollBy({
      left: direction * rail.clientWidth * 0.8,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  if (ready.length === 0) return null;

  const arrow =
    "absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white text-ink shadow-md transition-opacity disabled:pointer-events-none disabled:opacity-0 sm:flex";

  return (
    <div className="relative">
      <ul
        ref={railRef}
        aria-label={ui.testimonialsLabel}
        className="flex snap-x snap-mandatory items-center gap-4 overflow-x-auto px-5 pb-4 pt-2 [scrollbar-width:none] sm:gap-5 sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {ready.map((t) => (
          <li
            key={t.videoId}
            className={`shrink-0 snap-center ${
              t.portrait
                ? "h-[400px] w-[225px] sm:h-[420px] sm:w-[236px]"
                : "h-[calc(85vw*9/16)] w-[85vw] sm:h-[420px] sm:w-[747px]"
            }`}
          >
            <TestimonialCard testimonial={t} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => scrollBy(-1)}
        disabled={!canBack}
        aria-label={ui.railBack}
        className={`${arrow} left-2`}
      >
        <Chevron direction="left" />
      </button>
      <button
        type="button"
        onClick={() => scrollBy(1)}
        disabled={!canNext}
        aria-label={ui.railNext}
        className={`${arrow} right-2`}
      >
        <Chevron direction="right" />
      </button>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [playing, setPlaying] = useState(false);
  const { videoId, label, duration, poster, portrait } = testimonial;

  useEffect(() => {
    if (playing) loadWistia(videoId);
  }, [playing, videoId]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[10px] border border-border bg-navy">
      {playing ? (
        <wistia-player
          media-id={videoId}
          aspect={String(portrait ? 9 / 16 : 16 / 9)}
          autoplay="true"
          style={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%" }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`${ui.playTestimonial}: ${label}`}
          className={`group absolute inset-0 ${
            poster ? "" : "flex flex-col items-center justify-end gap-3 p-4 text-left"
          }`}
          style={
            poster
              ? { backgroundImage: `url(${poster})`, backgroundSize: "cover", backgroundPosition: "center" }
              : undefined
          }
        >
          {poster ? (
            // The thumbnail is already a designed card, so keep the text off it:
            // a small play button in the corner and the length at the top.
            <>
              <span className="absolute right-3 top-3 rounded-full bg-navy/85 px-2.5 py-1 font-sans text-xs font-semibold text-white">
                {duration}
              </span>
              <span className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-white shadow-md transition-colors group-hover:bg-gold-hover">
                <PlayIcon />
              </span>
            </>
          ) : (
            <>
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-white transition-colors group-hover:bg-gold-hover">
                <PlayIcon />
              </span>
              <span className="w-full font-sans text-sm font-medium text-white">
                {label}
                <span className="block text-xs text-on-navy">{duration}</span>
              </span>
            </>
          )}
        </button>
      )}
    </div>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7L8 5Z" />
    </svg>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  );
}
