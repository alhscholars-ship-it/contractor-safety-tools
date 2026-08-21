"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ToolDefinition } from "@/data/tools";

const categories = [
  "All",
  "Safety Plans",
  "Toolbox Talks",
  "Inspections",
  "Energy Control",
  "Incident Reports",
  "Job Hazard Analysis",
  "Safety Calculators",
  "Safety Training",
] as const;

export function ToolsBrowser({ tools }: { tools: ToolDefinition[] }) {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = active === "All" || tool.category === active;
      const matchesQuery =
        query.trim().length === 0 ||
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.shortDescription.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [tools, active, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-xs font-semibold transition ${
                active === cat
                  ? "border-orange-600 bg-orange-600 text-white"
                  : "border-steel-200 bg-white text-navy-800 hover:border-orange-500 hover:text-orange-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools…"
            aria-label="Search safety tools"
            className="w-full rounded-[3px] border border-steel-200 bg-white px-4 py-2.5 text-sm text-navy-950 placeholder:text-steel-400 focus:border-orange-500 focus:outline-none"
          />
        </div>
      </div>

      <p className="mt-4 font-mono text-xs text-steel-400">
        {filtered.length} of {tools.length} tools
      </p>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-xl border border-steel-200 bg-white p-10 text-center">
          <p className="text-sm text-slate-600">
            No tools match &ldquo;{query}&rdquo; in {active}. Try a different
            search or category.
          </p>
        </div>
      ) : (
        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.href}
              className="rounded-xl border border-steel-200 bg-white p-6 transition hover:border-orange-500/50 hover:bg-orange-100/40"
            >
              <span className="mb-2.5 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.09em] text-orange-600">
                {tool.category}
              </span>
              <h3 className="text-[17px] font-bold leading-snug text-navy-950">
                {tool.name}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">
                {tool.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
