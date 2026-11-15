"use client";

import { sendGAEvent } from "@next/third-parties/google";

type ContactFormEvent = {
  service?: string;
};

type ChannelClickEvent = {
  /** Where on the site the link was clicked, e.g. "header", "footer", "contact_section". */
  location: string;
};

/** Fires on successful contact form submission (src/components/sections/ContactForm.tsx). */
export function trackContactFormSubmit(event: ContactFormEvent = {}) {
  sendGAEvent("event", "contact_form_submit", event);
}

/** Fires when a tel: link is clicked. */
export function trackClickToCall(event: ChannelClickEvent) {
  sendGAEvent("event", "click_to_call", event);
}

/** Fires when a wa.me WhatsApp link is clicked. */
export function trackWhatsAppClick(event: ChannelClickEvent) {
  sendGAEvent("event", "whatsapp_click", event);
}

/** Fires when a mailto: link is clicked. */
export function trackEmailClick(event: ChannelClickEvent) {
  sendGAEvent("event", "email_click", event);
}
