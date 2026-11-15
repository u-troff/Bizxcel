import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { insights, insightCategoryImages, type InsightBlock } from "@/lib/content";
import { buildPageMetadata, breadcrumbJsonLd, articleJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return insights.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = insights.find((item) => item.slug === slug);
  if (!post) return {};

  return buildPageMetadata({
    title: post.title,
    description: post.summary,
    path: `/insights/${post.slug}`,
  });
}

function Block({ block }: { block: InsightBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-10 font-serif text-xl font-semibold text-ink md:text-2xl">
          {block.text}
        </h2>
      );
    case "p":
      return <p className="mt-4 text-[1.05rem] leading-relaxed text-body">{block.text}</p>;
    case "ul":
      return (
        <ul className="mt-4 space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[1.05rem] leading-relaxed text-body">
              <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <p className="mt-8 rounded-[10px] border border-border bg-cream p-5 text-[0.98rem] leading-relaxed text-ink">
          {block.text}
        </p>
      );
  }
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = insights.find((item) => item.slug === slug);
  if (!post) notFound();

  const image = insightCategoryImages[post.category];

  return (
    <section className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              title: post.title,
              description: post.summary,
              path: `/insights/${post.slug}`,
              image,
              datePublished: post.publishedAt,
              dateModified: post.updatedAt,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Insights", path: "/insights" },
              { name: post.title, path: `/insights/${post.slug}` },
            ])
          ),
        }}
      />
      <Container className="max-w-3xl py-16 md:py-24">
        <Link href="/insights" className="text-sm font-semibold text-gold hover:text-gold-hover">
          ← Back to Insights
        </Link>

        {post.draft && (
          <p className="mt-6 rounded-[8px] border border-amber-300 bg-amber-50 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-amber-800">
            Draft — pending review, not yet confirmed by BizXcel
          </p>
        )}

        <Eyebrow className="mt-6">{post.category}</Eyebrow>
        <h1 className="mt-3 text-[2rem] font-semibold leading-[1.15] text-ink md:text-[2.25rem]">
          {post.title}
        </h1>
        <p className="mt-5 text-[1.1rem] leading-relaxed text-body">{post.summary}</p>

        <div className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-[10px] border border-border">
          <Image
            src={image}
            alt={post.title}
            width={1600}
            height={900}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-2">
          {post.body.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </div>
      </Container>
    </section>
  );
}
