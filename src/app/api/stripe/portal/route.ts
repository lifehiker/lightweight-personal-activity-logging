import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { env } from "@/lib/env";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const stripe = await getStripe();
  if (!stripe) {
    return NextResponse.redirect(new URL("/app/settings?billing=unavailable", request.url));
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user?.stripeCustomerId) {
    return NextResponse.redirect(new URL("/app/settings?billing=missing-customer", request.url));
  }

  const portal = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${env.appUrl}/app/settings`,
  });

  return NextResponse.redirect(portal.url);
}
