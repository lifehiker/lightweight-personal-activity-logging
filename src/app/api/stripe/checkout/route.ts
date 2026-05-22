import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { env } from "@/lib/env";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const formData = await request.formData();
  const priceId =
    formData.get("interval") === "monthly" ? env.stripeMonthlyPriceId : env.stripeAnnualPriceId;
  const stripe = await getStripe();

  if (!stripe || !priceId) {
    return NextResponse.redirect(new URL("/pricing?billing=unavailable", request.url));
  }

  const checkout = await stripe.checkout.sessions.create({
    mode: "subscription",
    success_url: `${env.appUrl}/app/settings?billing=success`,
    cancel_url: `${env.appUrl}/pricing?billing=cancelled`,
    customer_email: session.user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: {
      userId: session.user.id,
    },
  });

  return NextResponse.redirect(checkout.url || new URL("/pricing", request.url));
}
