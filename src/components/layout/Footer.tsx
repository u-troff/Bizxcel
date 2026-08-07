import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { navLinks, site, socialLinks } from "@/lib/content";
import {
  FacebookIcon,
  GoogleIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  ClockIcon,
  MapPinIcon,
} from "@/components/icons";

const socialIconMap = {
  linkedin: LinkedInIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  google: GoogleIcon,
};

export function Footer() {
  return (
    <footer className="bg-navy text-on-navy">
      <Container className="grid gap-12 py-16 md:grid-cols-2 md:py-24 lg:grid-cols-4">
        <div>
          <p className="font-serif text-xl font-bold text-white">
            BizXcel <span className="text-gold">Kuils River</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-on-navy">
            Accounting, tax and SARS compliance for businesses and individuals across Kuils
            River and Cape Town&apos;s northern suburbs.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {socialLinks.map((social) => {
              const Icon = socialIconMap[social.icon as keyof typeof socialIconMap];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} (opens in a new tab)`}
                  className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-white/25 text-white transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-gold">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm text-on-navy transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-gold">
            Contact
          </p>
          <ul className="mt-4 space-y-3 text-sm text-on-navy">
            <li className="flex items-start gap-2.5">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{site.addressPlaceholder}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <PhoneIcon className="h-4 w-4 shrink-0 text-gold" />
              <a href={site.phoneHref} className="hover:text-white">
                {site.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MailIcon className="h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <ClockIcon className="h-4 w-4 shrink-0 text-gold" />
              <span>{site.hours}</span>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-gold">
            Get started
          </p>
          <p className="mt-4 text-sm leading-relaxed text-on-navy">
            No obligation, just a clear picture of where you stand with SARS.
          </p>
          <Button href="/contact" className="mt-5">
            Book a free consultation
          </Button>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-on-navy/80 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 BizXcel Kuils River. All rights reserved.</p>
          <p>SAIPA Member · Registered SARS Tax Practitioner</p>
        </Container>
      </div>
    </footer>
  );
}
