"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { InlineVideo, type InlineVideoHandle } from "@/components/shared/InlineVideo";
import type { WorkflowPageData } from "@/types";

interface WorkflowHeroProps {
  page: WorkflowPageData;
}

export function WorkflowHero({ page }: WorkflowHeroProps) {
  const videoRef = useRef<InlineVideoHandle>(null);
  const heroVideo = page.walkthrough.video ?? page.demoVideo;

  const playHeroVideo = () => {
    document.getElementById("hero-video")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    videoRef.current?.play();
  };

  return (
    <section className="gradient-hero relative overflow-hidden pb-12 pt-10 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16">
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] noise-overlay" />
      <Container className="relative">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <li>
              <Link href="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                href="/workflows"
                className="transition-colors hover:text-foreground"
              >
                Workflows
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-foreground">
              {page.hero.eyebrow.replace(" workflow", "")}
            </li>
          </ol>
        </nav>

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
          <div>
            <p className="animate-fade-up text-sm font-medium tracking-wide text-accent">
              {page.hero.eyebrow}
            </p>
            <h1 className="animate-fade-up mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl lg:leading-[1.1]">
              {page.hero.title}
            </h1>
            <p className="animate-fade-up mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {page.hero.description}
            </p>
            <div className="animate-fade-up mt-8 flex flex-wrap gap-3">
              <Button href={page.hero.primaryCta.href} size="lg">
                {page.hero.primaryCta.label}
              </Button>
              {heroVideo ? (
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  onClick={playHeroVideo}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current"
                    aria-hidden
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  {page.hero.secondaryCta.label}
                </Button>
              ) : (
                <Button
                  href={page.hero.secondaryCta.href}
                  variant="secondary"
                  size="lg"
                >
                  {page.hero.secondaryCta.label}
                </Button>
              )}
            </div>
          </div>

          <div className="animate-fade-up relative">
            <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-b from-accent/15 via-accent/5 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0b] shadow-lg ring-1 ring-black/10 sm:rounded-3xl">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <div className="ml-3 flex-1 truncate rounded-md bg-white/5 px-3 py-1.5 text-xs text-white/50 ring-1 ring-white/10">
                  {heroVideo
                    ? `${heroVideo.durationLabel} demo · ${page.hero.eyebrow.replace(" workflow", "")}`
                    : `app.lawgptapp.com · ${page.hero.eyebrow.replace(" workflow", "")}`}
                </div>
              </div>

              {heroVideo ? (
                <InlineVideo
                  ref={videoRef}
                  id="hero-video"
                  src={heroVideo.src}
                  poster={heroVideo.poster}
                  title={heroVideo.title}
                  className="rounded-none shadow-none ring-0"
                />
              ) : (
                <div className="relative aspect-[16/10] sm:aspect-video">
                  <Image
                    src={page.hero.image}
                    alt={page.hero.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover object-top"
                  />
                </div>
              )}
            </div>
            {heroVideo && (
              <p className="mt-3 text-center text-xs text-muted lg:text-left">
                Plays inside LawGPT · no YouTube redirect
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
