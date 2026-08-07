import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { leadership, site, trustBadges } from "@/lib/content";
import { getPersonPhoto } from "@/lib/team-photos";

/**
 * Wayne's card, lifted out of the scrubbed hero sequence so it lands as a normal
 * element once the pinned section releases.
 */
export function LeadershipCard() {
  const photo = getPersonPhoto(leadership.name);

  return (
    <section className="bg-navy">
      <Container className="grid gap-12 py-16 md:py-20 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <Eyebrow>LEADERSHIP</Eyebrow>
          <p className="mt-3 font-serif text-[1.75rem] font-semibold leading-[1.15] text-white md:text-[2.25rem]">
            {leadership.name}, {leadership.title}
          </p>
          <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-on-navy">
            {leadership.bio}
          </p>

          <ul className="mt-7 grid max-w-xl gap-2.5 sm:grid-cols-2">
            {leadership.credentials.map((credential) => (
              <li
                key={credential}
                className="flex items-start gap-2.5 text-[0.95rem] text-on-navy"
              >
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span>{credential}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-white/10 pt-7">
            <ul className="flex flex-wrap gap-2.5">
              {trustBadges.map((badge) => (
                <li key={badge}>
                  <TrustBadge>{badge}</TrustBadge>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* No caption card here — the name, title and credentials all sit alongside. */}
        <div className="mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto">
          <div className="overflow-hidden rounded-[10px] bg-gold aspect-[4/5] w-full">
            {photo && (
              <Image
                src={photo}
                alt={`${leadership.name}, ${leadership.title} of ${site.fullName}`}
                width={600}
                height={720}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
