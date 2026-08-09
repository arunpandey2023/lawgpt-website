import Link from "next/link";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { academyArticles, academyCategories } from "@/data/academy";

interface AcademyProps {
  /** Hide the bottom CTA when this block is already on /academy. */
  showExploreCta?: boolean;
}

export function Academy({ showExploreCta = true }: AcademyProps) {
  return (
    <Section
      id="guide-topics"
      eyebrow="Legal Guides"
      title="Learn the problem. Then run the workflow."
      description="LawGPT Legal Guides are practical explainers—documents, forums, timelines, and FAQs that lead into real workflows."
    >
      <Reveal>
        <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {academyCategories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="rounded-xl bg-surface-soft p-4 ring-1 ring-border transition hover:bg-white hover:shadow-sm"
            >
              <p className="text-sm font-semibold text-foreground">{category.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-3">
        {academyArticles.map((article, i) => (
          <Reveal key={article.id} delay={(i + 1) as 1 | 2 | 3}>
            <ArticleCard article={article} />
          </Reveal>
        ))}
      </div>

      {showExploreCta && (
        <Reveal className="mt-8 flex justify-center">
          <Button href="/academy" variant="secondary">
            Explore Legal Guides →
          </Button>
        </Reveal>
      )}
    </Section>
  );
}
