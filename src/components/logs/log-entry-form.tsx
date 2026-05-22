import { createLogEntry } from "@/app/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function LogEntryForm() {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={createLogEntry} className="panel p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Quick add</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Log a reading session in seconds.</h2>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold">Book title</label>
          <Input name="title" required placeholder="The Left Hand of Darkness" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold">Author</label>
          <Input name="author" placeholder="Ursula K. Le Guin" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold">Date</label>
          <Input name="loggedAt" type="date" defaultValue={today} required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold">Pages read</label>
          <Input name="pagesRead" inputMode="numeric" placeholder="36" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold">Rating</label>
          <Input name="rating" type="number" min="1" max="5" placeholder="5" />
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold">Short note</label>
          <Textarea
            name="note"
            placeholder="What stood out? Favorite line? Why this session mattered?"
          />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-sm text-[var(--muted)]">Designed for phone screens first. One form, no clutter.</p>
        <Button type="submit">Save log</Button>
      </div>
    </form>
  );
}
