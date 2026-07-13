import type { Metadata } from "next";
import Link from "next/link";

const faqs = [
  {
    question: "Are these contractor safety tools free?",
    answer:
      "Yes. The current generators are free to use in the browser and support TXT and PDF exports.",
  },
  {
    question: "Do the generated documents guarantee OSHA compliance?",
    answer:
      "No. Generated documents are informational drafts only. Users must verify them against current OSHA requirements, state-plan rules, local regulations, project requirements, manufacturer instructions, and qualified professional guidance.",
  },
  {
    question: "What documents can I generate?",
    answer:
      "The website currently includes a Safety Plan Generator, Toolbox Talk Generator, Incident Report Generator, JHA Generator, and PPE Checklist Generator.",
  },
  {
    question: "Can I export generated documents?",
    answer:
      "Yes. Each generator supports downloadable TXT and PDF exports.",
  },
  {
    question: "Is information entered into the tools stored?",
    answer:
      "The tools are designed for browser-based document generation. Users should still avoid entering confidential, medical, financial, legal, or otherwise sensitive information.",
  },
  {
    question: "Can these documents replace a safety professional?",
    answer:
      "No. The tools support documentation workflows but do not replace competent persons, qualified safety professionals, legal counsel, medical professionals, engineers, insurers, or regulatory authorities.",
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
    "Answers to common questions about Contractor Safety Form Tools, OSHA compliance, document exports, privacy, and professional safety guidance.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="mx-auto w-full max-w-4xl px-6 py-20">
        <Link href="/" className="text-sm font-semibold text-emerald-300">
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
            Common questions about our contractor safety generators, exports,
            compliance limitations, privacy, and responsible use.
          </p>
        </div>

        <div className="mt-12 space-y-5">
          {faqs.map((faq) => (
            <section
              key={faq.question}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <h2 className="text-xl font-black text-white">{faq.question}</h2>
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
            Contact us
          </Link>
        </div>
      </section>
    </main>
  );
}
