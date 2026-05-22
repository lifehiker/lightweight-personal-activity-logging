import { prisma } from "@/lib/prisma";
import { getRequiredSession } from "@/lib/session";
import { LogEntryList } from "@/components/logs/log-entry-list";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const session = await getRequiredSession();
  const { q = "" } = await searchParams;

  const entries = await prisma.logEntry.findMany({
    where: {
      userId: session.user.id,
      OR: q
        ? [
            { title: { contains: q } },
            { author: { contains: q } },
          ]
        : undefined,
    },
    orderBy: { loggedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="panel p-6">
        <p className="eyebrow">History</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Everything you have logged.</h1>
        <form className="mt-5 flex flex-col gap-3 md:flex-row">
          <Input name="q" defaultValue={q} placeholder="Search title or author" />
          <Button type="submit">Search</Button>
        </form>
      </div>
      <LogEntryList
        entries={entries}
        emptyMessage={
          q
            ? "No matching books or authors were found for that search."
            : "Once you log a session, your history page becomes your searchable reading archive."
        }
      />
    </div>
  );
}
