# LawGPT Website

Official marketing website for **LawGPT** — the AI Operating System for Legal Services.

The site presents the product platform, live legal workflows, Legal Guides, pricing, company information, and a production contact hub. Before public launch, traffic is gated behind a Coming Soon experience controlled by environment configuration.

**Live domain (production):** [https://lawgptapp.com](https://lawgptapp.com)  
**Product app:** [https://app.lawgptapp.com](https://app.lawgptapp.com)

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Email | Resend (`/api/contact`) |
| Runtime | Node.js 20+ |

---

## Installation

```bash
git clone <repository-url>
cd lawgpt-website
npm install
cp .env.example .env.local
```

Edit `.env.local` with your values. Do not commit `.env.local` or any file containing API keys.

---

## Environment variables

Copy from [`.env.example`](.env.example). Summary:

### Launch gate

| Variable | Description |
|----------|-------------|
| `SITE_LAUNCHED` | Set to `true` to open the full public site. Any other value keeps the Coming Soon gate. |
| `SITE_LAUNCH_FORCE_GATE` | Set to `true` to force Coming Soon even on localhost (QA). |
| `SITE_PREVIEW_SECRET` | Optional secret for full-site preview via `/?preview=<secret>`. |

See [docs/launch-switch.md](docs/launch-switch.md).

### Contact email

| Variable | Description |
|----------|-------------|
| `CONTACT_EMAIL_PROVIDER` | `resend` (recommended), `sendgrid`, or `console` (local only). |
| `RESEND_API_KEY` | Resend API key (required when provider is `resend`). |
| `CONTACT_FROM` | Verified sender, e.g. `LawGPT <noreply@lawgptapp.com>`. |
| `CONTACT_REPLY_TO` | Public reply-to address. |
| `CONTACT_INTERNAL_RECIPIENTS` | Comma-separated internal notification recipients. |
| `SENDGRID_API_KEY` | Optional, if using SendGrid. |
| `CONTACT_CAPTCHA_PROVIDER` / `CONTACT_CAPTCHA_SECRET` | Reserved for future spam protection. |

The sending domain must be verified in Resend before production delivery from `@lawgptapp.com`.

Optional smoke test after configuring Resend:

```bash
npm run verify:contact-email
```

---

## Local development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Localhost bypasses the Coming Soon gate by default so the full site is available for development. To preview the gate locally:

```env
SITE_LAUNCHED=false
SITE_LAUNCH_FORCE_GATE=true
```

### Useful scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run verify:contact-email` | Send a test contact email via the configured provider |

---

## Production deployment

1. Configure host environment variables from `.env.example`.
2. Keep `SITE_LAUNCHED=false` until the public launch instant.
3. Set a strong random `SITE_PREVIEW_SECRET` for internal preview.
4. Configure Resend with a verified domain and production `RESEND_API_KEY`.
5. Build and start:

```bash
npm install
npm run lint
npm run build
npm run start
```

On launch day, set `SITE_LAUNCHED=true` and redeploy/restart so the Proxy picks up the new value.

Checklists and rollback steps: [docs/production-readiness.md](docs/production-readiness.md).

---

## Folder structure

```text
lawgpt-website/
├── docs/                 # Launch, SEO, production readiness
├── public/               # Static assets (brand, workflows, about)
├── scripts/              # Operational scripts (email verify)
├── src/
│   ├── app/              # App Router pages, layouts, API routes
│   ├── components/       # UI (home, platform, workflows, launch, shared)
│   ├── data/             # Content, navigation, SEO copy, media maps
│   ├── lib/              # Contact, launch, SEO, rate limit, utilities
│   ├── proxy.ts          # Coming Soon / launch gate
│   └── types/            # Shared TypeScript types
├── .env.example          # Env template (no secrets)
├── CHANGELOG.md
├── next.config.ts
└── package.json
```

---

## Documentation

- [Launch switch](docs/launch-switch.md)
- [SEO report](docs/seo-report.md)
- [Production readiness](docs/production-readiness.md)
- [Changelog](CHANGELOG.md)

---

## Contact

**LawGPT AI Products (P.) Limited**  
L-148, Sector-6, HSR Layout, Bengaluru, Karnataka 560102, India

| Channel | Details |
|---------|---------|
| General | contact@lawgptapp.com |
| Support | support@lawgptapp.com |
| Phone | +91 9880062570 · +91 9986606069 |
| Hours | Monday–Friday, 9:00 AM – 5:00 PM IST |

For partnership, demo, media, or support requests, use the contact form at `/contact` once the full site is available, or email the addresses above.
