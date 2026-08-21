import type { Metadata } from "next";
import Link from "next/link";
import { OfficialSafetySources } from "@/components/seo/official-safety-sources";
import { DailyJobsiteSafetyInspectionGenerator } from "@/features/daily-jobsite-safety-inspection-generator";
import { createToolJsonLd } from "@/lib/seo/json-ld";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createFaqJsonLd } from "@/lib/seo/faq-json-ld";

const toolJsonLd = createToolJsonLd({
  name: "Daily Jobsite Safety Inspection Generator",
  description:
    "Create a daily jobsite safety inspection checklist covering active trades, work areas, hazards, corrective actions, responsible persons, and follow-up dates.",
  url: "/tools/daily-jobsite-safety-inspection-generator",
  keywords: ["daily jobsite safety inspection checklist", "construction site inspection checklist", "jobsite safety inspection form", "daily construction safety checklist"],
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Tools", path: "/tools" },
  { name: "Daily Jobsite Safety Inspection Generator", path: "/tools/daily-jobsite-safety-inspection-generator" },
]);

const faqs = [
  {
    question: "What is a daily jobsite safety inspection?",
    answer:
      "A daily jobsite safety inspection is a documented review of work areas, active operations, hazards, deficiencies, corrective actions, and responsible persons before or during construction activities.",
  },
  {
    question: "What should be checked during a jobsite inspection?",
    answer:
      "Common inspection areas include access routes, housekeeping, material storage, temporary power, ladders, scaffolds, fall protection, excavations, tools, equipment, fire protection, and required PPE.",
  },
  {
    question: "Who should complete a daily safety inspection?",
    answer:
      "The inspection should be completed by a person assigned by the employer who has the training, authority, and project knowledge required for the conditions and activities being reviewed.",
  },
  {
    question: "Does this generator certify that a jobsite is compliant?",
    answer:
      "No. The generator creates an informational inspection draft and does not certify compliance, replace competent-person inspections, or confirm that every site hazard has been identified.",
  },
];

const faqJsonLd = createFaqJsonLd(faqs);

const steps = [
  {
    title: "1. Review conditions",
    description:
      "Document the date, weather, active trades, work areas, and operations underway.",
  },
  {
    title: "2. Record hazards",
    description:
      "Identify unsafe conditions, deficient controls, housekeeping issues, and other concerns.",
  },
  {
    title: "3. Assign corrections",
    description:
      "Define corrective actions, responsible persons, and dates for verifying closure.",
  },
];

const relatedTools = [
  {
    href: "/tools/ppe-checklist-generator",
    title: "PPE Checklist Generator",
    description: "Document task hazards, required PPE, and pre-use inspection items.",
  },
  {
    href: "/tools/jha-generator",
    title: "JHA Generator",
    description: "Break work into task steps, hazards, controls, and PPE requirements.",
  },
  {
    href: "/tools/safety-plan-generator",
    title: "Safety Plan Generator",
    description: "Create a project-level safety plan covering hazards and responsibilities.",
  },
  {
    href: "/tools/near-miss-report-generator",
    title: "Near Miss Report Generator",
    description: "Document close calls, contributing factors, and corrective actions.",
  },
];

export const metadata: Metadata = {
  title: "Daily Jobsite Safety Inspection Generator",
  description:
    "Create a daily jobsite safety inspection checklist covering active trades, work areas, hazards, corrective actions, responsible persons, and follow-up dates.",
  alternates: {
    canonical: "/tools/daily-jobsite-safety-inspection-generator",
  },
};

export default function DailyJobsiteSafetyInspectionGeneratorPage() {
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
          <Link
            href="/tools"
            className="font-mono text-xs font-semibold text-steel-400 transition hover:text-orange-500"
          >
            ← Back to tools
          </Link>

          <div className="mt-6 max-w-3xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">
              <span className="inline-block h-[2px] w-3.5 bg-orange-500" />
              Jobsite Inspections
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Daily Jobsite Safety Inspection Generator
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-steel-200 sm:text-lg">
              Create a structured daily construction safety inspection covering active trades, site conditions, inspection areas, observed hazards, corrective actions, responsible persons, and follow-up dates.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-navy-950 py-14">
        <div className="mx-auto w-full max-w-6xl px-6">
          <DailyJobsiteSafetyInspectionGenerator />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-600">
              <span className="inline-block h-[2px] w-3.5 bg-orange-600" />
              How it works
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
              How to document a daily jobsite safety inspection
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              Record the project and inspection conditions, identify active trades and work areas, document hazards or deficiencies, assign corrective actions, and set clear ownership and follow-up dates.
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.title}
                className="rounded-xl border border-steel-200 bg-white p-6"
              >
                <h3 className="font-display text-lg font-bold text-navy-950">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <div className="rounded-xl border border-steel-200 bg-white p-7">
              <h2 className="font-display text-xl font-bold text-navy-950">
                Common daily inspection areas
              </h2>

              <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[14.5px] leading-7 text-slate-600">
              <li>Access, egress, walkways, and emergency routes</li>
              <li>Housekeeping, debris, and material storage</li>
              <li>Temporary electrical power and extension cords</li>
              <li>Ladders, scaffolds, and elevated work platforms</li>
              <li>Fall protection systems and floor openings</li>
              <li>Tools, machinery, vehicles, and mobile equipment</li>
              <li>Excavations, trenches, and underground work</li>
              <li>Fire prevention and emergency equipment</li>
              </ul>
            </div>

            <div className="rounded-xl border border-steel-200 bg-white p-7">
              <h2 className="font-display text-xl font-bold text-navy-950">
                What the inspection record should capture
              </h2>

              <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[14.5px] leading-7 text-slate-600">
              <li>Company, project, location, date, and inspector</li>
              <li>Weather and changing site conditions</li>
              <li>Active trades, crews, and affected work areas</li>
              <li>Observed hazards and deficient controls</li>
              <li>Immediate and longer-term corrective actions</li>
              <li>Responsible persons and completion deadlines</li>
              <li>Communication and follow-up documentation</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-orange-500/30 bg-orange-500/10 p-7">
            <h2 className="font-display text-xl font-bold text-orange-950">
              Important inspection limitation
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-orange-950/80">
              This generator is an informational documentation aid only. It does not certify that a jobsite is safe or compliant, identify every possible hazard, replace competent-person or required specialized inspections, or substitute for applicable regulations, manufacturer instructions, employer programs, project requirements, or qualified safety review.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-steel-200 bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-navy-950">
              Related contractor safety tools
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-slate-600">
              Use these related generators to support hazard analysis, PPE checks, and follow-up documentation.
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-xl border border-steel-200 bg-white p-6 transition hover:border-orange-500/50 hover:bg-orange-100/40"
              >
                <h3 className="font-bold text-navy-950">{tool.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-14">
            <h2 className="font-display text-3xl font-bold tracking-tight text-navy-950">
              Daily Jobsite Safety Inspection FAQs
            </h2>
            <div className="mt-7 space-y-4">
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
          </div>

          <OfficialSafetySources toolSlug="daily-jobsite-safety-inspection-generator" />
        </div>
      </section>
    </main>
  );
}

