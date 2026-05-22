import { prisma } from "@/lib/prisma";
import { getRequiredSession } from "@/lib/session";
import { isPremium } from "@/lib/billing";
import { getCurrentStreak, getLongestStreak, getYearlyCounts } from "@/lib/stats";
import { StatsCards } from "@/components/stats/stats-cards";
import { UpgradeBanner } from "@/components/upgrade/upgrade-banner";

export default async function StatsPage() {
  const session = await getRequiredSession();
  const entries = await prisma.logEntry.findMany({
    where: { userId: session.user.id },
    orderBy: { loggedAt: "desc" },
  });

  if (!isPremium(session.user.subscriptionStatus)) {
    return <UpgradeBanner count={entries.length} blocked />;
  }

  const yearly = getYearlyCounts(entries);
  const currentStreak = getCurrentStreak(entries);
  const longestStreak = getLongestStreak(entries);

  return (
    <div className="space-y-6">
      <div className="panel p-6">
        <p className="eyebrow">Stats</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Yearly reading snapshot.</h1>
        <p className="mt-3 text-[var(--muted)]">
          Premium gives you a simple, private analytics layer with no extra ceremony.
        </p>
      </div>
      <StatsCards
        items={[
          { label: "Books this year", value: yearly.booksFinished, hint: "Unique titles across the current year" },
          { label: "Entries this year", value: yearly.totalEntries, hint: "Every session, note, or finish log" },
          { label: "Current streak", value: currentStreak, hint: "Consecutive days logged" },
          { label: "Longest streak", value: longestStreak, hint: "Your best run so far" },
        ]}
      />
    </div>
  );
}
