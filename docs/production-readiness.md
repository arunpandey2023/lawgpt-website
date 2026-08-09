# Production Readiness Audit — LawGPT Website

**Date:** 9 August 2026  
**Scope:** Full repository engineering quality for first public release  
**Constraint:** No redesign; no new product features

---

## Issues Found

### Repository hygiene

- Dead components never imported: `FaqSection`, home `Pricing`, `PlaceholderPage`
- Unused barrels: `src/data/index.ts`, `src/lib/contact/index.ts`
- Create-next-app leftover SVGs in `public/` (`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`)
- Unused CSS keyframes/utilities (`animate-fade-in`, `animate-float`, `animate-pulse-soft`, `animate-progress`)
- Deprecated unused `Logo` prop (`markClassName`)
- Default README still described create-next-app / Geist fonts

### Quality gates

- ESLint failed on `react-hooks/set-state-in-effect` in `ContactForm`, `Navbar`, `GlobalSearch`
- TypeScript (`tsc --noEmit`) was already clean

### Security & operations

- No HTTP security headers in `next.config.ts`
- `X-Powered-By` still enabled by default
- Contact and launch-notify APIs had no rate limiting
- Console email provider logged full message bodies (unsafe if used in production)
- Launch notify store is in-memory only (architecture placeholder — emails do not survive restart)

### SEO / launch gate consistency

- Root layout always sent indexable robots while the public site was gated
- `sitemap.xml` listed the full site during pre-launch
- `robots.txt` allowed `/` during pre-launch

### Accessibility

- FAQ accordion lacked `aria-controls` / panel linkage
- Workflow / stage explorers missing `aria-controls` / `aria-labelledby`
- Mobile menu icon missing `aria-hidden`
- Footer / nav “Start Free” used `#start` (broken off the homepage)
- Countdown used noisy `aria-live="polite"` every second

### Configuration

- README lacked real setup, env, launch, and deploy guidance

---

## Issues Fixed

| Area | Fix |
|------|-----|
| Dead code | Removed unused components, barrels, and create-next-app SVGs |
| CSS | Removed unused animation utilities; kept `animate-fade-up` / `panel-enter` |
| Lint | Refactored ContactForm category sync, mod-key via `useSyncExternalStore`, search dialog remount via `sessionKey` |
| Security headers | Added CSP (pragmatic baseline), `nosniff`, referrer, permissions, frame options; `poweredByHeader: false` |
| Rate limits | In-memory limits on `/api/contact` and `/api/launch-notify` |
| Email console provider | Redacts body text in production logs |
| Launch SEO | `noindex` root robots when not launched; reduced sitemap; restricted `robots.txt` |
| A11y | FAQ / explorers ARIA, menu icon, quieter countdown label, `/#start` links |
| Docs | Replaced README; added this report; `npm run typecheck` script |

---

## Remaining Recommendations

These are intentional follow-ups — not blockers for a gated Coming Soon deploy, but required before treating notify/contact as high-volume production surfaces.

1. **Persist launch notify** — replace `MemoryLaunchNotifyStore` with Resend Audiences, a DB, or ESP; current API is UI-complete only.
2. **Verify Resend domain** — `lawgptapp.com` must be verified before `CONTACT_FROM=noreply@lawgptapp.com` works in production.
3. **Strong preview secret** — set a long random `SITE_PREVIEW_SECRET` in production; rotate if leaked.
4. **Distributed rate limits** — in-memory limits reset per instance; add Redis/edge limits before heavy traffic.
5. **CAPTCHA** — wire Turnstile/reCAPTCHA when spam appears (`CONTACT_CAPTCHA_*` already reserved).
6. **OG image** — replace 512×512 brand square with 1200×630 landscape for richer social previews.
7. **Real social profile URLs** — footer / Coming Soon still use network roots as placeholders.
8. **CSP tighten** — current CSP allows `'unsafe-inline'` / `'unsafe-eval'` for Next.js pragmatism; tighten with nonces when feasible.
9. **HSTS** — enable at the CDN/host layer (Vercel) rather than only in app config.
10. **Lighthouse CI** — run mobile+desktop on `/coming-soon` pre-launch and key routes post-launch; track regressions.

---

## Deployment Checklist

### Pre-deploy

- [ ] `npm install`
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] `.env.local` / host env configured from `.env.example` (no secrets in git)
- [ ] `SITE_LAUNCHED=false` for public Coming Soon
- [ ] `SITE_PREVIEW_SECRET` set (long random)
- [ ] Resend API key set; domain verified for production from-address
- [ ] `CONTACT_INTERNAL_RECIPIENTS` confirmed
- [ ] Smoke-test contact form against a staging/preview deployment
- [ ] Confirm Coming Soon on production host; full site via preview cookie
- [ ] Confirm `/privacy` and `/terms` reachable while gated
- [ ] Confirm `robots.txt` / `sitemap.xml` are pre-launch shaped

### Launch day

- [ ] Set `SITE_LAUNCHED=true` on the host
- [ ] Redeploy / restart so the Proxy reads the new value
- [ ] Verify `/` is the full site and `/coming-soon` redirects home
- [ ] Verify sitemap lists full routes and robots allow indexing
- [ ] Spot-check homepage, workflows, guides, contact, pricing
- [ ] Submit sitemap in Search Console after launch (optional but recommended)

---

## Rollback Checklist

1. Set `SITE_LAUNCHED=false` on the host and redeploy/restart.
2. Confirm public traffic is rewritten to Coming Soon.
3. Keep preview secret valid so the team can still QA the full site.
4. If a bad build was promoted, redeploy the previous known-good deployment artifact/commit.
5. If contact email misbehaves, set `CONTACT_EMAIL_PROVIDER=console` only on non-production; on production, fix Resend config or temporarily show the fallback email copy (API already returns safe 503 messaging).
6. Do **not** commit `.env.local` or rotate secrets into the repository during rollback.

---

## Lighthouse Expectations

Targets for a clean production build on broadband / mid-tier mobile. Treat as goals, not guarantees, until measured on the deployed URL.

| Surface | Perf | A11y | Best Practices | SEO |
|---------|------|------|----------------|-----|
| Coming Soon (`SITE_LAUNCHED=false`) | 90+ | 95+ | 95+ | 90+ (noindex expected) |
| Homepage (launched) | 85+ | 95+ | 95+ | 95+ |
| Workflow detail | 80+ | 95+ | 95+ | 95+ |
| Legal guide article | 85+ | 95+ | 95+ | 95+ |
| Contact | 90+ | 95+ | 95+ | 95+ |

Notes:

- Workflow pages ship multiple PNGs/MP4s; LCP depends on hero image priority and network.
- Global search and interactive explorers are client islands; keep them out of the critical hero path (already the case).
- Prefer Lighthouse against the deployed host, not only `localhost`.

---

## Verification (post-audit)

Commands expected to pass cleanly:

```bash
npm install
npm run lint
npm run build
```

Optional:

```bash
npm run typecheck
```

---

## Related docs

- [Launch switch](./launch-switch.md)
- [SEO report](./seo-report.md)
- [Environment template](../.env.example)
