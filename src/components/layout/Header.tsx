"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { navLinks, socialLinks } from "@/lib/content";
import {
  ChatIcon,
  CloseIcon,
  FacebookIcon,
  GoogleIcon,
  InstagramIcon,
  LinkedInIcon,
  MenuIcon,
} from "@/components/icons";

const socialIconMap = {
  linkedin: LinkedInIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  google: GoogleIcon,
};

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-sm">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="font-serif text-xl font-bold text-ink" onClick={() => setMobileOpen(false)}>
          BizXcel <span className="text-gold">Kuils River</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-sans text-sm font-medium text-ink transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => {
              const Icon = socialIconMap[social.icon as keyof typeof socialIconMap];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} (opens in a new tab)`}
                  className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-border text-ink transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon />
                </a>
              );
            })}
            <button
              type="button"
              aria-label="Open chat"
              onClick={() => window.dispatchEvent(new Event("bizxcel:open-chat"))}
              className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-border text-ink transition-colors hover:border-gold hover:text-gold"
            >
              <ChatIcon />
            </button>
          </div>
          <Button href="/contact">Book a free consultation</Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-ink lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </Container>

      {mobileOpen && (
        <div id="mobile-menu" className="border-t border-border bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-[6px] px-2 py-3 font-sans text-sm font-medium text-ink transition-colors hover:bg-cream hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
            <Button href="/contact" className="mt-3 w-full">
              Book a free consultation
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
