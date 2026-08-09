"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { showcaseItems } from "@/data/showcase";
import { cn } from "@/lib/utils";

export function ProductShowcase() {
  const [activeId, setActiveId] = useState(showcaseItems[0]?.id ?? "");
  const active =
    showcaseItems.find((s) => s.id === activeId) ?? showcaseItems[0];

  if (!active) return null;

  return (
    <Section
      className="gradient-section"
      eyebrow="Product showcase"
      title="The application, not a mock brochure"
      description="Real LawGPT surfaces—dashboard, guided chat, documents, research, and filing."
    >
      <Reveal>
        <div className="mb-6 flex flex-wrap gap-2">
          {showcaseItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveId(item.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                item.id === active.id
                  ? "bg-foreground text-white shadow-sm"
                  : "bg-white text-muted-foreground ring-1 ring-border hover:-translate-y-0.5 hover:text-foreground hover:shadow-sm",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div
          key={active.id}
          className="panel-enter overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-border sm:rounded-3xl"
        >
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <p className="text-sm font-medium text-accent">{active.label}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                {active.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                {active.description}
              </p>
            </div>
            <div className="relative min-h-[240px] bg-[#0a0a0b] sm:min-h-[320px]">
              <Image
                src={active.image}
                alt={active.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
