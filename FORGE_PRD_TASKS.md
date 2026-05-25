# FORGE PRD Tasks

## Foundation
- [x] Read `PRD.md` end-to-end.
- [x] Read `BUILD_INSTRUCTIONS.md` end-to-end.
- [x] Confirm Next.js standalone output is configured.
- [x] Confirm no `next/font/google` usage.
- [x] Confirm network-backed SDKs are lazy-initialized behind missing-env guards.

## Data Model
- [x] Prisma schema includes `User` with subscription and Stripe customer fields.
- [x] Prisma schema includes Auth.js `Account`, `Session`, and `VerificationToken` models.
- [x] Prisma schema includes private `LogEntry` records with title, author, logged date, pages, rating, note, normalized title, and ownership indexes.
- [x] Prisma schema includes email-code login persistence for passwordless fallback.
- [x] Prisma client singleton is configured.

## Auth
- [x] Passwordless email-code sign-in is implemented.
- [x] Google OAuth is optional and enabled only when credentials are present.
- [x] Sessions include user id and subscription status.
- [x] Protected app routes require an authenticated session.
- [x] Personal profile settings can be updated.

## Core App Pages
- [x] `/app` dashboard with quick add, recent logs, plan usage, and onboarding empty states.
- [x] `/app/history` with searchable private reading history.
- [x] `/app/stats` with premium yearly stats and free-tier upgrade prompt.
- [x] `/app/export` with premium CSV export prompt/link.
- [x] `/app/settings` with profile, plan, and billing controls.
- [x] `/app/books/[slug]` book detail view showing logs for a normalized title.

## API Routes and Server Actions
- [x] Create log entry server action with validation and free-tier cap enforcement.
- [x] Update log entry server action with ownership enforcement.
- [x] Delete log entry server action with ownership enforcement.
- [x] Profile update server action.
- [x] CSV export route gated to premium users.
- [x] Stripe checkout route with missing-env fallback.
- [x] Stripe billing portal route with missing-env fallback.
- [x] Stripe webhook route that upgrades users and sends confirmation emails.
- [x] Auth route handler.

## Core Workflows
- [x] Sign in with email code.
- [x] Create a private reading log in one mobile-first form.
- [x] Edit an existing log.
- [x] Delete an existing log.
- [x] Search history by title or author.
- [x] View grouped book detail history.
- [x] Calculate current and longest streaks.
- [x] Calculate yearly stats.
- [x] Enforce 30-entry free cap.
- [x] Gate stats and export behind premium status.

## Integrations and Safe Fallbacks
- [x] Stripe checkout lazy-initializes and returns a graceful setup response without credentials.
- [x] Stripe portal lazy-initializes and returns a graceful setup response without credentials.
- [x] Stripe webhook is present for real subscriptions when credentials are configured.
- [x] Resend lazy-initializes and logs email fallback output without credentials.
- [x] Welcome email path is implemented for new passwordless users.
- [x] Upgrade confirmation email path is implemented after paid webhook events.
- [x] External credential requirements are documented in `HUMAN_INPUT_NEEDED.md`.

## Marketing and SEO Pages
- [x] Homepage targets private reading log positioning.
- [x] Pricing page describes free and premium tiers.
- [x] `/private-reading-log-app` exists.
- [x] `/goodreads-alternative` exists.
- [x] `/storygraph-alternative` exists.
- [x] `/reading-log-app-no-social` exists.
- [x] `/app-to-track-books-read` exists.
- [x] `/book-tracker-app` exists.
- [x] `/reading-log-template` exists.
- [x] Feature SEO pages for history, streaks, and export exist.
- [x] Three requested blog posts exist.
- [x] Privacy and terms pages exist.
- [x] `robots.ts` and `sitemap.ts` exist.

## Docker and Deployment
- [x] `next.config.ts` uses `output: "standalone"`.
- [x] `next.config.ts` allows the local dev smoke-test origin to avoid Next dev overlay noise.
- [x] Dockerfile builds dependencies, generates Prisma client, runs `next build`, copies standalone output, static assets, Prisma schema, and existing `public/`.
- [x] Docker runtime initializes SQLite schema with `prisma db push`.
- [x] `npm run build` passes after current verification.
- [ ] Docker build passes if Docker is available locally. Blocked in this environment by Docker socket permission.

## Verification
- [x] Run `npm run build`.
- [x] Start dev server and confirm it does not crash.
- [x] Smoke-test primary public pages.
- [x] Smoke-test protected app redirects/sign-in.
- [x] Smoke-test interactive forms and navigation where possible without external credentials.
- [x] Visually review homepage, sign-in, and mobile authenticated dashboard screenshots.
- [x] Create `FORGE_COMPLETION_AUDIT.md` mapping PRD requirements to implementation files.
