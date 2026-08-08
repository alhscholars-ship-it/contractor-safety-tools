import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read how Contractor Safety Tools processes generator input in the browser, creates downloads, handles technical requests, and links to external services.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPolicyPage() {
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
            Privacy
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            Privacy Policy
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            This policy describes the current application&apos;s data flow,
            browser-based document generation, downloads, technical requests,
            and external links.
          </p>
        </div>

        <div className="mt-12 space-y-8 text-base leading-8 text-slate-300">
          <section>
            <h2 className="text-2xl font-black text-white">
              Generator input processing
            </h2>

            <p className="mt-3">
              Tool input is processed in your browser to create a document
              draft. The current application has no user accounts,
              form-submission API, or application database that receives
              generator entries.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              TXT and PDF downloads
            </h2>

            <p className="mt-3">
              TXT and PDF exports are generated through the browser download
              process. After a file is saved, its storage, retention, sharing,
              backup, and deletion are controlled by your browser, device, and
              any storage service you choose to use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Website request data
            </h2>

            <p className="mt-3">
              Hosting, network, and security providers may process standard
              request information needed to deliver and protect the website,
              such as an IP address, requested page, request time, browser
              identifier, and error or security event data. This technical
              request data is separate from generator field input.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Cookies, analytics, and advertising
            </h2>

            <p className="mt-3">
              The current application source does not include an analytics SDK,
              advertising tracker, or application code that stores generator
              input in cookies, localStorage, or sessionStorage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              External links and services
            </h2>

            <p className="mt-3">
              The website links to external resources, including OSHA pages and
              the public GitHub issue tracker. When you follow an external link,
              the destination service receives the request and applies its own
              privacy, security, account, and retention practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Data retention
            </h2>

            <p className="mt-3">
              Because generator entries are not submitted to an application
              backend, we do not retain them in an application database.
              Hosting, network, or security providers may retain technical
              request logs according to their operational and legal
              requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Sensitive information
            </h2>

            <p className="mt-3">
              Do not enter confidential employee, medical, financial, legal,
              client, incident, or personally identifying information unless
              you are authorized to process it and have assessed the security
              of your browser, device, downloads, and workplace procedures.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Data security
            </h2>

            <p className="mt-3">
              Browser-based processing reduces application-side collection of
              generator input, but no browser, device, network, download,
              transmission, or storage environment can be guaranteed to be
              completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Children&apos;s privacy
            </h2>

            <p className="mt-3">
              This website is intended for professional and business use and is
              not directed to children. The application does not provide user
              accounts or knowingly request information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Policy changes
            </h2>

            <p className="mt-3">
              This policy may be revised when application behavior, hosting,
              external services, or legal requirements change. The version
              published on this page describes the current website.
            </p>
          </section>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/methodology"
            className="inline-flex rounded-full bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
          >
            Read our methodology
          </Link>

          <Link
            href="/contact"
            className="inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
          >
            Report a website issue
          </Link>
        </div>
      </section>
    </main>
  );
}
