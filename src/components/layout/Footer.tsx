import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { footerNav, socialLinks } from "@/data/navigation";

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-foreground">{title}</p>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.href + item.label}>
            <Link
              href={item.href}
              className="text-sm text-muted transition-colors duration-200 hover:text-foreground"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ icon }: { icon: (typeof socialLinks)[number]["icon"] }) {
  if (icon === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M6.5 9H3.75v11.25H6.5V9zM5.13 3.75a1.69 1.69 0 100 3.38 1.69 1.69 0 000-3.38zM20.25 13.13c0-3.09-1.65-4.53-3.85-4.53a3.32 3.32 0 00-2.97 1.64h-.08V9H10.7v11.25h2.75v-5.57c0-1.47.28-2.9 2.1-2.9 1.8 0 1.82 1.68 1.82 3v5.47h2.88v-6.12z" />
      </svg>
    );
  }
  if (icon === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M21.6 7.2a2.7 2.7 0 00-1.9-1.9C18 5 12 5 12 5s-6 0-7.7.3a2.7 2.7 0 00-1.9 1.9A28.4 28.4 0 002 12a28.4 28.4 0 00.4 4.8 2.7 2.7 0 001.9 1.9C6 19 12 19 12 19s6 0 7.7-.3a2.7 2.7 0 001.9-1.9A28.4 28.4 0 0022 12a28.4 28.4 0 00-.4-4.8zM10.2 15.2V8.8L15.5 12l-5.3 3.2z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M18.24 3H21l-6.52 7.45L22.2 21h-6.1l-4.77-6.24L5.9 21H3.12l6.98-7.98L1.9 3h6.25l4.3 5.7L18.24 3zm-1.07 16.2h1.67L7 4.7H5.2l11.97 14.5z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-soft">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_repeat(6,minmax(0,1fr))]">
          <div className="max-w-sm lg:pr-4">
            <Logo size="lg" />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              The AI Operating System for Legal Services. Structured workflows,
              lawyer-grade documents, and filing-ready packages.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-muted ring-1 ring-border transition-all duration-200 hover:-translate-y-0.5 hover:text-foreground hover:shadow-sm"
                >
                  <SocialIcon icon={link.icon} />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Platform" items={footerNav.platform} />
          <FooterColumn title="Workflows" items={footerNav.workflows} />
          <FooterColumn title="Legal Guides" items={footerNav.academy} />
          <FooterColumn title="Resources" items={footerNav.resources} />
          <FooterColumn title="Company" items={footerNav.company} />
          <FooterColumn title="Legal" items={footerNav.legal} />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} LawGPT. All rights reserved.
          </p>
          <p className="text-sm text-muted">
            Workflow execution for legal services—not just answers.
          </p>
        </div>
      </Container>
    </footer>
  );
}
