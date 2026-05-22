import Link from "next/link";
import { pricingTiers } from "@/lib/pricing";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function UpgradeBanner({
  count,
  blocked,
}: {
  count: number;
  blocked?: boolean;
}) {
  return (
    <div className="panel flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="eyebrow">{blocked ? "Free plan limit reached" : "Upgrade prompt"}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
          {blocked
            ? "You have reached 30 entries on the free plan."
            : `You have logged ${count} of ${siteConfig.freeEntryLimit} free entries.`}
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Premium unlocks unlimited logging, yearly stats, and CSV export for {pricingTiers.premium.annual}/year or {pricingTiers.premium.monthly}/month.
        </p>
      </div>
      <Link href="/pricing">
        <Button>View Premium plans</Button>
      </Link>
    </div>
  );
}
