# LawGPT Technical SEO Report

**Date:** 9 August 2026  
**Site:** https://lawgptapp.com  
**Scope:** Production-grade Technical SEO only (no visual redesign)

---

## Completed SEO

### Global metadata (Next.js Metadata API)
- Unique title + description on homepage, platform, workflows index, all workflow landings, Legal Guides index, all guide articles, pricing, about, contact, and all legal pages
- Canonical URLs on all indexable routes
- Open Graph + Twitter Card metadata sitewide
- Robots metadata (`index` / `follow` + Googlebot image/snippet directives) via root layout and page helpers (`src/lib/seo.ts`)
- `metadataBase`, theme color / viewport, authors, publisher, Apple web app hints

### Structured data (Schema.org JSON-LD)
| Surface | Schemas |
|---------|---------|
| Homepage | Organization, WebSite, SoftwareApplication |
| Workflow landings | SoftwareApplication, FAQPage, BreadcrumbList |
| Workflows index | CollectionPage / ItemList, BreadcrumbList |
| Legal Guides index | CollectionPage / ItemList, BreadcrumbList |
| Guide articles | Article, FAQPage, BreadcrumbList |
| Pricing | SoftwareApplication (+ Offers), FAQPage, WebPage, BreadcrumbList |
| Platform | SoftwareApplication, FAQPage, BreadcrumbList |
| About | Organization, AboutPage, BreadcrumbList |
| Contact | Organization, ContactPage, FAQPage, BreadcrumbList |
| Legal pages | WebPage, BreadcrumbList |

### Crawl infrastructure
- Auto-generated `sitemap.xml` via `src/app/sitemap.ts`
- Auto-generated `robots.txt` via `src/app/robots.ts`
- `/resources` permanent redirect → `/academy` (Next redirect + `permanentRedirect`)

### Social sharing
- Default brand OG / Twitter image: `/brand/og.png`
- Workflow OG images: workflow hero assets
- Legal Guide OG images: guide hero assets
- Platform / Guides landing OG: product imagery

### PWA
- `public/site.webmanifest` (theme `#1769ff`, 192 / 512 / maskable icons)
- Browser icon: `src/app/icon.png`
- Apple touch icon: `src/app/apple-icon.png`
- Android-oriented icons: `/brand/icon-192.png`, `/brand/icon-512.png`
- Theme color via `viewport.themeColor`

### Internal linking
- Workflow pages → Legal Guides, Platform, Pricing
- Guide articles → workflow, related guides, Platform, Pricing, guides index
- Guides landing → Workflows, Platform, Pricing
- Homepage → Platform / Guides / Pricing previews + workflows explorer
- Nav/footer continue to cover major hubs

### Image SEO
- `next/image` throughout (lazy by default; heroes use `priority`)
- Video poster alts restored (VideoCard / InlineVideo)
- Brand + product assets use descriptive `alt` / `imageAlt` fields
- Width/height provided via `next/image` or explicit dimensions on logo

### Breadcrumb UI + schema
- Present on workflows, guides, platform, pricing, about, contact, legal pages
- Matching BreadcrumbList JSON-LD on those surfaces

---

## Indexed pages (sitemap)

**Static hubs (11)**  
`/`, `/platform`, `/workflows`, `/academy`, `/pricing`, `/about`, `/contact`, `/privacy`, `/terms`, `/cookies`, `/disclaimer`

**Workflow landings (5)**  
`/workflows/wrongful-termination`  
`/workflows/consumer-complaint`  
`/workflows/cheque-bounce`  
`/workflows/police-refusing-fir`  
`/workflows/drunk-driving`

**Legal Guides**  
All guides from `src/data/guides` at `/academy/{slug}` (~50 articles)

**Excluded from sitemap**  
`/api/*`, `/resources` (redirect only)

---

## URL strategy

Live SEO-friendly paths are unchanged:

- Workflows: `/workflows/{slug}`
- Legal Guides: `/academy/{slug}` (UI label: “Legal Guides”)
- No query-string content URLs; no numeric IDs in paths

**Note:** A `/legal-guides/...` path was *not* introduced (no new pages / no redesign of URL architecture). If a public rename is desired later, add permanent redirects from `/academy` → `/legal-guides` in a dedicated release.

---

## Remaining recommendations

1. **Wide OG cards (1200×630)** — current default brand mark is 512×512. Design dedicated landscape OG templates for homepage and campaigns.
2. **Search Console / Bing Webmaster** — submit `https://lawgptapp.com/sitemap.xml` after deploy.
3. **hreflang** — only if you ship multi-language locales later.
4. **Guide markdown link audit** — convert remaining plain-text `/platform` mentions inside guide bodies into markdown links where editorial review allows.
5. **Dedicated `/legal-guides` alias** — optional permanent redirect strategy if marketing prefers that URL wording.
6. **Rich-result testing** — re-validate Organization / FAQ / Article after production deploy with Google Rich Results Test.
7. **Analytics + Consent** — wire analytics cookies to Cookie Policy categories when a measurement tool is chosen.
8. **Core Web Vitals monitoring** — track LCP on workflow/guide heroes after launch.

---

## Verification checklist

- [x] Production build compiles
- [x] `sitemap.ts` / `robots.ts` present
- [x] Metadata helpers used across major routes
- [x] Structured data present for required page types
- [x] Internal hub links added without visual redesign
- [x] PWA manifest + icons + theme color

---

## Key files

```
src/lib/seo.ts
src/app/sitemap.ts
src/app/robots.ts
src/components/seo/HomeJsonLd.tsx
src/components/seo/*JsonLd.tsx
public/site.webmanifest
public/brand/*
docs/seo-report.md
```
