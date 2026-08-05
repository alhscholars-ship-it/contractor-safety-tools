import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Methodology and Editorial Standards",
  description:
    "Learn how Contractor Safety Form Tools researches primary sources, designs deterministic generators, tests releases, handles corrections, and maintains safety content.",
  alternates: {
    canonical: "/methodology",
  },
};

const methodologyJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Methodology and Editorial Standards",
  description:
    "The research, development, testing, maintenance, and correction process used by Contractor Safety Form Tools.",
  url: `${siteConfig.url}/methodology`,
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(methodologyJsonLd),
        }}
      />

      <section className="mx-auto w-full max-w-4xl px-6 py-20">
        <Link
          href="/"
          className="text-sm font-semibold text-emerald-300"
        >
          ← Back to home
        </Link>

        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Editorial Transparency
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            Methodology and Editorial Standards
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            This page explains how we research safety topics, structure
            generators, select primary references, test releases, maintain
            published material, and evaluate correction requests.
          </p>
        </div>

        <div className="mt-12 space-y-10 text-base leading-8 text-slate-300">
          <section>
            <h2 className="text-2xl font-black text-white">
              Purpose of the website
            </h2>

            <p className="mt-3">
              Contractor Safety Form Tools provides browser-based documentation
              aids for contractors, supervisors, project teams, and safety
              coordinators. Each generator produces a structured draft that
              users can review, adapt, approve, and export.
            </p>

            <p className="mt-3">
              The website does not issue certifications, approve safety
              programs, determine legal compliance, or replace competent and
              qualified professionals.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Source hierarchy
            </h2>

            <p className="mt-3">
              Research begins with current primary government sources,
              especially applicable OSHA standards, official topic pages,
              worksheets, forms, and compliance-assistance resources.
            </p>

            <ul className="mt-4 list-disc space-y-3 pl-5">
              <li>
                Federal OSHA regulations, official topic pages, forms, and
                compliance-assistance resources.
              </li>
              <li>
                State-plan, state, local, and authority-having-jurisdiction
                requirements where applicable.
              </li>
              <li>
                Manufacturer instructions, engineered requirements, employer
                programs, client rules, and project specifications.
              </li>
              <li>
                Qualified professional judgment for workplace-specific hazards,
                controls, responsibilities, and approvals.
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://www.osha.gov/safety-management"
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-full border border-emerald-300/30 px-5 py-3 text-sm font-bold text-emerald-200 transition hover:border-emerald-200 hover:text-emerald-100"
              >
                OSHA Safety Management
              </a>

              <a
                href="https://www.osha.gov/construction/topics"
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-full border border-emerald-300/30 px-5 py-3 text-sm font-bold text-emerald-200 transition hover:border-emerald-200 hover:text-emerald-100"
              >
                OSHA Construction Topics
              </a>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              How tool-specific references are selected
            </h2>

            <p className="mt-3">
              Each generator links to focused official sources that closely
              match its subject. Source selection favors primary OSHA material
              over commercial summaries, unsupported claims, or general pages
              that do not address the tool&apos;s principal topic.
            </p>

            <p className="mt-3">
              Including a source link helps users continue their own
              verification. It does not mean OSHA reviewed, endorsed, approved,
              or certified the generator or any document it produces.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Generator design process
            </h2>

            <ol className="mt-4 list-decimal space-y-3 pl-5">
              <li>
                Define the documentation purpose and intended workplace users.
              </li>
              <li>
                Identify essential job details, findings, hazards, controls,
                responsibilities, and follow-up information.
              </li>
              <li>
                Create explicit validation rules for required fields and list
                inputs.
              </li>
              <li>
                Produce deterministic output from information entered by the
                user.
              </li>
              <li>
                Include clear limitations and review reminders in the interface
                and exported document.
              </li>
              <li>
                Add focused primary sources and related internal tools where
                they support verification or workflow continuity.
              </li>
            </ol>

            <p className="mt-4">
              The generators do not invent workplace facts or independently
              determine whether a jobsite, procedure, employee, or document is
              compliant.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Quality assurance
            </h2>

            <p className="mt-3">
              Production changes are checked through automated and manual
              quality controls before release.
            </p>

            <ul className="mt-4 list-disc space-y-3 pl-5">
              <li>
                Automated tests covering validation, deterministic generation,
                exports, structured data, navigation, and authority references.
              </li>
              <li>
                ESLint and TypeScript checks for code quality and type safety.
              </li>
              <li>
                A fresh optimized production build for verified releases.
              </li>
              <li>
                Accessibility auditing across physical website routes.
              </li>
              <li>
                Git scope, whitespace, repository-health, and regression
                checks before commits and pushes.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Review and maintenance triggers
            </h2>

            <p className="mt-3">
              Content and tools should be reviewed when an official source
              changes, a linked standard is revised, a broken reference is
              discovered, generator behavior changes, a material error is
              reported, or new regulatory context affects published wording.
            </p>

            <p className="mt-3">
              Laws, standards, guidance, site conditions, and employer programs
              can change. Users must verify current requirements at the time of
              use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Corrections and feedback
            </h2>

            <p className="mt-3">
              Reports of broken links, inaccurate wording, technical defects,
              accessibility problems, or outdated references are evaluated
              against the affected primary source, tool behavior, and current
              repository implementation.
            </p>

            <p className="mt-3">
              A report should identify the affected page or tool and explain
              the issue without including confidential employee, medical,
              client, legal, or incident information.
            </p>

            <Link
              href="/contact"
              className="mt-5 inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
            >
              View correction and contact guidance
            </Link>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Editorial limitations
            </h2>

            <p className="mt-3">
              No general-purpose generator can represent every possible hazard,
              jurisdiction, trade, emergency, equipment condition, contractual
              requirement, or professional judgment.
            </p>

            <p className="mt-3">
              Users remain responsible for workplace assessment, document
              approval, employee training, implementation, supervision,
              regulatory reporting, and obtaining qualified guidance.
            </p>
          </section>
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <Link
            href="/tools"
            className="inline-flex rounded-full bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
          >
            Explore safety tools
          </Link>

          <Link
            href="/disclaimer"
            className="inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
          >
            Read the disclaimer
          </Link>
        </div>
      </section>
    </main>
  );
}
