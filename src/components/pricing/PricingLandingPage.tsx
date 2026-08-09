import Link from "next/link";
import { Fragment } from "react";
import { Cta } from "@/components/shared/Cta";
import { Faq } from "@/components/shared/Faq";
import { PricingCard } from "@/components/shared/PricingCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import {
  lawyerReviewAddon,
  pricingPage,
  pricingPlans,
  type PricingComparisonValue,
} from "@/data/pricing";
import { cn } from "@/lib/utils";

function CellValue({
  value,
  emphasize,
}: {
  value: PricingComparisonValue;
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

export function PricingLandingPage() {
  const page = pricingPage;
  const review = lawyerReviewAddon;

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
              <li className="font-medium text-foreground">Pricing</li>
            </ol>
          </nav>

          <div className="mx-auto max-w-3xl text-center">
            <p className="animate-fade-up text-sm font-medium tracking-wide text-accent">
              {page.hero.eyebrow}
            </p>
            <h1 className="animate-fade-up mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl lg:leading-[1.1]">
              {page.hero.title}
            </h1>
            <p className="animate-fade-up mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {page.hero.description}
            </p>
            <div className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href={page.hero.primaryCta.href} size="lg">
                {page.hero.primaryCta.label}
              </Button>
              <Button href={page.hero.secondaryCta.href} variant="secondary" size="lg">
                {page.hero.secondaryCta.label}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Why LawGPT Pricing */}
      <Section
        eyebrow={page.why.eyebrow}
        title={page.why.title}
        description={page.why.description}
      >
        <div className="grid gap-5 md:grid-cols-2">
          {page.why.points.map((point, i) => (
            <Reveal key={point.id} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
              <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border sm:p-7">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  {point.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3. Pricing Cards — Free + Pro only */}
      <Section
        id="plans"
        className="gradient-section"
        eyebrow={page.plans.eyebrow}
        title={page.plans.title}
        description={page.plans.description}
        align="center"
      >
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          {pricingPlans.map((plan, i) => (
            <Reveal key={plan.id} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
              <PricingCard plan={plan} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4. Feature Comparison Table */}
      <Section
        eyebrow={page.comparison.eyebrow}
        title={page.comparison.title}
        description={page.comparison.description}
      >
        <Reveal>
          <div className="overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-border">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-surface-soft text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-4 sm:px-6">Capability</th>
                  <th className="px-4 py-4 sm:px-6">{page.comparison.columns.free}</th>
                  <th className="px-4 py-4 sm:px-6">{page.comparison.columns.pro}</th>
                  <th className="px-4 py-4 sm:px-6">
                    {page.comparison.columns.review}
                  </th>
                </tr>
              </thead>
              <tbody>
                {page.comparison.groups.map((group) => (
                  <Fragment key={group.id}>
                    <tr className="border-t border-border">
                      <th
                        colSpan={4}
                        scope="colgroup"
                        className="bg-surface-soft/80 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-accent sm:px-6"
                      >
                        {group.title}
                      </th>
                    </tr>
                    {group.rows.map((row) => (
                      <tr key={row.id} className="border-t border-border">
                        <th
                          scope="row"
                          className="px-4 py-4 text-left font-medium text-foreground sm:px-6"
                        >
                          {row.feature}
                        </th>
                        <td className="px-4 py-4 sm:px-6">
                          <CellValue value={row.free} />
                        </td>
                        <td className="px-4 py-4 sm:px-6">
                          <CellValue value={row.pro} emphasize />
                        </td>
                        <td className="px-4 py-4 sm:px-6">
                          <CellValue value={row.review} />
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Section>

      {/* 5. Example Platform Benefits */}
      <Section
        className="gradient-section"
        eyebrow={page.benefits.eyebrow}
        title={page.benefits.title}
        description={page.benefits.description}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {page.benefits.items.map((item, i) => (
            <Reveal key={item.id} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
              <div className="h-full border-l-2 border-accent/30 pl-5">
                <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 6. Who Each Plan Is For */}
      <Section
        eyebrow={page.audiences.eyebrow}
        title={page.audiences.title}
        description={page.audiences.description}
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {page.audiences.items.map((audience, i) => (
            <Reveal key={audience.id} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
              <article className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border sm:p-7">
                <p className="text-xs font-medium uppercase tracking-wider text-accent">
                  {audience.label}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                  {audience.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {audience.description}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {audience.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm text-muted"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
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
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 7. Lawyer Review+ (separate from subscription cards) */}
      <Section
        id="lawyer-review"
        className="gradient-section"
        eyebrow={review.eyebrow}
      >
        <Reveal>
          <div className="grid items-start gap-8 rounded-3xl bg-foreground px-6 py-10 text-white sm:px-10 sm:py-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
            <div>
              <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                {review.title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
                {review.description}
              </p>
              <p className="mt-4 text-sm font-medium text-accent-muted">
                {review.note}
              </p>
              <div className="mt-8">
                <Button
                  href={review.cta.href}
                  size="lg"
                  className="bg-white text-foreground hover:bg-white/90"
                >
                  {review.cta.label}
                </Button>
              </div>
            </div>
            <ul className="space-y-4">
              {review.services.map((service) => (
                <li
                  key={service.id}
                  className="rounded-2xl bg-white/5 px-5 py-4 ring-1 ring-white/10"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium text-white">{service.name}</p>
                    <p className="text-sm text-accent-muted">{service.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      {/* 8. FAQ */}
      <Section
        eyebrow={page.faq.eyebrow}
        title={page.faq.title}
        description={page.faq.description}
      >
        <Faq items={[...page.faq.items]} />
      </Section>

      {/* 9. Final CTA */}
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
