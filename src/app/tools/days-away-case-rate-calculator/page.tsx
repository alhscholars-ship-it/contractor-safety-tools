import type { Metadata } from "next";
import Link from "next/link";
import { OfficialSafetySources } from "@/components/seo/official-safety-sources";
import { DaysAwayCaseRateCalculator } from "@/features/days-away-case-rate-calculator";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createFaqJsonLd } from "@/lib/seo/faq-json-ld";
import { createToolJsonLd } from "@/lib/seo/json-ld";

const toolJsonLd = createToolJsonLd({
  name: "Days Away Case Rate Calculator",
  description:
    "Calculate the OSHA Days Away from Work Injury and Illness case rate using days-away cases, employee hours, and the standardized 200,000-hour base.",
  url: "/tools/days-away-case-rate-calculator",
  keywords: ["days away case rate calculator", "DACR calculator", "DAFWII rate calculator", "days away injury rate"],
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Safety Tools", path: "/tools" },
  { name: "Days Away Case Rate Calculator", path: "/tools/days-away-case-rate-calculator" },
]);

const faqs = [
  {
    question: "What is the Days Away Case Rate formula?",
    answer:
      "Multiply the number of cases involving days away from work by 200,000, then divide by total employee hours worked during the same reporting period.",
  },
  {
    question: "Is the Days Away Case Rate the same as DAFWII?",
    answer:
      "OSHA guidance has described the Days Away from Work Injury and Illness case rate, or DAFWII, as the same measure referred to as the Days Away Case Rate or DACR.",
  },
  {
    question: "What cases belong in the numerator?",
    answer:
      "Use recordable cases involving days away from work. Do not use the number of calendar days lost, and do not add cases involving only restricted work or job transfer.",
  },
  {
    question: "How is the Days Away Rate different from DART?",
    answer:
      "The Days Away Case Rate uses only cases involving days away from work. DART also includes cases involving restricted work or transfer to another job.",
  },
  {
    question: "Does a low rate prove that a workplace is safe?",
    answer:
      "No. The rate is a lagging recordkeeping measure. It does not independently establish compliance, hazard control effectiveness, or overall workplace safety.",
  },
];

const faqJsonLd = createFaqJsonLd(faqs);

const relatedTools = [
  {
    href: "/tools/dart-rate-calculator",
    title: "DART Rate Calculator",
    description: "Calculate the broader rate covering days away, restricted work, and job-transfer cases.",
  },
  {
    href: "/tools/trir-calculator",
    title: "TRIR Calculator",
    description: "Calculate the total recordable incident rate using all OSHA-recordable cases.",
  },
  {
    href: "/tools/severity-rate-calculator",
    title: "Severity Rate Calculator",
    description: "Normalize entered days away, restriction, or transfer against employee hours.",
  },
];

export const metadata: Metadata = {
  title: "Days Away Case Rate Calculator",
  description:
    "Calculate DACR or DAFWII using days-away cases, employee hours, the OSHA 200,000-hour base, and a transparent calculation equation.",
  alternates: {
    canonical: "/tools/days-away-case-rate-calculator",
  },
};

export default function DaysAwayCaseRateCalculatorPage() {
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
            <span className="text-steel-200">Days Away Case Rate Calculator</span>
          </nav>

          <div className="mt-6 max-w-3xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">
              <span className="inline-block h-[2px] w-3.5 bg-orange-500" />
              Safety performance calculator
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Days Away Case Rate Calculator
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-steel-200 sm:text-lg">
              Calculate the standardized rate of recordable cases involving days away from work using the OSHA 200,000-hour incidence rate base.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-navy-950 py-14">
        <div className="mx-auto w-full max-w-6xl px-6">
          <DaysAwayCaseRateCalculator />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-5 px-6 lg:grid-cols-2">
          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.09em] text-orange-600">
              Formula
            </span>
            <h2 className="mt-2.5 font-display text-2xl font-bold text-navy-950">
              How the Days Away Case Rate is calculated
            </h2>
            <p className="mt-4 text-[14.5px] leading-7 text-slate-600">
              Days Away Case Rate equals cases involving days away from work multiplied by 200,000, divided by total employee hours worked during the same period.
            </p>
            <p className="mt-4 rounded-[3px] bg-navy-950 p-4 font-mono text-[13px] leading-6 text-orange-300">
              (Days-away cases × 200,000) ÷ employee hours worked
            </p>
            <p className="mt-4 text-[14.5px] leading-7 text-slate-600">
              The 200,000-hour base represents the approximate annual hours worked by 100 full-time-equivalent employees working 40 hours per week for 50 weeks. Standardization supports comparison across reporting periods or establishments with different workforce-hour totals.
            </p>
          </article>

          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.09em] text-orange-600">
              Recordkeeping
            </span>
            <h2 className="mt-2.5 font-display text-2xl font-bold text-navy-950">
              Use cases, not days lost
            </h2>
            <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[14.5px] leading-7 text-slate-600">
              <li>The numerator is the number of qualifying recordable cases involving days away from work.</li>
              <li>It is not the total number of calendar days employees remained away.</li>
              <li>Confirm the case classification using verified OSHA 300 Log information before calculating the rate.</li>
            </ul>
          </article>

          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <h2 className="font-display text-xl font-bold text-navy-950">
              Days Away Case Rate versus DART
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
              Days Away Case Rate includes only cases involving days away from work. DART uses a broader numerator that also includes cases involving restricted work or job transfer.
            </p>
            <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
              Both measures use total employee hours and the standardized 200,000-hour base.
            </p>
          </article>

          <article className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-7">
            <h2 className="font-display text-xl font-bold text-orange-950">
              Important recordkeeping limitation
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-orange-950/80">
              This calculator does not determine whether an injury or illness is work-related, recordable, or correctly classified. It also does not establish OSHA compliance, citation exposure, insurance liability, or overall workplace safety.
            </p>
          </article>
        </div>
      </section>

      <section className="border-t border-steel-200 bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight text-navy-950">
            Days Away Case Rate Calculator FAQs
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

          <OfficialSafetySources toolSlug="days-away-case-rate-calculator" />
        </div>
      </section>
    </main>
  );
}

