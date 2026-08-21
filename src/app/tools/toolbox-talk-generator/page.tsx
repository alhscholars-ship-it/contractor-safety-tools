import type { Metadata } from "next";
import Link from "next/link";
import { OfficialSafetySources } from "@/components/seo/official-safety-sources";
import { ToolboxTalkGenerator } from "@/features/toolbox-talk-generator/toolbox-talk-generator";
import { createToolJsonLd } from "@/lib/seo/json-ld";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createFaqJsonLd } from "@/lib/seo/faq-json-ld";

const toolJsonLd = createToolJsonLd({
  name: "Toolbox Talk Generator",
  description:
    "Generate contractor toolbox talk outlines for construction safety meetings, jobsite hazards, crew reminders, and attendance documentation.",
  url: "/tools/toolbox-talk-generator",
  keywords: ['toolbox talk generator', 'construction toolbox talks', 'safety meeting template'],
});


const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Tools", path: "/tools" },
  { name: "Toolbox Talk Generator", path: "/tools/toolbox-talk-generator" },
]);

const toolboxTalkFaqs = [
  {
    question: "Is the toolbox talk generator free?",
    answer:
      "Yes. It is free to use and supports TXT and PDF exports.",
  },
  {
    question: "How long should a toolbox talk be?",
    answer:
      "There is no universal duration. It should be long enough to explain the hazard, controls, worker responsibilities, and questions without becoming unfocused.",
  },
  {
    question: "Does a toolbox talk count as required training?",
    answer:
      "Not automatically. Required training must meet the applicable standard, employer program, subject-matter, documentation, and competency requirements.",
  },
  {
    question: "Should toolbox talks be documented?",
    answer:
      "Documentation is commonly useful for recording the topic, date, leader, attendees, questions, and follow-up actions, subject to company and project requirements.",
  },
];

const faqJsonLd = createFaqJsonLd(toolboxTalkFaqs);

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
            Toolbox Talks
          </p>
          <h1 className="text-4xl font-display font-black tracking-tight sm:text-6xl">
            Toolbox Talk Generator for Construction Safety Meetings
          </h1>
          <p className="mt-6 text-lg leading-8 text-steel-200">
            Create practical toolbox talk outlines for jobsite hazards, safety reminders,
            crew discussion points, and meeting documentation.
          </p>
        </div>

        <div className="mt-12">
          <ToolboxTalkGenerator />
        </div>

        <section className="mt-16 border-t border-white/10 pt-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-display font-black tracking-tight sm:text-4xl">
              How to create a construction toolbox talk
            </h2>
            <p className="mt-5 text-base leading-8 text-steel-200">
              Enter the safety topic, trade, jobsite, supervisor, hazards, and
              controls. The generator turns those details into a practical
              meeting outline with discussion points, crew questions, and
              documentation notes.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "1. Choose the topic",
                description:
                  "Select a jobsite hazard, work activity, recent incident, seasonal risk, or required safety reminder.",
              },
              {
                title: "2. Add hazards and controls",
                description:
                  "List the conditions workers may face and the controls the crew should discuss before work begins.",
              },
              {
                title: "3. Review and document",
                description:
                  "Lead the discussion, answer questions, record attendance, and export the outline as TXT or PDF.",
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
              What should a toolbox talk include?
            </h2>
            <p className="mt-4 text-sm leading-7 text-steel-200">
              A useful toolbox talk should be short, relevant to the current
              work, and focused on conditions the crew can act on immediately.
              Common elements include:
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-steel-200">
              <li>Topic, trade, jobsite, date, and meeting leader</li>
              <li>Current hazards connected to the planned work</li>
              <li>Required controls, PPE, and safe work practices</li>
              <li>Recent incidents, near misses, or lessons learned</li>
              <li>Questions that confirm worker understanding</li>
              <li>Attendance, comments, and follow-up actions</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-display font-black">
              When should toolbox talks be conducted?
            </h2>
            <p className="mt-4 text-sm leading-7 text-steel-200">
              The appropriate frequency depends on the project, employer,
              hazards, and applicable requirements. Toolbox talks are commonly
              useful when:
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-steel-200">
              <li>A new task, phase, crew, or subcontractor starts work</li>
              <li>Jobsite conditions, equipment, or work methods change</li>
              <li>A new hazard or unsafe trend is identified</li>
              <li>An incident, near miss, or corrective action occurs</li>
              <li>Workers need refresher training or clarification</li>
              <li>Weather or seasonal conditions create additional risk</li>
            </ul>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-orange-500/20 bg-orange-500/10 p-7">
          <h2 className="text-2xl font-display font-black text-orange-100">
            Safety and training limitations
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/90">
            A generated toolbox talk is an informational meeting aid only. It
            does not replace required training, competent-person oversight,
            manufacturer instructions, written safety programs, regulatory
            requirements, or project-specific procedures.
          </p>
        </section>

        <section className="mt-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-display font-black tracking-tight">
              Related contractor safety tools
            </h2>
            <p className="mt-4 text-sm leading-7 text-steel-200">
              Connect the safety meeting with planning, hazard analysis, PPE,
              and incident documentation.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/tools/safety-plan-generator",
                title: "Safety Plan Generator",
                description:
                  "Create a broader project safety plan with hazards, PPE, and emergency procedures.",
              },
              {
                href: "/tools/jha-generator",
                title: "JHA Generator",
                description:
                  "Break a task into steps, hazards, controls, and required PPE.",
              },
              {
                href: "/tools/ppe-checklist-generator",
                title: "PPE Checklist Generator",
                description:
                  "Build a task-specific PPE and inspection checklist.",
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
            Toolbox Talk Generator FAQs
          </h2>

          <div className="mt-8 space-y-5">
            {toolboxTalkFaqs.map((faq) => (
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

        <OfficialSafetySources toolSlug="toolbox-talk-generator" />
      </section>
    </main>
  );
}
