import Link from "next/link";
import { ArrowRight, NotebookPen, ShieldCheck, Sparkles } from "lucide-react";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";

const points = [
  "Log books and reading sessions in under 15 seconds",
  "Keep your history private and searchable",
  "Upgrade later for streaks, yearly stats, and CSV export",
];

export async function Hero() {
  const session = await auth();

  return (
    <Section className="py-8 md:py-12">
      <div className="hero-grid">
        <div className="space-y-6">
          <Badge>Private reading log app</Badge>
          <h1 className="balance text-5xl font-semibold tracking-tight md:text-7xl">
            Track books without the social noise.
          </h1>
          <p className="pretty max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl">
            ReadLog is a focused personal reading log for people who want fast entry, clean history, and useful stats without Goodreads feeds, recommendations, or profile theater.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href={session ? "/app" : "/signin"}>
              <Button>
                {session ? "Open your reading log" : "Start free"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="secondary">See pricing</Button>
            </Link>
          </div>
          <ul className="grid gap-3 pt-4 text-sm text-[var(--muted)] md:grid-cols-3">
            {points.map((point) => (
              <li key={point} className="rounded-[1.25rem] border border-[var(--line)] bg-white/50 p-4">
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="panel grain overflow-hidden p-6 md:p-8">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[var(--muted)]">Today&apos;s quick log</p>
                <p className="text-2xl font-semibold">The Left Hand of Darkness</p>
              </div>
              <Badge>3 day streak</Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.25rem] bg-white/90 p-4">
                <NotebookPen className="h-5 w-5 text-[var(--brand)]" />
                <p className="mt-3 text-sm font-semibold">Fast entry</p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Title, author, pages, note, and rating in one mobile-first form.
                </p>
              </div>
              <div className="rounded-[1.25rem] bg-white/90 p-4">
                <ShieldCheck className="h-5 w-5 text-[var(--accent)]" />
                <p className="mt-3 text-sm font-semibold">Private by default</p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  No social graph, no discoverability pressure, no public shelves.
                </p>
              </div>
              <div className="rounded-[1.25rem] bg-white/90 p-4 md:col-span-2">
                <Sparkles className="h-5 w-5 text-[var(--brand)]" />
                <p className="mt-3 text-sm font-semibold">Built for intent-driven readers</p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Search by title or author later, open a book detail view, and export your history when you are ready.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
