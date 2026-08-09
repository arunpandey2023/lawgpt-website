"use client";

import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { InlineVideo } from "@/components/shared/InlineVideo";
import { getWorkflowPage } from "@/data/workflowPages";
import { siteConfig } from "@/data/site";
import { getLiveWorkflows } from "@/data/workflows";
import { cn } from "@/lib/utils";

export function WorkflowExplorer() {
  const workflows = getLiveWorkflows();
  const defaultId =
    workflows.find((w) => w.slug === "cheque-bounce")?.id ??
    workflows[0]?.id ??
    "";
  const [activeId, setActiveId] = useState(defaultId);
  const active = workflows.find((w) => w.id === activeId) ?? workflows[0];
  const activeLanding = active ? getWorkflowPage(active.slug) : undefined;

  if (!active) return null;

  return (
    <Section
      id="explorer"
      className="gradient-section"
      eyebrow="Interactive explorer"
      title="Explore a workflow like a product"
      description="Select a live workflow to see what LawGPT produces—documents, authorities, timing, and a live product preview."
    >
      <Reveal>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-8">
          <div className="rounded-2xl bg-white p-2 shadow-sm ring-1 ring-border transition-shadow duration-300 hover:shadow-md sm:p-3">
            <ul className="space-y-1" role="tablist" aria-label="Workflows">
              {workflows.map((workflow) => {
                const selected = workflow.id === active.id;
                const tabId = `workflow-tab-${workflow.id}`;
                return (
                  <li key={workflow.id}>
                    <button
                      type="button"
                      id={tabId}
                      role="tab"
                      aria-selected={selected}
                      aria-controls="workflow-explorer-panel"
                      onClick={() => setActiveId(workflow.id)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left transition-all duration-300 ease-out",
                        selected
                          ? "bg-accent text-white shadow-sm"
                          : "text-foreground hover:bg-surface-soft hover:translate-x-0.5",
                      )}
                    >
                      <span className="text-sm font-medium">{workflow.title}</span>
                      <span
                        className={cn(
                          "text-xs tabular-nums",
                          selected ? "text-white/70" : "text-muted",
                        )}
                      >
                        {workflow.estimatedTime}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            key={active.id}
            id="workflow-explorer-panel"
            className="panel-enter rounded-2xl bg-white p-6 shadow-md ring-1 ring-border sm:p-8"
            role="tabpanel"
            aria-labelledby={`workflow-tab-${active.id}`}
          >
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="accent">Live</Badge>
              <Badge>{active.estimatedTime}</Badge>
              {active.media?.videoSrc && (
                <Badge variant="success">Video preview</Badge>
              )}
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">
              {active.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              {active.description}
            </p>

            <div className="mt-6 overflow-hidden rounded-xl ring-1 ring-border">
              {active.media?.videoSrc ? (
                <InlineVideo
                  src={active.media.videoSrc}
                  poster={active.media.videoPoster ?? active.media.image}
                  title={`${active.title} preview`}
                />
              ) : active.media?.image ? (
                <div className="relative aspect-video bg-[#0a0a0b]">
                  <Image
                    src={active.media.image}
                    alt={active.media.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 640px"
                    className="object-cover object-top transition-transform duration-500 hover:scale-[1.01]"
                  />
                  <p className="absolute bottom-2.5 left-2.5 rounded-md bg-black/50 px-2 py-0.5 text-[11px] text-white/90 backdrop-blur-sm">
                    LawGPT product UI
                  </p>
                </div>
              ) : null}
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Expected documents
                </p>
                <ul className="space-y-2">
                  {active.documents.map((doc) => (
                    <li
                      key={doc}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Authorities involved
                </p>
                <ul className="space-y-2">
                  {active.authorities.map((auth) => (
                    <li
                      key={auth}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                      {auth}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <Button
                href={activeLanding ? active.href : siteConfig.appUrl}
                size="lg"
              >
                {activeLanding
                  ? `Open ${active.title}`
                  : `Start ${active.title}`}
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
