import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { pricingTiers } from "@/lib/pricing";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Pricing",
  description: "ReadLog pricing for free and Premium private reading log plans.",
};

export default async function PricingPage() {
  const session = await auth();

  return (
    <div className="pb-10">
      <MarketingHeader />
      <Section className="py-10">
        <div className="panel p-8">
          <Badge>Simple pricing</Badge>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight">Free to start. Premium when you need more depth.</h1>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <article className="rounded-lg border border-[var(--line)] bg-white/70 p-6">
              <h2 className="text-2xl font-semibold">{pricingTiers.free.name}</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">Perfect for proving the workflow.</p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                {pricingTiers.free.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="mt-6">
                <Link href={session ? "/app" : "/signin"}>
                  <Button variant="secondary">{session ? "Open your account" : "Start free"}</Button>
                </Link>
              </div>
            </article>

            <article className="rounded-lg border border-[rgba(47,107,79,0.25)] bg-[linear-gradient(180deg,#ffffff,#eef4ef)] p-6">
              <p className="eyebrow">Best value</p>
              <h2 className="mt-2 text-2xl font-semibold">{pricingTiers.premium.name}</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {pricingTiers.premium.annual}/year or {pricingTiers.premium.monthly}/month
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                {pricingTiers.premium.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <form action="/api/stripe/checkout" method="post">
                  <input type="hidden" name="interval" value="annual" />
                  <Button type="submit">Start annual plan</Button>
                </form>
                <form action="/api/stripe/checkout" method="post">
                  <input type="hidden" name="interval" value="monthly" />
                  <Button type="submit" variant="secondary">
                    Monthly plan
                  </Button>
                </form>
              </div>
            </article>
          </div>
        </div>
      </Section>
      <MarketingFooter />
    </div>
  );
}
