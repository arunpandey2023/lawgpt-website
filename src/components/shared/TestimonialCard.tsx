import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border sm:p-7",
        className,
      )}
    >
      <blockquote className="flex-1 text-base leading-relaxed text-foreground">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-6 border-t border-border pt-5">
        <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
        <p className="mt-0.5 text-sm text-muted">
          {testimonial.role} · {testimonial.company}
        </p>
      </figcaption>
    </figure>
  );
}
