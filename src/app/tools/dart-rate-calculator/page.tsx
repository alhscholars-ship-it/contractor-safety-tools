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
  keywords: ["DART rate calculator", "OSHA DART calculator", "days away restricted transferred rate", "DART rate formula"],
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Safety Tools", path: "/tools" },
  { name: "DART Rate Calculator", path: "/tools/dart-rate-calculator" },
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

const relatedTools = [
  {
    href: "/tools/trir-calculator",
    title: "TRIR Calculator",
    description: "Calculate total recordable incident rate from recordable cases and employee hours.",
  },
  {
    href: "/tools/incident-report-generator",
    title: "Incident Report Generator",
    description: "Document incident details, corrective actions, and follow-up responsibilities.",
  },
  {
    href: "/tools/near-miss-report-generator",
    title: "Near Miss Report Generator",
    description: "Capture potential outcomes, contributing factors, and preventive actions.",
  },
];

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
            <span className="text-steel-200">DART Rate Calculator</span>
          </nav>

          <div className="mt-6 max-w-3xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">
              <span className="inline-block h-[2px] w-3.5 bg-orange-500" />
              Safety performance calculator
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
              DART Rate Calculator
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-steel-200 sm:text-lg">
              Calculate the normalized rate for cases involving days away from work, restricted work activity, or transfer to another job.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-navy-950 py-14">
        <div className="mx-auto w-full max-w-6xl px-6">
          <DartRateCalculator />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-5 px-6 lg:grid-cols-2">
          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.09em] text-orange-600">
              Formula
            </span>
            <h2 className="mt-2.5 font-display text-2xl font-bold text-navy-950">
              How the DART rate is calculated
            </h2>
            <p className="mt-4 text-[14.5px] leading-7 text-slate-600">
              The calculator combines qualifying case counts and applies the standardized incidence-rate formula:
            </p>
            <p className="mt-4 rounded-[3px] bg-navy-950 p-4 font-mono text-[13px] leading-6 text-orange-300">
              DART rate = ((days-away cases + restricted or transferred cases) × 200,000) ÷ employee hours worked
            </p>
            <p className="mt-4 text-[14.5px] leading-7 text-slate-600">
              The 200,000-hour base represents 100 full-time employees working 2,000 hours each during a year.
            </p>
          </article>

          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.09em] text-orange-600">
              Case counts
            </span>
            <h2 className="mt-2.5 font-display text-2xl font-bold text-navy-950">
              Enter cases rather than calendar days
            </h2>
            <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[14.5px] leading-7 text-slate-600">
              <li>Enter the number of cases involving days away from work.</li>
              <li>Enter the number of cases involving restricted work or job transfer.</li>
              <li>Do not enter the total number of days away or restricted days.</li>
              <li>Use employee hours from the same reporting period and establishment scope.</li>
              <li>Review the underlying OSHA 300 Log classifications before relying on the result.</li>
            </ul>
          </article>

          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <h2 className="font-display text-xl font-bold text-navy-950">
              How to interpret a DART rate
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
              The result expresses the entered DART case experience per 100 full-time-equivalent workers. Interpretation should account for workforce size, reporting period, industry, establishment type, exposure hours, and recordkeeping quality.
            </p>
            <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
              Smaller workforces may experience substantial rate changes from a single additional case. Review rates alongside incident details, hazards, controls, workforce changes, and leading safety indicators.
            </p>
          </article>

          <article className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-7">
            <h2 className="font-display text-xl font-bold text-orange-950">
              Recordkeeping and comparison limitations
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-orange-950/80">
              This calculator does not determine whether a case is recordable, classify OSHA 300 Log entries, validate employee-hour totals, choose an industry benchmark, prove that a workplace is safe, or establish compliance.
            </p>
          </article>
        </div>
      </section>

      <section className="border-t border-steel-200 bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight text-navy-950">
            DART Rate Calculator FAQs
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

          <OfficialSafetySources toolSlug="dart-rate-calculator" />
        </div>
      </section>
    </main>
  );
}

