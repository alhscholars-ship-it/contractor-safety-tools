import type { Metadata } from "next";
import Link from "next/link";
import { PpeChecklistGenerator } from "@/features/ppe-checklist-generator/ppe-checklist-generator";
import { createToolJsonLd } from "@/lib/seo/json-ld";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";

const toolJsonLd = createToolJsonLd({
  name: "PPE Checklist Generator",
  description:
    "Create a contractor PPE checklist for construction tasks, trades, hazards, pre-use inspections, and jobsite safety documentation.",
  url: "/tools/ppe-checklist-generator",
  keywords: ['PPE checklist generator', 'construction PPE checklist', 'jobsite PPE form'],
});


const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Tools", path: "/tools" },
  { name: "PPE Checklist Generator", path: "/tools/ppe-checklist-generator" },
]);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
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

        <section className="mt-16 border-t border-white/10 pt-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              How to create a construction PPE checklist
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              Enter the company, project, trade, jobsite, task, supervisor,
              hazards, required PPE, and inspection items. The generator
              organizes those details into a practical pre-task checklist that
              can be reviewed and exported.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "1. Define the task and hazards",
                description:
                  "Identify the work activity, location, trade, and hazards workers may encounter.",
              },
              {
                title: "2. Select PPE and inspections",
                description:
                  "List the required protective equipment and the condition checks that should be completed before use.",
              },
              {
                title: "3. Review and document",
                description:
                  "Confirm suitability, inspect equipment, address defects, and export the checklist as TXT or PDF.",
              },
            ].map((step) => (
              <article
                key={step.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <h3 className="text-lg font-black text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              What should a PPE checklist include?
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              A useful checklist should match the task, hazard assessment,
              equipment, environment, and applicable requirements. Common
              sections include:
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>Company, project, trade, task, and jobsite details</li>
              <li>Hazards identified for the planned work</li>
              <li>Required head, eye, face, hearing, hand, foot, and body protection</li>
              <li>Respiratory, fall-protection, or specialty PPE where applicable</li>
              <li>Condition, cleanliness, fit, compatibility, and damage checks</li>
              <li>Defect removal, replacement, storage, and maintenance actions</li>
              <li>Supervisor review and worker confirmation</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              When should PPE be inspected?
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Inspection frequency depends on the equipment, hazard, employer
              program, and manufacturer instructions. Checks are commonly needed:
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>Before each use or work shift</li>
              <li>After exposure to impact, contamination, heat, chemicals, or damage</li>
              <li>When equipment is issued to a new user</li>
              <li>After cleaning, repair, or maintenance</li>
              <li>When manufacturer or employer inspection intervals require it</li>
              <li>Whenever fit, condition, or protective performance is questioned</li>
            </ul>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-amber-300/20 bg-amber-300/10 p-7">
          <h2 className="text-2xl font-black text-amber-100">
            PPE selection and compliance limitations
          </h2>
          <p className="mt-4 text-sm leading-7 text-amber-50/90">
            This generator creates an informational checklist draft only. It
            does not perform a hazard assessment, determine required protection,
            confirm fit or compatibility, replace medical evaluation or fit
            testing, or override manufacturer instructions, competent-person
            review, and current regulatory requirements.
          </p>
        </section>

        <section className="mt-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black tracking-tight">
              Related contractor safety tools
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Connect PPE checks with task planning, hazard analysis, crew
              communication, and incident documentation.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/tools/jha-generator",
                title: "JHA Generator",
                description:
                  "Identify task steps, hazards, controls, and required PPE.",
              },
              {
                href: "/tools/safety-plan-generator",
                title: "Safety Plan Generator",
                description:
                  "Document project hazards, PPE expectations, and emergency procedures.",
              },
              {
                href: "/tools/toolbox-talk-generator",
                title: "Toolbox Talk Generator",
                description:
                  "Discuss correct PPE use, limitations, and inspection findings with the crew.",
              },
              {
                href: "/tools/incident-report-generator",
                title: "Incident Report Generator",
                description:
                  "Document PPE-related incidents, defects, and corrective actions.",
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-emerald-300/40 hover:bg-white/[0.07]"
              >
                <h3 className="font-black text-white">{tool.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-black tracking-tight">
            PPE Checklist Generator FAQs
          </h2>

          <div className="mt-8 space-y-5">
            {[
              {
                question: "Is the PPE checklist generator free?",
                answer:
                  "Yes. It is free to use and supports downloadable TXT and PDF exports.",
              },
              {
                question: "Does this tool determine which PPE is required?",
                answer:
                  "No. PPE selection should follow a proper hazard assessment, applicable standards, manufacturer instructions, and qualified review.",
              },
              {
                question: "Should damaged PPE be used temporarily?",
                answer:
                  "Damaged, defective, contaminated, expired, or otherwise unsuitable PPE should be removed from service according to employer and manufacturer requirements.",
              },
              {
                question: "Can one PPE checklist be used for every task?",
                answer:
                  "No. PPE requirements and inspection criteria should be tailored to the task, hazards, work environment, equipment, and workforce.",
              },
            ].map((faq) => (
              <article
                key={faq.question}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <h3 className="text-lg font-black text-white">
                  {faq.question}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
