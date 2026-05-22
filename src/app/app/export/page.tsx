import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getRequiredSession } from "@/lib/session";
import { isPremium } from "@/lib/billing";
import { Button } from "@/components/ui/button";
import { UpgradeBanner } from "@/components/upgrade/upgrade-banner";

export default async function ExportPage() {
  const session = await getRequiredSession();
  const count = await prisma.logEntry.count({
    where: { userId: session.user.id },
  });

  if (!isPremium(session.user.subscriptionStatus)) {
    return <UpgradeBanner count={count} blocked />;
  }

  return (
    <div className="panel p-6">
      <p className="eyebrow">Export</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Take your reading history with you.</h1>
      <p className="mt-3 max-w-2xl text-[var(--muted)]">
        Export all logs as CSV with title, author, date, pages, rating, notes, and timestamps.
      </p>
      <div className="mt-6">
        <Link href="/api/export/csv">
          <Button>Download CSV</Button>
        </Link>
      </div>
    </div>
  );
}
