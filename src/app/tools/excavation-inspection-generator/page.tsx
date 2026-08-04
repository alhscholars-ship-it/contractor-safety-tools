import type { Metadata } from "next";
import Link from "next/link";
import { ExcavationInspectionGenerator } from "@/features/excavation-inspection-generator";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createFaqJsonLd } from "@/lib/seo/faq-json-ld";
import { createToolJsonLd } from "@/lib/seo/json-ld";

const toolJsonLd = createToolJsonLd({
  name: "Excavation Inspection Checklist Generator",
  description:
    "Create a professional excavation inspection checklist covering competent-person details, protective systems, access and egress, utilities, water, atmospheric conditions, edge protection, findings, and corrective actions.",
  url: "/tools/excavation-inspection-generator",
  keywords: [
    "excavation inspection checklist",
    "trench inspection checklist",
    "construction excavation inspection form",
    "excavation safety checklist generator",
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
    name: "Excavation Inspection Checklist Generator",
    path: "/tools/excavation-inspection-generator",
  },
]);

const faqs = [
  {
    question: "What should an excavation inspection checklist include?",
    answer:
      "An excavation inspection record should identify the project, excavation, location, depth, inspector, competent person, soil classification, protective system, access and egress, spoil-pile setback, utilities, water conditions, atmospheric conditions, adjacent structures, mobile equipment, barricades, findings, corrective actions, responsible persons, and follow-up date.",
  },
  {
    question: "Who should complete an excavation inspection?",
    answer:
      "The employer should assign a person with the training, knowledge, authority, and workplace responsibilities required for the excavation operation. Applicable regulations, engineered requirements, site conditions, and company procedures determine the necessary qualifications and responsibilities.",
  },
  {
    question: "When should entry into an excavation be restricted?",
    answer:
      "Entry should be restricted when an unsafe condition could expose workers to cave-in hazards, unstable soil, defective protective systems, hazardous atmospheres, water accumulation, utility hazards, falling loads, mobile equipment, or other uncontrolled risks.",
  },
  {
    question: "Does this excavation checklist guarantee compliance?",
    answer:
      "No. This generator is a documentation aid and cannot certify excavation safety or regulatory compliance. Employers must apply current regulations, competent-person determinations, engineered requirements, site conditions, and company procedures.",
  },
];

const faqJsonLd = createFaqJsonLd(faqs);

export const metadata: Metadata = {
  title: "Excavation Inspection Checklist Generator",
  description:
    "Generate a professional excavation and trench inspection checklist for contractors, competent persons, construction sites, utilities, and workplace safety programs.",
  alternates: {
    canonical: "/tools/excavation-inspection-generator",
  },
};

export default function ExcavationInspectionGeneratorPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <nav className="text-sm text-slate-400" aria-label="Breadcrumb">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span className="px-2">/</span>
            <Link href="/tools" className="transition hover:text-white">
              Safety Tools
            </Link>
            <span className="px-2">/</span>
            <span className="text-slate-200">
              Excavation Inspection Generator
            </span>
          </nav>

          <div className="mt-8 max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">
              Excavation and trench inspection tool
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Excavation Inspection Checklist Generator
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Create a structured excavation inspection record covering
              competent-person details, soil classification, protective
              systems, access, utilities, water, atmospheric conditions,
              edge protection, corrective actions, and follow-up.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <ExcavationInspectionGenerator />
      </section>

      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              How to use this excavation inspection generator
            </h2>

            <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>Enter the company, project, inspection, and excavation details.</li>
              <li>Identify the inspector and assigned competent person.</li>
              <li>Record excavation depth and soil classification.</li>
              <li>Review protective systems, access, spoil piles, and edge controls.</li>
              <li>Evaluate utilities, water, atmosphere, nearby structures, and equipment.</li>
              <li>Document findings, corrective actions, ownership, and follow-up.</li>
              <li>Generate and export the completed inspection record.</li>
            </ol>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              Important excavation inspection points
            </h2>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>Protective systems should match the excavation conditions and approved requirements.</li>
              <li>Safe access and egress should remain available throughout the work area.</li>
              <li>Spoil piles, materials, loads, and equipment should not create an edge hazard.</li>
              <li>Underground utilities should be identified, exposed safely, and protected.</li>
              <li>Water and atmospheric conditions should be evaluated before worker entry.</li>
              <li>Barricades, traffic controls, and warning systems should protect exposed areas.</li>
            </ul>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              Findings and corrective-action documentation
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Document each unsafe condition, its exact location, required
              correction, responsible person, entry restriction, completion
              status, and follow-up date. Affected areas should remain
              restricted until required corrections and appropriate
              reinspection are complete.
            </p>
          </article>

          <article className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-7">
            <h2 className="text-2xl font-black text-amber-100">
              Tool limitation
            </h2>

            <p className="mt-4 text-sm leading-7 text-amber-100/90">
              This generator does not certify an excavation as safe, replace
              a competent-person inspection, select a protective system, or
              determine compliance for every site. Apply current regulations,
              engineered requirements, site conditions, and employer safety
              procedures.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-black">Frequently asked questions</h2>

        <div className="mt-8 grid gap-4">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
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

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-7">
          <h2 className="text-2xl font-black">Related safety tools</h2>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/tools/daily-jobsite-safety-inspection-generator"
              className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold transition hover:border-emerald-300 hover:text-emerald-200"
            >
              Daily Jobsite Inspection
            </Link>

            <Link
              href="/tools/scaffold-inspection-generator"
              className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold transition hover:border-emerald-300 hover:text-emerald-200"
            >
              Scaffold Inspection
            </Link>

            <Link
              href="/tools/jha-generator"
              className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold transition hover:border-emerald-300 hover:text-emerald-200"
            >
              JHA Generator
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
