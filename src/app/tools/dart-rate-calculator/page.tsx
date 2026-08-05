import type { Metadata } from "next";
import Link from "next/link";
import { OfficialSafetySources } from "@/components/seo/official-safety-sources";
import { DartRateCalculator } from "@/features/dart-rate-calculator";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createFaqJsonLd } from "@/lib/seo/faq-json-ld";
import { createToolJsonLd } from "@/lib/seo/json-ld";

const toolJsonLd = createToolJsonLd({
  name: "DART Rate Calculator",
  description:
    "Calculate the days away, restricted, or transferred rate from qualifying case counts and employee hours worked using the standardized 200,000-hour base.",
  url: "/tools/dart-rate-calculator",
  keywords: [
    "DART rate calculator",
    "OSHA DART calculator",
    "days away restricted transferred rate",
    "DART rate formula",
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
    name: "DART Rate Calculator",
    path: "/tools/dart-rate-calculator",
  },
]);

const faqs = [
  {
    question: "What does DART stand for?",
    answer:
      "DART refers to cases involving days away from work, restricted work activity, or transfer to another job.",
  },
  {
    question: "What formula does this DART calculator use?",
    answer:
      "The calculator adds the entered days-away cases and restricted-work or job-transfer cases, multiplies that combined count by 200,000, and divides the result by employee hours worked during the same reporting period.",
  },
  {
    question: "Should I enter the number of cases or the number of days?",
    answer:
      "Enter case counts. Do not enter the number of days away, restricted days, or transfer days in the case-count fields.",
  },
  {
    question: "Does a low DART rate prove that a workplace is safe?",
    answer:
      "No. DART is a lagging incidence-rate measure. It does not prove overall safety performance, validate recordkeeping, predict individual risk, or establish regulatory compliance.",
  },
];

const faqJsonLd = createFaqJsonLd(faqs);

export const metadata: Metadata = {
  title: "DART Rate Calculator",
  description:
    "Calculate OSHA DART rate using days-away cases, restricted or transferred cases, employee hours, and the standardized 200,000-hour formula.",
  alternates: {
    canonical: "/tools/dart-rate-calculator",
  },
};

export default function DartRateCalculatorPage() {
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
              DART Rate Calculator
            </span>
          </nav>

          <div className="mt-8 max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">
              Safety performance calculator
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
              DART Rate Calculator
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Calculate the normalized rate for cases involving
              days away from work, restricted work activity, or
              transfer to another job.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <DartRateCalculator />
      </section>

      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-16 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
              Formula
            </p>

            <h2 className="mt-3 text-3xl font-black">
              How the DART rate is calculated
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-300">
              The calculator combines qualifying case counts and
              applies the standardized incidence-rate formula:
            </p>

            <p className="mt-5 rounded-2xl bg-slate-950 p-5 font-mono text-sm leading-7 text-emerald-200">
              DART rate = ((days-away cases + restricted or
              transferred cases) × 200,000) ÷ employee hours
              worked
            </p>

            <p className="mt-5 text-sm leading-7 text-slate-300">
              The 200,000-hour base represents 100 full-time
              employees working 2,000 hours each during a year.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
              Case counts
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Enter cases rather than calendar days
            </h2>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>
                Enter the number of cases involving days away
                from work.
              </li>
              <li>
                Enter the number of cases involving restricted
                work or job transfer.
              </li>
              <li>
                Do not enter the total number of days away or
                restricted days.
              </li>
              <li>
                Use employee hours from the same reporting period
                and establishment scope.
              </li>
              <li>
                Review the underlying OSHA 300 Log
                classifications before relying on the result.
              </li>
            </ul>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              How to interpret a DART rate
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              The result expresses the entered DART case
              experience per 100 full-time-equivalent workers.
              Interpretation should account for workforce size,
              reporting period, industry, establishment type,
              exposure hours, and recordkeeping quality.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Smaller workforces may experience substantial rate
              changes from a single additional case. Review rates
              alongside incident details, hazards, controls,
              workforce changes, and leading safety indicators.
            </p>
          </article>

          <article className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-7">
            <h2 className="text-2xl font-black text-amber-100">
              Recordkeeping and comparison limitations
            </h2>

            <p className="mt-4 text-sm leading-7 text-amber-100/90">
              This calculator does not determine whether a case
              is recordable, classify OSHA 300 Log entries,
              validate employee-hour totals, choose an industry
              benchmark, prove that a workplace is safe, or
              establish compliance.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-black tracking-tight">
          DART Rate Calculator FAQs
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
                href: "/tools/incident-report-generator",
                title: "Incident Report Generator",
                description:
                  "Document incident details, corrective actions, and follow-up responsibilities.",
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

        <OfficialSafetySources toolSlug="dart-rate-calculator" />
      </section>
    </main>
  );
}
