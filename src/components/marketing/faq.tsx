import { Section } from "@/components/ui/section";

const faqs = [
  {
    question: "Is ReadLog private?",
    answer:
      "Yes. The product is built around private personal tracking rather than social reading identity.",
  },
  {
    question: "Can I use it for reading sessions instead of only finished books?",
    answer:
      "Yes. Each log can capture a finished book or a regular reading session with optional pages and notes.",
  },
  {
    question: "What does Premium unlock?",
    answer:
      "Premium removes the 30-entry cap and unlocks yearly stats plus CSV export.",
  },
];

export function FAQ() {
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
      <div className="panel p-8">
        <p className="eyebrow">FAQ</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">Built for readers who want less noise.</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-lg border border-[var(--line)] bg-white/70 p-5">
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
