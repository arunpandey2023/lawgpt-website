"use client";

import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { Video } from "@/types";

interface VideoCardProps {
  video: Video;
  className?: string;
}

export function VideoCard({ video, className }: VideoCardProps) {
  const [playing, setPlaying] = useState(false);
  const hasSrc = Boolean(video.src);

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
    >
      {playing && hasSrc && video.src ? (
        <div className="aspect-video bg-black">
          <video
            className="h-full w-full"
            src={video.src}
            poster={video.poster}
            controls
            autoPlay
            playsInline
            preload="metadata"
            aria-label={video.title}
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => hasSrc && setPlaying(true)}
          disabled={!hasSrc}
          className="relative block w-full aspect-video overflow-hidden bg-[#0a0a0b] text-left transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-default"
          aria-label={
            hasSrc ? `Play ${video.title}` : `${video.title} coming soon`
          }
        >
          {video.poster ? (
            <Image
              src={video.poster}
              alt={`${video.title} video thumbnail`}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover object-top opacity-90 transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <>
              <div className="absolute inset-0 opacity-30 noise-overlay" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(23,105,255,0.25),transparent_50%)]" />
            </>
          )}

          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-sm transition duration-300",
                hasSrc && "group-hover:scale-105 group-hover:bg-white/25",
              )}
            >
              {hasSrc ? (
                <svg
                  viewBox="0 0 24 24"
                  className="ml-0.5 h-5 w-5 fill-white"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <span className="text-[10px] font-medium text-white/80">Soon</span>
              )}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-3">
            <span className="text-sm font-medium text-white/90">
              {video.thumbnailLabel}
            </span>
            <Badge className="bg-black/40 text-white ring-0 backdrop-blur-sm">
              {video.duration}
            </Badge>
          </div>
        </button>
      )}

      <div className="p-4">
        <div className="mb-1.5 flex items-center gap-2">
          <Badge variant={video.type === "short" ? "accent" : "default"}>
            {video.type === "short" ? "30s" : "Walkthrough"}
          </Badge>
          {!hasSrc && <Badge variant="muted">Coming soon</Badge>}
        </div>
        <h3 className="text-sm font-semibold tracking-tight text-foreground">
          {video.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          {video.description}
        </p>
      </div>
    </article>
  );
}
