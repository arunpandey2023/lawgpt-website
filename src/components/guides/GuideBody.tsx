import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { GuideSection } from "@/types/guide";

interface GuideBodyProps {
  sections: GuideSection[];
}

function renderRichText(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\((\/[^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <Link
        key={`link-${key++}`}
        href={match[2]}
        className="font-medium text-accent underline-offset-2 hover:underline"
      >
        {match[1]}
      </Link>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

export function GuideBody({ sections }: GuideBodyProps) {
  return (
    <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
      {sections.map((section, index) => {
        switch (section.type) {
          case "heading":
            if (section.level === 2) {
              return (
                <h2
                  key={index}
                  className="pt-4 text-2xl font-semibold tracking-tight text-foreground"
                >
                  {section.text}
                </h2>
              );
            }
            return (
              <h3
                key={index}
                className="pt-2 text-xl font-semibold tracking-tight text-foreground"
              >
                {section.text}
              </h3>
            );
          case "paragraph":
            return (
              <p key={index} className="text-muted">
                {renderRichText(section.text)}
              </p>
            );
          case "list":
            return section.ordered ? (
              <ol key={index} className="list-decimal space-y-2 pl-5 text-muted">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            ) : (
              <ul key={index} className="list-disc space-y-2 pl-5 text-muted">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <aside
                key={index}
                className="rounded-2xl bg-accent-soft/60 p-5 ring-1 ring-accent/15 sm:p-6"
              >
                {section.title && (
                  <p className="mb-2 text-sm font-semibold text-accent">
                    {section.title}
                  </p>
                )}
                <p className="text-sm leading-relaxed text-foreground sm:text-base">
                  {section.text}
                </p>
              </aside>
            );
          case "table":
            return (
              <div
                key={index}
                className="overflow-x-auto rounded-2xl ring-1 ring-border"
              >
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-surface-soft text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      {section.headers.map((header) => (
                        <th key={header} className="px-4 py-3 sm:px-5">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.rows.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="border-t border-border bg-white"
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="px-4 py-3 text-muted sm:px-5"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "checklist":
            return (
              <div
                key={index}
                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-border sm:p-6"
              >
                {section.title && (
                  <p className="mb-3 text-sm font-semibold text-foreground">
                    {section.title}
                  </p>
                )}
                <ul className="space-y-2.5">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-muted"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          case "image":
            return (
              <figure
                key={index}
                className="overflow-hidden rounded-2xl bg-[#0a0a0b] shadow-sm ring-1 ring-border"
              >
                <div className="relative aspect-video">
                  <Image
                    src={section.src}
                    alt={section.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover object-top"
                  />
                </div>
                {section.caption && (
                  <figcaption className="bg-white px-4 py-3 text-sm text-muted">
                    {section.caption}
                  </figcaption>
                )}
              </figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
