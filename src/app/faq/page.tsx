import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/data/tools";

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
    answer:
      "Yes. Each generator supports downloadable TXT and PDF exports.",
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
    <main className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      <section className="mx-auto w-full max-w-4xl px-6 py-20">
        <Link
          href="/"
          className="text-sm font-semibold text-emerald-300"
        >
          ← Back to home
        </Link>

        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Help Center
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            Frequently Asked Questions
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Common questions about the safety generator catalog, exports,
            browser processing, compliance limitations, and responsible use.
          </p>
        </div>

        <div className="mt-12 space-y-5">
          {faqs.map((faq) => (
            <section
              key={faq.question}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <h2 className="text-xl font-black text-white">
                {faq.question}
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                {faq.answer}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/tools"
            className="inline-flex rounded-full bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
          >
            Explore safety tools
          </Link>

          <Link
            href="/contact"
            className="inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
          >
            Report a website issue
          </Link>
        </div>
      </section>
    </main>
  );
}
