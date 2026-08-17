import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/data/tools";

const categoryHubs = [
  {
    name: "Safety Calculators",
    description:
      "Calculate incident rates, severity, workplace incident costs, and structured hazard risk measures.",
    href: "/tools/safety-calculators",
    count: 6,
  },
  {
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
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Free Safety Tools
          </p>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            Contractor safety form generators and jobsite documentation tools.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Browse practical generators for planning, inspections,
            reporting, hazard analysis, energy control, PPE, and jobsite
            documentation.
          </p>
        </div>

        <section className="mt-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
              Browse by category
            </p>
            <h2 className="mt-3 text-3xl font-black">
              Start with focused safety tool collections.
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Use these category hubs when you need a group of related
              calculators or inspection tools instead of browsing the full
              library.
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {categoryHubs.map((hub) => (
              <Link
                key={hub.href}
                href={hub.href}
                className="rounded-3xl border border-emerald-300/20 bg-emerald-300/[0.05] p-7 transition hover:border-emerald-300/50 hover:bg-emerald-300/[0.08]"
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
                  {hub.count} focused tools
                </p>
                <h3 className="mt-3 text-2xl font-black">{hub.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {hub.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-black">
            All contractor safety tools
          </h2>

          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.href}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-emerald-300/50 hover:bg-white/[0.07]"
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
                  {tool.category}
                </p>
                <h3 className="mt-4 text-2xl font-black">{tool.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {tool.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
