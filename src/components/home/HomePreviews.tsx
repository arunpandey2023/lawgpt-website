import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function HomePricingPreview() {
  return (
    <Section
      id="pricing"
      eyebrow="Pricing"
      title="Start free. Upgrade when you need more."
      description="Software is a subscription. Lawyer Review+ is optional human expertise—pay only when you need it."
      align="center"
    >
      <Reveal>
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 text-left shadow-sm ring-1 ring-border sm:p-7">
            <p className="text-sm font-medium text-accent">Free</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              ₹0
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Explore guided workflows and see how LawGPT structures a legal
              matter.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 text-left shadow-sm ring-1 ring-accent/20 sm:p-7">
            <p className="text-sm font-medium text-accent">Pro</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              ₹999<span className="text-base font-medium text-muted">/mo</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Full workflow execution, documents, and filing packages—plus
              optional Lawyer Review+.
            </p>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <Button href="/pricing" variant="secondary">
            View Pricing →
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}

export function HomeGuidesPreview() {
  return (
    <Section
      id="academy"
      eyebrow="Legal Guides"
      title="Learn the problem. Then run the workflow."
      description="Practical explainers for launched matters—then continue into the matching LawGPT workflow."
    >
      <Reveal>
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
          <div className="max-w-xl">
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              Featured guides, latest explainers, workflow learning paths, and
              FAQs live in Legal Guides—so the homepage stays focused on the
              product story.
            </p>
          </div>
          <div className="mt-6 shrink-0 sm:mt-0">
            <Button href="/academy" variant="secondary">
              Explore Legal Guides →
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export function HomePlatformPreview() {
  return (
    <Section
      id="platform-preview"
      className="gradient-section"
      eyebrow="Platform"
      title="An operating system for legal work"
      description="Guided intake, research, lawyer-grade documents, optional Lawyer Review+, and filing packages—connected end to end."
    >
      <Reveal>
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
          <ul className="max-w-xl list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted sm:text-base">
            <li>How LawGPT works — from questions to a filing package</li>
            <li>Core capabilities, product surfaces, and AI engine</li>
            <li>Security, architecture, and platform FAQ</li>
          </ul>
          <div className="mt-6 shrink-0 sm:mt-0">
            <Button href="/platform" variant="secondary">
              Explore the complete Platform →
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
