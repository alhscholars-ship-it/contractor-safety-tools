import type { Metadata } from "next";
import Link from "next/link";
import { IncidentReportGenerator } from "@/features/incident-report-generator/incident-report-generator";
import { createToolJsonLd } from "@/lib/seo/json-ld";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";

const toolJsonLd = createToolJsonLd({
  name: "Incident Report Generator",
  description:
    "Create a structured construction incident report draft with event details, injury notes, witnesses, corrective actions, and documentation reminders.",
  url: "/tools/incident-report-generator",
  keywords: ['incident report generator', 'construction incident report', 'jobsite incident report form'],
});


const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Tools", path: "/tools" },
  { name: "Incident Report Generator", path: "/tools/incident-report-generator" },
]);

export const metadata: Metadata = {
  title: "Incident Report Generator",
  description:
    "Create a structured construction incident report draft with event details, injury notes, witnesses, corrective actions, and documentation reminders.",
  alternates: {
    canonical: "/tools/incident-report-generator",
  },
};

export default function IncidentReportGeneratorPage() {
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
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <Link href="/tools" className="text-sm font-semibold text-emerald-300">
          ← Back to tools
        </Link>

        <div className="mt-8 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Incident Reports
          </p>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            Incident Report Generator for Construction Jobsites
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Create a structured incident report draft for jobsite events, injury notes,
            witnesses, immediate actions, corrective actions, and safety documentation.
          </p>
        </div>

        <div className="mt-12">
          <IncidentReportGenerator />
        </div>
      </section>
    </main>
  );
}
