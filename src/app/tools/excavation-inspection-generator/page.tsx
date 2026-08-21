import type { Metadata } from "next";
import Link from "next/link";
import { OfficialSafetySources } from "@/components/seo/official-safety-sources";
import { ExcavationInspectionGenerator } from "@/features/excavation-inspection-generator";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createFaqJsonLd } from "@/lib/seo/faq-json-ld";
import { createToolJsonLd } from "@/lib/seo/json-ld";

const toolJsonLd = createToolJsonLd({
  name: "Excavation Inspection Checklist Generator",
  description:
    "Create a professional excavation inspection checklist covering competent-person details, protective systems, access and egress, utilities, water, atmospheric conditions, edge protection, findings, and corrective actions.",
  url: "/tools/excavation-inspection-generator",
  keywords: ["excavation inspection checklist", "trench inspection checklist", "construction excavation inspection form", "excavation safety checklist generator"],
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Safety Tools", path: "/tools" },
  { name: "Excavation Inspection Checklist Generator", path: "/tools/excavation-inspection-generator" },
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
            <span className="text-steel-200">Excavation Inspection Generator</span>
          </nav>

          <div className="mt-6 max-w-3xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">
              <span className="inline-block h-[2px] w-3.5 bg-orange-500" />
              Excavation and trench inspection tool
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Excavation Inspection Checklist Generator
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-steel-200 sm:text-lg">
              Create a structured excavation inspection record covering competent-person details, soil classification, protective systems, access, utilities, water, atmospheric conditions, edge protection, corrective actions, and follow-up.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-navy-950 py-14">
        <div className="mx-auto w-full max-w-6xl px-6">
          <ExcavationInspectionGenerator />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-5 px-6 lg:grid-cols-2">
          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <h2 className="font-display text-xl font-bold text-navy-950">
              How to use this excavation inspection generator
            </h2>
            <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-[14.5px] leading-7 text-slate-600">
              <li>Enter the company, project, inspection, and excavation details.</li>
              <li>Identify the inspector and assigned competent person.</li>
              <li>Record excavation depth and soil classification.</li>
              <li>Review protective systems, access, spoil piles, and edge controls.</li>
              <li>Evaluate utilities, water, atmosphere, nearby structures, and equipment.</li>
              <li>Document findings, corrective actions, ownership, and follow-up.</li>
              <li>Generate and export the completed inspection record.</li>
            </ol>
          </article>

          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <h2 className="font-display text-xl font-bold text-navy-950">
              Important excavation inspection points
            </h2>
            <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[14.5px] leading-7 text-slate-600">
              <li>Protective systems should match the excavation conditions and approved requirements.</li>
              <li>Safe access and egress should remain available throughout the work area.</li>
              <li>Spoil piles, materials, loads, and equipment should not create an edge hazard.</li>
              <li>Underground utilities should be identified, exposed safely, and protected.</li>
              <li>Water and atmospheric conditions should be evaluated before worker entry.</li>
              <li>Barricades, traffic controls, and warning systems should protect exposed areas.</li>
            </ul>
          </article>

          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <h2 className="font-display text-xl font-bold text-navy-950">
              Findings and corrective-action documentation
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
              Document each unsafe condition, its exact location, required correction, responsible person, entry restriction, completion status, and follow-up date. Affected areas should remain restricted until required corrections and appropriate reinspection are complete.
            </p>
          </article>

          <article className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-7">
            <h2 className="font-display text-xl font-bold text-orange-950">
              Tool limitation
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-orange-950/80">
              This generator does not certify an excavation as safe, replace a competent-person inspection, select a protective system, or determine compliance for every site. Apply current regulations, engineered requirements, site conditions, and employer safety procedures.
            </p>
          </article>
        </div>
      </section>

      <section className="border-t border-steel-200 bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight text-navy-950">
            Frequently asked questions
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

          <div className="mt-10 rounded-xl border border-steel-200 bg-white p-7">
            <h2 className="font-display text-xl font-bold text-navy-950">
              Related safety tools
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/tools/daily-jobsite-safety-inspection-generator"
                className="rounded-full border border-steel-200 px-5 py-2.5 text-sm font-semibold text-navy-950 transition hover:border-orange-500 hover:text-orange-600"
              >
                Daily Jobsite Inspection
              </Link>
              <Link
                href="/tools/scaffold-inspection-generator"
                className="rounded-full border border-steel-200 px-5 py-2.5 text-sm font-semibold text-navy-950 transition hover:border-orange-500 hover:text-orange-600"
              >
                Scaffold Inspection
              </Link>
              <Link
                href="/tools/jha-generator"
                className="rounded-full border border-steel-200 px-5 py-2.5 text-sm font-semibold text-navy-950 transition hover:border-orange-500 hover:text-orange-600"
              >
                JHA Generator
              </Link>
            </div>
          </div>

          <OfficialSafetySources toolSlug="excavation-inspection-generator" />
        </div>
      </section>
    </main>
  );
}

