import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Toolbox Talk Generator",
  description:
    "Generate contractor toolbox talk outlines for construction safety meetings, jobsite hazards, crew reminders, and attendance documentation.",
  alternates: {
    canonical: "/tools/toolbox-talk-generator",
  },
};

export default function ToolboxTalkGeneratorPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <Link href="/tools" className="text-sm font-semibold text-emerald-300">
          ← Back to tools
        </Link>

        <div className="mt-8 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Toolbox Talks
          </p>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            Toolbox Talk Generator for Construction Safety Meetings
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Create practical toolbox talk outlines for jobsite hazards, safety reminders,
            crew discussion points, and meeting documentation.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-black">Interactive generator coming next</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            In the next step, this page will become an interactive toolbox talk generator
            with structured talking points and meeting notes.
          </p>
        </div>
      </section>
    </main>
  );
}
