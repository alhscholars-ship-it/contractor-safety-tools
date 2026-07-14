import type { Metadata } from "next";
import Link from "next/link";
import { IncidentReportGenerator } from "@/features/incident-report-generator/incident-report-generator";
import { createToolJsonLd } from "@/lib/seo/json-ld";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";

const toolJsonLd = createToolJsonLd({
  name: "Incident Report Generator",
  description:
    "Create a structured construction incident report draft with event details, injury notes, witnesses, corrective actions, and documentation reminders.",
  url: "/tools/incident-report-generator",
  keywords: ['incident report generator', 'construction incident report', 'jobsite incident report form'],
});


const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Tools", path: "/tools" },
  { name: "Incident Report Generator", path: "/tools/incident-report-generator" },
]);

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

        <div className="mt-12">
          <IncidentReportGenerator />
        </div>

        <section className="mt-16 border-t border-white/10 pt-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              How to create a construction incident report
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              Enter the project, incident date, location, event type,
              description, people involved, witnesses, immediate actions,
              corrective actions, and supervisor details. The generator
              organizes the information into a structured report draft that can
              be reviewed and exported.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "1. Record the event",
                description:
                  "Document when and where the incident occurred, what happened, and who was involved.",
              },
              {
                title: "2. Capture the response",
                description:
                  "List immediate actions, witnesses, notifications, and steps taken to control the situation.",
              },
              {
                title: "3. Review and export",
                description:
                  "Confirm the facts, add corrective actions, obtain required approvals, and export the report.",
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
              What should an incident report include?
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              A useful report should separate verified facts from assumptions
              and clearly document the event, response, and follow-up. Common
              sections include:
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>Company, project, date, time, and exact location</li>
              <li>Incident type and a factual description of what occurred</li>
              <li>People involved and available witness information</li>
              <li>Injury, property damage, equipment, or environmental details</li>
              <li>Immediate actions and emergency response measures</li>
              <li>Notifications, photographs, records, and supporting evidence</li>
              <li>Corrective actions, responsible persons, and completion dates</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              When should an incident report be completed?
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Reporting should begin promptly after immediate safety and medical
              needs are addressed. A report may be needed for:
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>Work-related injuries or illnesses</li>
              <li>Near misses and high-potential events</li>
              <li>Property, equipment, or vehicle damage</li>
              <li>Environmental releases or hazardous material events</li>
              <li>Unsafe conditions requiring corrective action</li>
              <li>Client, insurer, employer, or regulatory reporting workflows</li>
            </ul>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-amber-300/20 bg-amber-300/10 p-7">
          <h2 className="text-2xl font-black text-amber-100">
            Reporting and compliance limitations
          </h2>
          <p className="mt-4 text-sm leading-7 text-amber-50/90">
            This generator creates an informational draft only. It does not
            determine OSHA recordability, reporting deadlines, legal liability,
            workers&apos; compensation obligations, medical conclusions, or root
            cause. Follow applicable emergency, employer, insurer, client,
            federal, state, and local reporting requirements.
          </p>
        </section>

        <section className="mt-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black tracking-tight">
              Related contractor safety tools
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Use related tools to document corrective actions, communicate
              lessons learned, and improve future job planning.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/tools/safety-plan-generator",
                title: "Safety Plan Generator",
                description:
                  "Update project hazards, emergency procedures, and corrective action expectations.",
              },
              {
                href: "/tools/toolbox-talk-generator",
                title: "Toolbox Talk Generator",
                description:
                  "Communicate lessons learned and required controls to the crew.",
              },
              {
                href: "/tools/jha-generator",
                title: "JHA Generator",
                description:
                  "Reassess task steps, hazards, controls, and PPE after an event.",
              },
              {
                href: "/tools/ppe-checklist-generator",
                title: "PPE Checklist Generator",
                description:
                  "Review required PPE and pre-use inspection expectations.",
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
            Incident Report Generator FAQs
          </h2>

          <div className="mt-8 space-y-5">
            {[
              {
                question: "Is the incident report generator free?",
                answer:
                  "Yes. It is free to use and supports downloadable TXT and PDF exports.",
              },
              {
                question: "Should near misses be documented?",
                answer:
                  "Near-miss documentation is commonly useful because it can reveal hazards and control failures before an injury or major loss occurs.",
              },
              {
                question: "Does this tool determine OSHA recordability?",
                answer:
                  "No. Recordability and reporting decisions require review of current regulatory criteria and the specific facts of the case.",
              },
              {
                question: "Can an incident report be edited after it is created?",
                answer:
                  "Yes. The generated content is a draft. Review and revise it as verified information, witness statements, investigation findings, and corrective actions become available.",
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
