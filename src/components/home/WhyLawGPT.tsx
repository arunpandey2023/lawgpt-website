import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const points = [
  {
    title: "The problem",
    body: "Legal problems are urgent, personal, and confusing. People do not know which documents matter, which deadlines apply, or which authority to approach.",
  },
  {
    title: "Why traditional services fall short",
    body: "Consultations are expensive, slow to schedule, and often start from zero. Templates are generic. Chatbots give answers without structure or filing readiness.",
  },
  {
    title: "How AI changes this",
    body: "LawGPT runs an operating system for legal work—guided intake, research context, lawyer-grade documents, optional review, and a complete filing package.",
  },
];

export function WhyLawGPT() {
  return (
    <Section
      eyebrow="Why LawGPT"
      title="Legal work deserves software, not guesswork"
      description="Most people face legal issues with fragmented advice and unfinished paperwork. LawGPT replaces that chaos with a clear, productized path."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {points.map((point, i) => (
          <Reveal key={point.title} delay={(i + 1) as 1 | 2 | 3}>
            <article className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border sm:p-7">
              <span className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                {i + 1}
              </span>
              <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground">
                {point.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{point.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
