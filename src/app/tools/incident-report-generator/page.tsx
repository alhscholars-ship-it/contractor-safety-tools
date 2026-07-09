import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Incident Report Generator",
  description:
    "Create a structured construction incident report draft with event details, injury notes, witnesses, corrective actions, and documentation reminders.",
  alternates: {
    canonical: "/tools/incident-report-generator",
  },
};

export default function IncidentReportGeneratorPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <Link href="/tools" className="text-sm font-semibold text-emerald-300">
          ← Back to tools
        </Link>

        <div className="mt-8 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Incident Reports
          </p>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            Incident Report Generator for Construction Jobsites
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Create a structured incident report draft for jobsite events, injury notes,
            witnesses, immediate actions, corrective actions, and safety documentation.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-black">Interactive generator coming next</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            In the next step, this page will become an interactive incident report
            generator for contractor safety documentation.
          </p>
        </div>
      </section>
    </main>
  );
}
