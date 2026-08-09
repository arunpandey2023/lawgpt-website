import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { trustCapabilities } from "@/data/trust";

export function TrustedBy() {
  return (
    <section className="border-y border-border bg-white py-10 sm:py-12">
      <Container>
        <Reveal>
          <p className="mb-6 text-center text-sm font-medium text-muted">
            Built for complete legal workflow execution
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {trustCapabilities.map((item) => (
              <li
                key={item.id}
                className="inline-flex items-center gap-2 rounded-full bg-surface-soft px-3.5 py-2 text-sm font-medium text-foreground ring-1 ring-border transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-accent"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
