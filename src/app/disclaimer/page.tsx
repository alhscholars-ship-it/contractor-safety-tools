import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/content/page-hero";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Read the Contractor Safety Tools disclaimer covering informational use, professional guidance, regulatory compliance, and user responsibility.",
  alternates: {
    canonical: "/disclaimer",
  },
};

const sections = [
  {
    title: "Not professional advice",
    body: "Content and generated documents are not legal, medical, engineering, insurance, regulatory, or certified occupational safety advice. They do not create a professional-client relationship.",
  },
  {
    title: "No guarantee of compliance",
    body: "Use of this website does not guarantee compliance with OSHA, state-plan requirements, local regulations, contractual obligations, manufacturer instructions, client standards, or project-specific safety rules.",
  },
  {
    title: "User responsibility",
    body: "Users are responsible for reviewing, verifying, adapting, and approving every generated document before use. Conditions, hazards, equipment, workers, and applicable requirements must be evaluated by competent and qualified persons.",
  },
  {
    title: "Information may change",
    body: "Laws, standards, agency guidance, and accepted safety practices may change. Users should consult current official sources and qualified professionals before relying on generated content.",
  },
  {
    title: "No warranty",
    body: "The website and its tools are provided on an \u201cas is\u201d and \u201cas available\u201d basis without warranties of accuracy, completeness, fitness for a particular purpose, or uninterrupted availability.",
  },
  {
    title: "Limitation of liability",
    body: "To the maximum extent permitted by applicable law, Contractor Safety Tools is not responsible for losses, injuries, penalties, claims, project delays, or other damages arising from use of, misuse of, or reliance on this website or generated documents.",
  },
];

export default function DisclaimerPage() {
  return (
    <main className="bg-paper">
      <PageHero
        eyebrow="Legal Information"
        title="Disclaimer"
        lede="Contractor Safety Tools provides general informational and documentation assistance only."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-4xl px-6">
          <div className="grid gap-5">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-xl border border-steel-200 bg-white p-7"
              >
                <h2 className="font-display text-xl font-bold text-navy-950">
                  {section.title}
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-slate-600">
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/tools"
              className="inline-flex rounded-[3px] border border-orange-600 bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
            >
              Explore safety tools →
            </Link>
            <Link
              href="/about"
              className="inline-flex rounded-[3px] border border-navy-800 px-6 py-3 text-sm font-semibold text-navy-950 transition hover:border-orange-500 hover:text-orange-600"
            >
              About this website
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
