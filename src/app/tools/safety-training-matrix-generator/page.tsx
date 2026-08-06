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
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Safety Tools",
    path: "/tools",
  },
  {
    name: "Safety Training Matrix Generator",
    path: "/tools/safety-training-matrix-generator",
  },
]);

const faqs = [
  {
    question:
      "What is a safety training matrix?",
    answer:
      "A safety training matrix connects worker groups or roles with relevant tasks, hazards, training topics, timing triggers, trainer qualifications, verification methods, and responsible record owners.",
  },
  {
    question:
      "Does this generator identify every OSHA training requirement?",
    answer:
      "No. Training duties are distributed across many standards and may also depend on State Plan requirements, assigned tasks, hazards, equipment, substances, manufacturer instructions, contracts, and site conditions.",
  },
  {
    question:
      "Should every safety topic be renewed annually?",
    answer:
      "No universal annual interval applies to every topic. Enter the initial, periodic, event-driven, or performance-based timing supported by the applicable requirement and workplace circumstances.",
  },
  {
    question:
      "Does an OSHA 10-hour or 30-hour card replace task-specific training?",
    answer:
      "No. OSHA Outreach courses provide general hazard-awareness education and do not satisfy employer training duties contained in specific OSHA standards.",
  },
  {
    question:
      "How should training effectiveness be verified?",
    answer:
      "Use a suitable method such as knowledge questions, practical demonstration, observation, discussion, or documented performance evaluation based on the task, hazard, standard, and employee responsibilities.",
  },
  {
    question:
      "When should the matrix be reviewed?",
    answer:
      "Review it when roles, tasks, facilities, equipment, materials, processes, controls, hazards, procedures, requirements, or demonstrated worker knowledge and skill change.",
  },
];

const faqJsonLd = createFaqJsonLd(faqs);

export const metadata: Metadata = {
  title: "Safety Training Matrix Generator",
  description:
    "Create a contractor safety training matrix for worker roles, hazards, tasks, timing triggers, verification methods, and training records.",
  alternates: {
    canonical:
      "/tools/safety-training-matrix-generator",
  },
};

export default function SafetyTrainingMatrixGeneratorPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd,
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      <section className="border-b border-white/10">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <nav
            aria-label="Breadcrumb"
            className="text-sm text-slate-400"
          >
            <Link
              href="/"
              className="transition hover:text-white"
            >
              Home
            </Link>

            <span className="px-2">/</span>

            <Link
              href="/tools"
              className="transition hover:text-white"
            >
              Safety Tools
            </Link>

            <span className="px-2">/</span>

            <span className="text-slate-200">
              Safety Training Matrix Generator
            </span>
          </nav>

          <div className="mt-8 max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">
              Role and hazard-based training
              planner
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
              Safety Training Matrix Generator
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Build a structured training matrix
              connecting worker groups with
              relevant tasks, hazards, timing
              triggers, trainer qualifications,
              verification methods, and record
              ownership.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <SafetyTrainingMatrixGenerator />
      </section>

      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-16 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
              Role-based planning
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Connect training to real work
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-300">
              Connect each assignment to the
              worker group, role, task, equipment,
              substance, or hazard that creates
              the training need.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
              Timing control
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Do not invent renewal intervals
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-300">
              Requirements may address initial
              assignment, periodic retraining,
              changed conditions, observed
              deficiencies, or specific triggering
              events. Verify the timing basis for
              every matrix row.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              Verify knowledge and practical skill
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Attendance alone may not demonstrate
              understanding or ability. Select a
              verification method appropriate to
              the hazard and task.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              Control training records
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Assign record ownership and identify
              fields for completion evidence,
              trainer information, evaluation
              results, corrective follow-up, and
              applicable retention requirements.
            </p>
          </article>

          <article className="rounded-3xl border border-sky-300/20 bg-sky-300/10 p-7 lg:col-span-2">
            <h2 className="text-2xl font-black text-sky-100">
              Outreach cards are not OSHA
              certifications
            </h2>

            <p className="mt-4 text-sm leading-7 text-sky-100/90">
              OSHA 10-hour and 30-hour Outreach
              courses provide general
              hazard-awareness education. They do
              not replace employer-provided
              training required by specific OSHA
              standards.
            </p>
          </article>

          <article className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-7 lg:col-span-2">
            <h2 className="text-2xl font-black text-amber-100">
              Important compliance limitation
            </h2>

            <p className="mt-4 text-sm leading-7 text-amber-100/90">
              This generator cannot determine
              which standards apply, whether a
              trainer is qualified, whether an
              employee is competent, whether
              training was effective, or whether
              an employer complies with federal,
              State Plan, contractual, or
              site-specific requirements.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-black tracking-tight">
          Safety Training Matrix FAQs
        </h2>

        <div className="mt-8 grid gap-5">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <h3 className="text-lg font-black text-emerald-200">
                {faq.question}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="text-3xl font-black tracking-tight">
            Related contractor safety tools
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                href: "/tools/jha-generator",
                title: "JHA Generator",
                description:
                  "Document task steps, hazards, controls, and required PPE before assigning training.",
              },
              {
                href: "/tools/toolbox-talk-generator",
                title: "Toolbox Talk Generator",
                description:
                  "Prepare a focused jobsite safety discussion for identified hazards and controls.",
              },
              {
                href: "/tools/safety-plan-generator",
                title: "Safety Plan Generator",
                description:
                  "Create a broader safety-plan outline covering project hazards and responsibilities.",
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-emerald-300/40 hover:bg-white/[0.07]"
              >
                <h3 className="font-black text-white">
                  {tool.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <OfficialSafetySources toolSlug="safety-training-matrix-generator" />
      </section>
    </main>
  );
}
