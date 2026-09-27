import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CTABand() {
  return (
    <section id="cta" className="bg-navy">
      <Container className="grid gap-10 py-16 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-[10px] border border-border">
            <Image
              src="/team/team3.jpeg"
              alt="BizXcel team members at a SAIPA professional accountants event"
              width={1600}
              height={1067}
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="text-[2rem] font-semibold leading-[1.15] text-white md:text-[2.25rem]">
            Not sure where your business stands with SARS?
          </h2>
          <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-on-navy">
            Start with a free consultation. We&apos;ll give you a clear, honest picture, no
            obligation.
          </p>
          <Button href="/contact" className="mt-7">
            Book your free consultation
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
