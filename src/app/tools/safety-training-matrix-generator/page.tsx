import type { Metadata } from "next";
import Link from "next/link";
import { OfficialSafetySources } from "@/components/seo/official-safety-sources";
import { SafetyTrainingMatrixGenerator } from "@/features/safety-training-matrix-generator";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createFaqJsonLd } from "@/lib/seo/faq-json-ld";
import { createToolJsonLd } from "@/lib/seo/json-ld";

const toolJsonLd = createToolJsonLd({
  name: "Safety Training Matrix Generator",
  description:
    "Build a role-based contractor safety training matrix with worker groups, hazards, timing triggers, trainer qualifications, verification methods, and record owners.",
  url: "/tools/safety-training-matrix-generator",
  keywords: [
    "safety training matrix generator",
    "OSHA training matrix template",
    "construction training matrix",
    "employee safety training tracker",
  ],
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Safety Tools", path: "/tools" },
  { name: "Safety Training Matrix Generator", path: "/tools/safety-training-matrix-generator" },
]);

const faqs = [
  {
    question: "What is a safety training matrix?",
    answer:
      "A safety training matrix connects worker groups or roles with relevant tasks, hazards, training topics, timing triggers, trainer qualifications, verification methods, and responsible record owners.",
  },
  {
    question: "Does this generator identify every OSHA training requirement?",
    answer:
      "No. Training duties are distributed across many standards and may also depend on State Plan requirements, assigned tasks, hazards, equipment, substances, manufacturer instructions, contracts, and site conditions.",
  },
  {
    question: "Should every safety topic be renewed annually?",
    answer:
      "No universal annual interval applies to every topic. Enter the initial, periodic, event-driven, or performance-based timing supported by the applicable requirement and workplace circumstances.",
  },
  {
    question: "Does an OSHA 10-hour or 30-hour card replace task-specific training?",
    answer:
      "No. OSHA Outreach courses provide general hazard-awareness education and do not satisfy employer training duties contained in specific OSHA standards.",
  },
  {
    question: "How should training effectiveness be verified?",
    answer:
      "Use a suitable method such as knowledge questions, practical demonstration, observation, discussion, or documented performance evaluation based on the task, hazard, standard, and employee responsibilities.",
  },
  {
    question: "When should the matrix be reviewed?",
    answer:
      "Review it when roles, tasks, facilities, equipment, materials, processes, controls, hazards, procedures, requirements, or demonstrated worker knowledge and skill change.",
  },
];

const faqJsonLd = createFaqJsonLd(faqs);

const relatedTools = [
  {
    href: "/tools/jha-generator",
    title: "JHA Generator",
    description: "Document task steps, hazards, controls, and required PPE before assigning training.",
  },
  {
    href: "/tools/toolbox-talk-generator",
    title: "Toolbox Talk Generator",
    description: "Prepare a focused jobsite safety discussion for identified hazards and controls.",
  },
  {
    href: "/tools/safety-plan-generator",
    title: "Safety Plan Generator",
    description: "Create a broader safety-plan outline covering project hazards and responsibilities.",
  },
];

export const metadata: Metadata = {
  title: "Safety Training Matrix Generator",
  description:
    "Create a contractor safety training matrix for worker roles, hazards, tasks, timing triggers, verification methods, and training records.",
  alternates: {
    canonical: "/tools/safety-training-matrix-generator",
  },
};

export default function SafetyTrainingMatrixGeneratorPage() {
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
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-steel-400">
            <Link href="/" className="transition hover:text-orange-500">
              Home
            </Link>
            <span className="px-2">/</span>
            <Link href="/tools" className="transition hover:text-orange-500">
              Safety Tools
            </Link>
            <span className="px-2">/</span>
            <span className="text-steel-200">Safety Training Matrix Generator</span>
          </nav>

          <div className="mt-6 max-w-3xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">
              <span className="inline-block h-[2px] w-3.5 bg-orange-500" />
              Role and hazard-based training planner
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Safety Training Matrix Generator
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-steel-200 sm:text-lg">
              Build a structured training matrix connecting worker groups
              with relevant tasks, hazards, timing triggers, trainer
              qualifications, verification methods, and record ownership.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-navy-950 py-14">
        <div className="mx-auto w-full max-w-6xl px-6">
          <SafetyTrainingMatrixGenerator />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-5 px-6 lg:grid-cols-2">
          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.09em] text-orange-600">
              Role-based planning
            </span>
            <h2 className="mt-2.5 font-display text-xl font-bold text-navy-950">
              Connect training to real work
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
              Connect each assignment to the worker group, role, task,
              equipment, substance, or hazard that creates the training
              need.
            </p>
          </article>

          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.09em] text-orange-600">
              Timing control
            </span>
            <h2 className="mt-2.5 font-display text-xl font-bold text-navy-950">
              Do not invent renewal intervals
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
              Requirements may address initial assignment, periodic
              retraining, changed conditions, observed deficiencies, or
              specific triggering events. Verify the timing basis for
              every matrix row.
            </p>
          </article>

          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <h2 className="font-display text-xl font-bold text-navy-950">
              Verify knowledge and practical skill
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
              Attendance alone may not demonstrate understanding or
              ability. Select a verification method appropriate to the
              hazard and task.
            </p>
          </article>

          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <h2 className="font-display text-xl font-bold text-navy-950">
              Control training records
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
              Assign record ownership and identify fields for completion
              evidence, trainer information, evaluation results,
              corrective follow-up, and applicable retention requirements.
            </p>
          </article>

          <article className="rounded-xl border border-navy-800 bg-navy-900 p-7 lg:col-span-2">
            <h2 className="font-display text-xl font-bold text-white">
              Outreach cards are not OSHA certifications
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-steel-200">
              OSHA 10-hour and 30-hour Outreach courses provide general
              hazard-awareness education. They do not replace
              employer-provided training required by specific OSHA
              standards.
            </p>
          </article>

          <article className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-7 lg:col-span-2">
            <h2 className="font-display text-xl font-bold text-orange-950">
              Important compliance limitation
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-orange-950/80">
              This generator cannot determine which standards apply,
              whether a trainer is qualified, whether an employee is
              competent, whether training was effective, or whether an
              employer complies with federal, State Plan, contractual, or
              site-specific requirements.
            </p>
          </article>
        </div>
      </section>

      <section className="border-t border-steel-200 bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight text-navy-950">
            Safety Training Matrix FAQs
          </h2>
          <div className="mt-7 grid gap-4">
            {faqs.map((faq) => (
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

          <div className="mt-14">
            <h2 className="font-display text-3xl font-bold tracking-tight text-navy-950">
              Related contractor safety tools
            </h2>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
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
          </div>

          <OfficialSafetySources toolSlug="safety-training-matrix-generator" />
        </div>
      </section>
    </main>
  );
}
