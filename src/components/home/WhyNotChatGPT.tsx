import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { comparisonRows } from "@/data/comparison";
import { cn } from "@/lib/utils";

function CellValue({
  value,
  emphasize,
}: {
  value: boolean | string;
  emphasize?: boolean;
}) {
  if (typeof value === "string") {
    return (
      <span
        className={cn(
          "text-sm",
          emphasize ? "font-medium text-foreground" : "text-muted",
        )}
      >
        {value}
      </span>
    );
  }
  if (value) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft text-accent">
        <svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5"
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
      </span>
    );
  }
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function WhyNotChatGPT() {
  return (
    <Section
      className="gradient-section"
      eyebrow="Why not ChatGPT?"
      title="Search finds information. Chat answers. LawGPT executes."
      description="Google retrieves pages. ChatGPT converses. LawGPT runs structured legal workflows to filing-ready outcomes."
    >
      <Reveal>
        <div className="overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-border">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] border-b border-border bg-surface-soft px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:px-6">
              <span>Capability</span>
              <span>Google</span>
              <span>ChatGPT</span>
              <span className="text-accent">LawGPT</span>
            </div>
            <ul>
              {comparisonRows.map((row, i) => (
                <li
                  key={row.id}
                  className={cn(
                    "grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center px-4 py-4 transition-colors duration-200 hover:bg-surface-soft/80 sm:px-6",
                    i !== comparisonRows.length - 1 && "border-b border-border",
                  )}
                >
                  <span className="pr-3 text-sm font-medium text-foreground">
                    {row.capability}
                  </span>
                  <div>
                    <CellValue value={row.google} />
                  </div>
                  <div>
                    <CellValue value={row.chatgpt} />
                  </div>
                  <div className="rounded-lg bg-accent-soft/40 px-2 py-1.5">
                    <CellValue value={row.lawgpt} emphasize />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
