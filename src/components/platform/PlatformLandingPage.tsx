import Image from "next/image";
import Link from "next/link";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PlatformCapabilities } from "@/components/home/PlatformCapabilities";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { VideoCenter } from "@/components/home/VideoCenter";
import { Cta } from "@/components/shared/Cta";
import { Faq } from "@/components/shared/Faq";
import { StageExplorer } from "@/components/workflows/StageExplorer";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { platformPage } from "@/data/platform";
import { cn } from "@/lib/utils";

function CellValue({
  value,
  emphasize,
}: {
  value: boolean | string;
  emphasize?: boolean;
}) {
  if (typeof value === "string") {
    return (
      <span
        className={cn(
          "text-sm",
          emphasize ? "font-medium text-foreground" : "text-muted",
        )}
      >
        {value}
      </span>
    );
  }
  if (value) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft text-accent">
        <svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden
        >
          <path
            d="M5 13l4 4L19 7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function PlatformLandingPage() {
  const page = platformPage;

  return (
    <>
      {/* 1. Hero */}
      <section className="gradient-hero relative overflow-hidden pb-12 pt-10 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16">
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
              <li className="font-medium text-foreground">Platform</li>
            </ol>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
            <div>
              <p className="animate-fade-up text-sm font-medium tracking-wide text-accent">
                {page.hero.eyebrow}
              </p>
              <h1 className="animate-fade-up mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl lg:leading-[1.1]">
                {page.hero.title}
              </h1>
              <p className="animate-fade-up mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                {page.hero.description}
              </p>
              <div className="animate-fade-up mt-8 flex flex-wrap gap-3">
                <Button href={page.hero.primaryCta.href} size="lg">
                  {page.hero.primaryCta.label}
                </Button>
                <Button href={page.hero.secondaryCta.href} variant="secondary" size="lg">
                  {page.hero.secondaryCta.label}
                </Button>
              </div>
            </div>

            <div className="animate-fade-up relative">
              <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-b from-accent/15 via-accent/5 to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0b] shadow-lg ring-1 ring-black/10 sm:rounded-3xl">
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <div className="ml-3 flex-1 truncate rounded-md bg-white/5 px-3 py-1.5 text-xs text-white/50 ring-1 ring-white/10">
                    app.lawgptapp.com · Case Workspace
                  </div>
                </div>
                <div className="relative aspect-[16/10] sm:aspect-video">
                  <Image
                    src={page.hero.image}
                    alt={page.hero.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Relocated from homepage — operational how-it-works sequence */}
      <HowItWorks />

      {/* 2. The Legal Journey */}
      <Section
        id="journey"
        className="gradient-section"
        eyebrow={page.journey.eyebrow}
        title={page.journey.title}
        description={page.journey.description}
        align="center"
      >
        <ol className="mx-auto max-w-2xl">
          {page.journey.steps.map((step, i) => (
            <li key={step.id}>
              <Reveal delay={(Math.min(i, 3) as 0 | 1 | 2 | 3)}>
                <div className="relative flex gap-5 pb-8 sm:gap-6">
                  {i < page.journey.steps.length - 1 && (
                    <span
                      className="absolute left-[19px] top-10 bottom-0 w-px bg-gradient-to-b from-accent/50 to-accent/10 sm:left-[21px]"
                      aria-hidden
                    />
                  )}
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white shadow-glow">
                    {step.step}
                  </span>
                  <div className="min-w-0 flex-1 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* 3. Interactive Platform Explorer */}
      <Section
        id="explorer"
        eyebrow={page.explorer.eyebrow}
        title={page.explorer.title}
        description={page.explorer.description}
      >
        <Reveal>
          <StageExplorer stages={[...page.explorer.stages]} />
        </Reveal>
      </Section>

      {/* Relocated from homepage — capability cards */}
      <PlatformCapabilities />

      {/* 4. Core Platform Capabilities */}
      <Section
        id="capabilities"
        className="gradient-section"
        eyebrow={page.capabilities.eyebrow}
        title={page.capabilities.title}
        description={page.capabilities.description}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {page.capabilities.items.map((item, i) => (
            <Reveal key={item.id} delay={(Math.min(i % 3, 3) as 0 | 1 | 2 | 3)}>
              <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div className="relative aspect-video bg-[#0a0a0b]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 5. Real Product Showcase */}
      <Section
        id="architecture"
        eyebrow={page.showcase.eyebrow}
        title={page.showcase.title}
        description={page.showcase.description}
      >
        <Reveal>
          <StageExplorer stages={[...page.showcase.items]} />
        </Reveal>
      </Section>

      {/* Relocated from homepage — application surface showcase */}
      <ProductShowcase />

      {/* Relocated from homepage — video center */}
      <VideoCenter />

      {/* 6. Why LawGPT is Different */}
      <Section
        id="why"
        className="gradient-section"
        eyebrow={page.comparison.eyebrow}
        title={page.comparison.title}
        description={page.comparison.description}
      >
        <Reveal>
          <div className="overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-border">
            <div className="min-w-[720px]">
              <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr] border-b border-border bg-surface-soft px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:px-6">
                <span>Capability</span>
                <span>Google</span>
                <span>ChatGPT</span>
                <span>Traditional</span>
                <span className="text-accent">LawGPT</span>
              </div>
              <ul>
                {page.comparison.rows.map((row, i) => (
                  <li
                    key={row.id}
                    className={cn(
                      "grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr] items-center px-4 py-4 transition-colors duration-200 hover:bg-surface-soft/80 sm:px-6",
                      i !== page.comparison.rows.length - 1 &&
                        "border-b border-border",
                    )}
                  >
                    <span className="pr-3 text-sm font-medium text-foreground">
                      {row.capability}
                    </span>
                    <div>
                      <CellValue value={row.google} />
                    </div>
                    <div>
                      <CellValue value={row.chatgpt} />
                    </div>
                    <div>
                      <CellValue value={row.traditional} />
                    </div>
                    <div className="rounded-lg bg-accent-soft/40 px-2 py-1.5">
                      <CellValue value={row.lawgpt} emphasize />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 7. Built for Everyone */}
      <Section
        eyebrow={page.audiences.eyebrow}
        title={page.audiences.title}
        description={page.audiences.description}
        align="center"
      >
        <Reveal>
          <ul className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {page.audiences.items.map((item) => (
              <li
                key={item.id}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-foreground shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* 8. Security & Privacy */}
      <Section
        id="security"
        className="gradient-section"
        eyebrow={page.security.eyebrow}
        title={page.security.title}
        description={page.security.description}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {page.security.points.map((point, i) => (
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

      {/* 9. FAQ */}
      <Section
        id="faq"
        eyebrow="FAQ"
        title="Platform questions"
        description="Straight answers about how the LawGPT operating system works."
        align="center"
      >
        <Reveal className="mx-auto max-w-2xl">
          <Faq items={[...page.faq]} />
        </Reveal>
      </Section>

      {/* 10. Final CTA */}
      <Cta
        eyebrow={page.cta.eyebrow}
        title={page.cta.title}
        description={page.cta.description}
        primaryLabel={page.cta.primaryLabel}
        primaryHref={page.cta.primaryHref}
        secondaryLabel={page.cta.secondaryLabel}
        secondaryHref={page.cta.secondaryHref}
      />
    </>
  );
}
