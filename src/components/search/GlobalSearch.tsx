"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useTransition,
  type KeyboardEvent,
} from "react";
import { useSearch } from "@/components/search/SearchProvider";
import { useModKeyLabel } from "@/lib/mod-key";
import {
  groupSearchHits,
  highlightMatches,
  searchItems,
} from "@/lib/search";
import { cn } from "@/lib/utils";
import type { SearchHit, SearchItem } from "@/types/search";
import {
  searchCategoryLabels,
  searchCategoryOrder,
} from "@/types/search";

function HighlightedText({ text, query }: { text: string; query: string }) {
  const parts = highlightMatches(text, query);
  return (
    <>
      {parts.map((part, index) =>
        part.match ? (
          <mark
            key={index}
            className="rounded-sm bg-accent-soft px-0.5 text-foreground"
          >
            {part.text}
          </mark>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </>
  );
}

function SearchDialog({
  index,
  onIndexLoaded,
}: {
  index: SearchItem[] | null;
  onIndexLoaded: (items: SearchItem[]) => void;
}) {
  const { setOpen } = useSearch();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPending, startTransition] = useTransition();
  const modKey = useModKeyLabel();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    if (!index) {
      void import("@/data/searchIndex").then((module) => {
        onIndexLoaded(module.searchIndex);
      });
    }
    return () => window.cancelAnimationFrame(frame);
  }, [index, onIndexLoaded]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const hits = useMemo(() => {
    if (!index || !query.trim()) return [] as SearchHit[];
    return searchItems(index, query);
  }, [index, query]);

  const groups = useMemo(() => groupSearchHits(hits), [hits]);

  const flatHits = useMemo(() => {
    const list: SearchHit[] = [];
    for (const category of searchCategoryOrder) {
      const group = groups[category];
      if (group) list.push(...group);
    }
    return list;
  }, [groups]);

  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const goTo = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((value) =>
          flatHits.length === 0 ? 0 : (value + 1) % flatHits.length,
        );
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((value) =>
          flatHits.length === 0
            ? 0
            : (value - 1 + flatHits.length) % flatHits.length,
        );
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        const target = flatHits[activeIndex];
        if (target) goTo(target.href);
      }
    },
    [activeIndex, close, flatHits, goTo],
  );

  useEffect(() => {
    const active = listRef.current?.querySelector<HTMLElement>(
      '[data-active="true"]',
    );
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, flatHits]);

  let runningIndex = -1;

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]"
        aria-label="Close search"
        onClick={close}
      />

      <div className="relative mx-auto flex min-h-full items-start justify-center px-3 pt-[12vh] sm:px-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelId}
          className="animate-fade-up w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-border"
          onKeyDown={onKeyDown}
        >
          <div className="flex items-center gap-3 border-b border-border px-4">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 shrink-0 text-muted"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              aria-hidden
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3-3" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              id={labelId}
              type="search"
              value={query}
              onChange={(event) => {
                const value = event.target.value;
                setActiveIndex(0);
                startTransition(() => setQuery(value));
              }}
              placeholder="Search guides, workflows, FAQs…"
              className="h-14 w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              aria-autocomplete="list"
              aria-controls="global-search-results"
            />
            <kbd className="hidden rounded-md bg-surface-soft px-1.5 py-0.5 text-[11px] font-medium text-muted ring-1 ring-border sm:inline-block">
              Esc
            </kbd>
            <button
              type="button"
              onClick={close}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-surface-soft hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              aria-label="Close search"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                aria-hidden
              >
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div
            id="global-search-results"
            ref={listRef}
            className="max-h-[min(28rem,58vh)] overflow-y-auto overscroll-contain p-2"
            role="listbox"
            aria-label="Search results"
          >
            {!index && (
              <p className="px-3 py-8 text-center text-sm text-muted">
                Loading search index…
              </p>
            )}

            {index && !query.trim() && (
              <div className="px-3 py-6 text-sm text-muted">
                <p className="font-medium text-foreground">Quick search</p>
                <p className="mt-1">
                  Find Legal Guides, workflows, platform pages, and FAQs.
                </p>
                <p className="mt-4 text-xs">
                  Tip: press{" "}
                  <kbd className="rounded bg-surface-soft px-1 py-0.5 ring-1 ring-border">
                    {modKey}
                  </kbd>{" "}
                  +{" "}
                  <kbd className="rounded bg-surface-soft px-1 py-0.5 ring-1 ring-border">
                    K
                  </kbd>{" "}
                  anytime.
                </p>
              </div>
            )}

            {index && query.trim() && flatHits.length === 0 && !isPending && (
              <p className="px-3 py-8 text-center text-sm text-muted">
                No results for “{query.trim()}”.
              </p>
            )}

            {index &&
              query.trim() &&
              searchCategoryOrder.map((category) => {
                const group = groups[category];
                if (!group || group.length === 0) return null;

                return (
                  <div key={category} className="mb-2">
                    <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
                      {searchCategoryLabels[category]}
                    </p>
                    <ul className="space-y-0.5">
                      {group.map((hit) => {
                        runningIndex += 1;
                        const itemIndex = runningIndex;
                        const active = itemIndex === activeIndex;

                        return (
                          <li key={hit.id}>
                            <Link
                              href={hit.href}
                              role="option"
                              aria-selected={active}
                              data-active={active ? "true" : "false"}
                              className={cn(
                                "block rounded-xl px-3 py-2.5 transition-colors",
                                active
                                  ? "bg-accent-soft"
                                  : "hover:bg-surface-soft",
                              )}
                              onMouseEnter={() => setActiveIndex(itemIndex)}
                              onClick={(event) => {
                                event.preventDefault();
                                goTo(hit.href);
                              }}
                            >
                              <p className="text-sm font-medium text-foreground">
                                <HighlightedText text={hit.title} query={query} />
                              </p>
                              <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted">
                                <HighlightedText
                                  text={hit.description}
                                  query={query}
                                />
                              </p>
                              <p className="mt-1 text-[11px] text-muted/80">
                                {hit.href}
                              </p>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-2.5 text-[11px] text-muted">
            <span className="hidden sm:inline">
              <kbd className="rounded bg-surface-soft px-1 py-0.5 ring-1 ring-border">
                ↑↓
              </kbd>{" "}
              navigate{" "}
              <kbd className="ml-2 rounded bg-surface-soft px-1 py-0.5 ring-1 ring-border">
                ↵
              </kbd>{" "}
              open
            </span>
            <span>
              {flatHits.length > 0
                ? `${flatHits.length} result${flatHits.length === 1 ? "" : "s"}`
                : "LawGPT search"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GlobalSearch() {
  const { open, sessionKey } = useSearch();
  const [index, setIndex] = useState<SearchItem[] | null>(null);

  if (!open) return null;

  return (
    <SearchDialog
      key={sessionKey}
      index={index}
      onIndexLoaded={setIndex}
    />
  );
}
