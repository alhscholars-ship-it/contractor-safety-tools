import type { Metadata } from "next";
import Link from "next/link";
import { OfficialSafetySources } from "@/components/seo/official-safety-sources";
import { LockoutTagoutChecklistGenerator } from "@/features/lockout-tagout-checklist-generator/lockout-tagout-checklist-generator";
import { createToolJsonLd } from "@/lib/seo/json-ld";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createFaqJsonLd } from "@/lib/seo/faq-json-ld";

const toolJsonLd = createToolJsonLd({
  name: "Lockout Tagout Checklist Generator",
  description:
    "Create an equipment-specific lockout/tagout checklist with hazardous energy sources, isolation points, shutdown steps, zero-energy verification, and restoration procedures.",
  url: "/tools/lockout-tagout-checklist-generator",
  keywords: ["lockout tagout checklist generator", "LOTO checklist template", "energy isolation checklist", "construction lockout tagout form"],
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Tools", path: "/tools" },
  { name: "Lockout Tagout Checklist Generator", path: "/tools/lockout-tagout-checklist-generator" },
]);

const faqs = [
  {
    question: "What is a lockout/tagout checklist?",
    answer:
      "A lockout/tagout checklist documents equipment, hazardous energy sources, isolation points, shutdown steps, verification steps, required devices, and restoration procedures.",
  },
  {
    question: "Who should perform lockout/tagout?",
    answer:
      "Only employees who are trained and authorized under the employer's energy control program should apply lockout or tagout devices and perform equipment isolation.",
  },
  {
    question: "Why is zero-energy verification important?",
    answer:
      "Verification helps confirm that identified energy sources have been isolated and that stored or residual energy has been controlled before servicing begins.",
  },
  {
    question: "Does this generator replace an energy control procedure?",
    answer:
      "No. It creates an informational checklist draft and does not replace an equipment-specific energy control procedure, training, qualified review, or applicable regulatory requirements.",
  },
];

const faqJsonLd = createFaqJsonLd(faqs);

const steps = [
  {
    title: "1. Identify energy",
    description:
      "List electrical, hydraulic, pneumatic, mechanical, thermal, gravitational, and stored energy hazards.",
  },
  {
    title: "2. Define isolation",
    description:
      "Document disconnects, valves, breakers, blocks, restraints, and required lockout devices.",
  },
  {
    title: "3. Verify and restore",
    description:
      "Record zero-energy verification and the controlled sequence for returning equipment to service.",
  },
];

const relatedTools = [
  {
    href: "/tools/jha-generator",
    title: "JHA Generator",
    description: "Document work steps, hazardous energy exposures, controls, and required PPE.",
  },
  {
    href: "/tools/safety-plan-generator",
    title: "Safety Plan Generator",
    description: "Add hazardous energy control expectations to a project safety plan.",
  },
  {
    href: "/tools/ppe-checklist-generator",
    title: "PPE Checklist Generator",
    description: "Create task-specific PPE and pre-use equipment inspection checklists.",
  },
  {
    href: "/tools/toolbox-talk-generator",
    title: "Toolbox Talk Generator",
    description: "Prepare a safety discussion covering energy isolation and worker responsibilities.",
  },
];

export const metadata: Metadata = {
  title: "Lockout Tagout Checklist Generator",
  description:
    "Create an equipment-specific lockout/tagout checklist with hazardous energy sources, isolation points, shutdown steps, zero-energy verification, and restoration procedures.",
  alternates: {
    canonical: "/tools/lockout-tagout-checklist-generator",
  },
};

export default function LockoutTagoutChecklistGeneratorPage() {
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
          <Link
            href="/tools"
            className="font-mono text-xs font-semibold text-steel-400 transition hover:text-orange-500"
          >
            ← Back to tools
          </Link>

          <div className="mt-6 max-w-3xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">
              <span className="inline-block h-[2px] w-3.5 bg-orange-500" />
              Energy Control
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Lockout Tagout Checklist Generator
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-steel-200 sm:text-lg">
              Build an equipment-specific LOTO checklist covering hazardous energy, isolation points, affected employees, shutdown sequencing, zero-energy verification, and safe return to service.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-navy-950 py-14">
        <div className="mx-auto w-full max-w-6xl px-6">
          <LockoutTagoutChecklistGenerator />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-600">
              <span className="inline-block h-[2px] w-3.5 bg-orange-600" />
              How it works
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
              How to create a lockout/tagout checklist
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              Identify the equipment and personnel, document every hazardous energy source and isolation point, then enter the shutdown, verification, and restoration sequence. The tool formats the information into a downloadable checklist draft.
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.title}
                className="rounded-xl border border-steel-200 bg-white p-6"
              >
                <h3 className="font-display text-lg font-bold text-navy-950">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <div className="rounded-xl border border-steel-200 bg-white p-7">
              <h2 className="font-display text-xl font-bold text-navy-950">
                What should a LOTO checklist include?
              </h2>

              <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[14.5px] leading-7 text-slate-600">
              <li>Equipment name and exact location</li>
              <li>Authorized employee and supervising person</li>
              <li>Affected employees and work groups</li>
              <li>All hazardous and stored energy sources</li>
              <li>Energy isolation points and required devices</li>
              <li>Shutdown and isolation sequence</li>
              <li>Zero-energy verification steps</li>
              <li>Restoration and restart sequence</li>
              </ul>
            </div>

            <div className="rounded-xl border border-steel-200 bg-white p-7">
              <h2 className="font-display text-xl font-bold text-navy-950">
                Common hazardous energy sources
              </h2>

              <ul className="mt-4 list-disc space-y-2.5 pl-5 text-[14.5px] leading-7 text-slate-600">
              <li>Electrical circuits and control power</li>
              <li>Hydraulic and pneumatic pressure</li>
              <li>Rotating or moving mechanical parts</li>
              <li>Compressed springs and stored tension</li>
              <li>Gravity and suspended components</li>
              <li>Thermal, steam, chemical, or pressurized systems</li>
              <li>Capacitors and other stored electrical energy</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-orange-500/30 bg-orange-500/10 p-7">
            <h2 className="font-display text-xl font-bold text-orange-950">
              Important safety limitation
            </h2>
            <p className="mt-3 text-[14.5px] leading-7 text-orange-950/80">
              This generator is an informational documentation aid only. It does not create or validate a compliant equipment-specific energy control procedure, determine employee authorization, verify energy isolation, or replace employer training, manufacturer instructions, qualified review, or applicable federal, state, local, and project-specific requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-steel-200 bg-white py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-navy-950">
              Related contractor safety tools
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-slate-600">
              Connect energy control with hazard analysis, PPE checks, and crew communication.
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-xl border border-steel-200 bg-white p-6 transition hover:border-orange-500/50 hover:bg-orange-100/40"
              >
                <h3 className="font-bold text-navy-950">{tool.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-14">
            <h2 className="font-display text-3xl font-bold tracking-tight text-navy-950">
              Lockout Tagout Checklist FAQs
            </h2>
            <div className="mt-7 space-y-4">
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
          </div>

          <OfficialSafetySources toolSlug="lockout-tagout-checklist-generator" />
        </div>
      </section>
    </main>
  );
}

