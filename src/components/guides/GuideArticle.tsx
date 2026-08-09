import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { Cta } from "@/components/shared/Cta";
import { Faq } from "@/components/shared/Faq";
import { GuideBody } from "@/components/guides/GuideBody";
import { InlineVideo } from "@/components/shared/InlineVideo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { getRelatedGuides } from "@/data/guides";
import type { LegalGuide } from "@/types/guide";

interface GuideArticleProps {
  guide: LegalGuide;
}

export function GuideArticle({ guide }: GuideArticleProps) {
  const related = getRelatedGuides(guide);

  return (
    <>
      <article>
        <header className="gradient-hero border-b border-border pb-12 pt-10 sm:pb-14 sm:pt-14">
          <Container>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
                <li>
                  <Link href="/" className="transition-colors hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link
                    href="/academy"
                    className="transition-colors hover:text-foreground"
                  >
                    Legal Guides
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-medium text-foreground line-clamp-1">
                  {guide.title}
                </li>
              </ol>
            </nav>

            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-12">
              <div>
                <p className="text-sm font-medium tracking-wide text-accent">
                  {guide.category}
                </p>
                <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                  {guide.title}
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                  {guide.excerpt}
                </p>
                <div className="mt-5 flex flex-wrap gap-3 text-sm text-muted">
                  <span>{guide.readTime} read</span>
                  <span aria-hidden>·</span>
                  <Link
                    href={guide.workflowHref}
                    className="font-medium text-accent transition-colors hover:text-accent-hover"
                  >
                    {guide.workflowTitle} workflow
                  </Link>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0b] shadow-lg ring-1 ring-black/10 sm:rounded-3xl">
                <div className="relative aspect-video">
                  <Image
                    src={guide.heroImage}
                    alt={guide.heroImageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 520px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </Container>
        </header>

        <Container className="py-12 sm:py-16">
          <div className="mx-auto max-w-3xl">
            {guide.video && (
              <div className="mb-10">
                <InlineVideo
                  src={guide.video.src}
                  poster={guide.video.poster}
                  title={guide.video.title}
                />
                <p className="mt-3 text-sm text-muted">
                  {guide.video.title} · {guide.video.durationLabel} · plays inside
                  LawGPT
                </p>
              </div>
            )}

            <GuideBody sections={guide.sections} />

            {guide.gallery && guide.gallery.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-5 text-2xl font-semibold tracking-tight text-foreground">
                  Inside the LawGPT workflow
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {guide.gallery.map((item) => (
                    <figure
                      key={item.src + item.alt}
                      className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border"
                    >
                      <div className="relative aspect-video bg-[#0a0a0b]">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 360px"
                          className="object-cover object-top"
                        />
                      </div>
                      {item.caption && (
                        <figcaption className="px-4 py-3 text-sm text-muted">
                          {item.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {guide.faq.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-5 text-2xl font-semibold tracking-tight text-foreground">
                  Frequently asked questions
                </h2>
                <Faq items={guide.faq} />
              </div>
            )}
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <Section
          className="gradient-section"
          eyebrow="Related guides"
          title="Keep learning"
          description="Practical guides that pair with this topic and the same LawGPT workflow."
        >
          <div className="grid gap-5 md:grid-cols-3">
            {related.slice(0, 5).map((item, i) => (
              <Reveal key={item.slug} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
                <ArticleCard
                  article={{
                    id: item.slug,
                    slug: item.slug,
                    title: item.title,
                    excerpt: item.excerpt,
                    category: item.category,
                    readTime: item.readTime,
                    href: `/academy/${item.slug}`,
                  }}
                />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section
        align="center"
        eyebrow="Next steps"
        title="Continue into the product"
        description="Pair this guide with the matching workflow, explore the platform, or review pricing."
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href={guide.workflowHref}>
            {guide.workflowTitle} workflow →
          </Button>
          <Button href="/platform" variant="secondary">
            Explore Platform →
          </Button>
          <Button href="/pricing" variant="outline">
            View Pricing →
          </Button>
          <Button href="/academy" variant="outline">
            Related guides →
          </Button>
        </div>
      </Section>

      <Cta
        eyebrow="Ready to solve this problem?"
        title={`Start the ${guide.workflowTitle} workflow`}
        description="Answer guided questions, generate lawyer-grade documents, and download a filing-ready package inside LawGPT."
        primaryLabel={`Start ${guide.workflowTitle}`}
        primaryHref={guide.workflowHref}
        secondaryLabel="Browse all guides"
        secondaryHref="/academy"
      />
    </>
  );
}
