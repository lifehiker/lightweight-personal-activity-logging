import { env, isStripeConfigured } from "@/lib/env";

export async function getStripe() {
  if (!isStripeConfigured()) {
    return null;
  }

  const { default: Stripe } = await import("stripe");
  return new Stripe(env.stripeSecretKey!, {
    apiVersion: "2026-04-22.dahlia",
  });
}
