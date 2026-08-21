import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/data/tools";
import { PageHero } from "@/components/content/page-hero";

const toolCatalogAnswer = `The current catalog includes ${
  tools.length
} tools: ${tools.map((tool) => tool.name).join(", ")}.`;

const faqs = [
  {
    question: "Are these contractor safety tools free?",
    answer:
      "Yes. Every tool listed in the current catalog is free to use in the browser and supports TXT and PDF exports.",
  },
  {
    question: "Do the generated documents guarantee OSHA compliance?",
    answer:
      "No. Generated documents are informational drafts only. Users must verify them against current OSHA requirements, state-plan rules, local regulations, project requirements, manufacturer instructions, and qualified professional guidance.",
  },
  {
    question: "What documents can I generate?",
    answer: toolCatalogAnswer,
  },
  {
    question: "Can I export generated documents?",
    answer: "Yes. Each generator supports downloadable TXT and PDF exports.",
  },
  {
    question: "Is information entered into the tools stored?",
    answer:
      "Tool input is processed in the browser. The current application has no user accounts, form-submission API, or application database that receives generator entries. Users should still avoid entering confidential or sensitive information.",
  },
  {
    question: "Can these documents replace a safety professional?",
    answer:
      "No. The tools support documentation workflows but do not replace competent persons, qualified safety professionals, legal counsel, medical professionals, engineers, insurers, or regulatory authorities.",
  },
  {
    question: "How can I report an error or outdated source?",
    answer:
      "Use the public issue tracker linked from the Contact page. Identify the affected page and explain the issue without including confidential, personal, medical, legal, or incident details.",
  },
];

const faqJsonLd = {
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

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about Contractor Safety Tools, the complete generator catalog, exports, browser processing, compliance limitations, and corrections.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FaqPage() {
  return (
    <main className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHero
        eyebrow="Help Center"
        title="Frequently asked questions."
        lede="Common questions about the safety generator catalog, exports, browser processing, compliance limitations, and responsible use."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-4xl px-6">
          <div className="space-y-4">
            {faqs.map((faq) => (
              <section
                key={faq.question}
                className="rounded-xl border border-steel-200 bg-white p-6"
              >
                <h2 className="font-display text-lg font-bold text-navy-950">
                  {faq.question}
                </h2>
                <p className="mt-2.5 text-[14.5px] leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/tools"
              className="inline-flex rounded-[3px] border border-orange-600 bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
            >
              Explore safety tools →
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-[3px] border border-navy-800 px-6 py-3 text-sm font-semibold text-navy-950 transition hover:border-orange-500 hover:text-orange-600"
            >
              Report a website issue
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
