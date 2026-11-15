"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackClickToCall, trackEmailClick, trackWhatsAppClick } from "@/lib/analytics";

type Channel = "call" | "whatsapp" | "email";

const trackers: Record<Channel, (event: { location: string }) => void> = {
  call: trackClickToCall,
  whatsapp: trackWhatsAppClick,
  email: trackEmailClick,
};

/**
 * Drop-in replacement for `<a>` on tel:/wa.me/mailto: links that also fires the
 * matching GA4 event. `location` identifies where on the site the link lives
 * (e.g. "footer", "contact_section", "team_card") so events stay distinguishable.
 */
export function TrackedLink({
  channel,
  location,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  channel: Channel;
  location: string;
  children: ReactNode;
}) {
  return (
    <a {...props} onClick={() => trackers[channel]({ location })}>
      {children}
    </a>
  );
}
