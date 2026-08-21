import type { Metadata } from "next";
import Link from "next/link";

import { OshaInspectionChecklistGenerator } from "@/features/osha-inspection-checklist-generator";
import { OfficialSafetySources } from "@/components/seo/official-safety-sources";

import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createFaqJsonLd } from "@/lib/seo/faq-json-ld";
import { createToolJsonLd } from "@/lib/seo/json-ld";

const toolJsonLd = createToolJsonLd({
  name: "OSHA Inspection Checklist Generator",
  description:
    "Generate a structured OSHA-focused construction safety inspection checklist covering hazards, observations, corrective actions, and follow-up documentation.",
  url: "/tools/osha-inspection-checklist-generator",
  keywords: [
    "OSHA inspection checklist generator",
    "construction safety inspection checklist",
    "jobsite inspection form",
    "OSHA safety checklist template",
  ],
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Safety Tools", path: "/tools" },
  { name: "OSHA Inspection Checklist Generator", path: "/tools/osha-inspection-checklist-generator" },
]);

const faqs = [
  {
    question: "What does this OSHA inspection checklist generator create?",
    answer:
      "It creates a structured jobsite inspection checklist draft with project information, inspection areas, safety review items, corrective action tracking, and documentation notes.",
  },
  {
    question: "Does this checklist guarantee OSHA compliance?",
    answer:
      "No. It is a documentation aid only and does not replace OSHA requirements, employer responsibilities, state plans, project rules, manufacturer instructions, or qualified safety guidance.",
  },
  {
    question: "Who can use this inspection checklist?",
    answer:
      "Contractors, supervisors, safety coordinators, and project teams can use it as a starting point for organizing workplace safety inspections.",
  },
];

const faqJsonLd = createFaqJsonLd(faqs);

export const metadata: Metadata = {
  title: "OSHA Inspection Checklist Generator",
  description:
    "Create an OSHA-focused construction safety inspection checklist with hazards, review items, corrective actions, and documentation notes.",
  alternates: {
    canonical: "/tools/osha-inspection-checklist-generator",
  },
};

export default function OshaInspectionChecklistPage() {
  return (
    <main className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="bg-navy-950 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-steel-400">
            <Link href="/" className="transition hover:text-orange-500">
              Home
            </Link>
            <span className="px-2">/</span>
            <Link href="/tools" className="transition hover:text-orange-500">
              Safety Tools
            </Link>
            <span className="px-2">/</span>
            <span className="text-steel-200">OSHA Inspection Checklist Generator</span>
          </nav>

          <div className="mt-6 max-w-3xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">
              <span className="inline-block h-[2px] w-3.5 bg-orange-500" />
              Construction safety documentation tool
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
              OSHA Inspection Checklist Generator
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-steel-200 sm:text-lg">
              Create a structured construction safety inspection checklist
              for jobsite reviews, hazard observations, corrective
              actions, and documentation tracking.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-navy-950 py-14">
        <div className="mx-auto w-full max-w-6xl px-6">
          <OshaInspectionChecklistGenerator />
        </div>
      </section>

      <section className="border-t border-steel-200 bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight text-navy-950">
            OSHA Inspection Checklist FAQs
          </h2>
          <div className="mt-7 grid gap-4">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-xl border border-steel-200 bg-white p-6"
              >
                <h3 className="font-display text-lg font-bold text-navy-950">
                  {faq.question}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>

          <OfficialSafetySources toolSlug="osha-inspection-checklist-generator" />
        </div>
      </section>
    </main>
  );
}
