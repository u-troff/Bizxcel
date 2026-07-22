import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials({
  titleAs = "h2",
  background = "cream",
}: {
  titleAs?: "h1" | "h2";
  background?: "white" | "cream";
}) {
  return (
    <section id="testimonials" className={background === "cream" ? "bg-cream" : "bg-white"}>
      <Container className="flex flex-col gap-10 py-16 md:py-24 lg:flex-row lg:items-center lg:justify-between">
        <Reveal>
          <SectionHeading eyebrow="CLIENT FEEDBACK" title="What our clients say" as={titleAs} />
          <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-muted">
            Client reviews will appear here once published.
          </p>
        </Reveal>
        <Reveal delay={100} className="shrink-0">
          <div className="rounded-[10px] border border-border bg-white p-6 text-center shadow-[0_2px_16px_rgba(19,41,61,0.06)]">
            <p className="font-sans text-sm font-semibold text-ink">Reviewed on Google</p>
            <Button href="#" variant="secondary" className="mt-4">
              Leave us a Google review
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
