import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-white">
      <Container className="flex flex-col items-center py-24 text-center md:py-32">
        <p className="font-serif text-6xl font-semibold text-gold">404</p>
        <h1 className="mt-4 text-[1.75rem] font-semibold text-ink md:text-[2rem]">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-3 max-w-md text-[1.05rem] leading-relaxed text-body">
          The page you&apos;re looking for may have moved or no longer exists. Here are some
          places to pick up from.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-[6px] border border-border px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-gold hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Button href="/contact" className="mt-8">
          Book a free consultation
        </Button>
      </Container>
    </section>
  );
}
