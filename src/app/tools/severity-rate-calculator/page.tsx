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
  keywords: ["severity rate calculator", "safety severity rate calculator", "lost workday severity rate", "OSHA severity rate formula"],
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Safety Tools", path: "/tools" },
  { name: "Severity Rate Calculator", path: "/tools/severity-rate-calculator" },
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

const relatedTools = [
  {
    href: "/tools/trir-calculator",
    title: "TRIR Calculator",
    description: "Calculate total recordable incident rate from recordable cases and employee hours.",
  },
  {
    href: "/tools/dart-rate-calculator",
    title: "DART Rate Calculator",
    description: "Calculate the rate of cases involving days away, restriction, or job transfer.",
  },
  {
    href: "/tools/incident-report-generator",
    title: "Incident Report Generator",
    description: "Document incident details, corrective actions, and follow-up responsibilities.",
  },
];

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
            <span className="text-steel-200">Severity Rate Calculator</span>
          </nav>

          <div className="mt-6 max-w-3xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">
              <span className="inline-block h-[2px] w-3.5 bg-orange-500" />
              Safety performance calculator
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Severity Rate Calculator
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-steel-200 sm:text-lg">
              Normalize recorded days away and restricted or transferred workdays against employee hours for a consistent severity measurement.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-navy-950 py-14">
        <div className="mx-auto w-full max-w-6xl px-6">
          <SeverityRateCalculator />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-5 px-6 lg:grid-cols-2">
          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.09em] text-orange-600">
              Formula
            </span>
            <h2 className="mt-2.5 font-display text-2xl font-bold text-navy-950">
              How severity rate is calculated
            </h2>
            <p className="mt-4 text-[14.5px] leading-7 text-slate-600">
              This calculator uses recorded day totals in the numerator rather than the number of incidents:
            </p>
            <p className="mt-4 rounded-[3px] bg-navy-950 p-4 font-mono text-[13px] leading-6 text-orange-300">
              Severity rate = ((days away + restricted or transferred days) × 200,000) ÷ employee hours worked
            </p>
            <p className="mt-4 text-[14.5px] leading-7 text-slate-600">
              The 200,000-hour base represents 100 full-time employees working 2,000 hours each during a year.
            </p>
          </article>

          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.09em] text-orange-600">
              Input scope
            </span>
            <h2 className="mt-2.5 font-display text-2xl font-bold text-navy-950">
              Use day totals from the same reporting period
            </h2>
            <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[14.5px] leading-7 text-slate-600">
              <li>Enter calendar days away from work rather than days the employee was originally scheduled.</li>
              <li>Enter job-transfer or restricted-work calendar days from the same population and period.</li>
              <li>Use actual employee hours worked for the same establishment or workforce scope.</li>
              <li>Do not enter case counts in the day fields.</li>
              <li>Review current OSHA day-counting requirements, including applicable per-case counting limits.</li>
            </ul>
          </article>

          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <h2 className="font-display text-xl font-bold text-navy-950">
              How to interpret severity rate
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
              The result expresses recorded lost or restricted workdays per 100 full-time-equivalent workers. A higher result indicates more recorded days relative to the employee hours represented by the input.
            </p>
            <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
              Interpret the result alongside TRIR, DART, incident details, exposure hours, workforce size, hazard controls, reporting practices, and leading safety indicators. A single long-duration case can materially change the rate.
            </p>
          </article>

          <article className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-7">
            <h2 className="font-display text-xl font-bold text-orange-950">
              Recordkeeping and comparison limitations
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-orange-950/80">
              This calculator does not determine OSHA recordability, classify cases, validate day counts or employee-hour totals, select an appropriate benchmark, measure every form of workplace harm, predict individual risk, or establish compliance.
            </p>
          </article>
        </div>
      </section>

      <section className="border-t border-steel-200 bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight text-navy-950">
            Severity Rate Calculator FAQs
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

          <OfficialSafetySources toolSlug="severity-rate-calculator" />
        </div>
      </section>
    </main>
  );
}

