import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getWorkflowPage } from "@/data/workflowPages";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import type { Workflow } from "@/types";

interface WorkflowCardProps {
  workflow: Workflow;
  className?: string;
  showVideo?: boolean;
}

export function WorkflowCard({
  workflow,
  className,
  showVideo = true,
}: WorkflowCardProps) {
  const isLive = workflow.status === "live";
  const hasLandingPage = Boolean(getWorkflowPage(workflow.slug));
  const ctaHref = hasLandingPage ? workflow.href : siteConfig.appUrl;
  const ctaLabel = hasLandingPage ? "Open workflow page" : "Start in LawGPT";

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
        className,
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
          {hasLandingPage ? (
            <Link href={workflow.href} className="after:absolute after:inset-0">
              {workflow.title}
            </Link>
          ) : (
            workflow.title
          )}
        </h3>
        <Badge variant={isLive ? "accent" : "muted"}>
          {hasLandingPage ? "Live page" : isLive ? "Live" : "Coming Soon"}
        </Badge>
      </div>

      <p className="mb-5 text-sm leading-relaxed text-muted">
        {workflow.shortDescription}
      </p>

      {isLive && workflow.documents.length > 0 && (
        <div className="mb-5">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Documents generated
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {workflow.documents.slice(0, 3).map((doc) => (
              <li
                key={doc}
                className="rounded-md bg-surface-soft px-2 py-1 text-xs text-muted-foreground"
              >
                {doc}
              </li>
            ))}
            {workflow.documents.length > 3 && (
              <li className="rounded-md bg-surface-soft px-2 py-1 text-xs text-muted-foreground">
                +{workflow.documents.length - 3} more
              </li>
            )}
          </ul>
        </div>
      )}

      {showVideo && isLive && workflow.media?.image && (
        <div className="mb-5 overflow-hidden rounded-xl bg-[#0a0a0b] ring-1 ring-black/5">
          <div className="relative aspect-video">
            <Image
              src={workflow.media.image}
              alt={workflow.media.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 360px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
            {workflow.media.videoSrc && (
              <span className="absolute bottom-2.5 left-2.5 rounded-md bg-black/50 px-2 py-0.5 text-[11px] text-white/90 backdrop-blur-sm">
                0:30 video
              </span>
            )}
          </div>
        </div>
      )}

      <div className="relative z-10 mt-auto pt-1">
        {isLive ? (
          <Button href={ctaHref} variant="outline" size="sm" className="w-full">
            {ctaLabel}
          </Button>
        ) : (
          <Button variant="ghost" size="sm" className="w-full" disabled>
            Coming soon
          </Button>
        )}
      </div>
    </article>
  );
}
