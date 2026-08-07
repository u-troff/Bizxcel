# Task: Build the scroll-scrubbed video hero for BizXcel Kuils River

## Context
Next.js (App Router) + TypeScript, deployed on Vercel. Explore the repo first to confirm structure, styling approach (Tailwind vs CSS modules vs styled-components — match whatever's already there), and whether GSAP is already a dependency.

Design tokens already in use, keep all overlay text on-brand:
- Navy `#13293D`, Bronze `#B4813C`, Cream `#F7F4EE`
- Headings: Lora (serif) — Body: Inter (sans-serif)

## Goal
Replace the current static hero section (headline, subhead, stats bar, trust ticker, Wayne Du Toit card, CTA button) with a pinned, scroll-scrubbed video sequence built from an image-frame folder (extracted from the final Flow video via ezgif). As the user scrolls through the pinned section, the frame sequence advances AND specific pieces of the existing hero copy fade in/out at defined scroll-progress ranges, timed to match what's actually happening in the footage. Once the section finishes scrubbing, it unpins and the rest of the page (Services section onward) continues exactly as it does today — do not touch anything below the hero.

## Assets
Frame images will be at: `/public/scroll-hero/frames/`

Filenames from ezgif may be inconsistently padded. Do not assume a naming pattern — read the directory, sort frames in natural numeric order, and confirm the count.

**168 frames total** — this is a good count, no subsampling needed. Just confirm each frame is reasonably sized (ideally under ~150KB — if ezgif exported large originals, batch-resize/recompress with `sharp`, width ~1600–1920px, JPEG/WebP quality ~75, into `/public/scroll-hero/frames-optimized/` and use that folder instead). Report final folder size.

## Technical approach
- New client component, e.g. `components/ScrollVideoHero.tsx` (`'use client'`).
- Preload all frame images (`new Image()` objects, not `next/image`) with a lightweight loading state shown until enough frames are ready to start.
- A `<canvas>` sized to the viewport, drawing the current frame based on scroll progress.
- GSAP + ScrollTrigger `pin` for a scroll distance of roughly **1400–2000px** (168 frames × 8–12px each) as a starting point — tune from there for feel.
- On each ScrollTrigger update, map scroll progress (0–1) to a frame index and draw via `requestAnimationFrame` (never draw directly in the scroll callback).
- Overlay text blocks as absolutely-positioned elements, each with opacity/transform driven by its own sub-range of the same scroll progress. Use a single GSAP timeline scrubbed by the same ScrollTrigger so canvas and text never drift out of sync — one scroll listener, not two.

## Content-to-frame mapping
168 frames total, mapped from the source video's four segments:

| Segment | Frame range (of 168) | % of total | Content that fades in |
|---|---|---|---|
| Office entry (walking in past reception, arriving at the empty workstation) | 0–42 | 0–25% | Eyebrow "KUILS RIVER · CAPE TOWN" + headline "Clarity, compliance, and confidence for Cape Town's businesses." |
| Reviewing the ledger (hands open the black notebook, flip through pages) | 42–91 | 25–54% | Headline fades out; subhead fades in: "BizXcel Kuils River is a SAIPA-registered accounting practice and registered SARS Tax Practitioner, established in 2014, keeping businesses and individuals across the northern suburbs compliant, organised, and in control of their numbers." Stats bar counts in toward the end of this range: Practice established 2014 · Team members 9 · Member firm SAIPA · Registered tax practitioner SARS. |
| Data entry (typing, monitor shows Excel spreadsheet) | 91–138 | 54–82% | Trust ticker: "SAIPA Member Firm · Registered SARS Tax Practitioner · Established 2014 · 15+ Years' Experience", then "Good accounting is quiet. It's the reason nothing goes wrong." then How We Work steps flash by: "01 Book a free consultation · 02 We assess and plan · 03 You get clean, current numbers." |
| Submitting the form (monitor shows Consultation Request Form, hands typing name/email) | 138–168 | 82–100% | "No obligation, just a clear picture of where you stand with SARS." then the "Book a free consultation" button becomes active/clickable, linking to `/contact`. |

Keep the Wayne Du Toit card out of the threaded sequence — drop it back in as a normal element right after the pinned section releases, same as it appears today.

## Responsiveness & accessibility (required)
- Respect `prefers-reduced-motion: reduce`: skip the pin/scrub entirely, render the last frame as a static poster with all text stacked normally underneath.
- On small viewports, avoid full scroll-jacking pin behavior — it tends to feel broken on touch scroll. Fall back to either a shorter/lighter pin, or a simple looping muted autoplay `<video>` of the final stitched clip with text stacked normally on top, no scrubbing. Pick whichever fits the existing codebase better and note which you chose.
- Show a loading indicator until frames are sufficiently preloaded; never render a blank/broken canvas.

## Scope boundaries
- Only the hero section (headline through stats/trust bar/Wayne card) is replaced.
- Everything from Services downward stays exactly as it is today.
- Don't touch the real `/contact` page or the contact form — this hero CTA links/scrolls to it, doesn't replace it.

## When done
Report: folder size of the 168 frames, the final pin scroll-distance you landed on, and your mobile fallback choice.
