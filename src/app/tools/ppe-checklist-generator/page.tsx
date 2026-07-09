import Link from "next/link";

export const metadata = {
  title: "PPE Checklist Generator | Contractor Safety Form Tools",
  description:
    "Create a contractor PPE checklist for construction tasks, trades, hazards, and jobsite safety documentation.",
  alternates: {
    canonical:
      "https://contractorsafetytools.com/tools/ppe-checklist-generator",
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
            hazards, inspections, and compliance documentation.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-black">Interactive generator coming next</h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            The next step will replace this placeholder with the complete
            interactive PPE Checklist Generator.
          </p>
        </div>
      </section>
    </main>
  );
}
