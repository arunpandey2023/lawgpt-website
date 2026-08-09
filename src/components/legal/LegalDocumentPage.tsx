import Link from "next/link";
import type { ReactNode } from "react";
import { LegalToc } from "@/components/legal/LegalToc";
import { Container } from "@/components/ui/Container";
import { legalDocuments } from "@/data/legal";
import type { LegalBlock, LegalDocument, LegalList } from "@/types/legal";

function renderRichText(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\((\/[^)]+|mailto:[^)]+|https?:\/\/[^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const href = match[2];
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    if (isExternal) {
      parts.push(
        <a
          key={`link-${key++}`}
          href={href}
          className="font-medium text-accent underline-offset-2 hover:underline"
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {match[1]}
        </a>,
      );
    } else {
      parts.push(
        <Link
          key={`link-${key++}`}
          href={href}
          className="font-medium text-accent underline-offset-2 hover:underline"
        >
          {match[1]}
        </Link>,
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

function BlockContent({ block }: { block: LegalBlock }) {
  return (
    <>
      {block.paragraphs?.map((paragraph, index) => (
        <p
          key={`${index}-${paragraph.slice(0, 24)}`}
          className="w-full max-w-none whitespace-normal break-words text-muted"
        >
          {renderRichText(paragraph)}
        </p>
      ))}
      {block.lists?.map((list, index) => (
        <ListContent key={`list-${index}`} list={list} />
      ))}
    </>
  );
}

function ListContent({ list }: { list: LegalList }) {
  const Tag = list.ordered ? "ol" : "ul";
  return (
    <Tag
      className={
        list.ordered
          ? "w-full max-w-none list-decimal space-y-2 break-words pl-5 text-muted"
          : "w-full max-w-none list-disc space-y-2 break-words pl-5 text-muted"
      }
    >
      {list.items.map((item, index) => (
        <li key={`${index}-${item.slice(0, 24)}`}>{renderRichText(item)}</li>
      ))}
    </Tag>
  );
}

interface LegalDocumentPageProps {
  document: LegalDocument;
}

export function LegalDocumentPage({ document }: LegalDocumentPageProps) {
  const tocItems = document.sections.map((section) => ({
    id: section.id,
    title: section.title,
  }));

  const related = legalDocuments.filter((item) => item.slug !== document.slug);

  return (
    <>
      <section className="gradient-hero relative overflow-hidden pb-10 pt-10 sm:pb-12 sm:pt-14">
        <div className="pointer-events-none absolute inset-0 opacity-[0.35] noise-overlay" />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-foreground"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <span className="transition-colors">Legal</span>
              </li>
              <li aria-hidden>/</li>
              <li className="font-medium text-foreground">
                {document.shortTitle}
              </li>
            </ol>
          </nav>

          <div className="w-full max-w-none">
            <p className="animate-fade-up text-sm font-medium tracking-wide text-accent">
              Legal
            </p>
            <h1 className="animate-fade-up mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl lg:leading-[1.1]">
              {document.title}
            </h1>
            <p className="animate-fade-up mt-3 text-sm text-muted">
              Last updated{" "}
              <time dateTime={document.lastUpdated}>
                {document.lastUpdatedLabel}
              </time>
            </p>
            <p className="animate-fade-up mt-5 w-full max-w-none whitespace-normal break-words text-base leading-relaxed text-muted sm:text-lg">
              {document.intro}
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-20 pt-10 sm:pb-24 sm:pt-12 lg:pb-28">
        <Container>
          <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start lg:gap-12 xl:grid-cols-[260px_minmax(0,1fr)] xl:gap-16">
            <aside className="mb-10 lg:mb-0">
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-border lg:sticky lg:top-28 lg:p-6">
                <LegalToc items={tocItems} />
              </div>
            </aside>

            <article className="min-w-0 w-full max-w-none space-y-12 text-base leading-relaxed">
              {document.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28"
                >
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-[1.65rem]">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4">
                    <BlockContent block={section} />
                    {section.subsections?.map((subsection) => (
                      <div
                        key={subsection.id}
                        id={subsection.id}
                        className="scroll-mt-28 space-y-3 pt-2"
                      >
                        <h3 className="text-lg font-semibold tracking-tight text-foreground">
                          {subsection.title}
                        </h3>
                        <BlockContent block={subsection} />
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              <div className="border-t border-border pt-10">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  Related legal pages
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/${item.slug}`}
                        className="block rounded-xl bg-surface-soft px-4 py-3 text-sm font-medium text-foreground ring-1 ring-border transition-colors hover:bg-white hover:text-accent"
                      >
                        {item.shortTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}
