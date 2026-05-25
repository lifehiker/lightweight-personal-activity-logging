import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="container-shell mt-16 border-t border-[var(--line)] py-8 text-sm text-[var(--muted)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p>ReadLog keeps your reading history private, fast, and searchable.</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/pricing">Pricing</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/reading-log-template">Reading log template</Link>
          <Link href="/blog/best-private-alternatives-to-goodreads">Guides</Link>
        </div>
      </div>
    </footer>
  );
}
