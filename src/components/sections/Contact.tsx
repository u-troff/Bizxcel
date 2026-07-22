import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { site } from "@/lib/content";

export function Contact({
  titleAs = "h2",
  background = "white",
}: {
  titleAs?: "h1" | "h2";
  background?: "white" | "cream";
}) {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "Kuils River, Cape Town"
  )}`;

  return (
    <section id="contact" className={background === "cream" ? "bg-cream" : "bg-white"}>
      <Container className="py-16 md:py-24">
        <SectionHeading eyebrow="CONTACT" title="Book your free consultation" as={titleAs} />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_minmax(0,360px)] lg:gap-16">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-[10px] border border-border bg-cream p-6 md:p-8">
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <p className="text-sm font-semibold text-ink">Address</p>
                    <p className="mt-1 text-sm text-body">{site.addressPlaceholder}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <p className="text-sm font-semibold text-ink">Phone</p>
                    <a href={site.phoneHref} className="mt-1 block text-sm text-body hover:text-gold">
                      {site.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <p className="text-sm font-semibold text-ink">Email</p>
                    <a
                      href={`mailto:${site.email}`}
                      className="mt-1 block text-sm text-body hover:text-gold"
                    >
                      {site.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <p className="text-sm font-semibold text-ink">Hours</p>
                    <p className="mt-1 text-sm text-body">{site.hours}</p>
                  </div>
                </li>
              </ul>

              <div className="mt-6 aspect-[16/9] w-full rounded-[8px] border border-border bg-[linear-gradient(135deg,var(--cream)_0%,#e4e9ee_100%)]" />
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-hover"
              >
                Open in Maps <span aria-hidden>→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
