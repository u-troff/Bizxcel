import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function WhyBizxcel({
  titleAs = "h2",
  background = "cream",
}: {
  titleAs?: "h1" | "h2";
  background?: "white" | "cream";
}) {
  return (
    <section id="why-bizxcel" className={background === "cream" ? "bg-cream" : "bg-white"}>
      <Container className="grid gap-10 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="WHY BIZXCEL"
            title="Why business owners trust us with their numbers"
            as={titleAs}
          />
        </Reveal>
        <Reveal delay={100}>
          <p className="text-[1.05rem] leading-relaxed text-body">
            Good accounting is quiet. It&apos;s the reason nothing goes wrong. For more than a
            decade we&apos;ve handled bookkeeping, payroll, financial statements and SARS
            submissions for businesses across the northern suburbs, and much of our work still
            comes by referral from clients who&apos;ve been with us for years. Our team is
            cross-trained across bookkeeping, payroll, financials and tax, so your work is
            never stuck with one person and there&apos;s always someone who knows your file. No
            jargon, no surprises, just clean, current numbers and clear next steps.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
