import type { Metadata } from "next";
import Link from "next/link";
import { OfficialSafetySources } from "@/components/seo/official-safety-sources";
import { FireExtinguisherInspectionGenerator } from "@/features/fire-extinguisher-inspection-generator";
import { createToolJsonLd } from "@/lib/seo/json-ld";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createFaqJsonLd } from "@/lib/seo/faq-json-ld";

const toolJsonLd = createToolJsonLd({
  name: "Fire Extinguisher Inspection Checklist Generator",
  description:
    "Create a fire extinguisher inspection checklist covering identification, location, pressure gauge, safety pin, hose, cylinder condition, findings, and corrective actions.",
  url: "/tools/fire-extinguisher-inspection-generator",
  keywords: ["fire extinguisher inspection checklist", "monthly fire extinguisher inspection form", "fire extinguisher checklist generator", "portable fire extinguisher inspection"],
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Tools", path: "/tools" },
  { name: "Fire Extinguisher Inspection Checklist Generator", path: "/tools/fire-extinguisher-inspection-generator" },
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

const steps = [
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
];

const relatedTools = [
  {
    href: "/tools/daily-jobsite-safety-inspection-generator",
    title: "Daily Jobsite Safety Inspection",
    description: "Document work areas, hazards, corrective actions, and follow-up ownership.",
  },
  {
    href: "/tools/ppe-checklist-generator",
    title: "PPE Checklist Generator",
    description: "Document task hazards, required PPE, and pre-use inspection items.",
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
  title: "Fire Extinguisher Inspection Checklist Generator",
  description:
    "Create a fire extinguisher inspection checklist covering identification, location, pressure gauge, safety pin, hose, cylinder condition, findings, and corrective actions.",
  alternates: {
    canonical: "/tools/fire-extinguisher-inspection-generator",
  },
};

export default function FireExtinguisherInspectionGeneratorPage() {
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
              Fire Protection Inspections
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Fire Extinguisher Inspection Checklist Generator
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-steel-200 sm:text-lg">
              Create a structured portable fire extinguisher inspection record covering equipment identification, location, accessibility, pressure, safety components, physical condition, findings, corrective actions, and follow-up responsibility.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-navy-950 py-14">
        <div className="mx-auto w-full max-w-6xl px-6">
          <FireExtinguisherInspectionGenerator />
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
              How to document a fire extinguisher inspection
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              Identify the extinguisher and its location, examine visible condition and accessibility, document deficiencies, assign corrective actions, and retain the completed inspection record according to the applicable fire protection program.
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
                Common visual inspection points
              </h2>

              <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[14.5px] leading-7 text-slate-600">
              <li>Correct extinguisher location and asset identification</li>
              <li>Clear access, visibility, and secure mounting</li>
              <li>Pressure gauge or operating indicator condition</li>
              <li>Safety pin and tamper seal presence</li>
              <li>Hose and nozzle condition and obstruction check</li>
              <li>Cylinder corrosion, leakage, dents, or other damage</li>
              <li>Readable operating instructions and inspection tag</li>
              <li>Evidence that required maintenance remains current</li>
              </ul>
            </div>

            <div className="rounded-xl border border-steel-200 bg-white p-7">
              <h2 className="font-display text-xl font-bold text-navy-950">
                When corrective action may be needed
              </h2>

              <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[14.5px] leading-7 text-slate-600">
              <li>The extinguisher is missing, blocked, or improperly mounted</li>
              <li>The pressure indicator is outside its operable range</li>
              <li>The safety pin, tamper seal, hose, or nozzle is damaged</li>
              <li>The cylinder shows leakage, corrosion, or physical damage</li>
              <li>Labels or operating instructions are unreadable</li>
              <li>Inspection, maintenance, recharge, or testing is overdue</li>
              <li>The extinguisher may not match the protected hazard</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-orange-500/30 bg-orange-500/10 p-7">
            <h2 className="font-display text-xl font-bold text-orange-950">
              Important fire protection limitation
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-orange-950/80">
              This generator is an informational documentation aid only. It does not certify fire-code or workplace compliance, determine the correct extinguisher type or placement, replace required maintenance, recharge, hydrostatic testing, or qualified inspection, or supersede OSHA requirements, adopted fire codes, NFPA standards, manufacturer instructions, employer procedures, or authority-having-jurisdiction requirements.
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
              Connect fire protection checks with jobsite inspections, PPE, and incident documentation.
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
              Fire Extinguisher Inspection FAQs
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

          <OfficialSafetySources toolSlug="fire-extinguisher-inspection-generator" />
        </div>
      </section>
    </main>
  );
}

