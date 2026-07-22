import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { serviceBadges, trustBadges } from "@/lib/content";

function BadgeMarquee({
  items,
  variant,
}: {
  items: readonly string[];
  variant?: "solid" | "outline";
}) {
  return (
    <div className="mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div className="marquee-track flex w-max items-center gap-3">
        {[...items, ...items].map((badge, index) => (
          <TrustBadge key={`${badge}-${index}`} variant={variant}>
            {badge}
          </TrustBadge>
        ))}
      </div>
    </div>
  );
}

export function TrustBar() {
  return (
    <section className="bg-white">
      <Container className="py-16 text-center md:py-20">
        <Eyebrow>REGISTERED, CERTIFIED & COMPLIANT</Eyebrow>
      </Container>
      <BadgeMarquee items={trustBadges} />

      <div className="pb-16 md:pb-20" />
    </section>
  );
}

export function ServiceBar() {
  return (<>
    <section className="bg-white">
      <div className="mt-12 border-t border-border pt-10">

        <Container className="text-center">
          <div className="mt-12 border-t border-border pt-10">
            <Eyebrow>SERVICES WE OFFER</Eyebrow>
          </div>
        </Container>
        <BadgeMarquee items={serviceBadges} variant="outline" />


      </div>

    </section>
  </>)
}
