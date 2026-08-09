import Image from "next/image";
import Link from "next/link";
import { Academy } from "@/components/home/Academy";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { Cta } from "@/components/shared/Cta";
import { Faq } from "@/components/shared/Faq";
import { VideoCard } from "@/components/shared/VideoCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { faqItems } from "@/data/faq";
import {
  featuredGuides,
  getGuidesByWorkflow,
  guideLandingFaq,
  guideWorkflowGroups,
  latestGuides,
  popularGuides,
  videoGuides,
  toArticleCard,
} from "@/data/guides";

export function GuidesLandingPage() {
  return (
    <>
      <section className="gradient-hero relative overflow-hidden pb-14 pt-10 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16">
        <div className="pointer-events-none absolute inset-0 opacity-[0.35] noise-overlay" />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-medium text-foreground">Legal Guides</li>
            </ol>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
            <div>
              <p className="text-sm font-medium tracking-wide text-accent">
                LawGPT Legal Guides
              </p>
              <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                Practical legal guides that lead into real workflows
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Long-form explainers for wrongful termination, consumer
                complaints, cheque bounce, FIR refusal, and drunk driving—written
                to educate first, then help you start the matching LawGPT
                workflow.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#featured" variant="primary">
                  Browse featured guides
                </Button>
                <Button href="/workflows" variant="secondary">
                  Explore workflows
                </Button>
              </div>
            </div>

            <Reveal>
              <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0b] shadow-xl ring-1 ring-black/10 sm:rounded-3xl">
                <div className="relative aspect-[4/3] sm:aspect-video">
                  <Image
                    src="/assets/workflows/cheque-bounce/legal-research.png"
                    alt="LawGPT legal research stage used across Legal Guides"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 520px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Relocated from homepage — category + featured guide preview strip */}
      <Academy showExploreCta={false} />

      <Section
        id="featured"
        className="gradient-section"
        eyebrow="Featured guides"
        title="Start with the guides people rely on most"
        description="Deep explainers that map a legal problem to documents, forums, timelines, and the LawGPT workflow that helps you act."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredGuides.map((guide, i) => (
            <Reveal key={guide.slug} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
              <ArticleCard article={toArticleCard(guide)} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Browse by workflow"
        title="Every guide connects to a launched LawGPT workflow"
        description="Pick the problem you are facing. Guides stay educational—workflows turn the same facts into filing-ready packages."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {guideWorkflowGroups.map((group, i) => {
            const count = getGuidesByWorkflow(group.slug).length;
            return (
              <Reveal key={group.slug} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
                <Link
                  href={group.href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] bg-[#0a0a0b]">
                    <Image
                      src={group.image}
                      alt={group.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="text-xs font-medium uppercase tracking-wider text-accent">
                      {count} guides
                    </p>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
                      {group.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {group.description}
                    </p>
                    <p className="mt-4 text-sm font-medium text-accent">
                      View workflow →
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section
        className="gradient-section"
        eyebrow="Latest guides"
        title="Recently published explainers"
        description="Fresh long-form guides across employment, consumer, commercial, and criminal-procedure topics."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {latestGuides.slice(0, 6).map((guide, i) => (
            <Reveal key={guide.slug} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
              <ArticleCard article={toArticleCard(guide)} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Popular guides"
        title="What readers open again and again"
        description="High-intent topics—complete guides, statutes, processes, and FAQs that answer the questions people search for."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {popularGuides.slice(0, 6).map((guide, i) => (
            <Reveal key={guide.slug} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
              <ArticleCard article={toArticleCard(guide)} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        className="gradient-section"
        eyebrow="Video guides"
        title="Watch the workflow, then read the guide"
        description="Embedded product videos stay on LawGPT—no YouTube detour. Pair a walkthrough with the matching long-form guide."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {videoGuides.map((guide, i) =>
            guide.video ? (
              <Reveal key={guide.slug} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
                <div className="space-y-4">
                  <VideoCard
                    video={{
                      id: guide.slug,
                      title: guide.video.title,
                      description: guide.excerpt,
                      duration: guide.video.durationLabel,
                      type: "walkthrough",
                      workflowSlug: guide.workflowSlug,
                      src: guide.video.src,
                      poster: guide.video.poster,
                      thumbnailLabel: guide.workflowTitle,
                    }}
                  />
                  <Link
                    href={`/academy/${guide.slug}`}
                    className="block text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                  >
                    Read the full guide →
                  </Link>
                </div>
              </Reveal>
            ) : null,
          )}
        </div>
      </Section>

      <Section
        id="faq"
        eyebrow="FAQ"
        title="Answers about LawGPT and Legal Guides"
        description="Product questions from the homepage, plus how guides relate to workflows, accuracy, and what to do next."
      >
        <Faq items={[...faqItems, ...guideLandingFaq]} />
      </Section>

      <Cta
        eyebrow="Ready to act on what you learned?"
        title="Turn a guide into a filing-ready LawGPT package"
        description="Pick the matching workflow, answer guided questions, generate lawyer-grade documents, and download everything in one place."
        primaryLabel="Explore Workflows →"
        primaryHref="/workflows"
        secondaryLabel="Explore Platform →"
        secondaryHref="/platform"
      />
      <div className="pb-16 text-center sm:pb-20">
        <Button href="/pricing" variant="outline">
          View Pricing →
        </Button>
      </div>
    </>
  );
}
