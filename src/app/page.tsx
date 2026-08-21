import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.name,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const featuredTools = [
  {
    name: "Safety Plan Generator",
    description:
      "Create a practical contractor safety plan outline for jobsites, trades, and project hazards.",
    href: "/tools/safety-plan-generator",
    label: "Safety Plans",
  },
  {
    name: "Toolbox Talk Generator",
    description:
      "Generate jobsite-ready toolbox talk topics, talking points, and attendance notes.",
    href: "/tools/toolbox-talk-generator",
    label: "Toolbox Talks",
  },
  {
    name: "Incident Report Generator",
    description:
      "Build a clear incident report draft with event details, corrective actions, and follow-up notes.",
    href: "/tools/incident-report-generator",
    label: "Incident Reports",
  },
];

const categories = [
  {
    num: "01 / Metrics & rates",
    name: "Safety Calculators",
    description:
      "TRIR, DART, severity rate, and incident cost — calculators using the standardized 200,000-hour OSHA base.",
    href: "/tools/safety-calculators",
    count: "6 focused tools",
  },
  {
    num: "02 / Field records",
    name: "Inspection Checklists",
    description:
      "Scaffold, excavation, ladder, PPE, and fire extinguisher inspections — structured for daily jobsite use.",
    href: "/tools/inspection-checklists",
    count: "7 focused tools",
  },
];

const steps = [
  {
    n: "01",
    title: "Pick a generator",
    body: "Choose the plan, checklist, or report that matches the work you're documenting today.",
  },
  {
    n: "02",
    title: "Fill in the jobsite details",
    body: "Enter hazards, personnel, and conditions into a guided form — nothing to format.",
  },
  {
    n: "03",
    title: "Print or export",
    body: "Get a clean, structured document ready to sign, file, or hand to your safety lead.",
  },
];

export default function Home() {
  return (
    <main className="bg-paper">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(241,109,44,0.14),transparent_45%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">
              <span className="inline-block h-[2px] w-3.5 bg-orange-500" />
              Free · No signup · Browser-based
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
              Jobsite paperwork, built to{" "}
              <span className="text-orange-500">pass inspection</span>.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-steel-200 sm:text-lg">
              Generate contractor-ready safety plans, toolbox talks,
              inspection checklists, and incident reports in minutes —
              structured the way OSHA documentation actually needs to look.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tools"
                className="rounded-[3px] border border-orange-600 bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
              >
                Explore Free Tools →
              </Link>
              <Link
                href="/faq"
                className="rounded-[3px] border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/5"
              >
                How It Works
              </Link>
            </div>
            <div className="mt-10 flex gap-8 border-t border-white/10 pt-6">
              <div>
                <b className="font-mono text-xl font-semibold text-white">20+</b>
                <p className="text-xs text-steel-400">Generators &amp; checklists</p>
              </div>
              <div>
                <b className="font-mono text-xl font-semibold text-white">7</b>
                <p className="text-xs text-steel-400">Document categories</p>
              </div>
              <div>
                <b className="font-mono text-xl font-semibold text-white">$0</b>
                <p className="text-xs text-steel-400">Cost, always</p>
              </div>
            </div>
          </div>

          {/* Signature element — inspection tag */}
          <div className="relative mx-auto hidden w-full max-w-sm sm:block">
            <div className="absolute right-2 top-[6%] rounded-md bg-orange-500 px-3 py-2 font-mono text-[11px] font-semibold text-white shadow-lg whitespace-nowrap">
              ✓ TRIR calculated
            </div>
            <div className="absolute bottom-[4%] right-0 rounded-md bg-navy-800 px-3 py-2 font-mono text-[11px] font-semibold text-white shadow-lg whitespace-nowrap">
              Draft ready in 2 min
            </div>

            <div className="relative mx-auto mt-6 w-[300px] rounded-xl bg-white px-6 pb-5 pt-7 text-navy-950 shadow-2xl">
              <div className="absolute left-1/2 top-[-13px] h-6 w-6 -translate-x-1/2 rounded-full border-[5px] border-steel-200 bg-navy-950" />

              <div className="flex items-start justify-between border-b-2 border-dashed border-steel-200 pb-3.5">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-steel-400">
                    Document type
                  </p>
                  <p className="mt-1 font-display text-[17px] font-bold">
                    Daily Site Inspection
                  </p>
                </div>
                <span className="whitespace-nowrap rounded-[3px] bg-ok px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-white">
                  Complete
                </span>
              </div>

              {[
                ["Work areas logged", "4/4"],
                ["Hazards observed", "2"],
                ["Corrective actions", "2/2"],
                ["Responsible persons", "Assigned"],
              ].map(([label, val]) => (
                <div
                  key={label}
                  className="flex items-center justify-between border-b border-steel-100 py-2 text-[13.5px] last:border-none"
                >
                  <span className="flex items-center gap-2 font-medium text-navy-900">
                    <span className="flex h-4 w-4 items-center justify-center rounded bg-navy-900 text-[11px] text-white">
                      ✓
                    </span>
                    {label}
                  </span>
                  <span className="font-mono text-xs text-steel-400">{val}</span>
                </div>
              ))}

              <div className="mt-4 flex items-center justify-between border-t-2 border-dashed border-steel-200 pt-3.5">
                <span className="font-mono text-[10.5px] text-steel-400">
                  REF #CST-0092
                </span>
                <span className="rounded border-2 border-orange-600 px-2.5 py-1 font-display text-xs font-extrabold tracking-wide text-orange-600">
                  READY
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <div className="border-b border-steel-200 bg-white py-4">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-[13px] font-medium text-navy-800">
          <span>Built around OSHA recordkeeping structure</span>
          <span>No account, no email required</span>
          <span>Print or export in one click</span>
          <span>Plain-language, jobsite-ready output</span>
        </div>
      </div>

      {/* ===== CATEGORIES ===== */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
        <div className="mb-11 max-w-xl">
          <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-600">
            <span className="inline-block h-[2px] w-3.5 bg-orange-600" />
            Where to start
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-navy-950 sm:text-4xl">
            Two ways into the toolkit.
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Jump into a focused hub if you already know what you need, or
            browse the full library below.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group relative overflow-hidden rounded-xl border border-navy-800 bg-navy-950 p-8 transition hover:-translate-y-1"
            >
              <span className="mb-3.5 block font-mono text-xs tracking-[0.1em] text-orange-500">
                {cat.num}
              </span>
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                {cat.name}
              </h3>
              <p className="mt-2.5 mb-6 text-sm leading-6 text-steel-200">
                {cat.description}
              </p>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wide text-white">
                {cat.count}
                <span className="transition group-hover:translate-x-1">→</span>
              </span>
              <span className="pointer-events-none absolute bottom-[-30px] right-[-30px] h-32 w-32 rounded-full bg-orange-600 opacity-10" />
            </Link>
          ))}
        </div>
      </section>

      {/* ===== FEATURED TOOLS ===== */}
      <section className="border-y border-steel-200 bg-white py-20 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-11 max-w-xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-600">
              <span className="inline-block h-[2px] w-3.5 bg-orange-600" />
              Popular tools
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-navy-950 sm:text-4xl">
              Every generator, one place.
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Plans, talks, reports, and hazard analysis — each one a plain
              form you fill in and print.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {featuredTools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="rounded-xl border border-steel-200 bg-white p-6 transition hover:border-orange-500/50 hover:bg-orange-100/40"
              >
                <span className="mb-2.5 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.09em] text-orange-600">
                  {tool.label}
                </span>
                <h3 className="text-[17px] font-bold leading-snug text-navy-950">
                  {tool.name}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-6">
            <Link
              href="/tools"
              className="font-mono text-sm font-semibold text-orange-600 hover:text-orange-500"
            >
              Browse all 20+ tools →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="bg-navy-950 py-20 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-11 max-w-xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">
              <span className="inline-block h-[2px] w-3.5 bg-orange-500" />
              Process
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              From blank page to signed document.
            </h2>
            <p className="mt-3 text-base leading-7 text-steel-200">
              No install, no template hunting — the structure is already
              built in.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.n} className="bg-navy-900 p-7">
                <div className="mb-3.5 font-display text-4xl font-bold text-white/15">
                  {step.n}
                </div>
                <h3 className="mb-2 text-[17px] font-bold text-white">
                  {step.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-steel-200">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DISCLAIMER STRIP ===== */}
      <div className="border-y border-orange-500 bg-orange-100 py-4">
        <div className="mx-auto flex w-full max-w-6xl items-start gap-3 px-6 text-[13.5px] leading-relaxed text-orange-950/80">
          <span aria-hidden className="mt-0.5">⚠</span>
          <span>
            Generated documents are informational drafts only and do not
            replace qualified safety, legal, regulatory, medical, or
            project-specific guidance.
          </span>
        </div>
      </div>

      {/* ===== CTA BAND ===== */}
      <section className="bg-paper py-20 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-2xl bg-navy-950 px-8 py-12 sm:px-14 sm:py-14">
            <div className="relative flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="max-w-lg font-display text-2xl font-bold text-white sm:text-3xl">
                Start with today&apos;s jobsite inspection — it takes about
                two minutes.
              </h2>
              <div className="flex flex-shrink-0 gap-3">
                <Link
                  href="/tools"
                  className="rounded-[3px] border border-orange-600 bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
                >
                  Explore Free Tools →
                </Link>
                <Link
                  href="/faq"
                  className="rounded-[3px] border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/5"
                >
                  Read the FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
