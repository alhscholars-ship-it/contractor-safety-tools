import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Contractor Safety Form Tools for website feedback, corrections, support questions, and business inquiries.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto w-full max-w-4xl px-6 py-20">
        <Link href="/" className="text-sm font-semibold text-emerald-300">
          ← Back to home
        </Link>

        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Contact
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            Contact Contractor Safety Form Tools
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Use this page for website feedback, error reports, correction
            requests, partnership inquiries, and general support questions.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-black">Before contacting us</h2>

            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-300">
              <li>
                Do not send confidential employee, medical, incident, financial,
                legal, or client information.
              </li>
              <li>
                Generated documents are informational drafts and are not
                professional safety or legal advice.
              </li>
              <li>
                Include the affected tool name, page address, and a clear
                description of the issue.
              </li>
            </ul>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-black">Contact method</h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              A dedicated public support email will be added before final
              launch. Until then, this page confirms the official contact route
              and user-safety guidance.
            </p>

            <p className="mt-4 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
              Do not publish a personal email address in the source code. We will
              add a project-specific support address during the final domain and
              deployment phase.
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
