import type { Metadata } from "next";
import Link from "next/link";
import { OfficialSafetySources } from "@/components/seo/official-safety-sources";
import { NearMissReportGenerator } from "@/features/near-miss-report-generator/near-miss-report-generator";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createFaqJsonLd } from "@/lib/seo/faq-json-ld";
import { createToolJsonLd } from "@/lib/seo/json-ld";

const description =
  "Create a structured construction near-miss report with event details, potential consequences, contributing factors, corrective actions, and follow-up ownership.";

const toolJsonLd = createToolJsonLd({
  name: "Near Miss Report Generator",
  description,
  url: "/tools/near-miss-report-generator",
  keywords: [
    "near miss report generator",
    "near miss report template",
    "construction near miss form",
    "jobsite near miss report",
  ],
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Tools", path: "/tools" },
  {
    name: "Near Miss Report Generator",
    path: "/tools/near-miss-report-generator",
  },
]);

const nearMissFaqs = [
  {
    question: "What is a near miss?",
    answer:
      "A near miss is an unplanned event that did not cause injury, illness, property damage, or another loss but had the potential to do so.",
  },
  {
    question: "Why should construction near misses be reported?",
    answer:
      "Near-miss reports can reveal unsafe conditions, control failures, procedural gaps, and emerging trends before a more serious event occurs.",
  },
  {
    question: "Is this near-miss report generator free?",
    answer:
      "Yes. The generator is free to use and supports downloadable TXT and PDF report drafts.",
  },
  {
    question: "Does this tool determine OSHA reporting requirements?",
    answer:
      "No. This tool creates an informational documentation draft and does not determine OSHA recordability, reporting obligations, liability, or regulatory compliance.",
  },
];

const faqJsonLd = createFaqJsonLd(nearMissFaqs);

export const metadata: Metadata = {
  title: "Near Miss Report Generator",
  description,
  alternates: {
    canonical: "/tools/near-miss-report-generator",
  },
};

export default function NearMissReportGeneratorPage() {
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
            Incident Reports
          </p>

          <h1 className="text-4xl font-display font-black tracking-tight sm:text-6xl">
            Near Miss Report Generator for Construction Jobsites
          </h1>

          <p className="mt-6 text-lg leading-8 text-steel-200">
            Document jobsite near misses, potential consequences, contributing
            factors, immediate controls, corrective actions, and responsible
            persons in a structured report draft.
          </p>
        </div>

        <div className="mt-12">
          <NearMissReportGenerator />
        </div>

        <section className="mt-16 border-t border-white/10 pt-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
              How it works
            </p>

            <h2 className="mt-4 text-3xl font-display font-black tracking-tight sm:text-4xl">
              How to create a construction near-miss report
            </h2>

            <p className="mt-5 text-base leading-8 text-steel-200">
              Enter the event details, potential outcome, factors that prevented
              harm, contributing conditions, immediate actions, corrective
              actions, responsible persons, and follow-up date. The generator
              organizes the information into a downloadable report draft.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "1. Document the event",
                description:
                  "Record what happened, where and when it occurred, who reported it, and who supervised the work.",
              },
              {
                title: "2. Assess the potential",
                description:
                  "Describe the injury, damage, environmental impact, or operational loss that could have occurred.",
              },
              {
                title: "3. Assign follow-up",
                description:
                  "Document immediate controls, corrective actions, responsible persons, and a follow-up date.",
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
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-display font-black">
              What should a near-miss report include?
            </h2>

            <p className="mt-4 text-sm leading-7 text-steel-200">
              A useful near-miss report should document verified facts and
              clearly distinguish the event from assumptions or conclusions.
              Common report details include:
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-steel-200">
              <li>Company, project, event date, and exact location</li>
              <li>A factual description of what occurred</li>
              <li>The potential injury, damage, release, or operational loss</li>
              <li>Factors that prevented injury or damage</li>
              <li>Contributing conditions, actions, equipment, or procedures</li>
              <li>Immediate actions taken to control the hazard</li>
              <li>Corrective actions and responsible persons</li>
              <li>A target date for verification and closure</li>
            </ul>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-display font-black">
              What happens after a near miss?
            </h2>

            <p className="mt-4 text-sm leading-7 text-steel-200">
              After immediate hazards are controlled, the report should support
              a proportionate investigation and follow-up process. Depending on
              the event, teams may need to:
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-steel-200">
              <li>Preserve photographs, statements, and equipment records</li>
              <li>Review the relevant JHA, safety plan, or work procedure</li>
              <li>Correct defective equipment or unsafe jobsite conditions</li>
              <li>Communicate lessons learned through a toolbox talk</li>
              <li>Assign and verify corrective actions</li>
              <li>Escalate high-potential events through company procedures</li>
            </ul>
          </article>
        </section>

        <section className="mt-16 rounded-3xl border border-orange-500/20 bg-orange-500/10 p-7">
          <h2 className="text-2xl font-display font-black text-orange-100">
            Documentation and compliance limitations
          </h2>

          <p className="mt-4 text-sm leading-7 text-white/90">
            This generator creates an informational report draft only. It does
            not determine OSHA recordability, regulatory reporting obligations,
            legal liability, medical conclusions, root cause, or the adequacy of
            corrective actions. Follow applicable employer, insurer, client,
            federal, state, local, and project-specific requirements.
          </p>
        </section>

        <section className="mt-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-display font-black tracking-tight">
              Related contractor safety tools
            </h2>

            <p className="mt-4 text-sm leading-7 text-steel-200">
              Use these tools to investigate hazards, document corrective
              actions, and communicate lessons learned.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/tools/incident-report-generator",
                title: "Incident Report Generator",
                description:
                  "Document injuries, damage, unsafe events, witnesses, and corrective actions.",
              },
              {
                href: "/tools/jha-generator",
                title: "JHA Generator",
                description:
                  "Review task steps, hazards, controls, and PPE after a near miss.",
              },
              {
                href: "/tools/toolbox-talk-generator",
                title: "Toolbox Talk Generator",
                description:
                  "Share lessons learned and reinforce updated jobsite controls.",
              },
              {
                href: "/tools/safety-plan-generator",
                title: "Safety Plan Generator",
                description:
                  "Update project hazard controls, procedures, and documentation expectations.",
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
            Near Miss Report Generator FAQs
          </h2>

          <div className="mt-8 space-y-5">
            {nearMissFaqs.map((faq) => (
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

        <OfficialSafetySources toolSlug="near-miss-report-generator" />
      </section>
    </main>
  );
}
