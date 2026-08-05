import type { Metadata } from "next";
import Link from "next/link";
import { OfficialSafetySources } from "@/components/seo/official-safety-sources";
import { SeverityRateCalculator } from "@/features/severity-rate-calculator";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createFaqJsonLd } from "@/lib/seo/faq-json-ld";
import { createToolJsonLd } from "@/lib/seo/json-ld";

const toolJsonLd = createToolJsonLd({
  name: "Severity Rate Calculator",
  description:
    "Calculate a normalized workplace injury severity rate using recorded days away, job-transfer or restriction days, employee hours, and a 200,000-hour base.",
  url: "/tools/severity-rate-calculator",
  keywords: [
    "severity rate calculator",
    "safety severity rate calculator",
    "lost workday severity rate",
    "OSHA severity rate formula",
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
    name: "Severity Rate Calculator",
    path: "/tools/severity-rate-calculator",
  },
]);

const faqs = [
  {
    question: "What does a severity rate measure?",
    answer:
      "A severity rate normalizes recorded days away from work and restricted-work or job-transfer days against employee hours. It describes the magnitude of lost or restricted time rather than the number of cases.",
  },
  {
    question: "What formula does this calculator use?",
    answer:
      "The calculator adds days away from work and job-transfer or restriction days, multiplies the combined total by 200,000, and divides the result by employee hours worked during the same reporting period.",
  },
  {
    question: "Should I enter cases or calendar days?",
    answer:
      "Enter recorded calendar day totals. Unlike TRIR and DART calculations, the severity-rate numerator uses days rather than case counts.",
  },
  {
    question: "Does severity rate establish OSHA compliance?",
    answer:
      "No. The calculation does not determine recordability, validate OSHA 300 Log entries, replace current recordkeeping requirements, measure every type of harm, or establish regulatory compliance.",
  },
];

const faqJsonLd = createFaqJsonLd(faqs);

export const metadata: Metadata = {
  title: "Severity Rate Calculator",
  description:
    "Calculate workplace injury severity rate from days away, restricted or transfer days, employee hours, and a standardized 200,000-hour base.",
  alternates: {
    canonical: "/tools/severity-rate-calculator",
  },
};

export default function SeverityRateCalculatorPage() {
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
              Severity Rate Calculator
            </span>
          </nav>

          <div className="mt-8 max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">
              Safety performance calculator
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
              Severity Rate Calculator
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Normalize recorded days away and restricted or
              transferred workdays against employee hours for a
              consistent severity measurement.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <SeverityRateCalculator />
      </section>

      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-16 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
              Formula
            </p>

            <h2 className="mt-3 text-3xl font-black">
              How severity rate is calculated
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-300">
              This calculator uses recorded day totals in the
              numerator rather than the number of incidents:
            </p>

            <p className="mt-5 rounded-2xl bg-slate-950 p-5 font-mono text-sm leading-7 text-emerald-200">
              Severity rate = ((days away + restricted or
              transferred days) × 200,000) ÷ employee hours
              worked
            </p>

            <p className="mt-5 text-sm leading-7 text-slate-300">
              The 200,000-hour base represents 100 full-time
              employees working 2,000 hours each during a year.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
              Input scope
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Use day totals from the same reporting period
            </h2>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>
                Enter calendar days away from work rather than
                days the employee was originally scheduled.
              </li>
              <li>
                Enter job-transfer or restricted-work calendar
                days from the same population and period.
              </li>
              <li>
                Use actual employee hours worked for the same
                establishment or workforce scope.
              </li>
              <li>
                Do not enter case counts in the day fields.
              </li>
              <li>
                Review current OSHA day-counting requirements,
                including applicable per-case counting limits.
              </li>
            </ul>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              How to interpret severity rate
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              The result expresses recorded lost or restricted
              workdays per 100 full-time-equivalent workers. A
              higher result indicates more recorded days relative
              to the employee hours represented by the input.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Interpret the result alongside TRIR, DART, incident
              details, exposure hours, workforce size, hazard
              controls, reporting practices, and leading safety
              indicators. A single long-duration case can
              materially change the rate.
            </p>
          </article>

          <article className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-7">
            <h2 className="text-2xl font-black text-amber-100">
              Recordkeeping and comparison limitations
            </h2>

            <p className="mt-4 text-sm leading-7 text-amber-100/90">
              This calculator does not determine OSHA
              recordability, classify cases, validate day counts
              or employee-hour totals, select an appropriate
              benchmark, measure every form of workplace harm,
              predict individual risk, or establish compliance.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-black tracking-tight">
          Severity Rate Calculator FAQs
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
                href: "/tools/trir-calculator",
                title: "TRIR Calculator",
                description:
                  "Calculate total recordable incident rate from recordable cases and employee hours.",
              },
              {
                href: "/tools/dart-rate-calculator",
                title: "DART Rate Calculator",
                description:
                  "Calculate the rate of cases involving days away, restriction, or job transfer.",
              },
              {
                href: "/tools/incident-report-generator",
                title: "Incident Report Generator",
                description:
                  "Document incident details, corrective actions, and follow-up responsibilities.",
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

        <OfficialSafetySources toolSlug="severity-rate-calculator" />
      </section>
    </main>
  );
}
