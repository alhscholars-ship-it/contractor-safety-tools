import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/data/tools";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";

const calculatorTools = tools.filter(
  (tool) => tool.category === "Safety Calculators",
);

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
    name: "Safety Calculators",
    path: "/tools/safety-calculators",
  },
]);

export const metadata: Metadata = {
  title: "Safety Calculators",
  description:
    "Use free contractor safety calculators for TRIR, DART, days away, severity rates, incident costs, and workplace risk assessment.",
  alternates: {
    canonical: "/tools/safety-calculators",
  },
};

export default function SafetyCalculatorsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
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
              Safety Calculators
            </span>
          </nav>

          <div className="mt-8 max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300">
              Safety calculator collection
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
              Contractor Safety Calculators
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Use focused calculators to estimate workplace safety
              performance measures, incident costs, and structured
              hazard risk values from the information you provide.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {calculatorTools.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.href}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-emerald-300/50 hover:bg-white/[0.07]"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
                Safety Calculator
              </p>

              <h2 className="mt-4 text-2xl font-black">
                {tool.name}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                {tool.shortDescription}
              </p>

              <span className="mt-5 inline-block text-sm font-bold text-emerald-300">
                Open calculator →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black">
              Safety performance calculations in one place
            </h2>

            <p className="mt-5 leading-7 text-slate-300">
              These calculators are designed to make common contractor
              safety calculations easier to review and document. Enter
              the values relevant to your reporting period or risk
              assessment, review the resulting calculation, and use the
              output as a supporting safety-management reference.
            </p>

            <p className="mt-4 leading-7 text-slate-300">
              Calculator results do not replace employer judgment,
              applicable regulations, official recordkeeping
              requirements, engineering controls, or competent-person
              determinations.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
