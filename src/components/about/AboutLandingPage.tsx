import Image from "next/image";
import Link from "next/link";
import { Testimonials } from "@/components/home/Testimonials";
import { Cta } from "@/components/shared/Cta";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { aboutPage, type AboutPerson } from "@/data/about";

function PersonCard({ person }: { person: AboutPerson }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border">
      <div className="relative aspect-[4/5] bg-surface-soft">
        <Image
          src={person.image}
          alt={person.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover object-top"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {person.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-accent">{person.role}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {person.bio}
        </p>
        <a
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          LinkedIn
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path
              d="M7 17L17 7M9 7h8v8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </article>
  );
}

export function AboutLandingPage() {
  const page = aboutPage;

  return (
    <>
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
              <li className="font-medium text-foreground">About</li>
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

      {/* 1. Mission */}
      <Section
        id={page.mission.id}
        eyebrow={page.mission.eyebrow}
        title={page.mission.title}
      >
        <div className="mx-auto max-w-3xl space-y-5">
          {page.mission.paragraphs.map((paragraph, i) => (
            <Reveal key={paragraph.slice(0, 24)} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
              <p className="text-base leading-relaxed text-muted sm:text-lg">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 2. Vision */}
      <Section
        id={page.vision.id}
        className="gradient-section"
        eyebrow={page.vision.eyebrow}
        title={page.vision.title}
        description={page.vision.description}
      >
        <Reveal>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border sm:p-8">
            <ul className="grid gap-3 sm:grid-cols-2">
              {page.vision.capabilities.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-muted sm:text-base"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="mt-1 h-4 w-4 shrink-0 text-accent"
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
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted">
              {page.vision.closing}
            </p>
          </div>
        </Reveal>
      </Section>

      {/* 3. Story */}
      <Section
        id={page.story.id}
        eyebrow={page.story.eyebrow}
        title={page.story.title}
      >
        <div className="mx-auto max-w-3xl space-y-6">
          {page.story.blocks.map((block, i) => (
            <Reveal key={block.id} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
              <p className="text-base leading-relaxed text-muted sm:text-lg">
                {block.text}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4. Leadership — rendered only when real profiles exist */}
      {page.leadership.people.length > 0 && (
        <Section
          id={page.leadership.id}
          className="gradient-section"
          eyebrow={page.leadership.eyebrow}
          title={page.leadership.title}
          description={page.leadership.description}
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {page.leadership.people.map((person, i) => (
              <Reveal key={person.id} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
                <PersonCard person={person} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* 5. Advisors — rendered only when real profiles exist */}
      {page.advisors.people.length > 0 && (
        <Section
          id={page.advisors.id}
          eyebrow={page.advisors.eyebrow}
          title={page.advisors.title}
          description={page.advisors.description}
        >
          <div
            className={
              page.advisors.people.length === 2
                ? "mx-auto grid max-w-3xl gap-5 sm:grid-cols-2"
                : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            }
          >
            {page.advisors.people.map((person, i) => (
              <Reveal key={person.id} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
                <PersonCard person={person} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* 6. Technology */}
      <Section
        id={page.technology.id}
        className="gradient-section"
        eyebrow={page.technology.eyebrow}
        title={page.technology.title}
        description={page.technology.description}
      >
        <div className="grid gap-5 md:grid-cols-2">
          {page.technology.points.map((point, i) => (
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

      {/* 7. Values */}
      <Section
        id={page.values.id}
        eyebrow={page.values.eyebrow}
        title={page.values.title}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {page.values.items.map((value, i) => (
            <Reveal key={value.id} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
              <div className="h-full border-l-2 border-accent/30 pl-5">
                <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  {value.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Relocated from homepage — social proof stories */}
      <Testimonials />

      {/* 8. Careers */}
      <Section
        id={page.careers.id}
        className="gradient-section"
        eyebrow={page.careers.eyebrow}
        title={page.careers.title}
        description={page.careers.description}
        align="center"
      >
        <Reveal>
          <div className="mx-auto max-w-xl rounded-2xl bg-white px-6 py-10 text-center shadow-sm ring-1 ring-border sm:px-10">
            <p className="text-base font-medium text-foreground">
              {page.careers.status}
            </p>
            <div className="mt-6">
              <Button href={page.careers.contactHref} variant="secondary">
                Contact us
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section
        id={page.contact.id}
        eyebrow={page.contact.eyebrow}
        title={page.contact.title}
        description={page.contact.description}
        align="center"
      >
        <Reveal>
          <div className="flex flex-col items-center gap-4">
            <a
              href={page.contact.emailHref}
              className="text-lg font-medium text-accent transition-colors hover:text-accent-hover"
            >
              {page.contact.emailLabel}
            </a>
            <Button href={page.contact.pageHref} variant="secondary">
              {page.contact.pageLabel}
            </Button>
          </div>
        </Reveal>
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
