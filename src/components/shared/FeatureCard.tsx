import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { cn } from "@/lib/utils";
import type { Feature } from "@/types";

interface FeatureCardProps {
  feature: Feature;
  className?: string;
}

export function FeatureCard({ feature, className }: FeatureCardProps) {
  return (
    <article
      className={cn(
        "rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-7",
        className,
      )}
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
        <FeatureIcon name={feature.icon} />
      </div>
      <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground">
        {feature.title}
      </h3>
      <p className="text-sm leading-relaxed text-muted">{feature.description}</p>
    </article>
  );
}
