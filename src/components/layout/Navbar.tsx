"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { useSearch } from "@/components/search/SearchProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { mainNav } from "@/data/navigation";
import { useModKeyLabel } from "@/lib/mod-key";
import { cn } from "@/lib/utils";

function SearchTrigger({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const { setOpen } = useSearch();
  const modKey = useModKeyLabel();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl text-sm font-medium text-muted-foreground transition hover:bg-white/80 hover:text-foreground",
        compact
          ? "h-10 w-10 justify-center ring-1 ring-border/80"
          : "h-9 px-3 ring-1 ring-border/80",
        className,
      )}
      aria-label="Search the site"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        aria-hidden
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3-3" strokeLinecap="round" />
      </svg>
      {!compact && (
        <>
          <span className="hidden xl:inline">Search…</span>
          <kbd className="ml-1 hidden items-center gap-0.5 rounded-md bg-surface-soft px-1.5 py-0.5 text-[10px] font-medium text-muted ring-1 ring-border lg:inline-flex">
            {modKey}K
          </kbd>
        </>
      )}
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { setOpen: setSearchOpen } = useSearch();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
        <Container className="!px-0">
          <div
            className={cn(
              "rounded-2xl border transition-all duration-300",
              scrolled || open
                ? "border-border/70 bg-white/75 shadow-md backdrop-blur-xl"
                : "border-white/60 bg-white/55 shadow-sm backdrop-blur-lg",
            )}
          >
            <div className="flex h-14 items-center justify-between gap-4 px-4 sm:h-16 sm:px-5">
              <Logo />

              <nav
                className="hidden items-center gap-0.5 lg:flex"
                aria-label="Primary"
              >
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-white/80 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="hidden items-center gap-2 lg:flex">
                <SearchTrigger />
                <Button href="/#start" size="sm">
                  Start Free
                </Button>
              </div>

              <div className="flex items-center gap-2 lg:hidden">
                <SearchTrigger compact />
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-foreground ring-1 ring-border/80 transition hover:bg-white/70"
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                  onClick={() => setOpen((v) => !v)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    aria-hidden
                  >
                    {open ? (
                      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                    ) : (
                      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <div
              className={cn(
                "border-t border-border/70 lg:hidden",
                open ? "block" : "hidden",
              )}
            >
              <div className="flex flex-col gap-1 px-3 py-3">
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl px-3 py-3 text-base font-medium text-foreground transition hover:bg-white/80"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  type="button"
                  className="rounded-xl px-3 py-3 text-left text-base font-medium text-foreground transition hover:bg-white/80"
                  onClick={() => {
                    setOpen(false);
                    setSearchOpen(true);
                  }}
                >
                  Search
                </button>
                <div className="pt-2">
                  <Button
                    href="/#start"
                    className="w-full"
                    onClick={() => setOpen(false)}
                  >
                    Start Free
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </header>
      <GlobalSearch />
    </>
  );
}
