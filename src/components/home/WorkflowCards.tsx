import { WorkflowCard } from "@/components/shared/WorkflowCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { comingSoonWorkflows, workflows } from "@/data/workflows";

export function WorkflowCards() {
  return (
    <Section
      id="workflows"
      eyebrow="Seven live workflows"
      title="Start with a problem people actually have"
      description="Each workflow is a productized path—from guided questions to filing-ready documents. More matters are on the way."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {workflows.map((workflow, i) => (
          <Reveal key={workflow.id} delay={(Math.min(i % 3, 3) || 0) as 0 | 1 | 2 | 3}>
            <WorkflowCard workflow={workflow} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <div className="rounded-2xl bg-surface-soft p-6 ring-1 ring-border sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-accent">Coming soon</p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
                Expanding to hundreds of legal problems
              </h3>
              <p className="mt-2 max-w-xl text-sm text-muted">
                {comingSoonWorkflows.map((w) => w.title).join(" · ")} and more.
              </p>
            </div>
            <Button href="/workflows" variant="secondary">
              Explore Workflows →
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
