import type { Metadata } from "next";
import Link from "next/link";
import { OfficialSafetySources } from "@/components/seo/official-safety-sources";
import { IncidentCostCalculator } from "@/features/incident-cost-calculator";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createFaqJsonLd } from "@/lib/seo/faq-json-ld";
import { createToolJsonLd } from "@/lib/seo/json-ld";

const toolJsonLd = createToolJsonLd({
  name: "Incident Cost Calculator",
  description:
    "Estimate documented direct, investigation, productivity, and modeled indirect costs associated with a workplace incident.",
  url: "/tools/incident-cost-calculator",
  keywords: [
    "incident cost calculator",
    "workplace injury cost calculator",
    "accident cost calculator",
    "indirect injury cost estimator",
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
    name: "Incident Cost Calculator",
    path: "/tools/incident-cost-calculator",
  },
]);

const faqs = [
  {
    question:
      "What costs can the incident cost calculator include?",
    answer:
      "The calculator accepts medical, wage replacement, property damage, emergency response, replacement labor, legal and administrative, investigation, productivity, and other entered amounts. Actual organizational classifications may differ.",
  },
  {
    question:
      "How does the indirect cost multiplier work?",
    answer:
      "The multiplier is applied to the documented cost total. For example, 0.75 adds an estimated amount equal to 75 percent of documented costs. The selected value should come from an approved organizational method rather than an unsupported assumption.",
  },
  {
    question:
      "Is this the same as OSHA Safety Pays?",
    answer:
      "No. This calculator uses user-entered cost categories and assumptions. OSHA Safety Pays is a separate awareness tool with its own data, methodology, and limitations.",
  },
  {
    question:
      "Can this result be used for insurance or legal decisions?",
    answer:
      "No. The result is an internal planning estimate and cannot replace verified accounting records, insurance valuation, workers’ compensation determinations, legal advice, or qualified professional review.",
  },
];

const faqJsonLd = createFaqJsonLd(faqs);

export const metadata: Metadata = {
  title: "Incident Cost Calculator",
  description:
    "Estimate workplace incident costs using documented expenses, investigation time, productivity loss, and a transparent indirect-cost multiplier.",
  alternates: {
    canonical: "/tools/incident-cost-calculator",
  },
};

export default function IncidentCostCalculatorPage() {
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
              Incident Cost Calculator
            </span>
          </nav>

          <div className="mt-8 max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">
              Financial impact planning tool
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
              Incident Cost Calculator
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Build a transparent estimate from documented
              incident expenses, investigation time,
              productivity loss, and an organization-selected
              indirect-cost assumption.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <IncidentCostCalculator />
      </section>

      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-16 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
              Transparent calculation
            </p>

            <h2 className="mt-3 text-3xl font-black">
              How the estimate is calculated
            </h2>

            <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>
                Enter known direct and immediate cost amounts.
              </li>
              <li>
                Multiply investigation hours by the selected
                hourly cost.
              </li>
              <li>
                Multiply productivity hours by the selected
                hourly value.
              </li>
              <li>
                Add the entered and documented cost subtotals.
              </li>
              <li>
                Apply the selected multiplier to estimate other
                indirect costs.
              </li>
              <li>
                Add documented and modeled amounts for the final
                planning estimate.
              </li>
            </ol>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
              Precision
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Monetary calculations use integer cents
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-300">
              Every entered monetary component is converted to
              cents before totals are calculated. This prevents
              binary floating-point artifacts from creating
              inconsistent displayed subtotals.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Hour-based costs and multiplier results are rounded
              to the nearest cent before they enter later
              subtotals.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              Direct and indirect cost classifications
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Cost classification can vary by accounting,
              insurance, and organizational practice. This tool
              groups the specifically entered cash amounts into
              an entered-cost subtotal and separately displays
              calculated investigation and productivity costs.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Review the final classification with finance,
              insurance, legal, and safety professionals before
              relying on it for formal reporting.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              Selecting an indirect-cost multiplier
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Indirect costs can include disruption, scheduling,
              training, administration, reputational effects, and
              amounts not yet documented. The appropriate
              multiplier depends on the incident and the
              employer’s circumstances.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Record the source, owner, approval date, and reason
              for the selected assumption. Recalculate when
              better information becomes available.
            </p>
          </article>

          <article className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-7 lg:col-span-2">
            <h2 className="text-2xl font-black text-amber-100">
              Important limitation
            </h2>

            <p className="mt-4 text-sm leading-7 text-amber-100/90">
              This calculator is not the OSHA Safety Pays
              program, an OSHA-required formula, an insurance
              valuation, an accounting opinion, a legal estimate,
              a workers’ compensation determination, or a
              compliance assessment. Actual costs may include
              omitted, delayed, disputed, confidential, or
              jurisdiction-specific amounts.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-black tracking-tight">
          Incident Cost Calculator FAQs
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
                href: "/tools/incident-report-generator",
                title: "Incident Report Generator",
                description:
                  "Document incident facts, people involved, immediate actions, and corrective actions.",
              },
              {
                href: "/tools/near-miss-report-generator",
                title: "Near Miss Report Generator",
                description:
                  "Capture potential outcomes, contributing factors, and prevention actions.",
              },
              {
                href: "/tools/risk-matrix-calculator",
                title: "Risk Matrix Calculator",
                description:
                  "Compare initial and residual hazard risk using likelihood and severity.",
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

        <OfficialSafetySources toolSlug="incident-cost-calculator" />
      </section>
    </main>
  );
}
