import Link from "next/link";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";

export async function SeoPage({
  eyebrow,
  title,
  description,
  bullets,
}: {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
}) {
  const session = await auth();
  const faqs = [
    {
      question: `Is ReadLog useful for ${eyebrow.toLowerCase()}?`,
      answer: description,
    },
    {
      question: "Is ReadLog private?",
      answer: "Yes. ReadLog is built for personal reading history without public shelves, feeds, or social pressure.",
    },
    {
      question: "Can I export my reading log?",
      answer: "Premium users can export all reading entries as CSV, including titles, authors, dates, pages, ratings, notes, and timestamps.",
    },
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Section className="py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="panel p-8 md:p-10">
        <Badge>{eyebrow}</Badge>
        <h1 className="balance mt-4 text-4xl font-semibold tracking-tight md:text-6xl">{title}</h1>
        <p className="pretty mt-4 max-w-3xl text-lg leading-8 text-[var(--muted)]">{description}</p>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {bullets.map((bullet) => (
            <div key={bullet} className="rounded-lg border border-[var(--line)] bg-white/70 p-4 text-sm">
              {bullet}
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={session ? "/app" : "/signin"}>
            <Button>{session ? "Open ReadLog" : "Start free"}</Button>
          </Link>
          <Link href="/pricing">
            <Button variant="secondary">See Premium</Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}
