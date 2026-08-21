import type { Metadata } from "next";
import Link from "next/link";
import { OfficialSafetySources } from "@/components/seo/official-safety-sources";
import { RiskMatrixCalculator } from "@/features/risk-matrix-calculator";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createFaqJsonLd } from "@/lib/seo/faq-json-ld";
import { createToolJsonLd } from "@/lib/seo/json-ld";

const toolJsonLd = createToolJsonLd({
  name: "Risk Matrix Calculator",
  description:
    "Compare initial and residual workplace risk using a transparent 5 by 5 likelihood and severity matrix with control-priority guidance.",
  url: "/tools/risk-matrix-calculator",
  keywords: [
    "risk matrix calculator",
    "5x5 risk matrix",
    "likelihood severity calculator",
    "workplace risk assessment calculator",
  ],
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Safety Tools", path: "/tools" },
  { name: "Risk Matrix Calculator", path: "/tools/risk-matrix-calculator" },
]);

const faqs = [
  {
    question: "How does this risk matrix calculate a score?",
    answer:
      "The calculator multiplies a likelihood value from 1 through 5 by a severity value from 1 through 5. It calculates initial and residual scores separately so the modeled effect of proposed controls remains visible.",
  },
  {
    question: "Is a 5 by 5 risk matrix required by OSHA?",
    answer:
      "No. This matrix is a transparent prioritization model rather than an OSHA-required scoring formula. Employers must still follow applicable standards and address recognized serious hazards.",
  },
  {
    question: "What is residual risk?",
    answer:
      "Residual risk is the estimated risk remaining after selected controls have been implemented and verified. It should not be based only on controls that are planned but not yet effective.",
  },
  {
    question: "Can a low score authorize work to proceed?",
    answer:
      "No. A score cannot replace competent-person review, applicable standards, exposure assessment, worker input, permits, required protective systems, or immediate action for serious or imminent hazards.",
  },
];

const faqJsonLd = createFaqJsonLd(faqs);

const relatedTools = [
  {
    href: "/tools/jha-generator",
    title: "JHA Generator",
    description: "Document task steps, hazards, controls, and required PPE.",
  },
  {
    href: "/tools/safety-plan-generator",
    title: "Safety Plan Generator",
    description: "Create a project safety plan with hazards, controls, and emergency information.",
  },
  {
    href: "/tools/near-miss-report-generator",
    title: "Near Miss Report Generator",
    description: "Capture potential outcomes, contributing factors, and preventive actions.",
  },
];

export const metadata: Metadata = {
  title: "Risk Matrix Calculator",
  description:
    "Calculate initial and residual risk scores with a transparent 5x5 likelihood and severity matrix for workplace hazard prioritization.",
  alternates: {
    canonical: "/tools/risk-matrix-calculator",
  },
};

export default function RiskMatrixCalculatorPage() {
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
            <span className="text-steel-200">Risk Matrix Calculator</span>
          </nav>

          <div className="mt-6 max-w-3xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">
              <span className="inline-block h-[2px] w-3.5 bg-orange-500" />
              Hazard prioritization tool
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Risk Matrix Calculator
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-steel-200 sm:text-lg">
              Compare initial and residual hazard risk using a
              transparent 5 × 5 likelihood and severity model.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-navy-950 py-14">
        <div className="mx-auto w-full max-w-6xl px-6">
          <RiskMatrixCalculator />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-5 px-6 lg:grid-cols-2">
          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.09em] text-orange-600">
              Transparent model
            </span>
            <h2 className="mt-2.5 font-display text-2xl font-bold text-navy-950">
              How the 5 × 5 score is calculated
            </h2>
            <p className="mt-4 text-[14.5px] leading-7 text-slate-600">
              Each score is calculated by multiplying the selected
              likelihood and severity values:
            </p>
            <p className="mt-4 rounded-[3px] bg-navy-950 p-4 font-mono text-[13px] leading-6 text-orange-300">
              Risk score = likelihood × severity
            </p>
            <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[14.5px] leading-7 text-slate-600">
              <li>Low: scores 1 through 4</li>
              <li>Moderate: scores 5 through 9</li>
              <li>High: scores 10 through 16</li>
              <li>Critical: scores 17 through 25</li>
            </ul>
          </article>

          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.09em] text-orange-600">
              Assessment quality
            </span>
            <h2 className="mt-2.5 font-display text-2xl font-bold text-navy-950">
              Use credible likelihood and consequence estimates
            </h2>
            <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[14.5px] leading-7 text-slate-600">
              <li>
                Consider how often workers perform the task and how many
                workers may be exposed.
              </li>
              <li>
                Use the credible potential consequence rather than only
                the most common minor outcome.
              </li>
              <li>
                Include abnormal, emergency, maintenance, and nonroutine
                conditions.
              </li>
              <li>
                Obtain worker input and review incident, inspection, and
                near-miss information.
              </li>
              <li>
                Reassess when equipment, processes, staffing, or work
                conditions change.
              </li>
            </ul>
          </article>

          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <h2 className="font-display text-xl font-bold text-navy-950">
              Initial risk versus residual risk
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
              Initial risk represents conditions before the proposed
              controls are relied upon. Residual risk represents the
              estimated risk after controls have been implemented and
              their effectiveness verified.
            </p>
            <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
              Do not lower a residual score merely because a control
              appears in a plan. Confirm that the control is installed,
              used correctly, maintained, and effective under actual
              work conditions.
            </p>
          </article>

          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <h2 className="font-display text-xl font-bold text-navy-950">
              Apply the hierarchy of controls
            </h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-[14.5px] leading-7 text-slate-600">
              <li>Eliminate the hazard where feasible.</li>
              <li>Substitute a safer material or process.</li>
              <li>Use engineering controls to isolate exposure.</li>
              <li>Add administrative controls and safe work practices.</li>
              <li>Use suitable personal protective equipment as the final layer.</li>
            </ol>
          </article>

          <article className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-7 lg:col-span-2">
            <h2 className="font-display text-xl font-bold text-orange-950">
              Important limitation
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-orange-950/80">
              This 5 × 5 matrix is not an OSHA-required scoring formula,
              permission to proceed, or compliance determination. It
              cannot replace applicable standards, competent-person
              decisions, task-specific assessment, exposure monitoring,
              worker participation, or immediate control of recognized
              serious or imminent hazards.
            </p>
          </article>
        </div>
      </section>

      <section className="border-t border-steel-200 bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight text-navy-950">
            Risk Matrix Calculator FAQs
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

          <div className="mt-14">
            <h2 className="font-display text-3xl font-bold tracking-tight text-navy-950">
              Related contractor safety tools
            </h2>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
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
          </div>

          <OfficialSafetySources toolSlug="risk-matrix-calculator" />
        </div>
      </section>
    </main>
  );
}
