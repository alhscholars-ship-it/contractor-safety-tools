import type { Metadata } from "next";
import Link from "next/link";
import { JhaGenerator } from "@/features/jha-generator/jha-generator";
import { createToolJsonLd } from "@/lib/seo/json-ld";

const toolJsonLd = createToolJsonLd({
  name: "JHA Generator",
  description:
    "Create a job hazard analysis outline for construction tasks, hazards, controls, PPE, and supervisor review documentation.",
  url: "/tools/jha-generator",
  keywords: ['JHA generator', 'job hazard analysis template', 'construction JHA'],
});

export const metadata: Metadata = {
  title: "JHA Generator",
  description:
    "Create a job hazard analysis outline for construction tasks, hazards, controls, PPE, and supervisor review documentation.",
  alternates: {
    canonical: "/tools/jha-generator",
  },
};

export default function JhaGeneratorPage() {
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
            Job Hazard Analysis
          </p>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            JHA Generator for Construction Tasks
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Create a structured job hazard analysis outline with task steps,
            hazards, controls, PPE, and supervisor review notes.
          </p>
        </div>

        <div className="mt-12">
          <JhaGenerator />
        </div>
      </section>
    </main>
  );
}
