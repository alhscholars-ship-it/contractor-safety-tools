import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Contractor Safety Form Tools",
  description:
    "Learn how Contractor Safety Form Tools helps contractors create practical safety plans, toolbox talks, incident reports, JHAs, and PPE checklists.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto w-full max-w-4xl px-6 py-20">
        <Link href="/" className="text-sm font-semibold text-emerald-300">
          ← Back to home
        </Link>

        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            About Us
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            Practical Contractor Safety Documentation Tools
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Contractor Safety Form Tools provides free, browser-based generators
            designed to help contractors organize common jobsite safety
            documentation.
          </p>
        </div>

        <div className="mt-12 space-y-8 text-base leading-8 text-slate-300">
          <section>
            <h2 className="text-2xl font-black text-white">What we provide</h2>
            <p className="mt-3">
              Our tools help users draft safety plans, toolbox talks, incident
              reports, job hazard analyses, and PPE checklists. Generated
              documents can be reviewed, adapted, and exported as TXT or PDF.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">Who these tools serve</h2>
            <p className="mt-3">
              The platform is built for contractors, subcontractors, supervisors,
              safety coordinators, project managers, and small construction
              businesses that need a faster way to prepare structured safety
              documentation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">Our approach</h2>
            <p className="mt-3">
              We focus on practical usability, clear structure, strong privacy,
              and transparent disclaimers. The tools run in the browser and are
              intended to support—not replace—qualified safety, legal, medical,
              regulatory, or project-specific guidance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Important responsibility
            </h2>
            <p className="mt-3">
              Every workplace, jurisdiction, project, trade, and hazard profile is
              different. Users should verify generated documents against current
              OSHA requirements, applicable state and local rules, manufacturer
              instructions, client requirements, and competent professional
              advice.
            </p>
          </section>
        </div>

        <div className="mt-12">
          <Link
            href="/tools"
            className="inline-flex rounded-full bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
          >
            Explore safety tools
          </Link>
        </div>
      </section>
    </main>
  );
}
