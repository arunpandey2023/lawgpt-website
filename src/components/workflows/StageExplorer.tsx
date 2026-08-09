"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { WorkflowPageScreenshot } from "@/types";

interface StageExplorerProps {
  stages: WorkflowPageScreenshot[];
  className?: string;
}

export function StageExplorer({ stages, className }: StageExplorerProps) {
  const [activeId, setActiveId] = useState(stages[0]?.id ?? "");
  const active = stages.find((s) => s.id === activeId) ?? stages[0];

  if (!active) return null;

  return (
    <div className={cn("grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-8", className)}>
      <div className="rounded-2xl bg-white p-2 shadow-sm ring-1 ring-border sm:p-3">
        <ul className="space-y-1" role="tablist" aria-label="Workflow stages">
          {stages.map((stage) => {
            const selected = stage.id === active.id;
            const tabId = `stage-tab-${stage.id}`;
            return (
              <li key={stage.id}>
                <button
                  type="button"
                  id={tabId}
                  role="tab"
                  aria-selected={selected}
                  aria-controls="stage-explorer-panel"
                  onClick={() => setActiveId(stage.id)}
                  className={cn(
                    "flex w-full flex-col rounded-xl px-3.5 py-3 text-left transition-all duration-300 ease-out",
                    selected
                      ? "bg-accent text-white shadow-sm"
                      : "text-foreground hover:translate-x-0.5 hover:bg-surface-soft",
                  )}
                >
                  <span
                    className={cn(
                      "text-[11px] font-medium uppercase tracking-wider",
                      selected ? "text-white/70" : "text-muted",
                    )}
                  >
                    {stage.label}
                  </span>
                  <span className="mt-0.5 text-sm font-medium">{stage.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        key={active.id}
        id="stage-explorer-panel"
        className="panel-enter overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-border"
        role="tabpanel"
        aria-labelledby={`stage-tab-${active.id}`}
      >
        <div className="relative aspect-[16/10] bg-[#0a0a0b] sm:aspect-video">
          <Image
            src={active.image}
            alt={active.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 640px"
            className="object-cover object-top"
          />
        </div>
        <div className="p-5 sm:p-6">
          <p className="text-xs font-medium uppercase tracking-wider text-accent">
            {active.label}
          </p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
            {active.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {active.description}
          </p>
        </div>
      </div>
    </div>
  );
}
