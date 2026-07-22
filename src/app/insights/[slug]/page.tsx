import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { insights, insightCategoryImages } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

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
    description: `${post.title} - guidance from BizXcel Kuils River.`,
    path: `/insights/${post.slug}`,
  });
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = insights.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <section className="bg-white">
      <Container className="max-w-3xl py-16 md:py-24">
        <Link href="/insights" className="text-sm font-semibold text-gold hover:text-gold-hover">
          ← Back to Insights
        </Link>
        <Eyebrow className="mt-8">{post.category}</Eyebrow>
        <h1 className="mt-3 text-[2rem] font-semibold leading-[1.15] text-ink md:text-[2.25rem]">
          {post.title}
        </h1>
        <div className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-[10px] border border-border">
          <Image
            src={insightCategoryImages[post.category]}
            alt={post.title}
            width={1600}
            height={900}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="mt-8 text-[1.05rem] leading-relaxed text-body">
          This article is coming soon. In the meantime, book a free consultation and we&apos;ll
          talk you through it directly.
        </p>
      </Container>
    </section>
  );
}
