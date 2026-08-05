import type { Metadata } from "next";
import Link from "next/link";
import { OfficialSafetySources } from "@/components/seo/official-safety-sources";
import { FireExtinguisherInspectionGenerator } from "@/features/fire-extinguisher-inspection-generator";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createFaqJsonLd } from "@/lib/seo/faq-json-ld";
import { createToolJsonLd } from "@/lib/seo/json-ld";

const description =
  "Create a fire extinguisher inspection checklist covering identification, location, pressure gauge, safety pin, hose, cylinder condition, findings, and corrective actions.";

const toolJsonLd = createToolJsonLd({
  name: "Fire Extinguisher Inspection Checklist Generator",
  description,
  url: "/tools/fire-extinguisher-inspection-generator",
  keywords: [
    "fire extinguisher inspection checklist",
    "monthly fire extinguisher inspection form",
    "fire extinguisher checklist generator",
    "portable fire extinguisher inspection",
  ],
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Tools", path: "/tools" },
  {
    name: "Fire Extinguisher Inspection Checklist Generator",
    path: "/tools/fire-extinguisher-inspection-generator",
  },
]);

const faqs = [
  {
    question: "What should a fire extinguisher inspection include?",
    answer:
      "A routine inspection commonly documents the extinguisher identity and location, accessibility, pressure indication, safety pin and tamper seal, hose and nozzle condition, physical damage, inspection tag, findings, and corrective actions.",
  },
  {
    question: "How often should portable fire extinguishers be inspected?",
    answer:
      "Inspection frequency depends on applicable regulations, adopted fire codes, employer procedures, site conditions, manufacturer instructions, and authority-having-jurisdiction requirements. Many workplace programs use documented monthly visual inspections.",
  },
  {
    question: "Who may inspect a fire extinguisher?",
    answer:
      "Routine visual inspections should be performed by a person assigned and trained under the employer's fire protection program. Maintenance, recharge, testing, or repair may require qualified or licensed fire protection personnel.",
  },
  {
    question: "Does this generator certify fire-code compliance?",
    answer:
      "No. It creates an informational inspection record and does not certify compliance, replace required maintenance or testing, or determine whether an extinguisher is suitable for a specific hazard.",
  },
];

const faqJsonLd = createFaqJsonLd(faqs);

export const metadata: Metadata = {
  title: "Fire Extinguisher Inspection Checklist Generator",
  description,
  alternates: {
    canonical: "/tools/fire-extinguisher-inspection-generator",
  },
};

export default function FireExtinguisherInspectionGeneratorPage() {
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
            Fire Protection Inspections
          </p>

          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            Fire Extinguisher Inspection Checklist Generator
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Create a structured portable fire extinguisher inspection record
            covering equipment identification, location, accessibility,
            pressure, safety components, physical condition, findings,
            corrective actions, and follow-up responsibility.
          </p>
        </div>

        <div className="mt-12">
          <FireExtinguisherInspectionGenerator />
        </div>

        <section className="mt-16 border-t border-white/10 pt-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
              Inspection workflow
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              How to document a fire extinguisher inspection
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-300">
              Identify the extinguisher and its location, examine visible
              condition and accessibility, document deficiencies, assign
              corrective actions, and retain the completed inspection record
              according to the applicable fire protection program.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "1. Identify equipment",
                description:
                  "Record the extinguisher asset number, type, location, inspection date, and inspector.",
              },
              {
                title: "2. Examine condition",
                description:
                  "Review accessibility, pressure indication, safety pin, seal, hose, nozzle, cylinder, and labels.",
              },
              {
                title: "3. Document follow-up",
                description:
                  "Record findings, corrective actions, responsible persons, and the next verification date.",
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
              Common visual inspection points
            </h2>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>Correct extinguisher location and asset identification</li>
              <li>Clear access, visibility, and secure mounting</li>
              <li>Pressure gauge or operating indicator condition</li>
              <li>Safety pin and tamper seal presence</li>
              <li>Hose and nozzle condition and obstruction check</li>
              <li>Cylinder corrosion, leakage, dents, or other damage</li>
              <li>Readable operating instructions and inspection tag</li>
              <li>Evidence that required maintenance remains current</li>
            </ul>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              When corrective action may be needed
            </h2>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>The extinguisher is missing, blocked, or improperly mounted</li>
              <li>The pressure indicator is outside its operable range</li>
              <li>The safety pin, tamper seal, hose, or nozzle is damaged</li>
              <li>The cylinder shows leakage, corrosion, or physical damage</li>
              <li>Labels or operating instructions are unreadable</li>
              <li>Inspection, maintenance, recharge, or testing is overdue</li>
              <li>The extinguisher may not match the protected hazard</li>
            </ul>
          </article>
        </section>

        <section className="mt-16 rounded-3xl border border-amber-300/20 bg-amber-300/10 p-7">
          <h2 className="text-2xl font-black text-amber-100">
            Important fire protection limitation
          </h2>

          <p className="mt-4 text-sm leading-7 text-amber-50/90">
            This generator is an informational documentation aid only. It does
            not certify fire-code or workplace compliance, determine the
            correct extinguisher type or placement, replace required
            maintenance, recharge, hydrostatic testing, or qualified
            inspection, or supersede OSHA requirements, adopted fire codes,
            NFPA standards, manufacturer instructions, employer procedures, or
            authority-having-jurisdiction requirements.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-black tracking-tight">
            Related contractor safety tools
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/tools/daily-jobsite-safety-inspection-generator",
                title: "Daily Jobsite Safety Inspection",
                description:
                  "Document work areas, hazards, corrective actions, and follow-up ownership.",
              },
              {
                href: "/tools/ppe-checklist-generator",
                title: "PPE Checklist Generator",
                description:
                  "Document task hazards, required PPE, and pre-use inspection items.",
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
            Fire Extinguisher Inspection FAQs
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

        <OfficialSafetySources toolSlug="fire-extinguisher-inspection-generator" />
      </section>
    </main>
  );
}
