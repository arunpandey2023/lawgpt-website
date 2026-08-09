import Image from "next/image";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { Cta } from "@/components/shared/Cta";
import { Faq } from "@/components/shared/Faq";
import { StageExplorer } from "@/components/workflows/StageExplorer";
import { WorkflowHero } from "@/components/workflows/WorkflowHero";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { WorkflowPageData } from "@/types";

interface WorkflowLandingPageProps {
  page: WorkflowPageData;
}

export function WorkflowLandingPage({ page }: WorkflowLandingPageProps) {
  return (
    <>
      {/* 1. Hero with embedded 3-min tutorial */}
      <WorkflowHero page={page} />

      {/* 2. Problem overview */}
      <Section
        eyebrow={page.problem.eyebrow}
        title={page.problem.title}
        description={page.problem.description}
      >
        <div className="grid gap-5 md:grid-cols-3">
          {page.problem.points.map((point, i) => (
            <Reveal key={point.id} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
              <article className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-7">
                <span className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                  {i + 1}
                </span>
                <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground">
                  {point.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{point.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4. Why LawGPT */}
      <Section
        className="gradient-section"
        eyebrow={page.why.eyebrow}
        title={page.why.title}
        description={page.why.description}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {page.why.points.map((point, i) => (
            <Reveal key={point.id} delay={(Math.min((i % 2) + 1, 3) as 1 | 2 | 3)}>
              <article className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-7">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {point.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 5. Interactive workflow preview */}
      <Section
        id="preview"
        eyebrow={page.preview.eyebrow}
        title={page.preview.title}
        description={page.preview.description}
      >
        <Reveal>
          <StageExplorer stages={page.preview.stages} />
        </Reveal>
      </Section>

      {/* 6. Documents generated */}
      <Section
        className="gradient-section"
        eyebrow={page.documents.eyebrow}
        title={page.documents.title}
        description={page.documents.description}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {page.documents.items.map((doc, i) => (
            <Reveal key={doc.id} delay={(Math.min((i % 2) + 1, 3) as 1 | 2 | 3)}>
              <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                {doc.image && (
                  <div className="relative aspect-video bg-[#0a0a0b]">
                    <Image
                      src={doc.image}
                      alt={doc.imageAlt ?? doc.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 480px"
                      className="object-cover object-top"
                    />
                  </div>
                )}
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {doc.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {doc.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 7. Timeline */}
      <Section
        eyebrow={page.timeline.eyebrow}
        title={page.timeline.title}
        description={page.timeline.description}
        align="center"
      >
        <ol className="mx-auto max-w-2xl">
          {page.timeline.steps.map((step, i) => (
            <li key={step.id}>
              <Reveal delay={(Math.min(i, 3) as 0 | 1 | 2 | 3)}>
                <div className="relative flex gap-5 pb-8 sm:gap-6">
                  {i < page.timeline.steps.length - 1 && (
                    <span
                      className="absolute left-[19px] top-10 bottom-0 w-px bg-gradient-to-b from-accent/50 to-accent/10 sm:left-[21px]"
                      aria-hidden
                    />
                  )}
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white shadow-glow">
                    {step.step}
                  </span>
                  <div className="min-w-0 flex-1 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border">
                    {step.image && (
                      <div className="relative aspect-[2/1] bg-[#0a0a0b] sm:aspect-[2.4/1]">
                        <Image
                          src={step.image}
                          alt={step.imageAlt ?? step.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 560px"
                          className="object-cover object-top"
                        />
                      </div>
                    )}
                    <div className="p-5 sm:p-6">
                      <h3 className="text-lg font-semibold tracking-tight text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* 8. Authorities */}
      <Section
        className="gradient-section"
        eyebrow={page.authorities.eyebrow}
        title={page.authorities.title}
        description={page.authorities.description}
      >
        <div className="grid gap-5 md:grid-cols-3">
          {page.authorities.items.map((item, i) => (
            <Reveal key={item.id} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
              <article className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-7">
                <p className="text-xs font-medium uppercase tracking-wider text-accent">
                  Authority
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.role}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 9. Real screenshots */}
      <Section
        eyebrow={page.screenshots.eyebrow}
        title={page.screenshots.title}
        description={page.screenshots.description}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {page.screenshots.items.map((shot, i) => (
            <Reveal key={shot.id} delay={(Math.min(i % 3, 3) as 0 | 1 | 2 | 3)}>
              <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div className="relative aspect-video bg-[#0a0a0b]">
                  <Image
                    src={shot.image}
                    alt={shot.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-accent">
                    {shot.label}
                  </p>
                  <h3 className="mt-1 text-base font-semibold tracking-tight text-foreground">
                    {shot.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {shot.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 10. Walkthrough stages (video already shown at top) */}
      <Section
        id="walkthrough"
        className="gradient-section"
        eyebrow={page.walkthrough.eyebrow}
        title={page.walkthrough.title}
        description={page.walkthrough.description}
      >
        <Reveal>
          <StageExplorer stages={page.walkthrough.stages} />
        </Reveal>
      </Section>

      {/* 11. FAQ */}
      <Section
        id="faq"
        eyebrow="FAQ"
        title={`${page.hero.eyebrow.replace(" workflow", "")} questions`}
        description="Straight answers about this workflow before you start."
        align="center"
      >
        <Reveal className="mx-auto max-w-2xl">
          <Faq items={page.faq} />
        </Reveal>
      </Section>

      {/* 12. Related guides */}
      <Section
        className="gradient-section"
        eyebrow="Related legal guides"
        title="Continue in LawGPT Legal Guides"
        description="Practical guides that pair with this workflow—then return to the platform when you are ready to act."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {page.relatedGuides.map((guide, i) => (
            <Reveal key={guide.id} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
              <ArticleCard article={guide} />
            </Reveal>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/academy" variant="secondary">
            Explore Legal Guides →
          </Button>
          <Button href="/platform" variant="outline">
            Explore Platform →
          </Button>
          <Button href="/pricing" variant="outline">
            View Pricing →
          </Button>
        </div>
      </Section>

      {/* 13. Strong CTA */}
      <div id="start-workflow">
        <Cta
          eyebrow={page.cta.eyebrow}
          title={page.cta.title}
          description={page.cta.description}
          primaryLabel={page.cta.primaryLabel}
          primaryHref={page.cta.primaryHref}
          secondaryLabel={page.cta.secondaryLabel}
          secondaryHref={page.cta.secondaryHref}
        />
      </div>
    </>
  );
}
