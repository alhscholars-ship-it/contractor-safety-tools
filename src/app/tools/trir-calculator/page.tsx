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
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Safety Tools",
    path: "/tools",
  },
  {
    name: "TRIR Calculator",
    path: "/tools/trir-calculator",
  },
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
              TRIR Calculator
            </span>
          </nav>

          <div className="mt-8 max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">
              Safety performance calculator
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
              TRIR Calculator
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Calculate a total recordable incident rate using
              the recordable cases and employee hours worked for
              the same reporting period.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <TrirCalculator />
      </section>

      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-16 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
              Formula
            </p>

            <h2 className="mt-3 text-3xl font-black">
              How TRIR is calculated
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-300">
              The calculator applies the standardized incidence-rate
              formula to the values entered for the selected period:
            </p>

            <p className="mt-5 rounded-2xl bg-slate-950 p-5 font-mono text-sm leading-7 text-emerald-200">
              TRIR = (recordable cases × 200,000) ÷ employee
              hours worked
            </p>

            <p className="mt-5 text-sm leading-7 text-slate-300">
              The 200,000-hour base represents 100 full-time
              employees working 40 hours per week for 50 weeks.
              Normalization allows rates from differently sized
              workforces to be compared on a common basis.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
              Required inputs
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Use matching reporting-period data
            </h2>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>
                Use the recordable-case count for the reporting
                period being evaluated.
              </li>
              <li>
                Use actual employee hours worked for that same
                reporting period.
              </li>
              <li>
                Apply a consistent establishment, workforce, and
                reporting-period scope.
              </li>
              <li>
                Review case classification and hour totals before
                relying on the result.
              </li>
              <li>
                Preserve the underlying records used in the
                calculation.
              </li>
            </ul>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              How to interpret a TRIR result
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              The result expresses the entered recordable-case
              experience per 100 full-time-equivalent workers.
              Interpretation should account for workforce size,
              reporting period, industry, establishment type,
              recordkeeping quality, and changes in exposure hours.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              A small change in case count can produce a large rate
              change when relatively few employee hours are worked.
              Rate trends should therefore be reviewed with the
              underlying events, hazards, controls, and leading
              indicators.
            </p>
          </article>

          <article className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-7">
            <h2 className="text-2xl font-black text-amber-100">
              Recordkeeping and comparison limitations
            </h2>

            <p className="mt-4 text-sm leading-7 text-amber-100/90">
              This calculator does not decide whether an injury or
              illness is recordable, validate OSHA logs, select an
              industry benchmark, prove that a workplace is safe,
              or establish compliance. Review current recordkeeping
              requirements and qualified guidance before using the
              result for reporting or business decisions.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-black tracking-tight">
          TRIR Calculator FAQs
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

        <OfficialSafetySources toolSlug="trir-calculator" />
      </section>
    </main>
  );
}
