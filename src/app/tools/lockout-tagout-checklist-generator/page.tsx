import type { Metadata } from "next";
import Link from "next/link";
import { LockoutTagoutChecklistGenerator } from "@/features/lockout-tagout-checklist-generator/lockout-tagout-checklist-generator";
import { createBreadcrumbJsonLd } from "@/lib/seo/breadcrumb-json-ld";
import { createFaqJsonLd } from "@/lib/seo/faq-json-ld";
import { createToolJsonLd } from "@/lib/seo/json-ld";

const description =
  "Create an equipment-specific lockout/tagout checklist with hazardous energy sources, isolation points, shutdown steps, zero-energy verification, and restoration procedures.";

const toolJsonLd = createToolJsonLd({
  name: "Lockout Tagout Checklist Generator",
  description,
  url: "/tools/lockout-tagout-checklist-generator",
  keywords: [
    "lockout tagout checklist generator",
    "LOTO checklist template",
    "energy isolation checklist",
    "construction lockout tagout form",
  ],
});

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Tools", path: "/tools" },
  {
    name: "Lockout Tagout Checklist Generator",
    path: "/tools/lockout-tagout-checklist-generator",
  },
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

export const metadata: Metadata = {
  title: "Lockout Tagout Checklist Generator",
  description,
  alternates: {
    canonical: "/tools/lockout-tagout-checklist-generator",
  },
};

export default function LockoutTagoutChecklistGeneratorPage() {
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

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <Link href="/tools" className="text-sm font-semibold text-emerald-300">
          ← Back to tools
        </Link>

        <div className="mt-8 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Energy Control
          </p>

          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            Lockout Tagout Checklist Generator
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Build an equipment-specific LOTO checklist covering hazardous
            energy, isolation points, affected employees, shutdown sequencing,
            zero-energy verification, and safe return to service.
          </p>
        </div>

        <div className="mt-12">
          <LockoutTagoutChecklistGenerator />
        </div>

        <section className="mt-16 border-t border-white/10 pt-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
              Checklist workflow
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              How to create a lockout/tagout checklist
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-300">
              Identify the equipment and personnel, document every hazardous
              energy source and isolation point, then enter the shutdown,
              verification, and restoration sequence. The tool formats the
              information into a downloadable checklist draft.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
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
            ].map((step) => (
              <article
                key={step.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <h3 className="text-lg font-black">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              What should a LOTO checklist include?
            </h2>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>Equipment name and exact location</li>
              <li>Authorized employee and supervising person</li>
              <li>Affected employees and work groups</li>
              <li>All hazardous and stored energy sources</li>
              <li>Energy isolation points and required devices</li>
              <li>Shutdown and isolation sequence</li>
              <li>Zero-energy verification steps</li>
              <li>Restoration and restart sequence</li>
            </ul>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black">
              Common hazardous energy sources
            </h2>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>Electrical circuits and control power</li>
              <li>Hydraulic and pneumatic pressure</li>
              <li>Rotating or moving mechanical parts</li>
              <li>Compressed springs and stored tension</li>
              <li>Gravity and suspended components</li>
              <li>Thermal, steam, chemical, or pressurized systems</li>
              <li>Capacitors and other stored electrical energy</li>
            </ul>
          </article>
        </section>

        <section className="mt-16 rounded-3xl border border-amber-300/20 bg-amber-300/10 p-7">
          <h2 className="text-2xl font-black text-amber-100">
            Important safety limitation
          </h2>

          <p className="mt-4 text-sm leading-7 text-amber-50/90">
            This generator is an informational documentation aid only. It does
            not create or validate a compliant equipment-specific energy
            control procedure, determine employee authorization, verify energy
            isolation, or replace employer training, manufacturer instructions,
            qualified review, or applicable federal, state, local, and
            project-specific requirements.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-black tracking-tight">
            Related contractor safety tools
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/tools/jha-generator",
                title: "JHA Generator",
                description:
                  "Document work steps, hazardous energy exposures, controls, and required PPE.",
              },
              {
                href: "/tools/safety-plan-generator",
                title: "Safety Plan Generator",
                description:
                  "Add hazardous energy control expectations to a project safety plan.",
              },
              {
                href: "/tools/ppe-checklist-generator",
                title: "PPE Checklist Generator",
                description:
                  "Create task-specific PPE and pre-use equipment inspection checklists.",
              },
              {
                href: "/tools/toolbox-talk-generator",
                title: "Toolbox Talk Generator",
                description:
                  "Prepare a safety discussion covering energy isolation and worker responsibilities.",
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-emerald-300/40 hover:bg-white/[0.07]"
              >
                <h3 className="font-black">{tool.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-black tracking-tight">
            Lockout Tagout Checklist FAQs
          </h2>

          <div className="mt-8 space-y-5">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <h3 className="text-lg font-black">{faq.question}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
