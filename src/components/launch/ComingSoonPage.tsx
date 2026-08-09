import Image from "next/image";
import Link from "next/link";
import { LaunchCountdown } from "@/components/launch/LaunchCountdown";
import { LaunchNotifyForm } from "@/components/launch/LaunchNotifyForm";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import {
  LAUNCH_AT_LABEL,
  launchPage,
} from "@/lib/launch/config";
import { siteConfig } from "@/data/site";

export function ComingSoonPage() {
  const page = launchPage;

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <section className="gradient-hero relative overflow-hidden pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.35] noise-overlay" />
        <Container className="relative">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Logo size="lg" className="pointer-events-none" />
            <p className="mt-8 text-sm font-medium tracking-wide text-accent">
              {page.hero.eyebrow}
            </p>
            <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl lg:leading-[1.1]">
              {page.hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {page.hero.description}
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-xl">
            <p className="mb-4 text-center text-sm font-medium text-muted">
              Countdown to {LAUNCH_AT_LABEL.combined}
            </p>
            <LaunchCountdown />
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium tracking-wide text-accent">
              What is LawGPT?
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              {siteConfig.description}
            </p>
          </div>
        </Container>
      </section>

      <section className="gradient-section py-16 sm:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
            <div>
              <p className="text-sm font-medium tracking-wide text-accent">
                {page.preview.eyebrow}
              </p>
              <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {page.preview.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {page.preview.description}
              </p>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0b] shadow-lg ring-1 ring-black/10 sm:rounded-3xl">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <div className="ml-3 flex-1 truncate rounded-md bg-white/5 px-3 py-1.5 text-xs text-white/50 ring-1 ring-white/10">
                  app.lawgptapp.com
                </div>
              </div>
              <div className="relative aspect-[16/10]">
                <Image
                  src={page.preview.image}
                  alt={page.preview.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium tracking-wide text-accent">
              At launch
            </p>
            <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              What opens with LawGPT
            </h2>
            <ul className="mt-8 space-y-3 text-left">
              {page.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 rounded-2xl bg-white px-5 py-4 text-sm font-medium text-foreground shadow-sm ring-1 ring-border sm:text-base"
                >
                  <span
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent"
                    aria-hidden
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="gradient-section border-y border-border py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium tracking-wide text-accent">
              Launch announcement
            </p>
            <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {LAUNCH_AT_LABEL.combined}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {page.announcement}
            </p>
          </div>
        </Container>
      </section>

      <section id="notify" className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-lg text-center">
            <p className="text-sm font-medium tracking-wide text-accent">
              Stay close
            </p>
            <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {page.notify.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              {page.notify.description}
            </p>
            <div className="mt-8 text-left">
              <LaunchNotifyForm />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-12">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {page.social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-foreground shadow-sm ring-1 ring-border transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                {item.label}
              </a>
            ))}
          </div>
        </Container>
      </section>

      <footer className="border-t border-border bg-surface-soft py-8">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
            <p>© {new Date().getFullYear()} LawGPT. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="transition-colors hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="transition-colors hover:text-foreground"
              >
                Terms
              </Link>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
