import type { Metadata } from "next";
import Link from "next/link";
import { LadderInspectionGenerator } from "@/features/ladder-inspection-generator";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createFaqJsonLd } from "@/lib/seo/faq-json-ld";
import { createToolJsonLd } from "@/lib/seo/json-ld";

const toolJsonLd = createToolJsonLd({
  name: "Ladder Inspection Checklist Generator",
  description:
    "Create a professional ladder inspection checklist covering identification, duty rating, side rails, rungs, feet, hardware, labels, setup, defects, corrective actions, and follow-up.",
  url: "/tools/ladder-inspection-generator",
  keywords: [
    "ladder inspection checklist",
    "ladder safety inspection form",
    "construction ladder inspection checklist",
    "portable ladder inspection form",
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
    name: "Ladder Inspection Checklist Generator",
    path: "/tools/ladder-inspection-generator",
  },
]);

const faqs = [
  {
    question: "What should a ladder inspection checklist include?",
    answer:
      "A practical ladder inspection should document the ladder ID, type, material, manufacturer, duty rating, location, side rails, rungs or steps, feet, hardware, labels, setup condition, identified defects, corrective actions, responsible persons, and next inspection date.",
  },
  {
    question: "When should a ladder be removed from service?",
    answer:
      "A ladder should be removed from service when defects, damage, contamination, missing components, unstable hardware, illegible safety information, or other unsafe conditions could affect safe use. The ladder should remain unavailable until it is properly evaluated, repaired, replaced, or disposed of.",
  },
  {
    question: "How often should ladders be inspected?",
    answer:
      "Inspection frequency should reflect ladder usage, workplace conditions, exposure to damage, manufacturer instructions, employer procedures, and applicable requirements. A ladder should also be inspected after an event that could affect its condition.",
  },
  {
    question: "Does this ladder checklist guarantee OSHA compliance?",
    answer:
      "No. This generator is a documentation aid. Employers must follow applicable OSHA requirements, manufacturer instructions, competent-person evaluations, workplace hazard assessments, and company safety procedures.",
  },
];

const faqJsonLd = createFaqJsonLd(faqs);

export const metadata: Metadata = {
  title: "Ladder Inspection Checklist Generator",
  description:
    "Generate a professional ladder inspection checklist for construction sites, facilities, warehouses, contractors, and workplace safety programs.",
  alternates: {
    canonical: "/tools/ladder-inspection-generator",
  },
};

export default function LadderInspectionGeneratorPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <nav className="text-sm text-slate-400" aria-label="Breadcrumb">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span className="px-2">/</span>
            <Link href="/tools" className="transition hover:text-white">
              Safety Tools
            </Link>
            <span className="px-2">/</span>
            <span className="text-slate-200">
              Ladder Inspection Generator
            </span>
          </nav>

          <div className="mt-8 max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">
              Equipment inspection tool
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Ladder Inspection Checklist Generator
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Create a structured ladder inspection record covering ladder
              identification, duty rating, rails, rungs, feet, hardware,
              warning labels, setup conditions, defects, corrective actions,
              responsible persons, and scheduled follow-up.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <LadderInspectionGenerator />
      </section>

      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              How to use this inspection generator
            </h2>

            <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>Enter the company, project, inspector, and inspection dates.</li>
              <li>Record the ladder ID, type, material, manufacturer, and duty rating.</li>
              <li>Inspect the rails, rungs, feet, hardware, labels, and setup.</li>
              <li>List every identified defect or unsafe condition.</li>
              <li>Assign corrective actions and responsible persons.</li>
              <li>Generate and export the completed ladder inspection record.</li>
            </ol>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              Important ladder inspection points
            </h2>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>Side rails should be free from cracks, bends, splits, and corrosion.</li>
              <li>Rungs and steps should be secure, clean, evenly spaced, and undamaged.</li>
              <li>Feet and slip-resistant surfaces should remain intact and stable.</li>
              <li>Locks, spreaders, ropes, pulleys, and fasteners should operate correctly.</li>
              <li>Duty-rating labels and safety warnings should remain legible.</li>
              <li>The ladder should be positioned on a stable surface and used correctly.</li>
            </ul>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              Defect and corrective-action records
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Clearly record each defect, whether the ladder was removed from
              service, the required repair or replacement, the person
              responsible, and the date follow-up will be completed. Unsafe
              ladders should not return to service until the identified
              condition has been properly resolved.
            </p>
          </article>

          <article className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-7">
            <h2 className="text-2xl font-black text-amber-100">
              Tool limitation
            </h2>

            <p className="mt-4 text-sm leading-7 text-amber-100/90">
              This generator does not certify a ladder as safe and does not
              determine compliance for every workplace. Review applicable
              regulations, manufacturer instructions, workplace conditions,
              competent-person evaluations, and employer safety procedures.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-black">Frequently asked questions</h2>

        <div className="mt-8 grid gap-4">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
            >
              <h3 className="font-black text-emerald-200">
                {faq.question}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-7">
          <h2 className="text-2xl font-black">Related safety tools</h2>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/tools/daily-jobsite-safety-inspection-generator"
              className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold transition hover:border-emerald-300 hover:text-emerald-200"
            >
              Daily Jobsite Inspection
            </Link>

            <Link
              href="/tools/ppe-checklist-generator"
              className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold transition hover:border-emerald-300 hover:text-emerald-200"
            >
              PPE Checklist Generator
            </Link>

            <Link
              href="/tools/first-aid-kit-inspection-generator"
              className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold transition hover:border-emerald-300 hover:text-emerald-200"
            >
              First Aid Kit Inspection
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
