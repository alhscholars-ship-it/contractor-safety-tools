import type { Metadata } from "next";
import Link from "next/link";
import { OfficialSafetySources } from "@/components/seo/official-safety-sources";
import { SafetyPlanGenerator } from "@/features/safety-plan-generator/safety-plan-generator";
import { createToolJsonLd } from "@/lib/seo/json-ld";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createFaqJsonLd } from "@/lib/seo/faq-json-ld";

const toolJsonLd = createToolJsonLd({
  name: "Safety Plan Generator",
  description:
    "Create a contractor safety plan outline for construction jobsites, trades, hazards, PPE, emergency procedures, and documentation.",
  url: "/tools/safety-plan-generator",
  keywords: ["safety plan generator", "contractor safety plan", "construction safety plan template"],
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Tools", path: "/tools" },
  { name: "Safety Plan Generator", path: "/tools/safety-plan-generator" },
]);

const safetyPlanFaqs = [
  {
    question: "Is this safety plan generator free?",
    answer:
      "Yes. The generator is free to use and currently supports TXT and PDF exports.",
  },
  {
    question: "Does this generator create an OSHA-approved safety plan?",
    answer:
      "No. OSHA does not approve documents created by this website. The generated plan is a draft that must be reviewed against current requirements and actual jobsite conditions.",
  },
  {
    question: "Can subcontractors use the generated plan?",
    answer:
      "Yes, but each contractor and subcontractor should review responsibilities, hazards, controls, training, and project-specific requirements before relying on it.",
  },
  {
    question: "Should one safety plan be used for every project?",
    answer:
      "No. A plan should be tailored to the project, trade, site conditions, workforce, equipment, hazards, and applicable requirements.",
  },
];

const faqJsonLd = createFaqJsonLd(safetyPlanFaqs);

const steps = [
  {
    title: "1. Add project details",
    description:
      "Identify the contractor, project, trade, jobsite location, and emergency contact.",
  },
  {
    title: "2. Document hazards and PPE",
    description:
      "List the main jobsite hazards and the personal protective equipment expected for the work.",
  },
  {
    title: "3. Review and export",
    description:
      "Check the generated plan, adapt it to actual site conditions, and export it as TXT or PDF.",
  },
];

const relatedTools = [
  {
    href: "/tools/jha-generator",
    title: "JHA Generator",
    description: "Break work into task steps, hazards, controls, and PPE.",
  },
  {
    href: "/tools/toolbox-talk-generator",
    title: "Toolbox Talk Generator",
    description: "Prepare crew discussion points and safety meeting notes.",
  },
  {
    href: "/tools/ppe-checklist-generator",
    title: "PPE Checklist Generator",
    description: "Create task-specific PPE and pre-use inspection checklists.",
  },
  {
    href: "/tools/incident-report-generator",
    title: "Incident Report Generator",
    description: "Document incidents, immediate actions, and corrective actions.",
  },
];

export const metadata: Metadata = {
  title: "Safety Plan Generator",
  description:
    "Create a contractor safety plan outline for construction jobsites, trades, hazards, PPE, emergency procedures, and documentation.",
  alternates: {
    canonical: "/tools/safety-plan-generator",
  },
};

export default function SafetyPlanGeneratorPage() {
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
              Safety Plans
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Safety Plan Generator for Contractors
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-steel-200 sm:text-lg">
              Build a practical safety plan outline for construction
              jobsites, trade-specific hazards, PPE requirements, emergency
              procedures, and corrective action documentation.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-navy-950 py-14">
        <div className="mx-auto w-full max-w-6xl px-6">
          <SafetyPlanGenerator />
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
              How to create a contractor safety plan
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              Enter the project, trade, jobsite, emergency contact, primary
              hazards, and required PPE. The generator organizes those
              details into a structured draft that can be reviewed, edited,
              and exported for project documentation.
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
                What should a construction safety plan include?
              </h2>
              <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
                A useful plan should reflect the actual project, trade,
                workforce, equipment, and hazards. Common sections include:
              </p>
              <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[14.5px] leading-7 text-slate-600">
                <li>Company, project, trade, and jobsite identification</li>
                <li>Roles, responsibilities, and emergency contacts</li>
                <li>Known hazards and planned control measures</li>
                <li>Required PPE and inspection expectations</li>
                <li>Emergency response and incident-reporting procedures</li>
                <li>Training, communication, and toolbox talk requirements</li>
                <li>Corrective actions, review notes, and recordkeeping</li>
              </ul>
            </div>

            <div className="rounded-xl border border-steel-200 bg-white p-7">
              <h2 className="font-display text-xl font-bold text-navy-950">
                When should the safety plan be updated?
              </h2>
              <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
                Review the plan before work begins and whenever conditions
                change. Updates may be needed when:
              </p>
              <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[14.5px] leading-7 text-slate-600">
                <li>New work phases, trades, or subcontractors are introduced</li>
                <li>Equipment, materials, or work methods change</li>
                <li>New hazards or site restrictions are identified</li>
                <li>An incident, near miss, or corrective action occurs</li>
                <li>Client, insurer, manufacturer, or regulatory requirements change</li>
                <li>Workers report that controls are missing or ineffective</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-orange-500/30 bg-orange-500/10 p-7">
            <h2 className="font-display text-xl font-bold text-orange-950">
              Safety and compliance limitations
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-orange-950/80">
              This generator creates an informational draft only. It does
              not guarantee OSHA compliance and does not replace a
              competent person, qualified safety professional, legal
              counsel, project-specific requirements, manufacturer
              instructions, or current federal, state, and local
              regulations.
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
              Use these related generators to support job planning,
              communication, hazard analysis, and documentation.
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
              Safety Plan Generator FAQs
            </h2>
            <div className="mt-7 space-y-4">
              {safetyPlanFaqs.map((faq) => (
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

          <OfficialSafetySources toolSlug="safety-plan-generator" />
        </div>
      </section>
    </main>
  );
}
