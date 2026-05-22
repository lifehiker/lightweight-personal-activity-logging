export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  authSecret: process.env.AUTH_SECRET || "forge-dev-auth-secret",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  stripeMonthlyPriceId: process.env.STRIPE_MONTHLY_PRICE_ID,
  stripeAnnualPriceId: process.env.STRIPE_ANNUAL_PRICE_ID,
  googleClientId: process.env.AUTH_GOOGLE_ID,
  googleClientSecret: process.env.AUTH_GOOGLE_SECRET,
  resendApiKey: process.env.RESEND_API_KEY,
  resendFrom: process.env.RESEND_FROM || "ReadLog <noreply@example.com>",
};

export function isGoogleAuthConfigured() {
  return Boolean(env.googleClientId && env.googleClientSecret);
}

export function isStripeConfigured() {
  return Boolean(
    env.stripeSecretKey && env.stripeMonthlyPriceId && env.stripeAnnualPriceId,
  );
}

export function isResendConfigured() {
  return Boolean(env.resendApiKey);
}
