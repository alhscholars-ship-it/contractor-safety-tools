import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/data/tools";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";

const checklistTools = tools.filter((tool) => tool.category === "Inspections");

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Safety Tools", path: "/tools" },
  { name: "Inspection Checklists", path: "/tools/inspection-checklists" },
]);

export const metadata: Metadata = {
  title: "Inspection Checklists",
  description:
    "Create structured jobsite, equipment, excavation, scaffold, PPE, fire extinguisher, and first aid inspection records.",
  alternates: {
    canonical: "/tools/inspection-checklists",
  },
};

export default function InspectionChecklistsPage() {
  return (
    <main className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
            <span className="text-steel-200">Inspection Checklists</span>
          </nav>

          <div className="mt-6 max-w-3xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">
              <span className="inline-block h-[2px] w-3.5 bg-orange-500" />
              Inspection checklist collection
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Contractor Inspection Checklists
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-steel-200 sm:text-lg">
              Create structured jobsite, equipment, excavation, scaffold,
              PPE, fire extinguisher, and first aid inspection records.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {checklistTools.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.href}
                className="rounded-xl border border-steel-200 bg-white p-6 transition hover:border-orange-500/50 hover:bg-orange-100/40"
              >
                <span className="mb-2.5 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.09em] text-orange-600">
                  Inspection Checklist
                </span>
                <h2 className="text-[17px] font-bold leading-snug text-navy-950">
                  {tool.name}
                </h2>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">
                  {tool.shortDescription}
                </p>
                <span className="mt-4 inline-block font-mono text-xs font-semibold text-orange-600">
                  Open checklist →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-steel-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-bold text-navy-950">
              Inspection documentation in one place
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              These generators help organize inspection observations,
              deficiencies, corrective actions, responsible persons, and
              follow-up information into structured records that can
              support contractor safety-management workflows.
            </p>
            <p className="mt-3 text-[15px] leading-7 text-slate-600">
              An inspection checklist is a documentation aid. It does not
              replace applicable regulations, competent-person
              determinations, manufacturer requirements, engineering
              controls, site-specific procedures, or employer judgment.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
