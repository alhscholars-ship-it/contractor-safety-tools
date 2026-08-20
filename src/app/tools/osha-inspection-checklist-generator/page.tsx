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
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Safety Tools",
    path: "/tools",
  },
  {
    name: "OSHA Inspection Checklist Generator",
    path: "/tools/osha-inspection-checklist-generator",
  },
]);

const faqs = [
  {
    question:
      "What does this OSHA inspection checklist generator create?",
    answer:
      "It creates a structured jobsite inspection checklist draft with project information, inspection areas, safety review items, corrective action tracking, and documentation notes.",
  },
  {
    question:
      "Does this checklist guarantee OSHA compliance?",
    answer:
      "No. It is a documentation aid only and does not replace OSHA requirements, employer responsibilities, state plans, project rules, manufacturer instructions, or qualified safety guidance.",
  },
  {
    question:
      "Who can use this inspection checklist?",
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
    <main className="min-h-screen bg-slate-950 text-white">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">

          <nav className="text-sm text-slate-400">
            <Link href="/">Home</Link>
            <span className="px-2">/</span>
            <Link href="/tools">Safety Tools</Link>
            <span className="px-2">/</span>
            <span className="text-slate-200">
              OSHA Inspection Checklist Generator
            </span>
          </nav>


          <div className="mt-8 max-w-4xl">

            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">
              Construction safety documentation tool
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
              OSHA Inspection Checklist Generator
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Create a structured construction safety inspection checklist
              for jobsite reviews, hazard observations, corrective actions,
              and documentation tracking.
            </p>

          </div>

        </div>
      </section>


      <section className="mx-auto max-w-6xl px-6 py-12">
        <OshaInspectionChecklistGenerator />
      </section>


      <section className="mx-auto max-w-6xl px-6 py-12">

        <h2 className="text-3xl font-black">
          OSHA Inspection Checklist FAQs
        </h2>

        <div className="mt-8 grid gap-5">

          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <h3 className="font-black text-emerald-200">
                {faq.question}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                {faq.answer}
              </p>
            </article>
          ))}

        </div>


        <OfficialSafetySources toolSlug="osha-inspection-checklist-generator" />

      </section>

    </main>
  );
}
