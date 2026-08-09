import type { Metadata } from "next";
import Link from "next/link";
import { WorkflowCard } from "@/components/shared/WorkflowCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { comingSoonWorkflows, workflows } from "@/data/workflows";
import { getAllWorkflowPageSlugs } from "@/data/workflowPages";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/data/site";

const title = "Legal Workflows — Guided Paths to Filing-Ready Packages";
const description =
  "Browse LawGPT legal workflows for wrongful termination, consumer complaints, cheque bounce, FIR refusal, drunk driving, and more.";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: "/workflows",
  keywords: [
    "LawGPT workflows",
    "legal workflows India",
    "wrongful termination workflow",
    "cheque bounce workflow",
    "consumer complaint workflow",
  ],
});

export default function WorkflowsPage() {
  const livePages = new Set(getAllWorkflowPageSlugs());
  const featured = workflows.filter((w) => livePages.has(w.slug));
  const upcomingLanding = workflows.filter((w) => !livePages.has(w.slug));

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Workflows",
        item: absoluteUrl("/workflows"),
      },
    ],
  };

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: absoluteUrl("/workflows"),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: featured.map((workflow, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: workflow.title,
        url: absoluteUrl(workflow.href),
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }}
      />

      <section className="gradient-hero border-b border-border pb-12 pt-10 sm:pb-16 sm:pt-14">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-medium text-foreground">Workflows</li>
            </ol>
          </nav>

          <p className="text-sm font-medium tracking-wide text-accent">Workflows</p>
          <h1 className="mt-3 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Guided legal workflows, built like software
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Start with a live workflow landing page, or explore matters coming next.
            Five production workflow pages are available now.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/workflows/wrongful-termination" size="lg">
              Wrongful Termination
            </Button>
            <Button href="/workflows/consumer-complaint" variant="secondary" size="lg">
              Consumer Complaint
            </Button>
            <Button href="/workflows/cheque-bounce" variant="secondary" size="lg">
              Cheque Bounce
            </Button>
            <Button href="/workflows/police-refusing-fir" variant="secondary" size="lg">
              Police Refusing FIR
            </Button>
            <Button href="/workflows/drunk-driving" variant="secondary" size="lg">
              Drunk Driving
            </Button>
          </div>
        </Container>
      </section>

      <Section
        eyebrow="Live landing pages"
        title="Ready to explore"
        description="Production workflow pages with demos, documents, screenshots, and FAQs."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((workflow, i) => (
            <Reveal key={workflow.id} delay={(Math.min(i % 3, 3) as 0 | 1 | 2 | 3)}>
              <WorkflowCard workflow={workflow} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        className="gradient-section"
        eyebrow="Coming soon"
        title="More matters on the roadmap"
        description="Additional legal problems will ship as guided workflows over time."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[...upcomingLanding, ...comingSoonWorkflows].map((workflow, i) => (
            <Reveal key={workflow.id} delay={(Math.min(i % 3, 3) as 0 | 1 | 2 | 3)}>
              <WorkflowCard workflow={workflow} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/academy" variant="secondary">
            Explore Legal Guides →
          </Button>
          <Button href="/platform" variant="outline">
            Explore Platform →
          </Button>
          <Button href="/pricing" variant="outline">
            View Pricing →
          </Button>
        </div>
      </Section>
    </>
  );
}
