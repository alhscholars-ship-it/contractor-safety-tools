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
  keywords: ['safety plan generator', 'contractor safety plan', 'construction safety plan template'],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <Link href="/tools" className="text-sm font-semibold text-emerald-300">
          ← Back to tools
        </Link>

        <div className="mt-8 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Safety Plans
          </p>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            Safety Plan Generator for Contractors
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Build a practical safety plan outline for construction jobsites,
            trade-specific hazards, PPE requirements, emergency procedures, and
            corrective action documentation.
          </p>
        </div>

        <div className="mt-12">
          <SafetyPlanGenerator />
        </div>

        <section className="mt-16 border-t border-white/10 pt-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              How to create a contractor safety plan
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              Enter the project, trade, jobsite, emergency contact, primary
              hazards, and required PPE. The generator organizes those details
              into a structured draft that can be reviewed, edited, and exported
              for project documentation.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
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
              What should a construction safety plan include?
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              A useful plan should reflect the actual project, trade, workforce,
              equipment, and hazards. Common sections include:
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>Company, project, trade, and jobsite identification</li>
              <li>Roles, responsibilities, and emergency contacts</li>
              <li>Known hazards and planned control measures</li>
              <li>Required PPE and inspection expectations</li>
              <li>Emergency response and incident-reporting procedures</li>
              <li>Training, communication, and toolbox talk requirements</li>
              <li>Corrective actions, review notes, and recordkeeping</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              When should the safety plan be updated?
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Review the plan before work begins and whenever conditions change.
              Updates may be needed when:
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>New work phases, trades, or subcontractors are introduced</li>
              <li>Equipment, materials, or work methods change</li>
              <li>New hazards or site restrictions are identified</li>
              <li>An incident, near miss, or corrective action occurs</li>
              <li>Client, insurer, manufacturer, or regulatory requirements change</li>
              <li>Workers report that controls are missing or ineffective</li>
            </ul>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-amber-300/20 bg-amber-300/10 p-7">
          <h2 className="text-2xl font-black text-amber-100">
            Safety and compliance limitations
          </h2>
          <p className="mt-4 text-sm leading-7 text-amber-50/90">
            This generator creates an informational draft only. It does not
            guarantee OSHA compliance and does not replace a competent person,
            qualified safety professional, legal counsel, project-specific
            requirements, manufacturer instructions, or current federal, state,
            and local regulations.
          </p>
        </section>

        <section className="mt-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black tracking-tight">
              Related contractor safety tools
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Use these related generators to support job planning,
              communication, hazard analysis, and documentation.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/tools/jha-generator",
                title: "JHA Generator",
                description:
                  "Break work into task steps, hazards, controls, and PPE.",
              },
              {
                href: "/tools/toolbox-talk-generator",
                title: "Toolbox Talk Generator",
                description:
                  "Prepare crew discussion points and safety meeting notes.",
              },
              {
                href: "/tools/ppe-checklist-generator",
                title: "PPE Checklist Generator",
                description:
                  "Create task-specific PPE and pre-use inspection checklists.",
              },
              {
                href: "/tools/incident-report-generator",
                title: "Incident Report Generator",
                description:
                  "Document incidents, immediate actions, and corrective actions.",
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
            Safety Plan Generator FAQs
          </h2>

          <div className="mt-8 space-y-5">
            {safetyPlanFaqs.map((faq) => (
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

        <OfficialSafetySources toolSlug="safety-plan-generator" />
      </section>
    </main>
  );
}
