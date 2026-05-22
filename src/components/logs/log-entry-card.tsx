import Link from "next/link";
import { format } from "date-fns";
import { Star } from "lucide-react";
import { deleteLogEntry } from "@/app/app/actions";
import { slugify } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EditLogDialog } from "@/components/logs/edit-log-dialog";

type Entry = {
  id: string;
  title: string;
  normalizedTitle: string;
  author: string | null;
  loggedAt: Date;
  pagesRead: number | null;
  rating: number | null;
  note: string | null;
};

export function LogEntryCard({ entry }: { entry: Entry }) {
  return (
    <article className="panel p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/app/books/${slugify(entry.title)}?title=${encodeURIComponent(entry.title)}`}
              className="text-2xl font-semibold tracking-tight hover:text-[var(--brand)]"
            >
              {entry.title}
            </Link>
            {entry.rating ? (
              <Badge className="gap-1">
                <Star className="h-3.5 w-3.5 fill-current" />
                {entry.rating}/5
              </Badge>
            ) : null}
          </div>
          <p className="text-sm text-[var(--muted)]">
            {entry.author || "Unknown author"} • {format(entry.loggedAt, "MMM d, yyyy")}
            {entry.pagesRead ? ` • ${entry.pagesRead} pages` : ""}
          </p>
          {entry.note ? <p className="pretty text-sm leading-7 text-[var(--ink)]">{entry.note}</p> : null}
        </div>
        <div className="flex flex-wrap items-start gap-3">
          <EditLogDialog entry={entry} />
          <form action={deleteLogEntry}>
            <input type="hidden" name="id" value={entry.id} />
            <Button type="submit" variant="danger">
              Delete
            </Button>
          </form>
        </div>
      </div>
    </article>
  );
}
