import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Read the Contractor Safety Tools disclaimer covering informational use, professional guidance, regulatory compliance, and user responsibility.",
  alternates: {
    canonical: "/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto w-full max-w-4xl px-6 py-20">
        <Link href="/" className="text-sm font-semibold text-emerald-300">
          ← Back to home
        </Link>

        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Legal Information
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            Disclaimer
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Contractor Safety Tools provides general informational and
            documentation assistance only.
          </p>
        </div>

        <div className="mt-12 space-y-8 text-base leading-8 text-slate-300">
          <section>
            <h2 className="text-2xl font-black text-white">
              Not professional advice
            </h2>
            <p className="mt-3">
              Content and generated documents are not legal, medical,
              engineering, insurance, regulatory, or certified occupational
              safety advice. They do not create a professional-client
              relationship.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              No guarantee of compliance
            </h2>
            <p className="mt-3">
              Use of this website does not guarantee compliance with OSHA,
              state-plan requirements, local regulations, contractual
              obligations, manufacturer instructions, client standards, or
              project-specific safety rules.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              User responsibility
            </h2>
            <p className="mt-3">
              Users are responsible for reviewing, verifying, adapting, and
              approving every generated document before use. Conditions,
              hazards, equipment, workers, and applicable requirements must be
              evaluated by competent and qualified persons.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Information may change
            </h2>
            <p className="mt-3">
              Laws, standards, agency guidance, and accepted safety practices
              may change. Users should consult current official sources and
              qualified professionals before relying on generated content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              No warranty
            </h2>
            <p className="mt-3">
              The website and its tools are provided on an “as is” and “as
              available” basis without warranties of accuracy, completeness,
              fitness for a particular purpose, or uninterrupted availability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Limitation of liability
            </h2>
            <p className="mt-3">
              To the maximum extent permitted by applicable law, Contractor
              Contractor Safety Tools is not responsible for losses, injuries,
              penalties, claims, project delays, or other damages arising from
              use of, misuse of, or reliance on this website or generated
              documents.
            </p>
          </section>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/tools"
            className="inline-flex rounded-full bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
          >
            Explore safety tools
          </Link>

          <Link
            href="/about"
            className="inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
          >
            About this website
          </Link>
        </div>
      </section>
    </main>
  );
}
