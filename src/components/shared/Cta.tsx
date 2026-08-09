import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface CtaProps {
  eyebrow?: string;
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
  variant?: "light" | "dark";
}

export function Cta({
  eyebrow,
  title,
  description,
  primaryLabel = "Start Free",
  primaryHref = "#start",
  secondaryLabel,
  secondaryHref,
  className,
  variant = "dark",
}: CtaProps) {
  const isDark = variant === "dark";

  return (
    <section className={cn("py-20 sm:py-24", className)}>
      <Container>
        <div
          className={cn(
            "relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12 sm:py-16",
            isDark ? "gradient-cta text-white" : "bg-surface-soft ring-1 ring-border",
          )}
        >
          {isDark && (
            <div className="pointer-events-none absolute inset-0 opacity-20 noise-overlay" />
          )}
          <div className="relative mx-auto max-w-2xl">
            {eyebrow && (
              <p
                className={cn(
                  "mb-3 text-sm font-medium tracking-wide",
                  isDark ? "text-blue-200" : "text-accent",
                )}
              >
                {eyebrow}
              </p>
            )}
            <h2
              className={cn(
                "text-balance text-3xl font-semibold tracking-tight sm:text-4xl",
                isDark ? "text-white" : "text-foreground",
              )}
            >
              {title}
            </h2>
            <p
              className={cn(
                "mx-auto mt-4 max-w-xl text-base leading-relaxed sm:text-lg",
                isDark ? "text-white/70" : "text-muted",
              )}
            >
              {description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                href={primaryHref}
                size="lg"
                className={
                  isDark
                    ? "bg-white text-foreground hover:bg-white/90"
                    : undefined
                }
              >
                {primaryLabel}
              </Button>
              {secondaryLabel && secondaryHref && (
                <Button
                  href={secondaryHref}
                  variant={isDark ? "ghost" : "secondary"}
                  size="lg"
                  className={
                    isDark
                      ? "text-white ring-1 ring-white/20 hover:bg-white/10"
                      : undefined
                  }
                >
                  {secondaryLabel}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
