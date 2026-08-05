import type { Metadata } from "next";
import Link from "next/link";
import { OfficialSafetySources } from "@/components/seo/official-safety-sources";
import { ScaffoldInspectionGenerator } from "@/features/scaffold-inspection-generator";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createFaqJsonLd } from "@/lib/seo/faq-json-ld";
import { createToolJsonLd } from "@/lib/seo/json-ld";

const toolJsonLd = createToolJsonLd({
  name: "Scaffold Inspection Checklist Generator",
  description:
    "Create a professional scaffold inspection checklist covering foundations, frames, bracing, platforms, access, guardrails, fall protection, tie-ins, loading, electrical clearance, findings, and corrective actions.",
  url: "/tools/scaffold-inspection-generator",
  keywords: [
    "scaffold inspection checklist",
    "scaffolding safety inspection form",
    "construction scaffold inspection checklist",
    "scaffold competent person inspection",
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
    name: "Scaffold Inspection Checklist Generator",
    path: "/tools/scaffold-inspection-generator",
  },
]);

const faqs = [
  {
    question: "What should a scaffold inspection checklist include?",
    answer:
      "A scaffold inspection record should document the scaffold identity, type, location, inspector, competent person, foundation, base plates, mudsills, frames, braces, platforms, access, guardrails, fall protection, tie-ins, loading, electrical clearance, environmental conditions, defects, corrective actions, and follow-up date.",
  },
  {
    question: "Who should inspect a scaffold?",
    answer:
      "Scaffold inspections should be completed by a person who has the training, knowledge, authority, and workplace responsibilities required by applicable regulations and employer procedures. The employer must determine who qualifies as the competent person for the specific scaffold operation.",
  },
  {
    question: "When should scaffold access be restricted?",
    answer:
      "Access should be restricted when damage, missing components, instability, inadequate foundations, unsafe platforms, defective access, missing fall protection, improper loading, electrical hazards, or other conditions could affect safe scaffold use.",
  },
  {
    question: "Does this scaffold checklist guarantee OSHA compliance?",
    answer:
      "No. This generator is a documentation aid. Employers must follow applicable OSHA requirements, engineered designs, manufacturer instructions, competent-person determinations, site conditions, and company safety procedures.",
  },
];

const faqJsonLd = createFaqJsonLd(faqs);

export const metadata: Metadata = {
  title: "Scaffold Inspection Checklist Generator",
  description:
    "Generate a professional scaffold inspection checklist for construction sites, contractors, competent persons, facilities, and workplace safety programs.",
  alternates: {
    canonical: "/tools/scaffold-inspection-generator",
  },
};

export default function ScaffoldInspectionGeneratorPage() {
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
              Scaffold Inspection Generator
            </span>
          </nav>

          <div className="mt-8 max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">
              Scaffold safety inspection tool
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Scaffold Inspection Checklist Generator
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Create a structured scaffold inspection record covering
              foundations, frames, braces, platforms, safe access,
              guardrails, fall protection, tie-ins, loading, electrical
              clearance, defects, corrective actions, and follow-up.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <ScaffoldInspectionGenerator />
      </section>

      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              How to use this scaffold inspection generator
            </h2>

            <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>Enter the company, project, inspection, and scaffold details.</li>
              <li>Identify the inspector and designated competent person.</li>
              <li>Review foundations, frames, bracing, tie-ins, and anchorage.</li>
              <li>Inspect platforms, access systems, guardrails, and fall protection.</li>
              <li>Evaluate loading, electrical clearance, and weather conditions.</li>
              <li>Record findings, corrective actions, responsible persons, and follow-up.</li>
              <li>Generate and export the completed scaffold inspection record.</li>
            </ol>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              Important scaffold inspection points
            </h2>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>Foundations, base plates, and mudsills should be stable and properly supported.</li>
              <li>Frames, posts, braces, pins, and connections should be complete and secure.</li>
              <li>Platforms should be properly planked, secured, and free from hazardous damage.</li>
              <li>Safe access should be provided without requiring unsafe climbing practices.</li>
              <li>Guardrails, toeboards, and personal fall-protection systems should be in place where required.</li>
              <li>Loads, stored materials, electrical clearance, and weather exposure should be controlled.</li>
            </ul>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              Defects and corrective-action documentation
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Clearly document each unsafe condition, the affected scaffold
              area, required corrective action, responsible person, access
              restriction, and follow-up date. Defective or unstable scaffold
              sections should remain unavailable until corrections are
              completed and the scaffold is appropriately reinspected.
            </p>
          </article>

          <article className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-7">
            <h2 className="text-2xl font-black text-amber-100">
              Tool limitation
            </h2>

            <p className="mt-4 text-sm leading-7 text-amber-100/90">
              This generator does not certify a scaffold as safe, replace a
              competent-person inspection, or determine compliance for every
              site. Review applicable regulations, engineered requirements,
              manufacturer instructions, workplace conditions, and employer
              safety procedures.
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
              href="/tools/ladder-inspection-generator"
              className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold transition hover:border-emerald-300 hover:text-emerald-200"
            >
              Ladder Inspection
            </Link>

            <Link
              href="/tools/daily-jobsite-safety-inspection-generator"
              className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold transition hover:border-emerald-300 hover:text-emerald-200"
            >
              Daily Jobsite Inspection
            </Link>

            <Link
              href="/tools/ppe-checklist-generator"
              className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold transition hover:border-emerald-300 hover:text-emerald-200"
            >
              PPE Checklist Generator
            </Link>
          </div>
        </div>

        <OfficialSafetySources toolSlug="scaffold-inspection-generator" />
      </section>
    </main>
  );
}
