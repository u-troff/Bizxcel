import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BulletList } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { serviceGroups } from "@/lib/content";

export function Services({
  titleAs = "h2",
  background = "cream",
}: {
  titleAs?: "h1" | "h2";
  background?: "white" | "cream";
}) {
  return (
    <section id="services" className={background === "cream" ? "bg-cream" : "bg-white"}>
      <Container className="py-16 md:py-24">
        <SectionHeading eyebrow="SERVICES" title="What we do" as={titleAs} />
        <div className="mt-12 space-y-16 md:space-y-20">
          {serviceGroups.map((group, index) => {
            const imageFirst = index % 2 === 1;
            return (
              <Reveal key={group.title} delay={index * 60}>
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
                  <div className={imageFirst ? "lg:order-2" : undefined}>
                    <h3 className="font-serif text-xl font-semibold text-ink md:text-2xl">
                      {group.title}
                    </h3>
                    <div className="mt-5">
                      <BulletList items={group.items} />
                    </div>
                  </div>
                  <div className={imageFirst ? "lg:order-1" : undefined}>
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-[10px] border border-border">
                      <Image
                        src={group.image}
                        alt={group.title}
                        width={940}
                        height={706}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
