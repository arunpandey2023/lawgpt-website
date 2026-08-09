"use client";

import Image from "next/image";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export interface InlineVideoHandle {
  play: () => void;
}

interface InlineVideoProps {
  src: string;
  poster?: string;
  title: string;
  className?: string;
  /** Autoplay muted loop when visible — for subtle previews */
  autoPreview?: boolean;
  id?: string;
}

export const InlineVideo = forwardRef<InlineVideoHandle, InlineVideoProps>(
  function InlineVideo(
    { src, poster, title, className, autoPreview = false, id },
    ref,
  ) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [shouldLoad, setShouldLoad] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [userStarted, setUserStarted] = useState(false);

    const startWithSound = () => {
      setShouldLoad(true);
      setUserStarted(true);

      const play = () => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = false;
        video.controls = true;
        void video.play().then(() => setPlaying(true)).catch(() => undefined);
      };

      // Allow state update to mount video first if needed
      requestAnimationFrame(() => {
        if (videoRef.current) play();
        else setTimeout(play, 50);
      });
    };

    useImperativeHandle(ref, () => ({
      play: startWithSound,
    }));

    useEffect(() => {
      const node = containerRef.current;
      if (!node) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        { rootMargin: "200px 0px" },
      );

      observer.observe(node);
      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      const video = videoRef.current;
      if (!video || !shouldLoad || !autoPreview || userStarted) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      const tryPlay = () => {
        video.muted = true;
        void video.play().then(() => setPlaying(true)).catch(() => undefined);
      };

      if (video.readyState >= 2) tryPlay();
      else video.addEventListener("loadeddata", tryPlay, { once: true });

      return () => video.removeEventListener("loadeddata", tryPlay);
    }, [shouldLoad, autoPreview, userStarted]);

    // If userStarted before video mounted, play once available
    useEffect(() => {
      if (!userStarted || !shouldLoad) return;
      const video = videoRef.current;
      if (!video) return;
      video.muted = false;
      video.controls = true;
      void video.play().then(() => setPlaying(true)).catch(() => undefined);
    }, [userStarted, shouldLoad]);

    return (
      <div
        id={id}
        ref={containerRef}
        className={cn(
          "group relative overflow-hidden rounded-2xl bg-black shadow-md ring-1 ring-border",
          className,
        )}
      >
        <div className="relative aspect-video">
          {poster && !shouldLoad && (
            <Image
              src={poster}
              alt={`${title} video preview`}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover object-top"
            />
          )}

          {shouldLoad && (
            <video
              ref={videoRef}
              className="h-full w-full object-cover object-top"
              poster={poster}
              preload="metadata"
              playsInline
              loop={autoPreview && !userStarted}
              muted={autoPreview && !userStarted}
              controls={userStarted}
              aria-label={title}
            >
              <source src={src} type="video/mp4" />
            </video>
          )}

          {!userStarted && (
            <button
              type="button"
              onClick={startWithSound}
              className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors duration-300 hover:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
              aria-label={`Play ${title}`}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-foreground shadow-lg transition-transform duration-300 group-hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  className="ml-0.5 h-6 w-6 fill-current"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              {playing && autoPreview && (
                <span className="absolute bottom-3 left-3 rounded-md bg-black/50 px-2 py-1 text-[11px] text-white/90 backdrop-blur-sm">
                  Preview · click for sound
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    );
  },
);
