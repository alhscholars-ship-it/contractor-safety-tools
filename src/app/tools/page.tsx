import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/data/tools";

export const metadata: Metadata = {
  title: "Free Contractor Safety Tools",
  description:
    "Browse free contractor safety tools, OSHA-aligned form generators, toolbox talk templates, inspection checklists, and incident report helpers.",
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
            Start with practical safety plans, toolbox talks, and incident report tools
            designed for small contractors and construction teams.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.href}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-emerald-300/50 hover:bg-white/[0.07]"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
                {tool.category}
              </p>
              <h2 className="mt-4 text-2xl font-black">{tool.name}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {tool.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
