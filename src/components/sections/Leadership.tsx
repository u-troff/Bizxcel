import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Reveal } from "@/components/ui/Reveal";
import { leadership } from "@/lib/content";
import { getPersonPhoto } from "@/lib/team-photos";

export function Leadership({
  titleAs = "h2",
  background = "cream",
}: {
  titleAs?: "h1" | "h2";
  background?: "white" | "cream";
}) {
  const Title = titleAs;
  const photo = getPersonPhoto(leadership.name);

  return (
    <section id="leadership" className={background === "cream" ? "bg-cream" : "bg-white"}>
      <Container className="grid gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-start lg:gap-16">
        <Reveal>
          {photo ? (
            <Image
              src={photo}
              alt={leadership.name}
              width={480}
              height={600}
              className="aspect-[4/5] w-full max-w-sm rounded-[10px] border border-border object-cover"
            />
          ) : (
            <PlaceholderImage
              caption={`Add headshot: ${leadership.name}`}
              className="aspect-[4/5] w-full max-w-sm"
            />
          )}
        </Reveal>
        <Reveal delay={100}>
          <Eyebrow>LEADERSHIP</Eyebrow>
          <Title className="mt-3 text-[2rem] font-semibold leading-[1.15] text-ink md:text-[2.25rem]">
            Meet {leadership.name}, {leadership.title}
          </Title>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-body">
            {leadership.bio}
          </p>
          <ul className="mt-6 grid max-w-xl gap-2.5 sm:grid-cols-2">
            {leadership.credentials.map((credential) => (
              <li key={credential} className="flex items-start gap-2.5 text-[0.95rem] text-body">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span>{credential}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
