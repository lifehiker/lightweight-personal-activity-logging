import { updateLogEntry } from "@/app/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Entry = {
  id: string;
  title: string;
  author: string | null;
  loggedAt: Date;
  pagesRead: number | null;
  rating: number | null;
  note: string | null;
};

export function EditLogDialog({ entry }: { entry: Entry }) {
  return (
    <details className="group">
      <summary className="cursor-pointer list-none rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold text-[var(--muted)] transition hover:bg-white/70">
        Edit
      </summary>
      <form action={updateLogEntry} className="mt-4 rounded-[1.25rem] border border-[var(--line)] bg-white/75 p-4">
        <input type="hidden" name="id" value={entry.id} />
        <div className="grid gap-3 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold">Title</label>
            <Input name="title" required defaultValue={entry.title} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Author</label>
            <Input name="author" defaultValue={entry.author || ""} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Date</label>
            <Input
              name="loggedAt"
              type="date"
              required
              defaultValue={entry.loggedAt.toISOString().slice(0, 10)}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Pages</label>
            <Input name="pagesRead" defaultValue={entry.pagesRead ?? ""} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Rating</label>
            <Input name="rating" type="number" min="1" max="5" defaultValue={entry.rating ?? ""} />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold">Note</label>
            <Textarea name="note" defaultValue={entry.note || ""} />
          </div>
        </div>
        <div className="mt-4">
          <Button type="submit" variant="secondary">
            Update log
          </Button>
        </div>
      </form>
    </details>
  );
}
