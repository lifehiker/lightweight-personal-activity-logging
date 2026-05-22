import { BookMarked, CalendarClock, Download, Search, ShieldCheck, Zap } from "lucide-react";
import { Section } from "@/components/ui/section";

const features = [
  {
    title: "Quick add logging",
    description: "Add a title, author, date, pages, rating, and note in one focused form.",
    icon: Zap,
  },
  {
    title: "Private history",
    description: "Your reading log is for you, not for a social feed or algorithm.",
    icon: ShieldCheck,
  },
  {
    title: "Searchable archive",
    description: "Filter by title or author and open a grouped book detail page later.",
    icon: Search,
  },
  {
    title: "Yearly reading stats",
    description: "See books finished, total entries, current streak, and longest streak.",
    icon: CalendarClock,
  },
  {
    title: "Book detail timeline",
    description: "Revisit every note and reading session attached to the same title.",
    icon: BookMarked,
  },
  {
    title: "CSV export",
    description: "Take your data with you when you need a spreadsheet, backup, or migration.",
    icon: Download,
  },
];

export function FeatureGrid() {
  return (
    <Section className="py-10">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {features.map(({ title, description, icon: Icon }) => (
          <article key={title} className="panel p-6">
            <Icon className="h-5 w-5 text-[var(--brand)]" />
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-3 pretty text-[var(--muted)]">{description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
