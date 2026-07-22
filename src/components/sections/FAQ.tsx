import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/lib/content";

export function FAQ({
  titleAs = "h2",
  background = "cream",
}: {
  titleAs?: "h1" | "h2";
  background?: "white" | "cream";
}) {
  return (
    <section id="faq" className={background === "cream" ? "bg-cream" : "bg-white"}>
      <Container className="py-16 md:py-24">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions we're often asked"
          as={titleAs}
          align="center"
        />
        <Reveal className="mx-auto mt-12 max-w-2xl">
          <Accordion items={faqs} />
        </Reveal>
      </Container>
    </section>
  );
}
