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
  { name: "Home", path: "/" },
  { name: "Safety Tools", path: "/tools" },
  { name: "Incident Cost Calculator", path: "/tools/incident-cost-calculator" },
]);

const faqs = [
  {
    question: "What costs can the incident cost calculator include?",
    answer:
      "The calculator accepts medical, wage replacement, property damage, emergency response, replacement labor, legal and administrative, investigation, productivity, and other entered amounts. Actual organizational classifications may differ.",
  },
  {
    question: "How does the indirect cost multiplier work?",
    answer:
      "The multiplier is applied to the documented cost total. For example, 0.75 adds an estimated amount equal to 75 percent of documented costs. The selected value should come from an approved organizational method rather than an unsupported assumption.",
  },
  {
    question: "Is this the same as OSHA Safety Pays?",
    answer:
      "No. This calculator uses user-entered cost categories and assumptions. OSHA Safety Pays is a separate awareness tool with its own data, methodology, and limitations.",
  },
  {
    question: "Can this result be used for insurance or legal decisions?",
    answer:
      "No. The result is an internal planning estimate and cannot replace verified accounting records, insurance valuation, workers\u2019 compensation determinations, legal advice, or qualified professional review.",
  },
];

const faqJsonLd = createFaqJsonLd(faqs);

const relatedTools = [
  {
    href: "/tools/incident-report-generator",
    title: "Incident Report Generator",
    description: "Document incident facts, people involved, immediate actions, and corrective actions.",
  },
  {
    href: "/tools/near-miss-report-generator",
    title: "Near Miss Report Generator",
    description: "Capture potential outcomes, contributing factors, and prevention actions.",
  },
  {
    href: "/tools/risk-matrix-calculator",
    title: "Risk Matrix Calculator",
    description: "Compare initial and residual hazard risk using likelihood and severity.",
  },
];

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
            <span className="text-steel-200">Incident Cost Calculator</span>
          </nav>

          <div className="mt-6 max-w-3xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">
              <span className="inline-block h-[2px] w-3.5 bg-orange-500" />
              Financial impact planning tool
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Incident Cost Calculator
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-steel-200 sm:text-lg">
              Build a transparent estimate from documented incident
              expenses, investigation time, productivity loss, and an
              organization-selected indirect-cost assumption.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-navy-950 py-14">
        <div className="mx-auto w-full max-w-6xl px-6">
          <IncidentCostCalculator />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-5 px-6 lg:grid-cols-2">
          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.09em] text-orange-600">
              Transparent calculation
            </span>
            <h2 className="mt-2.5 font-display text-2xl font-bold text-navy-950">
              How the estimate is calculated
            </h2>
            <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-[14.5px] leading-7 text-slate-600">
              <li>Enter known direct and immediate cost amounts.</li>
              <li>Multiply investigation hours by the selected hourly cost.</li>
              <li>Multiply productivity hours by the selected hourly value.</li>
              <li>Add the entered and documented cost subtotals.</li>
              <li>Apply the selected multiplier to estimate other indirect costs.</li>
              <li>Add documented and modeled amounts for the final planning estimate.</li>
            </ol>
          </article>

          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.09em] text-orange-600">
              Precision
            </span>
            <h2 className="mt-2.5 font-display text-2xl font-bold text-navy-950">
              Monetary calculations use integer cents
            </h2>
            <p className="mt-4 text-[14.5px] leading-7 text-slate-600">
              Every entered monetary component is converted to cents
              before totals are calculated. This prevents binary
              floating-point artifacts from creating inconsistent
              displayed subtotals.
            </p>
            <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
              Hour-based costs and multiplier results are rounded to the
              nearest cent before they enter later subtotals.
            </p>
          </article>

          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <h2 className="font-display text-xl font-bold text-navy-950">
              Direct and indirect cost classifications
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
              Cost classification can vary by accounting, insurance, and
              organizational practice. This tool groups the specifically
              entered cash amounts into an entered-cost subtotal and
              separately displays calculated investigation and
              productivity costs.
            </p>
            <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
              Review the final classification with finance, insurance,
              legal, and safety professionals before relying on it for
              formal reporting.
            </p>
          </article>

          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <h2 className="font-display text-xl font-bold text-navy-950">
              Selecting an indirect-cost multiplier
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
              Indirect costs can include disruption, scheduling, training,
              administration, reputational effects, and amounts not yet
              documented. The appropriate multiplier depends on the
              incident and the employer&apos;s circumstances.
            </p>
            <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
              Record the source, owner, approval date, and reason for the
              selected assumption. Recalculate when better information
              becomes available.
            </p>
          </article>

          <article className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-7 lg:col-span-2">
            <h2 className="font-display text-xl font-bold text-orange-950">
              Important limitation
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-orange-950/80">
              This calculator is not the OSHA Safety Pays program, an
              OSHA-required formula, an insurance valuation, an accounting
              opinion, a legal estimate, a workers&apos; compensation
              determination, or a compliance assessment. Actual costs may
              include omitted, delayed, disputed, confidential, or
              jurisdiction-specific amounts.
            </p>
          </article>
        </div>
      </section>

      <section className="border-t border-steel-200 bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight text-navy-950">
            Incident Cost Calculator FAQs
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

          <OfficialSafetySources toolSlug="incident-cost-calculator" />
        </div>
      </section>
    </main>
  );
}
