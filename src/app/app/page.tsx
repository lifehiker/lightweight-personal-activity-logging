import { prisma } from "@/lib/prisma";
import { getRequiredSession } from "@/lib/session";
import { getCurrentStreak, getYearlyCounts } from "@/lib/stats";
import { siteConfig } from "@/lib/site";
import { LogEntryForm } from "@/components/logs/log-entry-form";
import { LogEntryList } from "@/components/logs/log-entry-list";
import { StatsCards } from "@/components/stats/stats-cards";
import { UpgradeBanner } from "@/components/upgrade/upgrade-banner";

export default async function DashboardPage() {
  const session = await getRequiredSession();
  const entries = await prisma.logEntry.findMany({
    where: { userId: session.user.id },
    orderBy: { loggedAt: "desc" },
  });

  const streak = getCurrentStreak(entries);
  const yearly = getYearlyCounts(entries);
  const count = entries.length;
  const recentEntries = entries.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="panel p-6">
        <p className="eyebrow">Dashboard</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Your private reading desk.</h1>
        <p className="mt-3 max-w-3xl text-[var(--muted)]">
          Track finished books or reading sessions, revisit notes, and keep your personal history in one lightweight place.
        </p>
      </div>

      {session.user.subscriptionStatus !== "premium" && count >= 20 ? (
        <UpgradeBanner count={count} blocked={count >= siteConfig.freeEntryLimit} />
      ) : null}

      <StatsCards
        items={[
          { label: "Books this year", value: yearly.booksFinished, hint: "Unique titles logged this year" },
          { label: "Entries this year", value: yearly.totalEntries, hint: "Every reading session counts" },
          { label: "Current streak", value: streak, hint: "Days with at least one log" },
          {
            label: "Plan",
            value: session.user.subscriptionStatus === "premium" ? "Premium" : "Free",
            hint: `${count}/${siteConfig.freeEntryLimit} free entries used`,
          },
        ]}
      />

      <LogEntryForm />

      <div className="space-y-4">
        <div className="panel p-6">
          <h2 className="text-2xl font-semibold tracking-tight">Recent logs</h2>
          <p className="mt-2 text-[var(--muted)]">
            {count === 0
              ? "Start with your first reading log to unlock your private history."
              : "Your latest five reading notes and sessions."}
          </p>
        </div>
        <LogEntryList
          entries={recentEntries}
          emptyMessage="Your dashboard will show recent reading sessions here after the first log."
        />
      </div>
    </div>
  );
}
