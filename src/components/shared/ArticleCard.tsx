import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { AcademyArticle } from "@/types";

interface ArticleCardProps {
  article: AcademyArticle;
  className?: string;
}

export function ArticleCard({ article, className }: ArticleCardProps) {
  return (
    <Link
      href={article.href}
      className={cn(
        "group block rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        <Badge variant="muted">{article.category}</Badge>
        <span className="text-xs text-muted">{article.readTime}</span>
      </div>
      <h3 className="mb-2 text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
        {article.title}
      </h3>
      <p className="text-sm leading-relaxed text-muted">{article.excerpt}</p>
    </Link>
  );
}
