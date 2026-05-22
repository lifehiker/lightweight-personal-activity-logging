# ReadLog

ReadLog is a private, mobile-friendly reading log built with Next.js 15, TypeScript, Tailwind CSS, Auth.js, Prisma, SQLite, Stripe, and Resend.

## Local Development

```bash
npm ci
npx prisma generate
npx prisma db push
npm run dev
```

The app uses SQLite by default:

```bash
DATABASE_URL="file:./dev.db"
AUTH_SECRET="replace-with-a-random-secret"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

External services are optional. Without Stripe, Resend, Google OAuth, or Plausible credentials, the app uses guarded fallbacks and still runs.

## Verification

```bash
npm run build
docker build .
```

The Dockerfile uses Next.js standalone output and initializes the SQLite schema at container startup with `prisma db push`.

## Environment

See `.env.example` for all supported variables. Production should override `AUTH_SECRET` and provide Stripe/Resend/Google credentials only when those integrations are needed.
