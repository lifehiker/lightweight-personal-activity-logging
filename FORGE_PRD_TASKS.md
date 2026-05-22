# FORGE PRD Tasks

Status legend: `[ ]` pending, `[~]` in progress, `[x]` complete

Last updated: 2026-05-22

## 1. Foundation

- [x] Read `PRD.md` and `BUILD_INSTRUCTIONS.md` end-to-end
- [x] Initialize Next.js 15 + TypeScript + Tailwind app
- [x] Configure standalone production build in `next.config`
- [x] Install required dependencies and baseline UI primitives
- [x] Establish app branding, theme variables, layout primitives, and navigation
- [x] Configure environment handling with safe defaults and no build-time network dependencies

## 2. Data Model

- [x] Set up Prisma
- [x] Define Auth.js models: `User`, `Account`, `Session`, `VerificationToken`
- [x] Define `LogEntry` model
- [x] Add subscription-related user fields
- [x] Add indexes and generated client
- [x] Choose safe local database fallback for development/build verification

## 3. Auth

- [x] Configure Auth.js / NextAuth
- [x] Implement email one-time-code sign-in flow
- [x] Implement optional Google sign-in with missing-env guards
- [x] Persist sessions with JWT strategy and Prisma-backed users/codes
- [x] Create protected app routing helpers and auth-aware navigation
- [x] Create private profile/settings experience

## 4. Core User-Facing App Pages

- [x] `/app` dashboard
- [x] `/app/history`
- [x] `/app/stats`
- [x] `/app/export`
- [x] `/app/settings`
- [x] `/app/books/[slug]`
- [x] Auth/sign-in pages
- [x] Onboarding empty states and first-log guidance

## 5. Core Workflows

- [x] Create log entry
- [x] Edit log entry
- [x] Delete log entry
- [x] Quick-add mobile-first logging form
- [x] Recent history sorted by most recent
- [x] Search/filter by title or author
- [x] Book detail grouped by title
- [x] Streak calculation
- [x] Yearly stats summary

## 6. Billing / Email / Storage Integrations Or Safe Fallbacks

- [x] Enforce free-tier 30-entry cap
- [x] Premium gating for stats
- [x] Premium gating for CSV export
- [x] Stripe checkout route or guarded fallback
- [x] Stripe billing portal route or guarded fallback
- [x] Stripe webhook handling or documented credential dependency
- [x] Welcome email send path or safe local fallback
- [x] Upgrade confirmation email send path or safe local fallback
- [x] Document any truly external requirements in `HUMAN_INPUT_NEEDED.md`

## 7. API / Server Actions

- [x] Log entry create action
- [x] Log entry update action
- [x] Log entry delete action
- [x] CSV export route
- [x] Stripe checkout route
- [x] Stripe billing portal route
- [x] Stripe webhook route
- [x] Any onboarding/profile update action needed

## 8. Marketing / SEO / Content Pages

- [x] Homepage
- [x] Pricing page
- [x] `/private-reading-log-app`
- [x] `/goodreads-alternative`
- [x] `/storygraph-alternative`
- [x] `/book-tracker-app`
- [x] `/reading-log-template`
- [x] `/features/history`
- [x] `/features/streaks`
- [x] `/features/export`
- [x] Additional keyword page(s) from PRD marketing plan
- [x] Legal pages: privacy policy and terms
- [x] Metadata, OG, robots, sitemap
- [x] Analytics script with no build/runtime crash when env is absent

## 9. Deployment

- [x] Production-ready Dockerfile
- [x] Validate Dockerfile copies only real directories
- [x] Ensure Prisma/client generation works in build image
- [x] Document runtime env vars
- [x] Confirm `npm run build` passes

## 10. Verification / QA

- [x] Start dev server successfully
- [x] Smoke-test public routes
- [x] Smoke-test protected routes
- [x] Smoke-test create/edit/delete log flows
- [x] Smoke-test search and book detail flow
- [x] Smoke-test premium gating/fallback behavior
- [x] Review pages for render/runtime issues and polish UI
- [x] Create `FORGE_COMPLETION_AUDIT.md`

## Phase Notes

### Foundation

- Read-through complete. The installed `next` package did not include `node_modules/next/dist/docs/`, so Next guidance was validated through the current code, generated types, and `next build`.

### Completion pass

- Existing app covered most PRD requirements. Completion work added the missing `/app-to-track-books-read` SEO page, fixed Stripe API version typing, added Prisma Debian binary targets, and updated Docker runtime schema initialization for SQLite.

### Verification

- `npm run build` passes.
- Dev server started on `http://localhost:3001` because port `3000` was already in use.
- Public, protected, authenticated, search/book-detail, export gating, and Stripe fallback routes were smoke-tested.
- `docker build .` was attempted but Docker daemon access was denied by the environment.
- No local Chromium/Playwright binary was available for screenshot-based visual review.
