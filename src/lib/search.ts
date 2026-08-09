import type { SearchCategory, SearchHit, SearchItem } from "@/types/search";
import { searchCategoryOrder } from "@/types/search";

function normalize(value: string): string {
  return value.toLowerCase().normalize("NFKD").replace(/\s+/g, " ").trim();
}

function scoreField(field: string, query: string, weight: number): number {
  const hay = normalize(field);
  const needle = normalize(query);
  if (!needle || !hay) return 0;
  if (hay === needle) return weight * 4;
  if (hay.startsWith(needle)) return weight * 3;
  if (hay.includes(needle)) return weight * 2;

  const tokens = needle.split(" ").filter(Boolean);
  if (tokens.length === 0) return 0;
  let hits = 0;
  for (const token of tokens) {
    if (hay.includes(token)) hits += 1;
  }
  if (hits === 0) return 0;
  return weight * (hits / tokens.length);
}

export function searchItems(
  items: SearchItem[],
  query: string,
  limit = 40,
): SearchHit[] {
  const q = query.trim();
  if (!q) return [];

  const scored: SearchHit[] = [];
  for (const item of items) {
    const score =
      scoreField(item.title, q, 10) +
      scoreField(item.description, q, 4) +
      scoreField((item.keywords ?? []).join(" "), q, 3) +
      scoreField(item.href, q, 1);

    if (score > 0) {
      scored.push({ ...item, score });
    }
  }

  scored.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  return scored.slice(0, limit);
}

export function groupSearchHits(
  hits: SearchHit[],
): Partial<Record<SearchCategory, SearchHit[]>> {
  const groups: Partial<Record<SearchCategory, SearchHit[]>> = {};
  for (const category of searchCategoryOrder) {
    const list = hits.filter((hit) => hit.category === category);
    if (list.length > 0) groups[category] = list;
  }
  return groups;
}

/** Split text into plain and match segments for highlighting. */
export function highlightMatches(
  text: string,
  query: string,
): { text: string; match: boolean }[] {
  const q = query.trim();
  if (!q || !text) return [{ text, match: false }];

  const tokens = [
    ...new Set(
      normalize(q)
        .split(" ")
        .filter((token) => token.length > 0)
        .sort((a, b) => b.length - a.length),
    ),
  ];
  if (tokens.length === 0) return [{ text, match: false }];

  const pattern = new RegExp(
    `(${tokens.map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi",
  );

  const parts: { text: string; match: boolean }[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index), match: false });
    }
    parts.push({ text: match[0], match: true });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), match: false });
  }

  return parts.length > 0 ? parts : [{ text, match: false }];
}
