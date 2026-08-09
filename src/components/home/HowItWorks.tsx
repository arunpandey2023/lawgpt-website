import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { howItWorksSteps } from "@/data/howItWorks";

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      className="gradient-section"
      eyebrow="How LawGPT works"
      title="From questions to a filing package"
      description="A clear sequence—designed like software, not a maze of legal forms."
      align="center"
    >
      <ol className="mx-auto max-w-2xl space-y-0">
        {howItWorksSteps.map((step, i) => (
          <li key={step.id}>
            <Reveal delay={(Math.min(i, 3) as 0 | 1 | 2 | 3)}>
              <div className="relative flex gap-5 pb-8 last:pb-0 sm:gap-6">
                {i < howItWorksSteps.length - 1 && (
                  <span
                    className="absolute left-[19px] top-10 bottom-0 w-px bg-gradient-to-b from-accent/50 to-accent/10 sm:left-[21px]"
                    aria-hidden
                  />
                )}
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white shadow-glow">
                  {step.step}
                </span>
                <div className="min-w-0 flex-1 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-border sm:p-6">
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
  );
}
