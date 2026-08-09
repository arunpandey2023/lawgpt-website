"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { heroShowcaseSlides } from "@/data/productMedia";
import { cn } from "@/lib/utils";

interface HeroProductShowcaseProps {
  className?: string;
}

export function HeroProductShowcase({ className }: HeroProductShowcaseProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = heroShowcaseSlides[index] ?? heroShowcaseSlides[0];

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % heroShowcaseSlides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const id = window.setInterval(next, 3800);
    return () => window.clearInterval(id);
  }, [next, paused]);

  if (!slide) return null;

  return (
    <div
      className={cn("relative mx-auto w-full max-w-5xl", className)}
      id="demo"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-b from-accent/15 via-accent/5 to-transparent blur-2xl sm:-inset-6" />

      <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0b] shadow-lg ring-1 ring-black/10 sm:rounded-3xl">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <div className="ml-3 flex-1 truncate rounded-md bg-white/5 px-3 py-1.5 text-xs text-white/50 ring-1 ring-white/10">
            app.lawgptapp.com · Case Workspace
          </div>
        </div>

        <div className="relative aspect-[16/10] bg-black sm:aspect-[16/9]">
          {heroShowcaseSlides.map((item, i) => (
            <div
              key={item.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-out",
                i === index ? "opacity-100" : "opacity-0",
              )}
              aria-hidden={i !== index}
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover object-top"
                priority={i === 0}
              />
            </div>
          ))}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 sm:p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-accent-muted">
              {slide.label}
            </p>
            <p className="mt-1 text-sm font-medium text-white sm:text-base">
              {slide.caption}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3">
          <div className="flex flex-wrap gap-1.5">
            {heroShowcaseSlides.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index
                    ? "w-6 bg-accent"
                    : "w-1.5 bg-white/25 hover:bg-white/45",
                )}
                aria-label={`Show ${item.label}`}
                aria-current={i === index}
              />
            ))}
          </div>
          <p className="hidden text-xs text-white/40 sm:block">
            Real LawGPT product · Cheque Bounce workflow
          </p>
        </div>
      </div>
    </div>
  );
}
