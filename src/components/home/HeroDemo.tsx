import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { InlineVideo } from "@/components/shared/InlineVideo";
import { productDemo } from "@/data/productMedia";

export function HeroDemo() {
  return (
    <section id="watch-demo" className="border-b border-border bg-white py-12 sm:py-16">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
          <Reveal>
            <p className="text-sm font-medium tracking-wide text-accent">
              30-second product demo
            </p>
            <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {productDemo.title}
            </h2>
            <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
              {productDemo.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="#start" size="lg">
                Start Free
              </Button>
              <Button href="#explorer" variant="secondary" size="lg">
                Explore workflows
              </Button>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <InlineVideo
              src={productDemo.src}
              poster={productDemo.poster}
              title={productDemo.title}
              autoPreview
            />
            <p className="mt-3 text-center text-xs text-muted lg:text-left">
              Plays inside LawGPT · {productDemo.workflowLabel} workflow
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
