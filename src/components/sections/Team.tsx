import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { PersonAvatar } from "@/components/ui/PersonAvatar";
import { Reveal } from "@/components/ui/Reveal";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { team } from "@/lib/content";
import { getPersonPhoto } from "@/lib/team-photos";

export function Team({
  titleAs = "h2",
  background = "white",
}: {
  titleAs?: "h1" | "h2";
  background?: "white" | "cream";
}) {
  const missingPhotos = team.some((member) => !getPersonPhoto(member.name));

  return (
    <section id="team" className={background === "cream" ? "bg-cream" : "bg-white"}>
      <Container className="py-16 md:py-24">
        <SectionHeading
          eyebrow="OUR TEAM"
          title="Meet the team behind your numbers"
          as={titleAs}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <Reveal key={member.name} delay={(index % 3) * 80}>
              <Card className="flex h-full flex-col items-start gap-4">
                <PersonAvatar name={member.name} />
                <div>
                  <h3 className="font-serif text-lg font-semibold text-ink">{member.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-gold">{member.role}</p>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-body">{member.blurb}</p>
                </div>
                <a
                  href={member.contact.href}
                  target={member.contact.label === "WhatsApp" ? "_blank" : undefined}
                  rel={member.contact.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-hover"
                >
                  {member.contact.label === "WhatsApp" ? (
                    <WhatsAppIcon className="h-4 w-4" />
                  ) : (
                    <PhoneIcon className="h-4 w-4" />
                  )}
                  {member.contact.label}: {member.contact.display}
                </a>
              </Card>
            </Reveal>
          ))}
        </div>
        {missingPhotos && (
          <p className="mt-6 text-sm text-muted">
            Placeholder photos shown until headshots are added.
          </p>
        )}
      </Container>
    </section>
  );
}
