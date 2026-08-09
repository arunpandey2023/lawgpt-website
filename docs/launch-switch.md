# Launch Gate — LawGPT website

## Overview

Until launch, public visitors only see the Coming Soon page. The full website stays deployed and testable. Flipping one environment variable reveals the entire site—no route renames and no code deploy required beyond updating the env var (and redeploying/restarting so the new value is loaded).

**Launch instant:** 15 August 2026, 07:45 AM IST  
**Countdown target (UTC):** `2026-08-15T02:15:00.000Z`

---

## Environment variables

| Variable | Values | Purpose |
|----------|--------|---------|
| `SITE_LAUNCHED` | `false` (default behavior if unset/anything other than `true`) / `true` | Master launch switch |
| `SITE_LAUNCH_FORCE_GATE` | `true` / unset | Force Coming Soon even on `localhost` (QA) |
| `SITE_PREVIEW_SECRET` | random string | Lets teammates preview the full site before launch via cookie |

Add these to `.env.local` (local) and your host’s env settings (Vercel/etc.).

### Example — pre-launch (production)

```env
SITE_LAUNCHED=false
SITE_PREVIEW_SECRET=replace-with-a-long-random-string
```

### Example — local development (full site)

```env
SITE_LAUNCHED=false
# Do not set SITE_LAUNCH_FORCE_GATE
```

Localhost (`localhost`, `127.0.0.1`, `[::1]`) bypasses the gate automatically so developers always get the full website.

### Example — local QA of Coming Soon

```env
SITE_LAUNCHED=false
SITE_LAUNCH_FORCE_GATE=true
```

Then open `http://localhost:3000` — you should see Coming Soon.

### Example — launch day

```env
SITE_LAUNCHED=true
```

Remove or ignore `SITE_LAUNCH_FORCE_GATE`. After restart/redeploy, every visitor gets the full site. `/coming-soon` redirects to `/`.

---

## How the gate works

Implementation:

- `src/proxy.ts` — request gate (Next.js Proxy convention)
- `src/lib/launch/config.ts` — launch timestamp + env helpers
- `src/app/coming-soon/page.tsx` — Coming Soon UI
- `src/app/layout.tsx` — hides global Navbar/Footer when the gate serves Coming Soon (`x-lawgpt-coming-soon` header)

### When `SITE_LAUNCHED` is not `true`

1. **Localhost** → full site (unless `SITE_LAUNCH_FORCE_GATE=true`)
2. **Valid preview cookie** → full site
3. **Allowed paths** → pass through  
   `/coming-soon`, `/privacy`, `/terms`, `/cookies`, `/disclaimer`, `/api/launch-notify`
4. **Everything else** → rewrite to `/coming-soon` (URL can stay `/`; content is Coming Soon)
5. **SEO** → root metadata is `noindex`; `robots.txt` disallows the full site; `sitemap.xml` only lists legal pages that remain public

### When `SITE_LAUNCHED=true`

- Middleware is a no-op pass-through for the full site
- `/coming-soon` permanently redirects to `/`
- Visitors never see Coming Soon again

---

## Admin / preview access (non-localhost)

1. Set `SITE_PREVIEW_SECRET` in the deployed environment.
2. Visit:

```text
https://your-domain.com/?preview=YOUR_SECRET
```

3. Middleware sets an httpOnly cookie (`lawgpt_site_preview`) and redirects to the same URL without the query param.
4. You now browse the full website until the cookie expires (30 days) or is cleared.

---

## Enable Coming Soon (pre-launch deploy)

1. Ensure `SITE_LAUNCHED` is `false` (or unset—only `true` launches).
2. Optionally set `SITE_PREVIEW_SECRET` for stakeholder previews.
3. Deploy.
4. Verify in an incognito window (not localhost) that `/` shows Coming Soon.
5. Verify countdown targets **15 August 2026, 07:45 AM IST**.
6. Verify Privacy / Terms links work from the Coming Soon footer.

---

## Launch the website

1. In the hosting dashboard (or `.env` for the production environment), set:

```env
SITE_LAUNCHED=true
```

2. Redeploy **or** restart the Node server so the process picks up the new env var.  
   (Middleware reads `process.env` at runtime; a restart/redeploy is required—no code change.)
3. Smoke-test:
   - `/` loads the homepage (not Coming Soon)
   - `/coming-soon` redirects to `/`
   - Nav, workflows, guides, contact still work
4. Optional cleanup: remove `SITE_LAUNCH_FORCE_GATE` and rotate/remove `SITE_PREVIEW_SECRET`.

---

## Rollback procedure

If you need to return to Coming Soon after a mistaken launch:

1. Set `SITE_LAUNCHED=false` in production env.
2. Redeploy / restart.
3. Confirm public traffic is rewritten to Coming Soon.
4. Keep `SITE_PREVIEW_SECRET` so the team can still QA the full site.

No database migration and no route surgery are required.

---

## Notify Me form

- UI: Coming Soon “Notify me” form
- API: `POST /api/launch-notify`
- Service: `src/lib/launch/notify.ts` — **architecture only** (in-memory / console in development)
- Replace the store implementation later with a database or ESP without changing the page UI

---

## Files to know

```
src/proxy.ts
src/lib/launch/config.ts
src/lib/launch/notify.ts
src/app/coming-soon/page.tsx
src/components/launch/*
src/app/api/launch-notify/route.ts
docs/launch-switch.md
```

---

## Checklist

- [ ] `SITE_LAUNCHED=false` in production before 15 Aug 2026
- [ ] Coming Soon verified from a non-localhost client
- [ ] Countdown shows correct IST launch moment
- [ ] Preview secret works for internal review
- [ ] On launch day: set `SITE_LAUNCHED=true` and restart/redeploy
- [ ] Confirm `/coming-soon` redirects home after launch
