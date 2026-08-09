import Link from "next/link";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Cta } from "@/components/shared/Cta";
import { Faq } from "@/components/shared/Faq";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import {
  contactPage,
  contactPublic,
  type ContactOption,
} from "@/data/contact";

function ContactOptionIcon({ icon }: { icon: ContactOption["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    "aria-hidden": true as const,
  };

  switch (icon) {
    case "mail":
      return (
        <svg {...common}>
          <path
            d="M4 6h16v12H4V6zm0 0l8 7 8-7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "demo":
      return (
        <svg {...common}>
          <path
            d="M8 5v14l11-7L8 5z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "handshake":
      return (
        <svg {...common}>
          <path
            d="M8 12l2.5 2.5L16 9M4 14l3 3 2-1m7-7l2 2 2-1M7 7l2-2 3 1 3-1 2 2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "media":
      return (
        <svg {...common}>
          <path
            d="M4 7h11v10H4V7zm11 3l5-2v8l-5-2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "careers":
      return (
        <svg {...common}>
          <path
            d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m-9 0h12v12H6V7z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "support":
      return (
        <svg {...common}>
          <path
            d="M12 18v2m0-2a6 6 0 01-6-6V9a6 6 0 1112 0v3a6 6 0 01-6 6zm-7-5h2m10 0h2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

function FormFallback() {
  return (
    <div
      className="min-h-[420px] rounded-2xl bg-white p-8 shadow-sm ring-1 ring-border"
      aria-hidden
    />
  );
}

export function ContactLandingPage() {
  const page = contactPage;
  const info = contactPublic;

  return (
    <>
      <section className="gradient-hero relative overflow-hidden pb-12 pt-10 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16">
        <div className="pointer-events-none absolute inset-0 opacity-[0.35] noise-overlay" />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-foreground"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-medium text-foreground">Contact</li>
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
          </div>
        </Container>
      </section>

      <Section
        id="options"
        eyebrow={page.options.eyebrow}
        title={page.options.title}
        description={page.options.description}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {page.options.items.map((option, i) => (
            <Reveal key={option.id} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
              <article className="group flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <ContactOptionIcon icon={option.icon} />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                  {option.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {option.description}
                </p>
                <div className="mt-6">
                  <Button
                    href={`/contact?category=${option.id}#contact-form`}
                    variant="outline"
                    size="sm"
                  >
                    {option.ctaLabel}
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="message"
        className="gradient-section"
        eyebrow={page.form.eyebrow}
        title={page.form.title}
        description={page.form.description}
      >
        <Reveal>
          <div className="relative mx-auto max-w-3xl">
            <Suspense fallback={<FormFallback />}>
              <ContactForm />
            </Suspense>
          </div>
        </Reveal>
      </Section>

      <Section
        id="company"
        eyebrow={page.company.eyebrow}
        title={page.company.title}
        description={page.company.description}
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border sm:p-8">
              <h3 className="text-base font-semibold text-foreground">
                Registered Office
              </h3>
              <address className="mt-4 not-italic text-sm leading-relaxed text-muted sm:text-base">
                {info.registeredOffice.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border sm:p-8">
              <h3 className="text-base font-semibold text-foreground">
                Primary Contact
              </h3>
              <ul className="mt-4 space-y-3 text-sm sm:text-base">
                {info.phones.map((phone) => (
                  <li key={phone}>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="font-medium text-foreground transition-colors hover:text-accent"
                    >
                      {phone}
                    </a>
                  </li>
                ))}
                <li className="pt-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted">
                    General Email
                  </p>
                  <a
                    href={`mailto:${info.generalEmail}`}
                    className="mt-1 inline-block font-medium text-accent transition-colors hover:text-accent-hover"
                  >
                    {info.generalEmail}
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section
        id="support"
        className="gradient-section"
        eyebrow={page.support.eyebrow}
        title={page.support.title}
        description={page.support.description}
      >
        <Reveal>
          <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border sm:p-7">
              <p className="text-xs font-medium uppercase tracking-wider text-muted">
                Hours
              </p>
              <p className="mt-3 text-lg font-semibold text-foreground">
                {info.supportHours.days}
              </p>
              <p className="mt-1 text-sm text-muted sm:text-base">
                {info.supportHours.time}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {info.supportHours.note}
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border sm:p-7">
              <p className="text-xs font-medium uppercase tracking-wider text-muted">
                Support Email
              </p>
              <a
                href={`mailto:${info.supportEmail}`}
                className="mt-3 inline-block text-lg font-semibold text-accent transition-colors hover:text-accent-hover"
              >
                {info.supportEmail}
              </a>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                For account or product issues, include your account email and a
                short description of the problem.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section
        id="office"
        eyebrow={page.office.eyebrow}
        title={page.office.title}
        description={page.office.description}
      >
        <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch">
          <Reveal>
            <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border sm:p-8">
              <h3 className="text-base font-semibold text-foreground">
                {info.companyName}
              </h3>
              <address className="mt-4 not-italic text-sm leading-relaxed text-muted sm:text-base">
                {info.registeredOffice.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div
              id="office-map"
              data-map-embed-slot
              className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl bg-surface-soft p-6 text-center shadow-sm ring-1 ring-border sm:min-h-[320px]"
            >
              {/* Placeholder ready for Google Maps iframe / embed */}
              <div className="absolute inset-0 opacity-[0.4] noise-overlay" />
              <div className="relative max-w-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-accent shadow-sm ring-1 ring-border">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    aria-hidden
                  >
                    <path
                      d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </div>
                <p className="mt-4 text-sm font-medium text-foreground">
                  Map coming soon
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {page.office.mapPlaceholder}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section
        id="faq"
        className="gradient-section"
        eyebrow={page.faq.eyebrow}
        title={page.faq.title}
        description={page.faq.description}
        align="center"
      >
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <Faq items={[...page.faq.items]} />
          </div>
        </Reveal>
      </Section>

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
