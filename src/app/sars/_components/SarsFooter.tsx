import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { site } from "@/lib/content";
import { privacyNote, ui } from "@/lib/sars-content";

export default function SarsFooter({ stickyPad = false }: { stickyPad?: boolean }) {
  return (
    <footer className={`border-t border-border bg-cream ${stickyPad ? "pb-24 md:pb-0" : ""}`}>
      <Container className="grid gap-8 py-10 md:grid-cols-2 md:py-12">
        <div>
          <p className="font-serif text-xl font-bold text-ink">
            BizXcel <span className="text-gold">Kuils River</span>
          </p>
          <p className="mt-3 text-sm text-body">{ui.footerLine}</p>
        </div>
        <div className="text-sm text-body">
          <address className="not-italic leading-relaxed">
            {site.address.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>
      </Container>
      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.fullName}. All rights reserved.
          </p>
          <Link href="/privacy" className="underline underline-offset-2 hover:text-gold">
            {privacyNote.linkLabel}
          </Link>
        </Container>
      </div>
    </footer>
  );
}
