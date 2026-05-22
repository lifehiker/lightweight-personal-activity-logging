# FORGE Completion Audit

Date: 2026-05-22

## Requirement Mapping

| PRD requirement | Implementation |
| --- | --- |
| Private ReadLog branding and mobile-first product shell | `src/lib/site.ts`, `src/app/layout.tsx`, `src/app/globals.css`, `src/components/layout/app-shell.tsx`, `src/components/layout/marketing-header.tsx` |
| Account creation and private profile | `src/lib/auth.ts`, `src/lib/auth-helpers.ts`, `src/app/signin/page.tsx`, `src/components/auth/sign-in-form.tsx`, `src/app/app/settings/page.tsx`, `src/app/app/actions.ts` |
| Email one-time-code sign-in with safe fallback | `src/app/signin/actions.ts`, `src/lib/auth-helpers.ts`, `src/lib/email.ts` |
| Optional Google sign-in with missing-env guard | `src/lib/auth.ts`, `src/lib/env.ts`, `src/components/auth/sign-in-form.tsx` |
| Prisma data model for users, auth, login codes, and log entries | `prisma/schema.prisma`, `src/lib/prisma.ts` |
| Add reading log entry fields: title, author, date, pages, rating, note | `src/lib/log-schema.ts`, `src/components/logs/log-entry-form.tsx`, `src/app/app/actions.ts`, `prisma/schema.prisma` |
| Quick-add flow optimized as one primary form | `src/components/logs/log-entry-form.tsx`, `src/app/app/page.tsx` |
| History sorted by most recent | `src/app/app/history/page.tsx`, `src/components/logs/log-entry-list.tsx`, `src/components/logs/log-entry-card.tsx` |
| Search/filter by title or author | `src/app/app/history/page.tsx` |
| Book detail grouped by title | `src/app/app/books/[slug]/page.tsx`, `src/components/logs/log-entry-card.tsx`, `src/lib/utils.ts` |
| Edit/delete entries with ownership enforcement | `src/components/logs/edit-log-dialog.tsx`, `src/components/logs/log-entry-card.tsx`, `src/app/app/actions.ts` |
| Streak and yearly stats calculations | `src/lib/stats.ts`, `src/components/stats/stats-cards.tsx`, `src/app/app/page.tsx`, `src/app/app/stats/page.tsx` |
| Basic onboarding empty states | `src/app/app/page.tsx`, `src/components/logs/log-entry-list.tsx`, `src/app/app/stats/page.tsx` |
| Free 30-entry cap | `src/lib/billing.ts`, `src/app/app/actions.ts`, `src/components/upgrade/upgrade-banner.tsx` |
| Premium gates for unlimited entries, stats, and CSV export | `src/lib/billing.ts`, `src/app/app/stats/page.tsx`, `src/app/app/export/page.tsx`, `src/app/api/export/csv/route.ts` |
| CSV export | `src/app/api/export/csv/route.ts`, `src/app/app/export/page.tsx` |
| Stripe checkout, portal, webhook, and graceful fallback | `src/lib/stripe.ts`, `src/app/api/stripe/checkout/route.ts`, `src/app/api/stripe/portal/route.ts`, `src/app/api/webhooks/stripe/route.ts`, `src/app/pricing/page.tsx` |
| Welcome and upgrade confirmation emails | `src/lib/email.ts`, `src/lib/auth-helpers.ts`, `src/app/api/webhooks/stripe/route.ts` |
| Landing page and pricing page | `src/app/page.tsx`, `src/components/marketing/hero.tsx`, `src/components/marketing/feature-grid.tsx`, `src/components/marketing/faq.tsx`, `src/app/pricing/page.tsx` |
| SEO keyword pages | `src/app/private-reading-log-app/page.tsx`, `src/app/goodreads-alternative/page.tsx`, `src/app/storygraph-alternative/page.tsx`, `src/app/book-tracker-app/page.tsx`, `src/app/app-to-track-books-read/page.tsx`, `src/app/reading-log-app-no-social/page.tsx`, `src/app/reading-log-template/page.tsx`, `src/app/features/history/page.tsx`, `src/app/features/streaks/page.tsx`, `src/app/features/export/page.tsx` |
| Legal pages | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` |
| Robots, sitemap, metadata, analytics fallback | `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/layout.tsx`, per-page metadata exports |
| Deployment with standalone Next.js and SQLite schema initialization | `next.config.ts`, `Dockerfile`, `.env.example`, `README.md` |

## External Credential Items

The app runs without external credentials. The following optional integrations need credentials only for production use and are documented in `HUMAN_INPUT_NEEDED.md`:

- Google OAuth: `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`
- Stripe checkout, portal, and webhooks: `STRIPE_SECRET_KEY`, `STRIPE_MONTHLY_PRICE_ID`, `STRIPE_ANNUAL_PRICE_ID`, `STRIPE_WEBHOOK_SECRET`
- Resend transactional email delivery: `RESEND_API_KEY`, `RESEND_FROM`
- Plausible analytics: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`

When these are absent, UI and server paths degrade gracefully: Google is disabled, Stripe redirects to billing unavailable states, Resend logs/skips email and exposes local sign-in codes for development, and Plausible is not loaded.

## Verification

- `npm ci --ignore-scripts`: passed.
- `npx prisma generate`: passed.
- `npx prisma db push`: passed; local SQLite schema is in sync.
- `npm run build`: passed.
- Dev server: started successfully on `http://localhost:3001` because port `3000` was occupied.
- Public route smoke tests: `/`, `/pricing`, `/signin`, SEO pages, feature pages, legal pages, `/robots.txt`, and `/sitemap.xml` returned `200`.
- Protected route smoke test: unauthenticated `/app` redirected to `/signin`.
- Auth smoke test: local one-time-code credentials sign-in produced a session cookie.
- Authenticated route smoke tests: `/app`, `/app/history`, `/app/history?q=Forge`, `/app/books/forge-smoke-book?title=Forge%20Smoke%20Book`, `/app/settings`, `/app/stats`, and `/app/export` returned `200`.
- Core data workflow smoke tests: created, updated, grouped, searched, exported, and deleted local smoke-test log entries through the same Prisma data model used by the app.
- Premium gating smoke tests: free CSV export returned `403`; Premium CSV export returned `200` with expected CSV columns.
- Stripe fallback smoke test: checkout without Stripe credentials redirected to `/pricing?billing=unavailable`.
- Docker verification: `docker build .` was attempted but the environment denied access to `/var/run/docker.sock`. The Dockerfile was updated according to the project instructions and is ready for an environment with Docker daemon access.
- Browser visual review: no local Chromium/Playwright binary was available. Route-level smoke tests confirmed that pages render without server crashes.
