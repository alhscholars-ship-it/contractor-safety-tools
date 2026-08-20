import type { Metadata } from "next";
import { FallProtectionInspectionGenerator } from "@/features/fall-protection-inspection-generator";

export const metadata: Metadata = {
  title: "Fall Protection Inspection Checklist Generator",
  description:
    "Create a contractor fall protection inspection checklist covering fall hazards, guardrails, harnesses, anchor points, corrective actions, and documentation.",
  alternates: {
    canonical: "/tools/fall-protection-inspection-generator",
  },
};

export default function FallProtectionInspectionPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">
            Inspection Checklist Generator
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            Fall Protection Inspection Checklist Generator
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Create a structured fall protection inspection checklist for
            construction work areas, elevated surfaces, guardrails,
            personal fall arrest systems, and corrective actions.
          </p>
        </div>

        <div className="mt-12">
          <FallProtectionInspectionGenerator />
        </div>
      </section>
    </main>
  );
}
