# Changelog

All notable changes to the LawGPT marketing website are documented in this file.

## [1.0.0] — 2026-08-09

First production-ready release of the LawGPT website.

### Product & content

- Full marketing site for LawGPT (AI Operating System for Legal Services)
- Homepage with hero, product demo, trusted-by, workflow explorer, workflow cards, differentiation, and final CTA
- Platform, Workflows, Legal Guides (`/academy`), Pricing, About, and Contact hubs
- Five live workflow detail experiences:
  - Wrongful Termination
  - Consumer Complaint
  - Cheque Bounce
  - Police Refusing FIR
  - Drunk Driving
- Legal Guides with structured articles and internal linking
- Legal documents: Privacy, Terms, Cookies, Disclaimer
- Brand system: official logo, icons, OG image, web manifest

### Coming Soon launch gate

- Environment-controlled public gate (`SITE_LAUNCHED`)
- Coming Soon page with countdown to 15 August 2026, 07:45 AM IST
- Localhost bypass, force-gate QA mode, and preview cookie unlock
- Notify-me architecture (`/api/launch-notify`) with in-memory store placeholder
- Pre-launch SEO: `noindex`, restricted `robots.txt`, legal-only sitemap

### Contact & email

- Business Contact Hub with validated form and honeypot
- Server-side validation and Resend delivery (SendGrid/console reserved)
- Internal notification recipients kept off the public UI
- In-memory rate limiting on contact and launch-notify APIs

### Engineering quality

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4
- Metadata API, sitemap, robots, and JSON-LD technical SEO
- Security headers and `X-Powered-By` disabled
- Accessibility improvements (FAQ/explorer ARIA, focus labels, quieter countdown)
- Production readiness audit with dead-code and unused-asset cleanup
- Documented setup: README, `.env.example`, launch/SEO/production docs

### Known follow-ups (non-blocking for gated deploy)

- Persist launch notify signups to a durable store or ESP
- Verify `lawgptapp.com` in Resend for production from-addresses
- Replace network-root social placeholders with official profile URLs
- Prefer a 1200×630 Open Graph image for richer link previews
