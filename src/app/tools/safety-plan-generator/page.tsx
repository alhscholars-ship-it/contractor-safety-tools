import type { Metadata } from "next";
import Link from "next/link";
import { SafetyPlanGenerator } from "@/features/safety-plan-generator/safety-plan-generator";
import { createToolJsonLd } from "@/lib/seo/json-ld";

const toolJsonLd = createToolJsonLd({
  name: "Safety Plan Generator",
  description:
    "Create a contractor safety plan outline for construction jobsites, trades, hazards, PPE, emergency procedures, and documentation.",
  url: "/tools/safety-plan-generator",
  keywords: ['safety plan generator', 'contractor safety plan', 'construction safety plan template'],
});

export const metadata: Metadata = {
  title: "Safety Plan Generator",
  description:
    "Create a contractor safety plan outline for construction jobsites, trades, hazards, PPE, emergency procedures, and documentation.",
  alternates: {
    canonical: "/tools/safety-plan-generator",
  },
};

export default function SafetyPlanGeneratorPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <Link href="/tools" className="text-sm font-semibold text-emerald-300">
          ← Back to tools
        </Link>

        <div className="mt-8 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Safety Plans
          </p>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            Safety Plan Generator for Contractors
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Build a practical safety plan outline for construction jobsites,
            trade-specific hazards, PPE requirements, emergency procedures, and
            corrective action documentation.
          </p>
        </div>

        <div className="mt-12">
          <SafetyPlanGenerator />
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            "Jobsite hazards",
            "PPE requirements",
            "Emergency procedures",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <h2 className="font-bold">{item}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Include structured safety details that support better jobsite documentation.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
