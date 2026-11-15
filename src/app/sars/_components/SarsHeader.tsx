import { TrackedLink } from "@/components/ui/TrackedLink";
import { Container } from "@/components/ui/Container";
import { PhoneIcon } from "@/components/icons";
import { site } from "@/lib/content";
import { ui } from "@/lib/sars-content";

/** Slim bar: the BizXcel wordmark on the left, the phone number on the right. Nothing else. */
export default function SarsHeader() {
  return (
    <header className="border-b border-border bg-white">
      <Container className="flex h-14 items-center justify-between gap-3 sm:h-16">
        <p className="font-serif text-lg font-bold text-ink sm:text-xl">
          BizXcel <span className="text-gold">Kuils River</span>
        </p>
        <TrackedLink
          channel="call"
          location="sars_header"
          href={site.phoneHref}
          aria-label={`${ui.callLabel} ${site.phone}`}
          className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-ink transition-colors hover:text-gold"
        >
          <PhoneIcon className="h-4 w-4 text-gold" />
          {site.phone}
        </TrackedLink>
      </Container>
    </header>
  );
}
