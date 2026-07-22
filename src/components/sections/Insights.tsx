import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { insights, insightCategoryImages } from "@/lib/content";

export function Insights({
  titleAs = "h2",
  background = "white",
}: {
  titleAs?: "h1" | "h2";
  background?: "white" | "cream";
}) {
  return (
    <section id="insights" className={background === "cream" ? "bg-cream" : "bg-white"}>
      <Container className="py-16 md:py-24">
        <SectionHeading
          eyebrow="INSIGHTS"
          title="Guidance for Cape Town businesses"
          as={titleAs}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {insights.map((post, index) => (
            <Reveal key={post.slug} delay={index * 80}>
              <Link href={`/insights/${post.slug}`} className="group block h-full">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-[10px] border border-border">
                  <Image
                    src={insightCategoryImages[post.category]}
                    alt={post.title}
                    width={940}
                    height={706}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-4 font-sans text-xs font-semibold uppercase tracking-[0.1em] text-gold">
                  {post.category}
                </p>
                <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-gold">
                  {post.title}
                </h3>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gold">
                  Read more <span aria-hidden>→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
