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
  keywords: [
    "days away case rate calculator",
    "DACR calculator",
    "DAFWII rate calculator",
    "days away injury rate",
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
    name: "Days Away Case Rate Calculator",
    path: "/tools/days-away-case-rate-calculator",
  },
]);

const faqs = [
  {
    question:
      "What is the Days Away Case Rate formula?",
    answer:
      "Multiply the number of cases involving days away from work by 200,000, then divide by total employee hours worked during the same reporting period.",
  },
  {
    question:
      "Is the Days Away Case Rate the same as DAFWII?",
    answer:
      "OSHA guidance has described the Days Away from Work Injury and Illness case rate, or DAFWII, as the same measure referred to as the Days Away Case Rate or DACR.",
  },
  {
    question:
      "What cases belong in the numerator?",
    answer:
      "Use recordable cases involving days away from work. Do not use the number of calendar days lost, and do not add cases involving only restricted work or job transfer.",
  },
  {
    question:
      "How is the Days Away Rate different from DART?",
    answer:
      "The Days Away Case Rate uses only cases involving days away from work. DART also includes cases involving restricted work or transfer to another job.",
  },
  {
    question:
      "Does a low rate prove that a workplace is safe?",
    answer:
      "No. The rate is a lagging recordkeeping measure. It does not independently establish compliance, hazard control effectiveness, or overall workplace safety.",
  },
];

const faqJsonLd = createFaqJsonLd(faqs);

export const metadata: Metadata = {
  title: "Days Away Case Rate Calculator",
  description:
    "Calculate DACR or DAFWII using days-away cases, employee hours, the OSHA 200,000-hour base, and a transparent calculation equation.",
  alternates: {
    canonical:
      "/tools/days-away-case-rate-calculator",
  },
};

export default function DaysAwayCaseRateCalculatorPage() {
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
          __html: JSON.stringify(
            breadcrumbJsonLd,
          ),
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
              Days Away Case Rate Calculator
            </span>
          </nav>

          <div className="mt-8 max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">
              OSHA recordkeeping rate calculator
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
              Days Away Case Rate Calculator
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Calculate the standardized rate of
              recordable cases involving days away from
              work using the OSHA 200,000-hour incidence
              rate base.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <DaysAwayCaseRateCalculator />
      </section>

      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-16 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
              Standard formula
            </p>

            <h2 className="mt-3 text-3xl font-black">
              How the Days Away Case Rate is calculated
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-300">
              Days Away Case Rate equals cases involving
              days away from work multiplied by 200,000,
              divided by total employee hours worked
              during the same period.
            </p>

            <div className="mt-5 rounded-2xl bg-slate-950/70 p-5 font-mono text-sm leading-7 text-emerald-200">
              (Days-away cases × 200,000) ÷
              employee hours worked
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
              Standardization
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Why the formula uses 200,000 hours
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-300">
              The 200,000-hour base represents the
              approximate annual hours worked by 100
              full-time-equivalent employees working
              40 hours per week for 50 weeks.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Standardization supports comparison across
              reporting periods or establishments with
              different workforce-hour totals.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              Use cases, not days lost
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              The numerator is the number of qualifying
              recordable cases involving days away from
              work. It is not the total number of
              calendar days employees remained away.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Confirm the case classification using
              verified OSHA 300 Log information before
              calculating the rate.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              Days Away Case Rate versus DART
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Days Away Case Rate includes only cases
              involving days away from work. DART uses a
              broader numerator that also includes cases
              involving restricted work or job transfer.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Both measures use total employee hours and
              the standardized 200,000-hour base.
            </p>
          </article>

          <article className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-7 lg:col-span-2">
            <h2 className="text-2xl font-black text-amber-100">
              Important recordkeeping limitation
            </h2>

            <p className="mt-4 text-sm leading-7 text-amber-100/90">
              This calculator does not determine whether
              an injury or illness is work-related,
              recordable, or correctly classified. It
              also does not establish OSHA compliance,
              citation exposure, insurance liability, or
              overall workplace safety.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-black tracking-tight">
          Days Away Case Rate FAQs
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
            Related safety rate calculators
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                href: "/tools/dart-rate-calculator",
                title: "DART Rate Calculator",
                description:
                  "Calculate the broader rate covering days away, restricted work, and job-transfer cases.",
              },
              {
                href: "/tools/trir-calculator",
                title: "TRIR Calculator",
                description:
                  "Calculate the total recordable incident rate using all OSHA-recordable cases.",
              },
              {
                href: "/tools/severity-rate-calculator",
                title: "Severity Rate Calculator",
                description:
                  "Normalize entered days away, restriction, or transfer against employee hours.",
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

        <OfficialSafetySources toolSlug="days-away-case-rate-calculator" />
      </section>
    </main>
  );
}
