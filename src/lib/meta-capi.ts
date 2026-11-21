import crypto from "node:crypto";

/**
 * Server-side Meta Conversions API helper for the /sars funnel. Names, emails
 * and phone numbers are hashed with SHA-256 here, on the server, before they
 * leave for Meta. Nothing is stored.
 */

/** SHA-256, lowercased and trimmed, as Meta expects. */
export function hashData(value: string): string {
  return crypto.createHash("sha256").update(value.toLowerCase().trim()).digest("hex");
}

/** First word of a name. Only the first name goes to Meta. */
export function firstNameOf(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? "";
}

/**
 * South African phone to Meta's format: digits only, country code first, no
 * leading zero. "082 123 4567", "+27 82 123 4567" and "27821234567" all become
 * "27821234567". Returns undefined when it cannot be a real number.
 */
export function normalizeZaPhone(phone: string): string | undefined {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("0")) digits = "27" + digits.slice(1);
  // 27 + 9 digits is a full SA number.
  return /^27\d{9}$/.test(digits) ? digits : undefined;
}

export interface CapiEvent {
  pixelId: string;
  accessToken: string;
  testEventCode?: string;
  eventName: string;
  /** Must equal the eventID the browser passed to fbq, or the event counts twice. */
  eventId: string;
  eventSourceUrl: string;
  clientIpAddress: string;
  clientUserAgent: string;
  firstName?: string;
  email?: string;
  /** Already normalised: digits, country code first. */
  phone?: string;
  fbp?: string;
  fbc?: string;
  customData?: Record<string, unknown>;
}

export async function sendCapiEvent(
  event: CapiEvent,
): Promise<{ success: boolean; error?: string }> {
  try {
    const payload = {
      data: [
        {
          event_name: event.eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: event.eventId,
          action_source: "website",
          event_source_url: event.eventSourceUrl,
          user_data: {
            em: event.email ? [hashData(event.email)] : undefined,
            ph: event.phone ? [hashData(event.phone)] : undefined,
            fn: event.firstName ? [hashData(event.firstName)] : undefined,
            client_ip_address: event.clientIpAddress,
            client_user_agent: event.clientUserAgent,
            fbp: event.fbp || undefined,
            fbc: event.fbc || undefined,
          },
          custom_data: event.customData,
        },
      ],
    };

    // Pinned to a supported Graph API version. Override without a code change.
    const apiVersion = process.env.META_GRAPH_API_VERSION || "v25.0";
    const url = new URL(
      `https://graph.facebook.com/${apiVersion}/${event.pixelId}/events`,
    );
    url.searchParams.append("access_token", event.accessToken);
    if (event.testEventCode) {
      url.searchParams.append("test_event_code", event.testEventCode);
    }

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result?.error?.message || "Unknown error" };
    }
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
