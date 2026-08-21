import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/data/tools";
import { ToolsBrowser } from "@/components/tools/tools-browser";

const categoryHubs = [
  {
    num: "01 / Metrics & rates",
    name: "Safety Calculators",
    description:
      "Calculate incident rates, severity, workplace incident costs, and structured hazard risk measures.",
    href: "/tools/safety-calculators",
    count: 6,
  },
  {
    num: "02 / Field records",
    name: "Inspection Checklists",
    description:
      "Create structured jobsite, equipment, excavation, scaffold, PPE, fire extinguisher, and first aid inspection records.",
    href: "/tools/inspection-checklists",
    count: 7,
  },
] as const;

export const metadata: Metadata = {
  title: "Free Contractor Safety Tools",
  description:
    "Browse free contractor safety form generators, toolbox talk templates, inspection checklists, reports, and focused official-source references.",
  alternates: {
    canonical: "/tools",
  },
};

export default function ToolsPage() {
  return (
    <main className="bg-paper">
      <section className="bg-navy-950 py-20 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <Link
            href="/"
            className="font-mono text-xs font-semibold text-steel-400 transition hover:text-orange-500"
          >
            ← Back to home
          </Link>

          <div className="mt-6 max-w-3xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">
              <span className="inline-block h-[2px] w-3.5 bg-orange-500" />
              Free Safety Tools
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
              Every generator, checklist, and calculator in one library.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-steel-200 sm:text-lg">
              Browse practical generators for planning, inspections,
              reporting, hazard analysis, energy control, PPE, and jobsite
              documentation.
            </p>
          </div>

          <div className="mt-10 flex gap-8 border-t border-white/10 pt-6">
            <div>
              <b className="font-mono text-xl font-semibold text-white">
                {tools.length}+
              </b>
              <p className="text-xs text-steel-400">Generators &amp; checklists</p>
            </div>
            <div>
              <b className="font-mono text-xl font-semibold text-white">8</b>
              <p className="text-xs text-steel-400">Categories</p>
            </div>
            <div>
              <b className="font-mono text-xl font-semibold text-white">$0</b>
              <p className="text-xs text-steel-400">Cost, always</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-steel-200 bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-9 max-w-xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-600">
              <span className="inline-block h-[2px] w-3.5 bg-orange-600" />
              Browse by category
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-navy-950 sm:text-4xl">
              Start with focused safety tool collections.
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Use these category hubs when you need a group of related
              calculators or inspection tools instead of browsing the full
              library.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {categoryHubs.map((hub) => (
              <Link
                key={hub.href}
                href={hub.href}
                className="group relative overflow-hidden rounded-xl border border-navy-800 bg-navy-950 p-8 transition hover:-translate-y-1"
              >
                <span className="mb-3.5 block font-mono text-xs tracking-[0.1em] text-orange-500">
                  {hub.num}
                </span>
                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  {hub.name}
                </h3>
                <p className="mt-2.5 mb-6 text-sm leading-6 text-steel-200">
                  {hub.description}
                </p>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wide text-white">
                  {hub.count} focused tools
                  <span className="transition group-hover:translate-x-1">→</span>
                </span>
                <span className="pointer-events-none absolute bottom-[-30px] right-[-30px] h-32 w-32 rounded-full bg-orange-600 opacity-10" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-9 max-w-xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-600">
              <span className="inline-block h-[2px] w-3.5 bg-orange-600" />
              Full library
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-navy-950 sm:text-4xl">
              All contractor safety tools.
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Filter by category or search to find the exact generator you
              need.
            </p>
          </div>

          <ToolsBrowser tools={tools} />
        </div>
      </section>
    </main>
  );
}
