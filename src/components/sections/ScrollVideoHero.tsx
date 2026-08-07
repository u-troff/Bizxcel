"use client";

import { useEffect, useRef, useState, type ReactNode, type Ref } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { processSteps, trustBadges } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

/**
 * Two pre-rendered frame sets (see scripts/optimize-frames.mjs). The sequence is cut
 * at frame 60, where the ledger is closed and set down. Phones get a half-rate set at
 * lower resolution and a much shorter pin, so touch scrolling never feels hijacked.
 */
const DESKTOP = { dir: "/scroll-hero/frames", count: 60, scroll: 1400 };
const MOBILE = { dir: "/scroll-hero/frames-mobile", count: 31, scroll: 800 };

const MOBILE_QUERY = "(max-width: 767px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** Frames that must be decoded before the sequence can start without showing holes. */
const MIN_FRAMES_TO_START = 24;

const framePath = (dir: string, index: number) =>
  `${dir}/frame-${String(index + 1).padStart(3, "0")}.webp`;

// Equal-length fades: each block starts fading in exactly as the previous starts
// fading out, so the two always cross and the hero is never left showing bare footage.
const FADE_IN = 0.05;
const FADE_OUT = 0.05;

/**
 * When each copy block starts fading in and out, in scroll-progress units, matched to
 * what the footage is doing. `from + FADE_IN` to `to` is the block's hold at full
 * opacity — keep that comfortably wider than the fades or the copy just flashes.
 *
 * Each `from` matches the previous block's `to`, which is what makes the handover a
 * crossfade. Breaking that pairing leaves a stretch of scroll with no copy on screen.
 *
 * `from: null` means the block is already visible in the markup and never fades in.
 */
const CUES: ReadonlyArray<{ name: string; from: number | null; to: number | null }> = [
  // Frames 1–15 — walking in past reception. Painted before any scrolling happens, so a
  // visitor landing on the page is greeted rather than facing a bare frame.
  { name: "intro", from: null, to: 0.25 },
  // Frames 18–33 — arriving at the workstation.
  { name: "subhead", from: 0.25, to: 0.55 },
  { name: "stats", from: 0.42, to: 0.55 },
  // Frames 33–47 — the ledger is picked up and opened.
  { name: "ticker", from: 0.55, to: 0.65 },
  { name: "quote", from: 0.65, to: 0.78 },
  // Frames 48–60 — the ledger is closed and set down. The CTA stays to the end.
  { name: "steps", from: 0.78, to: 0.88 },
  { name: "cta", from: 0.88, to: null },
];

type FrameSet = typeof DESKTOP;

/**
 * `staticHero` and `leadershipCard` arrive as slots because both read the filesystem
 * on the server; they must stay server-rendered rather than join this client bundle.
 */
export function ScrollVideoHero({
  staticHero,
  leadershipCard,
}: {
  staticHero: ReactNode;
  leadershipCard: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);
  const teamRef = useRef<HTMLSpanElement>(null);

  // Frame state lives in refs so scroll-rate updates never trigger a React render.
  const configRef = useRef<FrameSet | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const frameIndexRef = useRef(0);

  const [scrubbing, setScrubbing] = useState(false);
  // Stays at 0 under reduced motion, which is what keeps the loader hidden there.
  const [loadProgress, setLoadProgress] = useState(0);

  // Pass 1 — pick a frame set for this viewport and preload it.
  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

    const config = window.matchMedia(MOBILE_QUERY).matches ? MOBILE : DESKTOP;
    configRef.current = config;
    loadedRef.current = new Array(config.count).fill(false);
    imagesRef.current = [];

    let cancelled = false;
    let loadedCount = 0;

    const settle = (index: number, ok: boolean) => {
      if (cancelled) return;
      if (ok) loadedRef.current[index] = true;
      loadedCount += 1;
      setLoadProgress(loadedCount / config.count);
      if (loadedRef.current[0] && loadedCount >= MIN_FRAMES_TO_START) setScrubbing(true);
    };

    for (let index = 0; index < config.count; index += 1) {
      const image = new window.Image();
      image.decoding = "async";
      image.src = framePath(config.dir, index);
      // A dropped frame must not stall the loader — nearestLoaded() covers the gap.
      image.onload = () => settle(index, true);
      image.onerror = () => settle(index, false);
      imagesRef.current.push(image);
    }

    return () => {
      cancelled = true;
      imagesRef.current.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, []);

  // Pass 2 — the canvas is mounted at full size, so wire up drawing and the timeline.
  useEffect(() => {
    const config = configRef.current;
    if (!scrubbing || !config) return;

    let rafId = 0;

    /**
     * Scrubbing can outrun the network, so fall back to the closest frame that has
     * decoded rather than clearing the canvas.
     */
    const nearestLoaded = (index: number) => {
      const loaded = loadedRef.current;
      if (loaded[index]) return index;
      for (let offset = 1; offset < config.count; offset += 1) {
        if (loaded[index - offset]) return index - offset;
        if (loaded[index + offset]) return index + offset;
      }
      return -1;
    };

    const draw = () => {
      rafId = 0;
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (!canvas || !context) return;

      const source = nearestLoaded(frameIndexRef.current);
      if (source === -1) return;

      const image = imagesRef.current[source];
      const { width, height } = canvas;
      // Cover-fit: fill the viewport, cropping whichever axis overflows.
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      context.drawImage(
        image,
        (width - drawWidth) / 2,
        (height - drawHeight) / 2,
        drawWidth,
        drawHeight
      );
    };

    const scheduleDraw = () => {
      if (!rafId) rafId = requestAnimationFrame(draw);
    };

    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      draw();
    };

    resizeCanvas();

    // Late-arriving frames should replace whatever stand-in is currently painted.
    imagesRef.current.forEach((image, index) => {
      const previous = image.onload;
      image.onload = (event) => {
        (previous as ((e: Event) => void) | null)?.call(image, event as Event);
        if (index === frameIndexRef.current) scheduleDraw();
      };
    });

    const context = gsap.context(() => {
      const counters = { year: 2004, team: 0 };

      // One ScrollTrigger drives both the canvas and every text block, so the footage
      // and the copy can never drift apart.
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: `+=${config.scroll}`,
          pin: pinRef.current,
          pinSpacing: true,
          scrub: 0.4,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = Math.min(
              config.count - 1,
              Math.round(self.progress * (config.count - 1))
            );
            if (next !== frameIndexRef.current) {
              frameIndexRef.current = next;
              scheduleDraw();
            }
          },
        },
      });

      const block = (name: string) =>
        rootRef.current?.querySelector<HTMLElement>(`[data-block="${name}"]`) ?? null;

      // The timeline is normalised to a duration of 1, so every number below reads
      // directly as a fraction of scroll progress — and of the 168 frames.
      for (const cue of CUES) {
        // A null `from` block is already painted; adding a fromTo here would hide it,
        // because fromTo applies its "from" values immediately on creation.
        if (cue.from !== null) {
          timeline.fromTo(
            block(cue.name),
            { autoAlpha: 0, y: 26 },
            { autoAlpha: 1, y: 0, duration: FADE_IN },
            cue.from
          );
        }
        if (cue.to !== null) {
          timeline.to(block(cue.name), { autoAlpha: 0, y: -26, duration: FADE_OUT }, cue.to);
        }
      }

      // The stats tick up as the ledger pages turn. This has to land well before the
      // block starts fading at 0.55, or a reader who stops mid-scroll sees "2013 / 8".
      timeline.to(
        counters,
        {
          year: 2014,
          team: 9,
          duration: 0.06,
          snap: { year: 1, team: 1 },
          onUpdate: () => {
            if (yearRef.current) yearRef.current.textContent = String(Math.round(counters.year));
            if (teamRef.current) teamRef.current.textContent = String(Math.round(counters.team));
          },
        },
        0.43
      );

      // Pad out to exactly 1 so the positions above stay in progress units.
      timeline.set({}, {}, 1);
    }, rootRef);

    window.addEventListener("resize", resizeCanvas);
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (rafId) cancelAnimationFrame(rafId);
      context.revert();
    };
  }, [scrubbing]);

  return (
    <div ref={rootRef} className="relative">
      <div
        ref={pinRef}
        className={`relative w-full bg-navy ${scrubbing ? "h-svh overflow-hidden" : ""}`}
      >
        {scrubbing && (
          <>
            <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
            {/* Scrim: the footage is bright and the overlay copy is white. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/40"
            />
          </>
        )}

        {/*
          Reduced motion (and the moments before the frames land) get the closing frame
          as a still poster, with the hero copy stacked normally underneath.
        */}
        {!scrubbing && (
          <Image
            src="/scroll-hero/poster.webp"
            alt=""
            aria-hidden="true"
            width={1600}
            height={900}
            priority
            className="h-[38vh] w-full object-cover md:h-[52vh]"
          />
        )}

        {/*
          The static hero stays mounted for crawlers, no-JS and screen readers. Once
          scrubbing takes over it is hidden visually only, and the scrubbed copy becomes
          a decorative duplicate.
        */}
        <div className={scrubbing ? "sr-only" : undefined}>{staticHero}</div>

        {scrubbing && (
          <>
            <ScrubCopy yearRef={yearRef} teamRef={teamRef} />
            {/*
              The CTA sits outside the aria-hidden copy because it is a real link.
              autoAlpha keeps it visibility:hidden — and so untabbable — until revealed.
            */}
            <div
              data-block="cta"
              className="absolute inset-0 flex flex-col justify-center"
              style={{ opacity: 0, visibility: "hidden" }}
            >
              <Container>
                <p
                  aria-hidden="true"
                  className="max-w-xl font-serif text-[1.75rem] font-semibold leading-snug text-white md:text-[2.25rem]"
                >
                  No obligation, just a clear picture of where you stand with SARS.
                </p>
                <div className="mt-8">
                  <Button href="/contact">Book a free consultation</Button>
                </div>
              </Container>
            </div>
          </>
        )}

        {loadProgress > 0 && !scrubbing && (
          <div className="absolute inset-x-0 bottom-8 flex justify-center" aria-hidden="true">
            <div className="h-px w-40 overflow-hidden bg-white/20">
              <div
                className="h-full bg-gold transition-[width] duration-200"
                style={{ width: `${Math.round(loadProgress * 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Wayne's card sits outside the scrubbed sequence, right after the pin releases. */}
      {scrubbing && leadershipCard}
    </div>
  );
}

function ScrubCopy({
  yearRef,
  teamRef,
}: {
  yearRef: Ref<HTMLSpanElement>;
  teamRef: Ref<HTMLSpanElement>;
}) {
  const block = "absolute inset-0 flex flex-col justify-center";
  const hidden = { opacity: 0, visibility: "hidden" } as const;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/* No `hidden` style: this is the greeting, on screen before any scrolling. */}
      <div data-block="intro" className={block}>
        <Container>
          <Eyebrow>KUILS RIVER · CAPE TOWN</Eyebrow>
          <p className="mt-4 max-w-2xl font-serif text-[2.5rem] font-semibold leading-[1.12] text-white md:text-[3.5rem]">
            Clarity, compliance, and confidence for Cape Town&apos;s businesses.
          </p>
        </Container>
      </div>

      <div data-block="subhead" className={block} style={hidden}>
        <Container>
          <p className="max-w-2xl text-[1.15rem] leading-relaxed text-white md:text-[1.35rem]">
            BizXcel Kuils River is a SAIPA-registered accounting practice and registered SARS
            Tax Practitioner, established in 2014, keeping businesses and individuals across the
            northern suburbs compliant, organised, and in control of their numbers.
          </p>
        </Container>
      </div>

      {/* Sits high enough on phones to clear the fixed chat/WhatsApp buttons. */}
      <div data-block="stats" className="absolute inset-x-0 bottom-36 md:bottom-20" style={hidden}>
        <Container>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-y border-white/15 py-6 sm:grid-cols-4 sm:gap-x-4">
            <div>
              <dd className="font-serif text-2xl font-semibold text-white">
                <span ref={yearRef}>2014</span>
              </dd>
              <p className="mt-1 text-xs leading-snug text-on-navy/80">Practice established</p>
            </div>
            <div>
              <dd className="font-serif text-2xl font-semibold text-white">
                <span ref={teamRef}>9</span>
              </dd>
              <p className="mt-1 text-xs leading-snug text-on-navy/80">Team members</p>
            </div>
            <div>
              <dd className="font-serif text-2xl font-semibold text-white">SAIPA</dd>
              <p className="mt-1 text-xs leading-snug text-on-navy/80">Member firm</p>
            </div>
            <div>
              <dd className="font-serif text-2xl font-semibold text-white">SARS</dd>
              <p className="mt-1 text-xs leading-snug text-on-navy/80">
                Registered tax practitioner
              </p>
            </div>
          </dl>
        </Container>
      </div>

      <div data-block="ticker" className={block} style={hidden}>
        <Container>
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-gold md:text-base">
            {trustBadges.map((badge, index) => (
              <li key={badge} className="flex items-center gap-3">
                {index > 0 && <span className="text-white/30">·</span>}
                {badge}
              </li>
            ))}
          </ul>
        </Container>
      </div>

      <div data-block="quote" className={block} style={hidden}>
        <Container>
          <p className="max-w-2xl font-serif text-[1.75rem] font-semibold leading-snug text-white md:text-[2.5rem]">
            Good accounting is quiet. It&apos;s the reason nothing goes wrong.
          </p>
        </Container>
      </div>

      <div data-block="steps" className={block} style={hidden}>
        <Container>
          <ol className="grid gap-8 md:grid-cols-3 md:gap-6">
            {processSteps.map((step) => (
              <li key={step.number} className="border-t-2 border-gold pt-5">
                <span className="font-serif text-3xl font-semibold text-gold">{step.number}</span>
                <p className="mt-2 font-serif text-lg font-semibold text-white">{step.title}</p>
              </li>
            ))}
          </ol>
        </Container>
      </div>
    </div>
  );
}
