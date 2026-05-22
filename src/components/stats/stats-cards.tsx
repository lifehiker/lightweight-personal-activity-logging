import { BookOpen, CalendarRange, Flame, Trophy } from "lucide-react";

const icons = [BookOpen, CalendarRange, Flame, Trophy];

export function StatsCards({
  items,
}: {
  items: { label: string; value: string | number; hint: string }[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item, index) => {
        const Icon = icons[index] || BookOpen;
        return (
          <div key={item.label} className="panel p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[var(--muted)]">{item.label}</p>
              <Icon className="h-5 w-5 text-[var(--accent)]" />
            </div>
            <p className="mt-4 text-4xl font-semibold tracking-tight">{item.value}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">{item.hint}</p>
          </div>
        );
      })}
    </div>
  );
}
