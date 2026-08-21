import type { Metadata } from "next";
import Link from "next/link";
import { OfficialSafetySources } from "@/components/seo/official-safety-sources";
import { LadderInspectionGenerator } from "@/features/ladder-inspection-generator";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createFaqJsonLd } from "@/lib/seo/faq-json-ld";
import { createToolJsonLd } from "@/lib/seo/json-ld";

const toolJsonLd = createToolJsonLd({
  name: "Ladder Inspection Checklist Generator",
  description:
    "Create a professional ladder inspection checklist covering identification, duty rating, side rails, rungs, feet, hardware, labels, setup, defects, corrective actions, and follow-up.",
  url: "/tools/ladder-inspection-generator",
  keywords: ["ladder inspection checklist", "ladder safety inspection form", "construction ladder inspection checklist", "portable ladder inspection form"],
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Safety Tools", path: "/tools" },
  { name: "Ladder Inspection Checklist Generator", path: "/tools/ladder-inspection-generator" },
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
            <span className="text-steel-200">Ladder Inspection Generator</span>
          </nav>

          <div className="mt-6 max-w-3xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">
              <span className="inline-block h-[2px] w-3.5 bg-orange-500" />
              Equipment inspection tool
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Ladder Inspection Checklist Generator
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-steel-200 sm:text-lg">
              Create a structured ladder inspection record covering ladder identification, duty rating, rails, rungs, feet, hardware, warning labels, setup conditions, defects, corrective actions, responsible persons, and scheduled follow-up.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-navy-950 py-14">
        <div className="mx-auto w-full max-w-6xl px-6">
          <LadderInspectionGenerator />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-5 px-6 lg:grid-cols-2">
          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <h2 className="font-display text-xl font-bold text-navy-950">
              How to use this inspection generator
            </h2>
            <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-[14.5px] leading-7 text-slate-600">
              <li>Enter the company, project, inspector, and inspection dates.</li>
              <li>Record the ladder ID, type, material, manufacturer, and duty rating.</li>
              <li>Inspect the rails, rungs, feet, hardware, labels, and setup.</li>
              <li>List every identified defect or unsafe condition.</li>
              <li>Assign corrective actions and responsible persons.</li>
              <li>Generate and export the completed ladder inspection record.</li>
            </ol>
          </article>

          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <h2 className="font-display text-xl font-bold text-navy-950">
              Important ladder inspection points
            </h2>
            <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[14.5px] leading-7 text-slate-600">
              <li>Side rails should be free from cracks, bends, splits, and corrosion.</li>
              <li>Rungs and steps should be secure, clean, evenly spaced, and undamaged.</li>
              <li>Feet and slip-resistant surfaces should remain intact and stable.</li>
              <li>Locks, spreaders, ropes, pulleys, and fasteners should operate correctly.</li>
              <li>Duty-rating labels and safety warnings should remain legible.</li>
              <li>The ladder should be positioned on a stable surface and used correctly.</li>
            </ul>
          </article>

          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <h2 className="font-display text-xl font-bold text-navy-950">
              Defect and corrective-action records
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
              Clearly record each defect, whether the ladder was removed from service, the required repair or replacement, the person responsible, and the date follow-up will be completed. Unsafe ladders should not return to service until the identified condition has been properly resolved.
            </p>
          </article>

          <article className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-7">
            <h2 className="font-display text-xl font-bold text-orange-950">
              Tool limitation
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-orange-950/80">
              This generator does not certify a ladder as safe and does not determine compliance for every workplace. Review applicable regulations, manufacturer instructions, workplace conditions, competent-person evaluations, and employer safety procedures.
            </p>
          </article>
        </div>
      </section>

      <section className="border-t border-steel-200 bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight text-navy-950">
            Frequently asked questions
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

          <div className="mt-10 rounded-xl border border-steel-200 bg-white p-7">
            <h2 className="font-display text-xl font-bold text-navy-950">
              Related safety tools
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/tools/daily-jobsite-safety-inspection-generator"
                className="rounded-full border border-steel-200 px-5 py-2.5 text-sm font-semibold text-navy-950 transition hover:border-orange-500 hover:text-orange-600"
              >
                Daily Jobsite Inspection
              </Link>
              <Link
                href="/tools/ppe-checklist-generator"
                className="rounded-full border border-steel-200 px-5 py-2.5 text-sm font-semibold text-navy-950 transition hover:border-orange-500 hover:text-orange-600"
              >
                PPE Checklist Generator
              </Link>
              <Link
                href="/tools/first-aid-kit-inspection-generator"
                className="rounded-full border border-steel-200 px-5 py-2.5 text-sm font-semibold text-navy-950 transition hover:border-orange-500 hover:text-orange-600"
              >
                First Aid Kit Inspection
              </Link>
            </div>
          </div>

          <OfficialSafetySources toolSlug="ladder-inspection-generator" />
        </div>
      </section>
    </main>
  );
}

