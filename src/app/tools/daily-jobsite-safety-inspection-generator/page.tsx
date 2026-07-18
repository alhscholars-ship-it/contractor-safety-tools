import type { Metadata } from "next";
import Link from "next/link";
import { DailyJobsiteSafetyInspectionGenerator } from "@/features/daily-jobsite-safety-inspection-generator";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createFaqJsonLd } from "@/lib/seo/faq-json-ld";
import { createToolJsonLd } from "@/lib/seo/json-ld";

const description =
  "Create a daily jobsite safety inspection checklist covering active trades, work areas, hazards, corrective actions, responsible persons, and follow-up dates.";

const toolJsonLd = createToolJsonLd({
  name: "Daily Jobsite Safety Inspection Generator",
  description,
  url: "/tools/daily-jobsite-safety-inspection-generator",
  keywords: [
    "daily jobsite safety inspection checklist",
    "construction site inspection checklist",
    "jobsite safety inspection form",
    "daily construction safety checklist",
  ],
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Tools", path: "/tools" },
  {
    name: "Daily Jobsite Safety Inspection Generator",
    path: "/tools/daily-jobsite-safety-inspection-generator",
  },
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

export const metadata: Metadata = {
  title: "Daily Jobsite Safety Inspection Generator",
  description,
  alternates: {
    canonical: "/tools/daily-jobsite-safety-inspection-generator",
  },
};

export default function DailyJobsiteSafetyInspectionGeneratorPage() {
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

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <Link
          href="/tools"
          className="text-sm font-semibold text-emerald-300"
        >
          ← Back to tools
        </Link>

        <div className="mt-8 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Jobsite Inspections
          </p>

          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            Daily Jobsite Safety Inspection Generator
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Create a structured daily construction safety inspection covering
            active trades, site conditions, inspection areas, observed hazards,
            corrective actions, responsible persons, and follow-up dates.
          </p>
        </div>

        <div className="mt-12">
          <DailyJobsiteSafetyInspectionGenerator />
        </div>

        <section className="mt-16 border-t border-white/10 pt-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
              Inspection workflow
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              How to document a daily jobsite safety inspection
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-300">
              Record the project and inspection conditions, identify active
              trades and work areas, document hazards or deficiencies, assign
              corrective actions, and set clear ownership and follow-up dates.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
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
            ].map((step) => (
              <article
                key={step.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <h3 className="text-lg font-black">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              Common daily inspection areas
            </h2>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>Access, egress, walkways, and emergency routes</li>
              <li>Housekeeping, debris, and material storage</li>
              <li>Temporary electrical power and extension cords</li>
              <li>Ladders, scaffolds, and elevated work platforms</li>
              <li>Fall protection systems and floor openings</li>
              <li>Tools, machinery, vehicles, and mobile equipment</li>
              <li>Excavations, trenches, and underground work</li>
              <li>Fire prevention and emergency equipment</li>
            </ul>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              What the inspection record should capture
            </h2>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>Company, project, location, date, and inspector</li>
              <li>Weather and changing site conditions</li>
              <li>Active trades, crews, and affected work areas</li>
              <li>Observed hazards and deficient controls</li>
              <li>Immediate and longer-term corrective actions</li>
              <li>Responsible persons and completion deadlines</li>
              <li>Communication and follow-up documentation</li>
            </ul>
          </article>
        </section>

        <section className="mt-16 rounded-3xl border border-amber-300/20 bg-amber-300/10 p-7">
          <h2 className="text-2xl font-black text-amber-100">
            Important inspection limitation
          </h2>

          <p className="mt-4 text-sm leading-7 text-amber-50/90">
            This generator is an informational documentation aid only. It does
            not certify that a jobsite is safe or compliant, identify every
            possible hazard, replace competent-person or required specialized
            inspections, or substitute for applicable regulations,
            manufacturer instructions, employer programs, project
            requirements, or qualified safety review.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-black tracking-tight">
            Related contractor safety tools
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/tools/ppe-checklist-generator",
                title: "PPE Checklist Generator",
                description:
                  "Document task hazards, required PPE, and pre-use inspection items.",
              },
              {
                href: "/tools/jha-generator",
                title: "JHA Generator",
                description:
                  "Break work into task steps, hazards, controls, and PPE requirements.",
              },
              {
                href: "/tools/safety-plan-generator",
                title: "Safety Plan Generator",
                description:
                  "Create a project-level safety plan covering hazards and responsibilities.",
              },
              {
                href: "/tools/near-miss-report-generator",
                title: "Near Miss Report Generator",
                description:
                  "Document close calls, contributing factors, and corrective actions.",
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-emerald-300/40 hover:bg-white/[0.07]"
              >
                <h3 className="font-black">{tool.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-black tracking-tight">
            Daily Jobsite Safety Inspection FAQs
          </h2>

          <div className="mt-8 space-y-5">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <h3 className="text-lg font-black">{faq.question}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
