import type { Metadata } from "next";
import Link from "next/link";
import { FirstAidKitInspectionGenerator } from "@/features/first-aid-kit-inspection-generator";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createFaqJsonLd } from "@/lib/seo/faq-json-ld";
import { createToolJsonLd } from "@/lib/seo/json-ld";

const toolJsonLd = createToolJsonLd({
  name: "First Aid Kit Inspection Checklist Generator",
  description:
    "Create a workplace first aid kit inspection checklist covering accessibility, container condition, inventory, expiration dates, missing supplies, corrective actions, and follow-up.",
  url: "/tools/first-aid-kit-inspection-generator",
  keywords: [
    "first aid kit inspection checklist",
    "workplace first aid kit checklist",
    "first aid kit inspection form",
    "construction first aid kit inspection",
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
    name: "First Aid Kit Inspection Checklist Generator",
    path: "/tools/first-aid-kit-inspection-generator",
  },
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
              First Aid Kit Inspection Generator
            </span>
          </nav>

          <div className="mt-8 max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">
              Workplace inspection tool
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              First Aid Kit Inspection Checklist Generator
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Create a structured inspection record covering first aid kit
              accessibility, container condition, required supplies, expired
              or missing items, corrective actions, responsible persons, and
              scheduled follow-up.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <FirstAidKitInspectionGenerator />
      </section>

      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              How to use this inspection generator
            </h2>

            <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>Enter the company, project, inspector, and inspection dates.</li>
              <li>Identify the kit, its type, and its workplace location.</li>
              <li>Record accessibility, container, inventory, and expiration status.</li>
              <li>List the supplies reviewed and any missing or expired items.</li>
              <li>Assign corrective actions and responsible persons.</li>
              <li>Generate and export the completed inspection record.</li>
            </ol>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              Important inspection points
            </h2>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>The kit should be visible, identified, and readily accessible.</li>
              <li>The container should remain clean, dry, secure, and undamaged.</li>
              <li>Required supplies should match the workplace hazard assessment.</li>
              <li>Opened, contaminated, damaged, depleted, or expired items should be addressed.</li>
              <li>Corrective actions should have clear ownership and follow-up dates.</li>
            </ul>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              Corrective action documentation
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Record exactly which supplies require replacement or restocking,
              who is responsible, and when completion will be verified. Clear
              documentation supports consistent workplace readiness and
              prevents unresolved deficiencies from being overlooked.
            </p>
          </article>

          <article className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-7">
            <h2 className="text-2xl font-black text-amber-100">
              Tool limitation
            </h2>

            <p className="mt-4 text-sm leading-7 text-amber-100/90">
              This generator does not determine the exact first aid supplies
              required for every workplace and does not certify regulatory
              compliance. Review workplace hazards, applicable regulations,
              recognized standards, medical guidance, manufacturer
              instructions, and employer procedures.
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
              href="/tools/fire-extinguisher-inspection-generator"
              className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold transition hover:border-emerald-300 hover:text-emerald-200"
            >
              Fire Extinguisher Inspection
            </Link>

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
          </div>
        </div>
      </section>
    </main>
  );
}
