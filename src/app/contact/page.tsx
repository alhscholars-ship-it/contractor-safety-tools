import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact and Corrections",
  description:
    "Submit public website feedback, correction requests, broken-link reports, and accessibility issues for Contractor Safety Form Tools.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto w-full max-w-4xl px-6 py-20">
        <Link
          href="/"
          className="text-sm font-semibold text-emerald-300"
        >
          ← Back to home
        </Link>

        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Feedback and Corrections
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            Contact Contractor Safety Form Tools
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Use the public issue tracker to report website defects, broken
            links, accessibility problems, inaccurate wording, or outdated
            source references.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-black">
              Before opening a report
            </h2>

            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>
                Do not include confidential employee, medical, incident,
                financial, legal, client, or personally identifying details.
              </li>
              <li>
                Include the affected tool or page, the page address, what you
                expected, and what occurred.
              </li>
              <li>
                Check existing public reports before creating a duplicate.
              </li>
              <li>
                Generated documents are informational drafts and are not
                professional safety or legal advice.
              </li>
            </ul>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-black">
              Public support channel
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              The GitHub issue tracker is the current public support route for
              website defects, correction requests, broken links, and
              accessibility feedback. Reports are public, and a GitHub account
              may be required to create one.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={siteConfig.newIssueUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex rounded-full bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
              >
                Open a public report
              </a>

              <a
                href={siteConfig.issuesUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10"
              >
                View existing reports
              </a>
            </div>

            <p className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
              Do not use public issues for emergencies, regulatory reporting,
              legal notices, private business inquiries, or sensitive case
              details.
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
            href="/methodology"
            className="inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
          >
            Read our methodology
          </Link>
        </div>
      </section>
    </main>
  );
}
