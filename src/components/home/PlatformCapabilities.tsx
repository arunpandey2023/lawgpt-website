import { FeatureCard } from "@/components/shared/FeatureCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { features } from "@/data/features";

export function PlatformCapabilities() {
  return (
    <Section
      id="platform"
      eyebrow="Platform capabilities"
      title="Everything required to move a legal matter forward"
      description="Guidance, documents, research, review, and filing—connected in one operating system."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <Reveal key={feature.id} delay={(Math.min(i % 3, 3) as 0 | 1 | 2 | 3)}>
            <FeatureCard feature={feature} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
