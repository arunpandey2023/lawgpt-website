import { Cta } from "@/components/shared/Cta";

export function FinalCta() {
  return (
    <div id="start">
      <Cta
        eyebrow="Ready when you are"
        title="Start your first legal workflow free"
        description="Pick a problem, answer guided questions, and see how LawGPT turns confusion into a structured, filing-aware package."
        primaryLabel="Start Free"
        primaryHref="#explorer"
        secondaryLabel="Learn About Us →"
        secondaryHref="/about"
      />
    </div>
  );
}
