"use client";

import { useEffect } from "react";

import { trackCustom, trackStandard } from "../track";
import { trackWhatsAppClick } from "@/lib/analytics";
import PenaltyCalculator from "./PenaltyCalculator";
import {
  getPageEventId,
  readCookie,
  readLead,
} from "@/lib/sars-session";

/**
 * Tracking for /sars and /sars/next-step. Every event goes to the SARS dataset
 * only. See ../TRACKING.md for the full list.
 *
 * The VSL milestones live in useWistiaMilestones, next to the video.
 */

/** FormViewed: the form is half on screen for the first time. */
export default function FormViewedTracker({ formId }: { formId: string }) {
  useEffect(() => {
    const form = document.getElementById(formId);
    if (!form) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        trackCustom("FormViewed");
        observer.disconnect();
      },
      { threshold: 0.5 },
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, [formId]);

  return null;
}

/** CalculatorUsed: the first time a visitor changes any calculator input. */
export function TrackedCalculator() {
  return <PenaltyCalculator onEngaged={() => trackCustom("CalculatorUsed")} />;
}

let contactSent = false;

/**
 * Contact: the WhatsApp button on the next-step page. Fires once, from the
 * browser and from the server, with one shared event id ("wa_" + the eid the
 * Lead event used) so Meta counts it once. Also sends the site's own GA event.
 */
export function trackWhatsAppContact() {
  trackWhatsAppClick({ location: "sars_next_step" });

  if (contactSent) return;
  contactSent = true;

  const eid =
    new URLSearchParams(window.location.search).get("eid") ?? getPageEventId();
  const eventId = `wa_${eid}`;

  trackStandard("Contact", {}, eventId);

  const lead = readLead();
  void fetch("/api/meta-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      pixel: "sars",
      event_name: "Contact",
      event_id: eventId,
      event_source_url: window.location.href,
      user_data: {
        email: lead.email,
        phone: lead.phone,
        name: lead.name,
        fbp: readCookie("_fbp"),
        fbc: readCookie("_fbc"),
      },
    }),
  }).catch(() => {
    // The browser event already fired. A failed mirror must not show.
  });
}
