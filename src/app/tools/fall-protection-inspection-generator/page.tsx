import type { Metadata } from "next";
import Link from "next/link";
import { FallProtectionInspectionGenerator } from "@/features/fall-protection-inspection-generator";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createToolJsonLd } from "@/lib/seo/json-ld";

const toolJsonLd = createToolJsonLd({
  name: "Fall Protection Inspection Checklist Generator",
  description:
    "Create a contractor fall protection inspection checklist covering fall hazards, guardrails, harnesses, anchor points, corrective actions, and documentation.",
  url: "/tools/fall-protection-inspection-generator",
  keywords: [
    "fall protection inspection checklist",
    "fall arrest inspection form",
    "construction fall protection checklist",
    "harness and anchor point inspection",
  ],
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Safety Tools", path: "/tools" },
  { name: "Fall Protection Inspection Checklist Generator", path: "/tools/fall-protection-inspection-generator" },
]);

export const metadata: Metadata = {
  title: "Fall Protection Inspection Checklist Generator",
  description:
    "Create a contractor fall protection inspection checklist covering fall hazards, guardrails, harnesses, anchor points, corrective actions, and documentation.",
  alternates: {
    canonical: "/tools/fall-protection-inspection-generator",
  },
};

export default function FallProtectionInspectionPage() {
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
            <span className="text-steel-200">Fall Protection Inspection Generator</span>
          </nav>

          <div className="mt-6 max-w-3xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">
              <span className="inline-block h-[2px] w-3.5 bg-orange-500" />
              Inspection Checklist Generator
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Fall Protection Inspection Checklist Generator
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-steel-200 sm:text-lg">
              Create a structured fall protection inspection checklist for
              construction work areas, elevated surfaces, guardrails,
              personal fall arrest systems, and corrective actions.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-navy-950 pb-20 pt-2">
        <div className="mx-auto w-full max-w-6xl px-6">
          <FallProtectionInspectionGenerator />
        </div>
      </section>
    </main>
  );
}
