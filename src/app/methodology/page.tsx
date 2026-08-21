import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/content/page-hero";

export const metadata: Metadata = {
  title: "Methodology and Editorial Standards",
  description:
    "Learn how Contractor Safety Tools researches primary sources, designs deterministic generators, tests releases, handles corrections, and maintains safety content.",
  alternates: {
    canonical: "/methodology",
  },
};

const methodologyJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Methodology and Editorial Standards",
  description:
    "The research, development, testing, maintenance, and correction process used by Contractor Safety Tools.",
  url: `${siteConfig.url}/methodology`,
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-steel-200 bg-white p-7">
      <h2 className="font-display text-xl font-bold text-navy-950">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-[15px] leading-7 text-slate-600">
        {children}
      </div>
    </div>
  );
}

export default function MethodologyPage() {
  return (
    <main className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(methodologyJsonLd) }}
      />

      <PageHero
        eyebrow="Editorial Transparency"
        title="Methodology and Editorial Standards"
        lede="This page explains how we research safety topics, structure generators, select primary references, test releases, maintain published material, and evaluate correction requests."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-4xl px-6">
          <div className="grid gap-5">
            <Card title="Purpose of the website">
              <p>
                Contractor Safety Tools provides browser-based documentation
                aids for contractors, supervisors, project teams, and safety
                coordinators. Each generator produces a structured draft that
                users can review, adapt, approve, and export.
              </p>
              <p>
                The website does not issue certifications, approve safety
                programs, determine legal compliance, or replace competent
                and qualified professionals.
              </p>
            </Card>

            <Card title="Source hierarchy">
              <p>
                Research begins with current primary government sources,
                especially applicable OSHA standards, official topic pages,
                worksheets, forms, and compliance-assistance resources.
              </p>
              <ul className="list-disc space-y-2.5 pl-5">
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
                  Qualified professional judgment for workplace-specific
                  hazards, controls, responsibilities, and approvals.
                </li>
              </ul>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://www.osha.gov/safety-management"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-[3px] border border-orange-500/40 px-4 py-2 text-xs font-semibold text-orange-600 transition hover:border-orange-500 hover:bg-orange-100/50"
                >
                  OSHA Safety Management ↗
                </a>
                <a
                  href="https://www.osha.gov/construction/topics"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-[3px] border border-orange-500/40 px-4 py-2 text-xs font-semibold text-orange-600 transition hover:border-orange-500 hover:bg-orange-100/50"
                >
                  OSHA Construction Topics ↗
                </a>
              </div>
            </Card>

            <Card title="How tool-specific references are selected">
              <p>
                Each generator links to focused official sources that closely
                match its subject. Source selection favors primary OSHA
                material over commercial summaries, unsupported claims, or
                general pages that do not address the tool&apos;s principal
                topic.
              </p>
              <p>
                Including a source link helps users continue their own
                verification. It does not mean OSHA reviewed, endorsed,
                approved, or certified the generator or any document it
                produces.
              </p>
            </Card>

            <Card title="Generator design process">
              <ol className="list-decimal space-y-2.5 pl-5">
                <li>
                  Define the documentation purpose and intended workplace
                  users.
                </li>
                <li>
                  Identify essential job details, findings, hazards,
                  controls, responsibilities, and follow-up information.
                </li>
                <li>
                  Create explicit validation rules for required fields and
                  list inputs.
                </li>
                <li>
                  Produce deterministic output from information entered by
                  the user.
                </li>
                <li>
                  Include clear limitations and review reminders in the
                  interface and exported document.
                </li>
                <li>
                  Add focused primary sources and related internal tools
                  where they support verification or workflow continuity.
                </li>
              </ol>
              <p>
                The generators do not invent workplace facts or independently
                determine whether a jobsite, procedure, employee, or document
                is compliant.
              </p>
            </Card>

            <Card title="Quality assurance">
              <p>
                Production changes are checked through automated and manual
                quality controls before release.
              </p>
              <ul className="list-disc space-y-2.5 pl-5">
                <li>
                  Automated tests covering validation, deterministic
                  generation, exports, structured data, navigation, and
                  authority references.
                </li>
                <li>
                  ESLint and TypeScript checks for code quality and type
                  safety.
                </li>
                <li>A fresh optimized production build for verified releases.</li>
                <li>Accessibility auditing across physical website routes.</li>
                <li>
                  Git scope, whitespace, repository-health, and regression
                  checks before commits and pushes.
                </li>
              </ul>
            </Card>

            <Card title="Review and maintenance triggers">
              <p>
                Content and tools should be reviewed when an official source
                changes, a linked standard is revised, a broken reference is
                discovered, generator behavior changes, a material error is
                reported, or new regulatory context affects published
                wording.
              </p>
              <p>
                Laws, standards, guidance, site conditions, and employer
                programs can change. Users must verify current requirements
                at the time of use.
              </p>
            </Card>

            <Card title="Corrections and feedback">
              <p>
                Reports of broken links, inaccurate wording, technical
                defects, accessibility problems, or outdated references are
                evaluated against the affected primary source, tool
                behavior, and current repository implementation.
              </p>
              <p>
                A report should identify the affected page or tool and
                explain the issue without including confidential employee,
                medical, client, legal, or incident information.
              </p>
              <Link
                href="/contact"
                className="inline-flex rounded-[3px] border border-navy-800 px-5 py-2.5 text-sm font-semibold text-navy-950 transition hover:border-orange-500 hover:text-orange-600"
              >
                View correction and contact guidance
              </Link>
            </Card>

            <Card title="Editorial limitations">
              <p>
                No general-purpose generator can represent every possible
                hazard, jurisdiction, trade, emergency, equipment condition,
                contractual requirement, or professional judgment.
              </p>
              <p>
                Users remain responsible for workplace assessment, document
                approval, employee training, implementation, supervision,
                regulatory reporting, and obtaining qualified guidance.
              </p>
            </Card>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/tools"
              className="inline-flex rounded-[3px] border border-orange-600 bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
            >
              Explore safety tools →
            </Link>
            <Link
              href="/disclaimer"
              className="inline-flex rounded-[3px] border border-navy-800 px-6 py-3 text-sm font-semibold text-navy-950 transition hover:border-orange-500 hover:text-orange-600"
            >
              Read the disclaimer
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
