import type { Metadata } from "next";
import Link from "next/link";
import { PpeChecklistGenerator } from "@/features/ppe-checklist-generator/ppe-checklist-generator";

export const metadata: Metadata = {
  title: "PPE Checklist Generator",
  description:
    "Create a contractor PPE checklist for construction tasks, trades, hazards, pre-use inspections, and jobsite safety documentation.",
  alternates: {
    canonical: "/tools/ppe-checklist-generator",
  },
};

export default function PpeChecklistGeneratorPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <Link href="/tools" className="text-sm font-semibold text-emerald-300">
          ← Back to tools
        </Link>

        <div className="mt-8 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            PPE Checklists
          </p>

          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            PPE Checklist Generator
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Create professional PPE checklists for construction trades,
            hazards, pre-use inspections, and compliance documentation.
          </p>
        </div>

        <div className="mt-12">
          <PpeChecklistGenerator />
        </div>
      </section>
    </main>
  );
}
