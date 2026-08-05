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
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Safety Tools",
    path: "/tools",
  },
  {
    name: "Risk Matrix Calculator",
    path: "/tools/risk-matrix-calculator",
  },
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
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <nav
            aria-label="Breadcrumb"
            className="text-sm text-slate-400"
          >
            <Link
              href="/"
              className="transition hover:text-white"
            >
              Home
            </Link>

            <span className="px-2">/</span>

            <Link
              href="/tools"
              className="transition hover:text-white"
            >
              Safety Tools
            </Link>

            <span className="px-2">/</span>

            <span className="text-slate-200">
              Risk Matrix Calculator
            </span>
          </nav>

          <div className="mt-8 max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">
              Hazard prioritization tool
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
              Risk Matrix Calculator
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Compare initial and residual hazard risk using a
              transparent 5 × 5 likelihood and severity model.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <RiskMatrixCalculator />
      </section>

      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-16 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
              Transparent model
            </p>

            <h2 className="mt-3 text-3xl font-black">
              How the 5 × 5 score is calculated
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-300">
              Each score is calculated by multiplying the
              selected likelihood and severity values:
            </p>

            <p className="mt-5 rounded-2xl bg-slate-950 p-5 font-mono text-sm leading-7 text-emerald-200">
              Risk score = likelihood × severity
            </p>

            <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">
              <li>Low: scores 1 through 4</li>
              <li>Moderate: scores 5 through 9</li>
              <li>High: scores 10 through 16</li>
              <li>Critical: scores 17 through 25</li>
            </ul>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
              Assessment quality
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Use credible likelihood and consequence estimates
            </h2>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>
                Consider how often workers perform the task and
                how many workers may be exposed.
              </li>
              <li>
                Use the credible potential consequence rather
                than only the most common minor outcome.
              </li>
              <li>
                Include abnormal, emergency, maintenance, and
                nonroutine conditions.
              </li>
              <li>
                Obtain worker input and review incident,
                inspection, and near-miss information.
              </li>
              <li>
                Reassess when equipment, processes, staffing, or
                work conditions change.
              </li>
            </ul>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              Initial risk versus residual risk
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Initial risk represents conditions before the
              proposed controls are relied upon. Residual risk
              represents the estimated risk after controls have
              been implemented and their effectiveness verified.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Do not lower a residual score merely because a
              control appears in a plan. Confirm that the control
              is installed, used correctly, maintained, and
              effective under actual work conditions.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              Apply the hierarchy of controls
            </h2>

            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-300">
              <li>Eliminate the hazard where feasible.</li>
              <li>Substitute a safer material or process.</li>
              <li>Use engineering controls to isolate exposure.</li>
              <li>
                Add administrative controls and safe work
                practices.
              </li>
              <li>
                Use suitable personal protective equipment as
                the final layer.
              </li>
            </ol>
          </article>

          <article className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-7 lg:col-span-2">
            <h2 className="text-2xl font-black text-amber-100">
              Important limitation
            </h2>

            <p className="mt-4 text-sm leading-7 text-amber-100/90">
              This 5 × 5 matrix is not an OSHA-required scoring
              formula, permission to proceed, or compliance
              determination. It cannot replace applicable
              standards, competent-person decisions,
              task-specific assessment, exposure monitoring,
              worker participation, or immediate control of
              recognized serious or imminent hazards.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-black tracking-tight">
          Risk Matrix Calculator FAQs
        </h2>

        <div className="mt-8 grid gap-5">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <h3 className="text-lg font-black text-emerald-200">
                {faq.question}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="text-3xl font-black tracking-tight">
            Related contractor safety tools
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                href: "/tools/jha-generator",
                title: "JHA Generator",
                description:
                  "Document task steps, hazards, controls, and required PPE.",
              },
              {
                href: "/tools/safety-plan-generator",
                title: "Safety Plan Generator",
                description:
                  "Create a project safety plan with hazards, controls, and emergency information.",
              },
              {
                href: "/tools/near-miss-report-generator",
                title: "Near Miss Report Generator",
                description:
                  "Capture potential outcomes, contributing factors, and preventive actions.",
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-emerald-300/40 hover:bg-white/[0.07]"
              >
                <h3 className="font-black text-white">
                  {tool.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <OfficialSafetySources toolSlug="risk-matrix-calculator" />
      </section>
    </main>
  );
}
