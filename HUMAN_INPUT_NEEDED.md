# Human Input Needed

The app runs locally without external credentials using guarded fallbacks. Provide the items below only if you want the full external integrations in production.

## Optional credentials

1. `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`
   Enable Google sign-in in addition to the built-in email code flow.

2. `STRIPE_SECRET_KEY`
   Required for real checkout and billing portal sessions.

3. `STRIPE_MONTHLY_PRICE_ID` and `STRIPE_ANNUAL_PRICE_ID`
   Required so the pricing page can create live monthly and annual subscriptions.

4. `STRIPE_WEBHOOK_SECRET`
   Required for secure Premium plan activation after successful Stripe checkout.

5. `RESEND_API_KEY`
   Required to send real sign-in, welcome, and upgrade emails. Without it, the app logs email payloads locally and shows the sign-in code on the sign-in page for development.

6. `RESEND_FROM`
   Optional custom sender identity for outbound emails.

7. `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
   Optional analytics domain if you want Plausible tracking.
