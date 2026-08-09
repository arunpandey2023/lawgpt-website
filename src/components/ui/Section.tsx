import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Container } from "./Container";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  align?: "left" | "center";
}

export function Section({
  children,
  id,
  className,
  containerClassName,
  eyebrow,
  title,
  description,
  align = "left",
}: SectionProps) {
  return (
    <section id={id} className={cn("py-20 sm:py-24 lg:py-28", className)}>
      <Container className={containerClassName}>
        {(eyebrow || title || description) && (
          <header
            className={cn(
              "mb-12 max-w-2xl sm:mb-14",
              align === "center" && "mx-auto text-center",
            )}
          >
            {eyebrow && (
              <p className="mb-3 text-sm font-medium tracking-wide text-accent">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                {title}
              </h2>
            )}
            {description && (
              <p
                className={cn(
                  "mt-4 text-base leading-relaxed text-muted sm:text-lg",
                  align === "center" && "mx-auto",
                )}
              >
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
