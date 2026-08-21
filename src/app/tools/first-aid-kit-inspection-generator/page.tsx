import type { Metadata } from "next";
import Link from "next/link";
import { OfficialSafetySources } from "@/components/seo/official-safety-sources";
import { FirstAidKitInspectionGenerator } from "@/features/first-aid-kit-inspection-generator";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createFaqJsonLd } from "@/lib/seo/faq-json-ld";
import { createToolJsonLd } from "@/lib/seo/json-ld";

const toolJsonLd = createToolJsonLd({
  name: "First Aid Kit Inspection Checklist Generator",
  description:
    "Create a workplace first aid kit inspection checklist covering accessibility, container condition, inventory, expiration dates, missing supplies, corrective actions, and follow-up.",
  url: "/tools/first-aid-kit-inspection-generator",
  keywords: ["first aid kit inspection checklist", "workplace first aid kit checklist", "first aid kit inspection form", "construction first aid kit inspection"],
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Safety Tools", path: "/tools" },
  { name: "First Aid Kit Inspection Checklist Generator", path: "/tools/first-aid-kit-inspection-generator" },
]);

const faqs = [
  {
    question: "What should a first aid kit inspection include?",
    answer:
      "A practical inspection should document the kit location, accessibility, container condition, inventory status, expiration dates, missing or damaged supplies, corrective actions, responsible persons, and the next inspection date.",
  },
  {
    question: "How often should workplace first aid kits be inspected?",
    answer:
      "Inspection frequency should reflect workplace hazards, supply usage, manufacturer guidance, employer procedures, and applicable requirements. Many employers use a recurring monthly review and inspect again after supplies are used.",
  },
  {
    question: "Should expired first aid supplies be replaced?",
    answer:
      "Expired, opened, contaminated, damaged, or depleted supplies should be evaluated and replaced promptly according to manufacturer instructions and the employer's first aid program.",
  },
  {
    question: "Does this checklist guarantee OSHA compliance?",
    answer:
      "No. This generator is a documentation aid. Employers must evaluate workplace hazards and follow applicable OSHA requirements, recognized standards, medical guidance, manufacturer instructions, and company procedures.",
  },
];

const faqJsonLd = createFaqJsonLd(faqs);

export const metadata: Metadata = {
  title: "First Aid Kit Inspection Checklist Generator",
  description:
    "Generate a professional first aid kit inspection checklist for construction sites, workplaces, facilities, warehouses, and contractor safety programs.",
  alternates: {
    canonical: "/tools/first-aid-kit-inspection-generator",
  },
};

export default function FirstAidKitInspectionGeneratorPage() {
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
            <span className="text-steel-200">First Aid Kit Inspection Generator</span>
          </nav>

          <div className="mt-6 max-w-3xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">
              <span className="inline-block h-[2px] w-3.5 bg-orange-500" />
              Workplace inspection tool
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
              First Aid Kit Inspection Checklist Generator
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-steel-200 sm:text-lg">
              Create a structured inspection record covering first aid kit accessibility, container condition, required supplies, expired or missing items, corrective actions, responsible persons, and scheduled follow-up.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-navy-950 py-14">
        <div className="mx-auto w-full max-w-6xl px-6">
          <FirstAidKitInspectionGenerator />
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
              <li>Identify the kit, its type, and its workplace location.</li>
              <li>Record accessibility, container, inventory, and expiration status.</li>
              <li>List the supplies reviewed and any missing or expired items.</li>
              <li>Assign corrective actions and responsible persons.</li>
              <li>Generate and export the completed inspection record.</li>
            </ol>
          </article>

          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <h2 className="font-display text-xl font-bold text-navy-950">
              Important inspection points
            </h2>
            <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[14.5px] leading-7 text-slate-600">
              <li>The kit should be visible, identified, and readily accessible.</li>
              <li>The container should remain clean, dry, secure, and undamaged.</li>
              <li>Required supplies should match the workplace hazard assessment.</li>
              <li>Opened, contaminated, damaged, depleted, or expired items should be addressed.</li>
              <li>Corrective actions should have clear ownership and follow-up dates.</li>
            </ul>
          </article>

          <article className="rounded-xl border border-steel-200 bg-white p-7">
            <h2 className="font-display text-xl font-bold text-navy-950">
              Corrective action documentation
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-slate-600">
              Record exactly which supplies require replacement or restocking, who is responsible, and when completion will be verified. Clear documentation supports consistent workplace readiness and prevents unresolved deficiencies from being overlooked.
            </p>
          </article>

          <article className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-7">
            <h2 className="font-display text-xl font-bold text-orange-950">
              Tool limitation
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-orange-950/80">
              This generator does not determine the exact first aid supplies required for every workplace and does not certify regulatory compliance. Review workplace hazards, applicable regulations, recognized standards, medical guidance, manufacturer instructions, and employer procedures.
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
                href="/tools/fire-extinguisher-inspection-generator"
                className="rounded-full border border-steel-200 px-5 py-2.5 text-sm font-semibold text-navy-950 transition hover:border-orange-500 hover:text-orange-600"
              >
                Fire Extinguisher Inspection
              </Link>
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
            </div>
          </div>

          <OfficialSafetySources toolSlug="first-aid-kit-inspection-generator" />
        </div>
      </section>
    </main>
  );
}

