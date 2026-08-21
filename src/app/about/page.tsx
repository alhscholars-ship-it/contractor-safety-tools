import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/content/page-hero";

export const metadata: Metadata = {
  title: "About Contractor Safety Tools",
  description:
    "Learn how Contractor Safety Tools provides browser-based safety documentation generators, inspections, reports, primary references, and transparent limitations.",
  alternates: {
    canonical: "/about",
  },
};

const sections = [
  {
    title: "What we provide",
    body: "Our catalog covers safety plans, toolbox talks, incident and near-miss reports, job hazard analyses, lockout/tagout, PPE, and inspection workflows for jobsites, ladders, scaffolds, excavations, fire extinguishers, and first aid kits. Generated drafts can be reviewed, adapted, and exported as TXT or PDF.",
  },
  {
    title: "Who these tools serve",
    body: "The platform is built for contractors, subcontractors, supervisors, safety coordinators, project managers, and small construction businesses that need a faster way to prepare structured safety documentation.",
  },
  {
    title: "Important responsibility",
    body: "Every workplace, jurisdiction, project, trade, and hazard profile is different. Users should verify generated documents against current OSHA requirements, applicable state and local rules, manufacturer instructions, client requirements, and competent professional advice.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-paper">
      <PageHero
        eyebrow="About Us"
        title="Practical contractor safety documentation tools."
        lede="Contractor Safety Tools provides free, browser-based generators designed to help contractors organize common jobsite safety documentation."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-4xl px-6">
          <div className="grid gap-5">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-xl border border-steel-200 bg-white p-7"
              >
                <h2 className="font-display text-xl font-bold text-navy-950">
                  {section.title}
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-slate-600">
                  {section.body}
                </p>
              </div>
            ))}

            <div className="rounded-xl border border-steel-200 bg-white p-7">
              <h2 className="font-display text-xl font-bold text-navy-950">
                Our approach
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                We focus on practical usability, clear structure, strong
                privacy, and transparent disclaimers. The tools run in the
                browser and are intended to support — not replace — qualified
                safety, legal, medical, regulatory, or project-specific
                guidance.
              </p>
              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Read our{" "}
                <Link
                  href="/methodology"
                  className="font-semibold text-orange-600 underline decoration-orange-500/40 underline-offset-4 hover:text-orange-500"
                >
                  methodology and editorial standards
                </Link>{" "}
                for details about source selection, generator design,
                testing, maintenance, and corrections.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/tools"
              className="inline-flex rounded-[3px] border border-orange-600 bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
            >
              Explore safety tools →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
