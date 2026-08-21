import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/content/page-hero";

export const metadata: Metadata = {
  title: "Contact and Corrections",
  description:
    "Submit public website feedback, correction requests, broken-link reports, and accessibility issues for Contractor Safety Tools.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="bg-paper">
      <PageHero
        eyebrow="Feedback and Corrections"
        title="Contact Contractor Safety Tools."
        lede="Use the public issue tracker to report website defects, broken links, accessibility problems, inaccurate wording, or outdated source references."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-4xl px-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-steel-200 bg-white p-7">
              <h2 className="font-display text-xl font-bold text-navy-950">
                Before opening a report
              </h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-[14.5px] leading-7 text-slate-600">
                <li>
                  Do not include confidential employee, medical, incident,
                  financial, legal, client, or personally identifying
                  details.
                </li>
                <li>
                  Include the affected tool or page, the page address, what
                  you expected, and what occurred.
                </li>
                <li>
                  Check existing public reports before creating a duplicate.
                </li>
                <li>
                  Generated documents are informational drafts and are not
                  legal, medical, or regulatory advice.
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-steel-200 bg-white p-7">
              <h2 className="font-display text-xl font-bold text-navy-950">
                What you can report
              </h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-[14.5px] leading-7 text-slate-600">
                <li>Broken links, layout defects, or export failures.</li>
                <li>
                  Accessibility issues affecting keyboard or screen-reader
                  use.
                </li>
                <li>
                  Inaccurate wording, outdated references, or unclear
                  instructions.
                </li>
                <li>
                  Suggestions for a new generator or checklist category.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-navy-800 bg-navy-950 p-8 text-center">
            <h2 className="font-display text-xl font-bold text-white">
              Ready to report an issue?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-steel-200">
              The GitHub issue tracker is the current public support route.
              Reports are public, and a GitHub account may be required to
              create one.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={siteConfig.newIssueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-[3px] border border-orange-600 bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
              >
                Open a new report →
              </a>
              <a
                href={siteConfig.issuesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-[3px] border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/5"
              >
                View existing reports
              </a>
            </div>
            <p className="mx-auto mt-6 max-w-md rounded-[3px] border border-orange-500/30 bg-orange-500/10 p-3.5 text-xs leading-5 text-orange-100">
              Do not use public issues for emergencies, regulatory reporting,
              legal notices, private business inquiries, or sensitive case
              details.
            </p>
          </div>

          <div className="mt-10">
            <Link
              href="/faq"
              className="font-mono text-sm font-semibold text-orange-600 hover:text-orange-500"
            >
              Read the FAQ instead →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
