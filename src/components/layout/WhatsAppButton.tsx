import { site } from "@/lib/content";
import { WhatsAppIcon } from "@/components/icons";
import { TrackedLink } from "@/components/ui/TrackedLink";

export function WhatsAppButton() {
  return (
    <TrackedLink
      channel="whatsapp"
      location="floating_button"
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-105 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
    >
      <WhatsAppIcon />
    </TrackedLink>
  );
}
