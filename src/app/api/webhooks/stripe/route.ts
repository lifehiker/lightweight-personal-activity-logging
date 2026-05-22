import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { env } from "@/lib/env";
import { sendUpgradeConfirmationEmail } from "@/lib/email";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const stripe = await getStripe();
  if (!stripe || !env.stripeWebhookSecret) {
    return NextResponse.json({ received: false, configured: false });
  }

  const signature = (await headers()).get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe signature" }, { status: 400 });
  }

  const payload = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, env.stripeWebhookSecret);
  } catch (error) {
    return NextResponse.json({ error: "Invalid signature", detail: String(error) }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.userId;

    if (userId) {
      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          subscriptionStatus: "premium",
          stripeCustomerId:
            typeof session.customer === "string" ? session.customer : undefined,
        },
      });

      if (user.email) {
        await sendUpgradeConfirmationEmail(user.email);
      }
    }
  }

  return NextResponse.json({ received: true });
}
