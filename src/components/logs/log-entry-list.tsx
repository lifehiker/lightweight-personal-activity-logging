import { LogEntryCard } from "@/components/logs/log-entry-card";

type Entry = Parameters<typeof LogEntryCard>[0]["entry"];

export function LogEntryList({ entries, emptyMessage }: { entries: Entry[]; emptyMessage: string }) {
  if (entries.length === 0) {
    return (
      <div className="panel p-8 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Nothing logged yet.</h2>
        <p className="mt-3 pretty text-[var(--muted)]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <LogEntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}
