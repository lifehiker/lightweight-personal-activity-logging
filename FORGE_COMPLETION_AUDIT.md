# Forge Completion Audit

## Product Scope
- ReadLog branding and private reading-log positioning: `src/lib/site.ts`, `src/app/page.tsx`, `src/components/marketing/hero.tsx`.
- Mobile-first authenticated app shell: `src/app/app/layout.tsx`, `src/components/layout/app-shell.tsx`, `src/app/globals.css`.

## Data Model
- User profile, subscription status, Stripe customer id, Auth.js models, passwordless login codes, and private log entries: `prisma/schema.prisma`.
- Prisma singleton: `src/lib/prisma.ts`.

## Auth and Profile
- Passwordless email-code sign-in with local fallback code display: `src/app/signin/page.tsx`, `src/components/auth/sign-in-form.tsx`, `src/app/signin/actions.ts`, `src/lib/auth-helpers.ts`.
- Optional Google OAuth only when credentials exist: `src/lib/auth.ts`, `src/lib/env.ts`.
- Protected app session helpers and app-route enforcement: `src/lib/session.ts`, `src/app/app/layout.tsx`.
- Profile update and sign-out: `src/app/app/settings/page.tsx`, `src/app/app/actions.ts`, `src/components/auth/sign-out-button.tsx`.

## Core Logging Workflows
- Quick-add reading log form with title, author, date, pages, rating, and note: `src/components/logs/log-entry-form.tsx`, `src/lib/log-schema.ts`.
- Create, edit, and delete server actions with ownership enforcement: `src/app/app/actions.ts`, `src/components/logs/edit-log-dialog.tsx`, `src/components/logs/log-entry-card.tsx`.
- Dashboard recent logs and onboarding empty states: `src/app/app/page.tsx`, `src/components/logs/log-entry-list.tsx`.
- Searchable history sorted by most recent: `src/app/app/history/page.tsx`.
- Book detail view grouped by normalized title: `src/app/app/books/[slug]/page.tsx`, `src/lib/utils.ts`.

## Stats, Limits, and Export
- Current streak, longest streak, books this year, and entries this year: `src/lib/stats.ts`, `src/components/stats/stats-cards.tsx`, `src/app/app/stats/page.tsx`.
- Free 30-entry cap and Premium gating: `src/lib/billing.ts`, `src/lib/site.ts`, `src/components/upgrade/upgrade-banner.tsx`.
- Premium CSV export route and export page: `src/app/api/export/csv/route.ts`, `src/app/app/export/page.tsx`.

## Billing and Email Integrations
- Stripe checkout with missing-env fallback: `src/app/api/stripe/checkout/route.ts`, `src/lib/stripe.ts`, `src/app/pricing/page.tsx`.
- Stripe billing portal with missing-env fallback: `src/app/api/stripe/portal/route.ts`, `src/app/app/settings/page.tsx`.
- Stripe webhook for Premium activation, subscription changes, and upgrade confirmation email: `src/app/api/webhooks/stripe/route.ts`.
- Resend transactional email wrapper with local logging fallback: `src/lib/email.ts`.
- External credentials documented: `HUMAN_INPUT_NEEDED.md`.

## Marketing, SEO, and Legal
- Homepage, pricing, privacy, and terms: `src/app/page.tsx`, `src/app/pricing/page.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`.
- SEO landing pages: `src/app/private-reading-log-app/page.tsx`, `src/app/goodreads-alternative/page.tsx`, `src/app/storygraph-alternative/page.tsx`, `src/app/reading-log-app-no-social/page.tsx`, `src/app/app-to-track-books-read/page.tsx`, `src/app/book-tracker-app/page.tsx`, `src/app/reading-log-template/page.tsx`.
- Feature SEO pages: `src/app/features/history/page.tsx`, `src/app/features/streaks/page.tsx`, `src/app/features/export/page.tsx`.
- Required blog posts: `src/app/blog/best-private-alternatives-to-goodreads/page.tsx`, `src/app/blog/how-to-keep-a-reading-log-without-spreadsheets/page.tsx`, `src/app/blog/simple-reading-tracker-vs-goodreads/page.tsx`.
- FAQ schema and shared SEO content structure: `src/components/marketing/faq.tsx`, `src/components/marketing/seo-page.tsx`.
- Sitemap and robots: `src/app/sitemap.ts`, `src/app/robots.ts`.

## Deployment
- Next standalone output and dev smoke-test origin allowlist: `next.config.ts`.
- Production Dockerfile with existing `public/` copy, standalone server copy, static asset copy, Prisma schema copy, Prisma client generation, and runtime SQLite schema sync: `Dockerfile`.
- Build avoids Google-hosted Next fonts and build-time network SDK initialization: confirmed by source scan of `src/`.

## Verification Results
- `npm run build`: passed on May 25, 2026.
- Dev server: started successfully on `http://localhost:3001` because port 3000 was already occupied.
- Route smoke test: public/SEO/legal/sitemap/robots routes returned 200; unauthenticated protected app routes returned 307 redirects.
- Browser workflow: `npx playwright test forge-smoke.spec.ts --reporter=line` passed, covering email-code sign-in, create log, edit log, history search, and delete log.
- Visual review: desktop homepage plus mobile sign-in and authenticated dashboard screenshots were reviewed for layout and polish.
- Docker build: attempted, but local Docker socket access was denied at `unix:///var/run/docker.sock`; no Dockerfile path issue was found in static inspection.

## Intentionally Deferred External-Credential Items
- Google OAuth requires `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`; email-code sign-in works without them.
- Live Stripe checkout, portal, and webhook signature verification require Stripe keys and price ids; routes fail gracefully without them.
- Real email delivery requires Resend credentials; development fallback logs/shows codes and keeps auth usable.
- Plausible analytics requires `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`; the app runs without analytics.
