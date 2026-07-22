import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { site, leadership, team } from "@/lib/content";
import { getPersonPhoto } from "@/lib/team-photos";

const stats = [
  { value: String(site.foundingYear), label: "Practice established" },
  { value: String(team.length + 1), label: "Team members" },
  { value: "SAIPA", label: "Member firm" },
  { value: "SARS", label: "Registered tax practitioner" },
];

export function Hero({ titleAs = "h1" }: { titleAs?: "h1" | "h2" }) {
  const Title = titleAs;
  const photo = getPersonPhoto(leadership.name);

  return (
    <section className="bg-navy">
      <Container className="grid gap-12 pt-16 pb-24 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <Eyebrow>KUILS RIVER · CAPE TOWN</Eyebrow>
          <Title className="mt-4 max-w-xl text-[2.5rem] font-semibold leading-[1.12] text-white md:text-[3.25rem]">
            Clarity, compliance, and confidence for Cape Town&apos;s businesses.
          </Title>
          <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-on-navy">
            BizXcel Kuils River is a SAIPA-registered accounting practice and registered SARS
            Tax Practitioner, established in 2014, keeping businesses and individuals across
            the northern suburbs compliant, organised, and in control of their numbers.
          </p>

          <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-white/10 py-6 sm:grid-cols-4 sm:gap-x-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-serif text-2xl font-semibold text-white">{stat.value}</dd>
                <p className="mt-1 text-xs leading-snug text-on-navy/80">{stat.label}</p>
              </div>
            ))}
          </dl>

          <div className="mt-9">
            <Button href="/contact">Book a free consultation</Button>
            <p className="mt-3 text-sm text-on-navy/80">
              No obligation, just a clear picture of where you stand with SARS.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[10px] bg-gold aspect-[4/5] w-full lg:aspect-[5/6]">
            {photo && (
              <Image
                src={photo}
                alt={leadership.name}
                width={600}
                height={720}
                className="h-full w-full object-cover"
                priority
              />
            )}
          </div>
          <div className="relative mx-4 -mt-10 rounded-[10px] border border-border bg-white p-5 shadow-xl sm:absolute sm:inset-x-6 sm:bottom-6 sm:mx-0 sm:mt-0">
            <p className="font-serif text-base font-semibold text-ink">{leadership.name}</p>
            <p className="mt-0.5 text-sm text-gold">{leadership.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-body">
              {leadership.credentials.slice(0, 2).join(" · ")}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
