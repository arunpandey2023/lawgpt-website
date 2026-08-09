import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/guides/GuideArticle";
import { GuideJsonLd } from "@/components/seo/GuideJsonLd";
import { getAllGuideSlugs, getGuideBySlug } from "@/data/guides";
import { buildPageMetadata } from "@/lib/seo";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  const base = buildPageMetadata({
    title: guide.seo.title,
    description: guide.seo.description,
    path: `/academy/${guide.slug}`,
    keywords: [...guide.seo.keywords],
    type: "article",
    ogImage: {
      url: guide.heroImage,
      alt: guide.heroImageAlt,
    },
    card: "summary_large_image",
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      publishedTime: guide.publishedAt,
      type: "article",
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  return (
    <>
      <GuideJsonLd guide={guide} />
      <GuideArticle guide={guide} />
    </>
  );
}
