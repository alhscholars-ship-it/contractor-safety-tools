import type { Metadata } from "next";
import Link from "next/link";
import { OfficialSafetySources } from "@/components/seo/official-safety-sources";
import { IncidentReportGenerator } from "@/features/incident-report-generator/incident-report-generator";
import { createToolJsonLd } from "@/lib/seo/json-ld";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createFaqJsonLd } from "@/lib/seo/faq-json-ld";

const toolJsonLd = createToolJsonLd({
  name: "Incident Report Generator",
  description:
    "Create a structured construction incident report draft with event details, injury notes, witnesses, corrective actions, and documentation reminders.",
  url: "/tools/incident-report-generator",
  keywords: ["incident report generator", "construction incident report", "jobsite incident report form"],
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Tools", path: "/tools" },
  { name: "Incident Report Generator", path: "/tools/incident-report-generator" },
]);

const incidentReportFaqs = [
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
];

const faqJsonLd = createFaqJsonLd(incidentReportFaqs);

const steps = [
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
];

const relatedTools = [
  {
    href: "/tools/safety-plan-generator",
    title: "Safety Plan Generator",
    description:
      "Update project hazards, emergency procedures, and corrective action expectations.",
  },
  {
    href: "/tools/toolbox-talk-generator",
    title: "Toolbox Talk Generator",
    description: "Communicate lessons learned and required controls to the crew.",
  },
  {
    href: "/tools/jha-generator",
    title: "JHA Generator",
    description: "Reassess task steps, hazards, controls, and PPE after an event.",
  },
  {
    href: "/tools/ppe-checklist-generator",
    title: "PPE Checklist Generator",
    description: "Review required PPE and pre-use inspection expectations.",
  },
];

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
    <main className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="bg-navy-950 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <Link
            href="/tools"
            className="font-mono text-xs font-semibold text-steel-400 transition hover:text-orange-500"
          >
            ← Back to tools
          </Link>

          <div className="mt-6 max-w-3xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">
              <span className="inline-block h-[2px] w-3.5 bg-orange-500" />
              Incident Reports
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Incident Report Generator for Construction Jobsites
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-steel-200 sm:text-lg">
              Create a structured incident report draft for jobsite events,
              injury notes, witnesses, immediate actions, corrective
              actions, and safety documentation.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-navy-950 py-14">
        <div className="mx-auto w-full max-w-6xl px-6">
          <IncidentReportGenerator />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-600">
              <span className="inline-block h-[2px] w-3.5 bg-orange-600" />
              How it works
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
              How to create a construction incident report
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              Enter the project, incident date, location, event type,
              description, people involved, witnesses, immediate actions,
              corrective actions, and supervisor details. The generator
              organizes the information into a structured report draft
              that can be reviewed and exported.
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.title}
                className="rounded-xl border border-steel-200 bg-white p-6"
              >
                <h3 className="font-display text-lg font-bold text-navy-950">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <div className="rounded-xl border border-steel-200 bg-white p-7">
              <h2 className="font-display text-xl font-bold text-navy-950">
                What should an incident report include?
              </h2>
              <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
                A useful report should separate verified facts from
                assumptions and clearly document the event, response, and
                follow-up. Common sections include:
              </p>
              <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[14.5px] leading-7 text-slate-600">
                <li>Company, project, date, time, and exact location</li>
                <li>Incident type and a factual description of what occurred</li>
                <li>People involved and available witness information</li>
                <li>Injury, property damage, equipment, or environmental details</li>
                <li>Immediate actions and emergency response measures</li>
                <li>Notifications, photographs, records, and supporting evidence</li>
                <li>Corrective actions, responsible persons, and completion dates</li>
              </ul>
            </div>

            <div className="rounded-xl border border-steel-200 bg-white p-7">
              <h2 className="font-display text-xl font-bold text-navy-950">
                When should an incident report be completed?
              </h2>
              <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
                Reporting should begin promptly after immediate safety and
                medical needs are addressed. A report may be needed for:
              </p>
              <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[14.5px] leading-7 text-slate-600">
                <li>Work-related injuries or illnesses</li>
                <li>Near misses and high-potential events</li>
                <li>Property, equipment, or vehicle damage</li>
                <li>Environmental releases or hazardous material events</li>
                <li>Unsafe conditions requiring corrective action</li>
                <li>Client, insurer, employer, or regulatory reporting workflows</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-orange-500/30 bg-orange-500/10 p-7">
            <h2 className="font-display text-xl font-bold text-orange-950">
              Reporting and compliance limitations
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-orange-950/80">
              This generator creates an informational draft only. It does
              not determine OSHA recordability, reporting deadlines, legal
              liability, workers&apos; compensation obligations, medical
              conclusions, or root cause. Follow applicable emergency,
              employer, insurer, client, federal, state, and local
              reporting requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-steel-200 bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-navy-950">
              Related contractor safety tools
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-slate-600">
              Use related tools to document corrective actions, communicate
              lessons learned, and improve future job planning.
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-xl border border-steel-200 bg-white p-6 transition hover:border-orange-500/50 hover:bg-orange-100/40"
              >
                <h3 className="font-bold text-navy-950">{tool.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-14">
            <h2 className="font-display text-3xl font-bold tracking-tight text-navy-950">
              Incident Report Generator FAQs
            </h2>
            <div className="mt-7 space-y-4">
              {incidentReportFaqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-xl border border-steel-200 bg-white p-6"
                >
                  <h3 className="font-display text-lg font-bold text-navy-950">
                    {faq.question}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-7 text-slate-600">
                    {faq.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <OfficialSafetySources toolSlug="incident-report-generator" />
        </div>
      </section>
    </main>
  );
}
