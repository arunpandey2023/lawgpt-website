import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <Section
      eyebrow="Testimonials"
      title="Built for people who need clarity fast"
      description="Users choose LawGPT when they want structure, documents, and a path forward—not another chat thread."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((testimonial, i) => (
          <Reveal key={testimonial.id} delay={(i + 1) as 1 | 2 | 3}>
            <TestimonialCard testimonial={testimonial} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
