import Link from "next/link";
import { siteConfig } from "@/config/site";

const featuredTools = [
  {
    name: "Safety Plan Generator",
    description:
      "Create a practical contractor safety plan outline for jobsites, trades, and project hazards.",
    href: "/tools/safety-plan-generator",
  },
  {
    name: "Toolbox Talk Generator",
    description:
      "Generate jobsite-ready toolbox talk topics, talking points, and attendance notes.",
    href: "/tools/toolbox-talk-generator",
  },
  {
    name: "Incident Report Generator",
    description:
      "Build a clear incident report draft with event details, corrective actions, and follow-up notes.",
    href: "/tools/incident-report-generator",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            {siteConfig.name}
          </p>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            Contractor safety forms and jobsite documentation tools.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Create safety plans, toolbox talks, inspection checklists, incident
            and near-miss reports, and structured jobsite documentation with
            practical contractor-focused tools.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/tools"
              className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Explore Free Tools
            </Link>
            <Link
              href="/faq"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              How the Tools Work
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {featuredTools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-emerald-300/50 hover:bg-white/[0.07]"
            >
              <h2 className="text-xl font-bold">{tool.name}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
