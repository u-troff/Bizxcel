import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/lib/content";

export function HowWeWork({
  titleAs = "h2",
  background = "white",
}: {
  titleAs?: "h1" | "h2";
  background?: "white" | "cream";
}) {
  return (
    <section id="how-we-work" className={background === "cream" ? "bg-cream" : "bg-white"}>
      <Container className="py-16 md:py-24">
        <SectionHeading eyebrow="HOW WE WORK" title="A clear path to compliance" as={titleAs} />
        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          {processSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 100}>
              <div className="border-t-2 border-gold pt-6">
                <span className="font-serif text-4xl font-semibold text-gold">{step.number}</span>
                <h3 className="mt-3 font-serif text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-body">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
