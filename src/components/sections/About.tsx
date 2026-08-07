import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export function About({
  titleAs = "h2",
  background = "white",
}: {
  titleAs?: "h1" | "h2";
  background?: "white" | "cream";
}) {
  const Title = titleAs;

  return (
    <section id="about" className={background === "cream" ? "bg-cream" : "bg-white"}>
      <Container className="grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <Eyebrow>ABOUT</Eyebrow>
          <Title className="mt-3 text-[2rem] font-semibold leading-[1.15] text-ink md:text-[2.25rem]">
            About BizXcel Kuils River
          </Title>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-body">
            Since 2014, BizXcel has helped small and medium businesses and individuals across
            Kuils River and Cape Town&apos;s northern suburbs keep their books accurate, their
            tax in order, and their SARS obligations met. As a SAIPA member firm and registered
            SARS Tax Practitioner, we pair proper accounting discipline with straight,
            practical advice, so you always know exactly where your business stands.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-[10px] border border-border">
            <Image
              src="/team/team3.jpeg"
              alt="The BizXcel Kuils River team together at a client golf day"
              width={1600}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
