import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroProductShowcase } from "@/components/shared/HeroProductShowcase";
import { siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section className="gradient-hero relative overflow-hidden pb-12 pt-14 sm:pb-16 sm:pt-20 lg:pb-20 lg:pt-24">
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] noise-overlay" />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="animate-fade-up mb-5 text-sm font-medium tracking-wide text-accent">
            {siteConfig.name}
          </p>
          <h1 className="animate-fade-up text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.08]">
            {siteConfig.tagline}
          </h1>
          <p className="animate-fade-up mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Understand your legal problem, answer guided AI questions, generate
            lawyer-grade documents, get lawyer review, and download a complete
            filing package.
          </p>
          <div className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={siteConfig.cta.primary.href} size="lg">
              {siteConfig.cta.primary.label}
            </Button>
            <Button href="#watch-demo" variant="secondary" size="lg">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current"
                aria-hidden
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch 30-second Demo
            </Button>
          </div>
        </div>

        <div className="animate-fade-up mt-12 sm:mt-14 lg:mt-16">
          <HeroProductShowcase />
        </div>
      </Container>
    </section>
  );
}
