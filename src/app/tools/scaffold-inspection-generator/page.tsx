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
  keywords: ["scaffold inspection checklist", "scaffolding safety inspection form", "construction scaffold inspection checklist", "scaffold competent person inspection"],
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Safety Tools", path: "/tools" },
  { name: "Scaffold Inspection Checklist Generator", path: "/tools/scaffold-inspection-generator" },
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
            <span className="text-steel-200">Scaffold Inspection Generator</span>
          </nav>

          <div className="mt-6 max-w-3xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">
              <span className="inline-block h-[2px] w-3.5 bg-orange-500" />
              Scaffold safety inspection tool
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Scaffold Inspection Checklist Generator
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-steel-200 sm:text-lg">
              Create a structured scaffold inspection record covering foundations, frames, braces, platforms, safe access, guardrails, fall protection, tie-ins, loading, electrical clearance, defects, corrective actions, and follow-up.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-navy-950 py-14">
        <div className="mx-auto w-full max-w-6xl px-6">
          <ScaffoldInspectionGenerator />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-5 px-6 lg:grid-cols-2">
          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <h2 className="font-display text-xl font-bold text-navy-950">
              How to use this scaffold inspection generator
            </h2>
            <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-[14.5px] leading-7 text-slate-600">
              <li>Enter the company, project, inspection, and scaffold details.</li>
              <li>Identify the inspector and designated competent person.</li>
              <li>Review foundations, frames, bracing, tie-ins, and anchorage.</li>
              <li>Inspect platforms, access systems, guardrails, and fall protection.</li>
              <li>Evaluate loading, electrical clearance, and weather conditions.</li>
              <li>Record findings, corrective actions, responsible persons, and follow-up.</li>
              <li>Generate and export the completed scaffold inspection record.</li>
            </ol>
          </article>

          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <h2 className="font-display text-xl font-bold text-navy-950">
              Important scaffold inspection points
            </h2>
            <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[14.5px] leading-7 text-slate-600">
              <li>Foundations, base plates, and mudsills should be stable and properly supported.</li>
              <li>Frames, posts, braces, pins, and connections should be complete and secure.</li>
              <li>Platforms should be properly planked, secured, and free from hazardous damage.</li>
              <li>Safe access should be provided without requiring unsafe climbing practices.</li>
              <li>Guardrails, toeboards, and personal fall-protection systems should be in place where required.</li>
              <li>Loads, stored materials, electrical clearance, and weather exposure should be controlled.</li>
            </ul>
          </article>

          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <h2 className="font-display text-xl font-bold text-navy-950">
              Defects and corrective-action documentation
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
              Clearly document each unsafe condition, the affected scaffold area, required corrective action, responsible person, access restriction, and follow-up date. Defective or unstable scaffold sections should remain unavailable until corrections are completed and the scaffold is appropriately reinspected.
            </p>
          </article>

          <article className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-7">
            <h2 className="font-display text-xl font-bold text-orange-950">
              Tool limitation
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-orange-950/80">
              This generator does not certify a scaffold as safe, replace a competent-person inspection, or determine compliance for every site. Review applicable regulations, engineered requirements, manufacturer instructions, workplace conditions, and employer safety procedures.
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
                href="/tools/ladder-inspection-generator"
                className="rounded-full border border-steel-200 px-5 py-2.5 text-sm font-semibold text-navy-950 transition hover:border-orange-500 hover:text-orange-600"
              >
                Ladder Inspection
              </Link>
              <Link
                href="/tools/daily-jobsite-safety-inspection-generator"
                className="rounded-full border border-steel-200 px-5 py-2.5 text-sm font-semibold text-navy-950 transition hover:border-orange-500 hover:text-orange-600"
              >
                Daily Jobsite Inspection
              </Link>
              <Link
                href="/tools/ppe-checklist-generator"
                className="rounded-full border border-steel-200 px-5 py-2.5 text-sm font-semibold text-navy-950 transition hover:border-orange-500 hover:text-orange-600"
              >
                PPE Checklist Generator
              </Link>
            </div>
          </div>

          <OfficialSafetySources toolSlug="scaffold-inspection-generator" />
        </div>
      </section>
    </main>
  );
}

