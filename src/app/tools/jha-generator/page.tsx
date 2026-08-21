import type { Metadata } from "next";
import Link from "next/link";
import { OfficialSafetySources } from "@/components/seo/official-safety-sources";
import { JhaGenerator } from "@/features/jha-generator/jha-generator";
import { createToolJsonLd } from "@/lib/seo/json-ld";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createFaqJsonLd } from "@/lib/seo/faq-json-ld";

const toolJsonLd = createToolJsonLd({
  name: "JHA Generator",
  description:
    "Create a job hazard analysis outline for construction tasks, hazards, controls, PPE, and supervisor review documentation.",
  url: "/tools/jha-generator",
  keywords: ['JHA generator', 'job hazard analysis template', 'construction JHA'],
});


const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Tools", path: "/tools" },
  { name: "JHA Generator", path: "/tools/jha-generator" },
]);

const jhaFaqs = [
  {
    question: "Is the JHA generator free?",
    answer:
      "Yes. It is free to use and supports downloadable TXT and PDF exports.",
  },
  {
    question: "What is the difference between a JHA and a safety plan?",
    answer:
      "A JHA focuses on the steps, hazards, and controls for a specific task. A safety plan usually covers broader project responsibilities, procedures, hazards, and emergency arrangements.",
  },
  {
    question: "Should workers participate in the JHA?",
    answer:
      "Worker participation is valuable because employees performing the task can identify practical hazards, workflow details, and control problems that may otherwise be missed.",
  },
  {
    question: "Does this generator create an OSHA-approved JHA?",
    answer:
      "No. The generated document is a draft and must be reviewed against actual conditions and applicable requirements before use.",
  },
];

const faqJsonLd = createFaqJsonLd(jhaFaqs);

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
    <main className="min-h-screen bg-navy-950 text-white">
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <Link href="/tools" className="text-sm font-semibold text-orange-500">
          ← Back to tools
        </Link>

        <div className="mt-8 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
            Job Hazard Analysis
          </p>
          <h1 className="text-4xl font-display font-black tracking-tight sm:text-6xl">
            JHA Generator for Construction Tasks
          </h1>
          <p className="mt-6 text-lg leading-8 text-steel-200">
            Create a structured job hazard analysis outline with task steps,
            hazards, controls, PPE, and supervisor review notes.
          </p>
        </div>

        <div className="mt-12">
          <JhaGenerator />
        </div>

        <section className="mt-16 border-t border-white/10 pt-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-display font-black tracking-tight sm:text-4xl">
              How to create a job hazard analysis
            </h2>
            <p className="mt-5 text-base leading-8 text-steel-200">
              Enter the company, project, task, jobsite, supervisor, task steps,
              hazards, controls, and required PPE. The generator organizes those
              details into a structured JHA draft that can be reviewed, revised,
              and exported.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "1. Break down the task",
                description:
                  "List the work activity in clear, logical steps from preparation through completion.",
              },
              {
                title: "2. Identify hazards and controls",
                description:
                  "Document the hazards associated with each step and the measures used to eliminate or reduce risk.",
              },
              {
                title: "3. Review and communicate",
                description:
                  "Confirm the JHA with the crew, assign responsibilities, and export the final draft as TXT or PDF.",
              },
            ].map((step) => (
              <article
                key={step.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <h3 className="text-lg font-display font-black text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-steel-400">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-display font-black">
              What should a construction JHA include?
            </h2>
            <p className="mt-4 text-sm leading-7 text-steel-200">
              A useful job hazard analysis should be specific to the task,
              location, equipment, workforce, and actual site conditions.
              Common sections include:
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-steel-200">
              <li>Company, project, task, location, and supervisor details</li>
              <li>Sequential task steps written in clear working order</li>
              <li>Hazards associated with each step</li>
              <li>Engineering, administrative, and work-practice controls</li>
              <li>Required PPE and equipment inspection expectations</li>
              <li>Emergency procedures and communication requirements</li>
              <li>Crew review, approvals, updates, and recordkeeping</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-display font-black">
              When should a JHA be reviewed or updated?
            </h2>
            <p className="mt-4 text-sm leading-7 text-steel-200">
              Review the JHA before work begins and whenever the task or site
              conditions change. Updates may be needed when:
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-steel-200">
              <li>New equipment, materials, or work methods are introduced</li>
              <li>The work location or environmental conditions change</li>
              <li>A new crew member, trade, or subcontractor joins the task</li>
              <li>An incident, near miss, or unsafe condition is reported</li>
              <li>Existing controls are missing, ineffective, or impractical</li>
              <li>Project, manufacturer, client, or regulatory requirements change</li>
            </ul>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-orange-500/20 bg-orange-500/10 p-7">
          <h2 className="text-2xl font-display font-black text-orange-100">
            Hazard analysis and compliance limitations
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/90">
            This generator creates an informational draft only. It does not
            replace direct workplace observation, worker participation,
            competent-person review, industrial hygiene assessment,
            manufacturer instructions, engineering analysis, or current
            federal, state, local, and project-specific requirements.
          </p>
        </section>

        <section className="mt-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-display font-black tracking-tight">
              Related contractor safety tools
            </h2>
            <p className="mt-4 text-sm leading-7 text-steel-200">
              Connect the JHA with project planning, toolbox talks, PPE checks,
              and incident follow-up documentation.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/tools/safety-plan-generator",
                title: "Safety Plan Generator",
                description:
                  "Create a broader project plan covering hazards, PPE, and emergency procedures.",
              },
              {
                href: "/tools/toolbox-talk-generator",
                title: "Toolbox Talk Generator",
                description:
                  "Turn JHA findings into practical crew discussion points.",
              },
              {
                href: "/tools/ppe-checklist-generator",
                title: "PPE Checklist Generator",
                description:
                  "Create a checklist for required PPE and pre-use inspections.",
              },
              {
                href: "/tools/incident-report-generator",
                title: "Incident Report Generator",
                description:
                  "Document incidents, near misses, and corrective actions.",
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-orange-500/40 hover:bg-white/[0.07]"
              >
                <h3 className="font-display font-black text-white">{tool.title}</h3>
                <p className="mt-3 text-sm leading-6 text-steel-400">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-display font-black tracking-tight">
            JHA Generator FAQs
          </h2>

          <div className="mt-8 space-y-5">
            {jhaFaqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <h3 className="text-lg font-display font-black text-white">
                  {faq.question}
                </h3>
                <p className="mt-3 text-sm leading-7 text-steel-200">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </section>

        <OfficialSafetySources toolSlug="jha-generator" />
      </section>
    </main>
  );
}
