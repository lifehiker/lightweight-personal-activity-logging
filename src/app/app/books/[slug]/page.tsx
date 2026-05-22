import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getRequiredSession } from "@/lib/session";
import { LogEntryList } from "@/components/logs/log-entry-list";

export default async function BookDetailPage({
  searchParams,
}: {
  searchParams: Promise<{ title?: string }>;
}) {
  const session = await getRequiredSession();
  const { title } = await searchParams;

  if (!title) {
    notFound();
  }

  const entries = await prisma.logEntry.findMany({
    where: {
      userId: session.user.id,
      title,
    },
    orderBy: { loggedAt: "desc" },
  });

  if (entries.length === 0) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="panel p-6">
        <p className="eyebrow">Book detail</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-3 text-[var(--muted)]">
          Every note and reading session you have logged for this title.
        </p>
      </div>
      <LogEntryList
        entries={entries}
        emptyMessage="No reading sessions have been attached to this title yet."
      />
    </div>
  );
}
