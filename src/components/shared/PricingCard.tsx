import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { PricingPlan } from "@/types";

interface PricingCardProps {
  plan: PricingPlan;
  className?: string;
}

export function PricingCard({ plan, className }: PricingCardProps) {
  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-2xl p-6 sm:p-7",
        plan.highlighted
          ? "bg-foreground text-white shadow-lg ring-1 ring-foreground"
          : "bg-white shadow-sm ring-1 ring-border",
        className,
      )}
    >
      {(plan.badge || plan.highlighted) && (
        <span className="absolute -top-3 left-6 rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-white">
          {plan.badge ?? "Most popular"}
        </span>
      )}
      <h3
        className={cn(
          "text-lg font-semibold tracking-tight",
          plan.highlighted ? "text-white" : "text-foreground",
        )}
      >
        {plan.name}
      </h3>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-semibold tracking-tight">{plan.price}</span>
        {plan.period && (
          <span
            className={cn(
              "text-sm",
              plan.highlighted ? "text-white/60" : "text-muted",
            )}
          >
            {plan.period}
          </span>
        )}
      </div>
      {plan.priceNote && (
        <p
          className={cn(
            "mt-2 text-xs leading-relaxed",
            plan.highlighted ? "text-white/55" : "text-muted",
          )}
        >
          {plan.priceNote}
        </p>
      )}
      <p
        className={cn(
          "mt-3 text-sm leading-relaxed",
          plan.highlighted ? "text-white/70" : "text-muted",
        )}
      >
        {plan.description}
      </p>
      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <svg
              viewBox="0 0 24 24"
              className={cn(
                "mt-0.5 h-4 w-4 shrink-0",
                plan.highlighted ? "text-accent-muted" : "text-accent",
              )}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden
            >
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={plan.highlighted ? "text-white/85" : "text-muted-foreground"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Button
          href={plan.ctaHref ?? "#start"}
          size="lg"
          className={cn(
            "w-full",
            plan.highlighted
              ? "bg-white text-foreground hover:bg-white/90"
              : undefined,
          )}
          variant={plan.highlighted ? "primary" : "secondary"}
        >
          {plan.cta}
        </Button>
      </div>
    </article>
  );
}
