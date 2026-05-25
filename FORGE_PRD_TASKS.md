# ReadLog PRD Completion Checklist

## Foundation
- [x] Next.js App Router project with TypeScript and Tailwind.
- [x] `next.config.ts` uses `output: "standalone"`.
- [x] Local-safe environment helpers avoid hard failures when credentials are missing.
- [x] Prisma client is generated lazily through local singleton helper.
- [x] Confirm `npm run build` passes after final changes.
- [x] Confirm dev server starts without crashing.

## Data Model
- [x] `User` model supports account profile, subscription status, and Stripe customer ID.
- [x] Auth.js `Account`, `Session`, and `VerificationToken` models exist.
- [x] `LoginCode` model supports passwordless email-code sign-in.
- [x] `LogEntry` model supports title, normalized title, author, date, pages read, rating, note, timestamps, and user ownership.
- [x] Indexes support user/date history and title grouping.

## Auth
- [x] Email-code passwordless sign-in flow.
- [x] Optional Google OAuth provider guarded by missing-env checks.
- [x] Private authenticated app layout redirects unauthenticated users to `/signin`.
- [x] Session callback includes user ID and subscription status.
- [x] Basic private profile editing.
- [x] Auth.js trusts the deployment proxy host to prevent `UntrustedHost` failures on Forge/Coolify domains.
- [x] Email-code verification is handled by a server action so sign-in works reliably before/after client hydration.

## Core App Pages
- [x] `/app` dashboard with quick-add form, recent logs, plan usage, and onboarding empty state.
- [x] `/app/history` history list sorted by most recent with title/author search.
- [x] `/app/stats` yearly stats view gated to Premium.
- [x] `/app/export` CSV export view gated to Premium.
- [x] `/app/settings` profile and billing management.
- [x] `/app/books/[slug]` book detail view showing all logs for a title.

## Core Workflows
- [x] Add book/reading log entry.
- [x] Edit log entry.
- [x] Delete log entry.
- [x] Search/filter history by title or author.
- [x] Calculate current streak from days with at least one log.
- [x] Calculate longest streak.
- [x] Calculate yearly books and total entries.
- [x] Enforce free tier 30-entry limit.
- [x] Show upgrade prompts near usage limits and gated Premium pages.

## API / Server Actions
- [x] Server action: request login code.
- [x] Server action: create log entry.
- [x] Server action: update log entry.
- [x] Server action: delete log entry.
- [x] Server action: update profile.
- [x] API route: CSV export.
- [x] API route: Stripe checkout.
- [x] API route: Stripe billing portal.
- [x] API route: Stripe webhook.

## Billing, Email, Analytics, Storage
- [x] Stripe SDK is lazy-loaded only inside request paths.
- [x] Stripe checkout gracefully redirects when credentials are unavailable.
- [x] Stripe portal gracefully redirects when credentials/customer are unavailable.
- [x] Stripe webhook upgrades users, handles subscription update/deletion lifecycle, and sends confirmation email when configured.
- [x] Resend SDK is lazy-loaded only inside email send path.
- [x] Email fallback logs development codes and keeps local sign-in usable without Resend.
- [x] Welcome email path exists.
- [x] Upgrade confirmation email path exists.
- [x] SQLite local/runtime fallback is configured for credential-free operation.
- [x] Plausible analytics script is optional and disabled unless domain env is set.

## Marketing / SEO
- [x] Homepage targets private reading log positioning.
- [x] `/pricing` explains free and Premium tiers.
- [x] `/private-reading-log-app` SEO landing page.
- [x] `/goodreads-alternative` SEO landing page.
- [x] `/storygraph-alternative` SEO landing page.
- [x] `/reading-log-app-no-social` SEO landing page.
- [x] `/app-to-track-books-read` SEO landing page.
- [x] `/book-tracker-app` SEO landing page.
- [x] `/reading-log-template` SEO landing page.
- [x] `/features/history` feature SEO page.
- [x] `/features/streaks` feature SEO page.
- [x] `/features/export` feature SEO page.
- [x] Privacy and terms pages.
- [x] Sitemap and robots routes.
- [x] Blog post: best private alternatives to Goodreads.
- [x] Blog post: how to keep a reading log without spreadsheets.
- [x] Blog post: simple reading tracker vs Goodreads.
- [x] FAQ schema on landing/SEO pages.

## Docker / Deployment
- [x] Production Dockerfile exists.
- [x] Dockerfile builds standalone Next output.
- [x] Dockerfile copies existing `public/` directory.
- [x] Dockerfile initializes Prisma schema on container startup for SQLite fallback.
- [x] Docker runtime sets `AUTH_TRUST_HOST=true` for Auth.js behind the deployment proxy.
- [x] `.dockerignore` excludes local env files, prior build output, `node_modules`, and the local SQLite dev database from the image context.
- [x] Attempt `docker build .`; blocked by Docker daemon socket permissions in this environment.

## Verification
- [x] Run `npm run build`.
- [x] Start dev server.
- [x] Smoke-test primary public routes.
- [x] Smoke-test authenticated/local sign-in flow.
- [x] Smoke-test add/edit/delete/search/navigation/export gates.
- [x] Visual review pages for professional layout and responsive issues.
- [x] Create `HUMAN_INPUT_NEEDED.md` for external credentials.
- [x] Create `FORGE_COMPLETION_AUDIT.md` mapping requirements to implementation files.

## Phase Notes

### Foundation
- Read `PRD.md` and `BUILD_INSTRUCTIONS.md` end-to-end before implementation review.
- The installed Next package does not include `node_modules/next/dist/docs/`, so Next behavior was validated with the local installed package, type checking, and `next build`.

### Data / Auth
- Prisma SQLite fallback is in sync with the schema via `npx prisma db push`.
- Email-code credentials sign-in was smoke-tested through the NextAuth callback endpoint using a local development login code.
- Browser smoke testing exposed and verified the fix for a hydration-sensitive sign-in submit path; the code form now posts through a server action and redirects to `/app`.

### Core Workflows
- Public routes, protected redirects, authenticated navigation, history search, book detail, stats, settings, CSV export, and Stripe fallback routes were smoke-tested on the dev server.
- Create, update, and delete log workflows were exercised through the rendered Next server-action forms.

### Billing / Integrations
- Stripe SDK and Resend SDK remain lazy-loaded behind missing-env guards.
- Stripe webhook now handles checkout completion plus subscription updated/deleted events.
- Free-tier cap logic was verified against a local 30-entry free user.

### QA
- `npm run build` passes.
- `npm run lint` passes.
- Clean dependency install with `npm ci --ignore-scripts` followed by `npx prisma generate` passes.
- Dev server started successfully at `http://localhost:3001`.
- `/api/auth/session` returns `200` when requested with `Host: lightweight-personal-activity-logging.forge.yoursiteguru.com`, confirming the deployment log's Auth.js `UntrustedHost` failure is fixed.
- Authenticated credentials smoke test creates a session and renders `/app` and `/app/history`.
- Playwright browser smoke test for email sign-in plus add/edit/delete/search navigation passed.
- Browser smoke testing covered the rendered marketing, sign-in, dashboard, history, and CRUD surfaces for layout and interaction regressions.
- `docker build .` was attempted but the environment denied access to `/var/run/docker.sock`.
