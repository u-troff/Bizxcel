"use client";

import Script from "next/script";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

import { ui } from "@/lib/sars-content";
import { getPageEventId } from "@/lib/sars-session";

/**
 * Tally embed, following Tally's documented pattern: render the iframe with
 * data-tally-src, load their embed.js, then call Tally.loadEmbeds() so
 * dynamicHeight resizing works.
 *
 * This is the conversion point of the page, so it must never be left waiting on
 * a third-party script. Two safety nets back the happy path: a timer that sets
 * the src directly if embed.js is slow or blocked, and a final check that does
 * the same if embed.js loaded but loadEmbeds() left the iframe without a src.
 *
 * Uses the /embed/ URL, not the /r/ standalone form URL. /r/ is the full-page
 * form, meant to be the whole document rather than a section of one.
 */
const FALLBACK_DELAY_MS = 2500;
const LAST_RESORT_DELAY_MS = 6000;

const tallySrc = (formId: string) =>
  `https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;

const HIDDEN_FIELD_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "fbclid",
] as const;

/**
 * Adds Tally hidden fields to the embed URL: the ad's UTM tags and fbclid from
 * the page URL, plus event_id so the Lead event can be tied back to the
 * submission. These only exist in the browser, so they are applied after mount.
 */
const withHiddenFields = (base: string) => {
  const url = new URL(base);
  const current = new URLSearchParams(window.location.search);
  HIDDEN_FIELD_PARAMS.forEach((key) => {
    const value = current.get(key);
    if (value) url.searchParams.set(key, value);
  });
  url.searchParams.set("event_id", getPageEventId());
  return url.toString();
};

export default function TallyEmbed({ formId }: { formId: string }) {
  const src = tallySrc(formId);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Runs before any passive effect, so the URL is final before embed.js (or the
  // fallback timer) points the iframe at it.
  useLayoutEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    iframe.dataset.tallySrc = withHiddenFields(src);
  }, [src]);

  /** Guarantees the iframe is actually pointed at the form. */
  const ensureSrc = useCallback(() => {
    const iframe = iframeRef.current;
    if (iframe && !iframe.getAttribute("src")) {
      iframe.src = iframe.dataset.tallySrc ?? src;
    }
  }, [src]);

  const loadEmbeds = useCallback(() => {
    if (typeof window.Tally !== "undefined") {
      window.Tally.loadEmbeds();
      // loadEmbeds() can no-op if Tally's own state is confused; verify rather
      // than assume, so a broken script cannot silently hide the form.
      window.setTimeout(ensureSrc, LAST_RESORT_DELAY_MS);
      return;
    }

    ensureSrc();
  }, [ensureSrc]);

  useEffect(() => {
    // Covers client-side navigation, where embed.js may already be loaded and
    // next/script will not fire onLoad again.
    if (typeof window.Tally !== "undefined") {
      loadEmbeds();
      return;
    }

    const timer = window.setTimeout(loadEmbeds, FALLBACK_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [loadEmbeds]);

  return (
    <>
      {/* min-height keeps the card from collapsing before dynamicHeight
          reports the real height, which would otherwise shift the page. */}
      <iframe
        ref={iframeRef}
        data-tally-src={src}
        loading="lazy"
        width="100%"
        height={600}
        marginHeight={0}
        marginWidth={0}
        title={ui.formTitle}
        className="min-h-[600px] w-full border-0 bg-transparent"
      />

      <Script
        id="tally-embed-js"
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onLoad={loadEmbeds}
        onError={loadEmbeds}
      />
    </>
  );
}
