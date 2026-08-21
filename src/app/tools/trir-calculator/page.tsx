import type { Metadata } from "next";
import Link from "next/link";
import { OfficialSafetySources } from "@/components/seo/official-safety-sources";
import { TrirCalculator } from "@/features/trir-calculator";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createFaqJsonLd } from "@/lib/seo/faq-json-ld";
import { createToolJsonLd } from "@/lib/seo/json-ld";

const toolJsonLd = createToolJsonLd({
  name: "TRIR Calculator",
  description:
    "Calculate a total recordable incident rate from OSHA-recordable cases and employee hours worked using the standardized 200,000-hour incidence-rate base.",
  url: "/tools/trir-calculator",
  keywords: [
    "TRIR calculator",
    "total recordable incident rate calculator",
    "OSHA incident rate calculator",
    "recordable incident rate formula",
  ],
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Safety Tools", path: "/tools" },
  { name: "TRIR Calculator", path: "/tools/trir-calculator" },
]);

const faqs = [
  {
    question: "What formula does the TRIR calculator use?",
    answer:
      "The calculator multiplies the entered recordable-case count by 200,000 and divides that value by the employee hours worked during the same reporting period.",
  },
  {
    question: "Why does the formula use 200,000 hours?",
    answer:
      "The standardized base represents 100 full-time employees working 40 hours per week for 50 weeks. It normalizes incidence rates for comparison across differently sized workforces.",
  },
  {
    question: "Which cases should be entered?",
    answer:
      "Enter only cases that the employer has determined are recordable for the selected reporting period under the applicable recordkeeping requirements. This calculator does not make recordability determinations.",
  },
  {
    question: "Does a lower TRIR prove that a workplace is safe?",
    answer:
      "No. TRIR is a lagging incidence-rate measure and should not be treated as proof of overall safety performance, individual risk, regulatory compliance, or the effectiveness of every hazard control.",
  },
];

const faqJsonLd = createFaqJsonLd(faqs);

const relatedTools = [
  {
    href: "/tools/incident-report-generator",
    title: "Incident Report Generator",
    description:
      "Document event details, corrective actions, and follow-up responsibilities.",
  },
  {
    href: "/tools/near-miss-report-generator",
    title: "Near Miss Report Generator",
    description:
      "Capture potential outcomes, contributing factors, and preventive actions.",
  },
  {
    href: "/tools/daily-jobsite-safety-inspection-generator",
    title: "Daily Jobsite Inspection",
    description:
      "Record observed hazards, corrective actions, owners, and follow-up dates.",
  },
];

export const metadata: Metadata = {
  title: "TRIR Calculator",
  description:
    "Calculate total recordable incident rate using recordable cases, employee hours worked, and the standardized 200,000-hour formula.",
  alternates: {
    canonical: "/tools/trir-calculator",
  },
};

export default function TrirCalculatorPage() {
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
            <span className="text-steel-200">TRIR Calculator</span>
          </nav>

          <div className="mt-6 max-w-3xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">
              <span className="inline-block h-[2px] w-3.5 bg-orange-500" />
              Safety performance calculator
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
              TRIR Calculator
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-steel-200 sm:text-lg">
              Calculate a total recordable incident rate using the
              recordable cases and employee hours worked for the same
              reporting period.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-navy-950 py-14">
        <div className="mx-auto w-full max-w-6xl px-6">
          <TrirCalculator />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-5 px-6 lg:grid-cols-2">
          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.09em] text-orange-600">
              Formula
            </span>
            <h2 className="mt-2.5 font-display text-2xl font-bold text-navy-950">
              How TRIR is calculated
            </h2>
            <p className="mt-4 text-[14.5px] leading-7 text-slate-600">
              The calculator applies the standardized incidence-rate
              formula to the values entered for the selected period:
            </p>
            <p className="mt-4 rounded-[3px] bg-navy-950 p-4 font-mono text-[13px] leading-6 text-orange-300">
              TRIR = (recordable cases × 200,000) ÷ employee hours worked
            </p>
            <p className="mt-4 text-[14.5px] leading-7 text-slate-600">
              The 200,000-hour base represents 100 full-time employees
              working 40 hours per week for 50 weeks. Normalization allows
              rates from differently sized workforces to be compared on a
              common basis.
            </p>
          </article>

          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.09em] text-orange-600">
              Required inputs
            </span>
            <h2 className="mt-2.5 font-display text-2xl font-bold text-navy-950">
              Use matching reporting-period data
            </h2>
            <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[14.5px] leading-7 text-slate-600">
              <li>
                Use the recordable-case count for the reporting period
                being evaluated.
              </li>
              <li>
                Use actual employee hours worked for that same reporting
                period.
              </li>
              <li>
                Apply a consistent establishment, workforce, and
                reporting-period scope.
              </li>
              <li>
                Review case classification and hour totals before relying
                on the result.
              </li>
              <li>Preserve the underlying records used in the calculation.</li>
            </ul>
          </article>

          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <h2 className="font-display text-xl font-bold text-navy-950">
              How to interpret a TRIR result
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
              The result expresses the entered recordable-case experience
              per 100 full-time-equivalent workers. Interpretation should
              account for workforce size, reporting period, industry,
              establishment type, recordkeeping quality, and changes in
              exposure hours.
            </p>
            <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
              A small change in case count can produce a large rate change
              when relatively few employee hours are worked. Rate trends
              should therefore be reviewed with the underlying events,
              hazards, controls, and leading indicators.
            </p>
          </article>

          <article className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-7">
            <h2 className="font-display text-xl font-bold text-orange-950">
              Recordkeeping and comparison limitations
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-orange-950/80">
              This calculator does not decide whether an injury or illness
              is recordable, validate OSHA logs, select an industry
              benchmark, prove that a workplace is safe, or establish
              compliance. Review current recordkeeping requirements and
              qualified guidance before using the result for reporting or
              business decisions.
            </p>
          </article>
        </div>
      </section>

      <section className="border-t border-steel-200 bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight text-navy-950">
            TRIR Calculator FAQs
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

          <OfficialSafetySources toolSlug="trir-calculator" />
        </div>
      </section>
    </main>
  );
}
