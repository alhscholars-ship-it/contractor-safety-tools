import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Contractor Safety Form Tools privacy policy covering browser-based processing, cookies, analytics, third-party services, and user rights.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto w-full max-w-4xl px-6 py-20">
        <Link href="/" className="text-sm font-semibold text-emerald-300">
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
            This policy explains how Contractor Safety Form Tools handles
            information when you use this website.
          </p>
        </div>

        <div className="mt-12 space-y-8 text-base leading-8 text-slate-300">
          <section>
            <h2 className="text-2xl font-black text-white">
              Information entered into tools
            </h2>
            <p className="mt-3">
              Tool inputs are intended to be processed in your browser for the
              purpose of generating safety documentation. Users should avoid
              entering confidential, sensitive, medical, financial, or legally
              protected information unless they are authorized to do so.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Automatically collected information
            </h2>
            <p className="mt-3">
              Like most websites, technical information may be collected
              automatically, including browser type, device information,
              approximate location, referring pages, pages visited, and basic
              usage events. This information may be used for security,
              performance, troubleshooting, and product improvement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Cookies and similar technologies
            </h2>
            <p className="mt-3">
              Cookies or similar technologies may be used to support essential
              website functions, remember preferences, measure usage, and
              improve performance. Browser settings can usually be used to
              control or block cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Analytics and third-party services
            </h2>
            <p className="mt-3">
              Third-party hosting, analytics, security, or performance services
              may process limited technical information on our behalf. Their
              handling of information is governed by their own privacy terms and
              applicable data-protection obligations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Data retention
            </h2>
            <p className="mt-3">
              Information is retained only as long as reasonably necessary for
              operational, legal, security, and service-improvement purposes.
              Retention periods may vary depending on the type of information
              and the service provider involved.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Data security
            </h2>
            <p className="mt-3">
              Reasonable administrative and technical safeguards may be used to
              protect information. However, no internet transmission, browser
              environment, or storage system can be guaranteed to be completely
              secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Children&apos;s privacy
            </h2>
            <p className="mt-3">
              This website is intended for professional and business use and is
              not directed to children. We do not knowingly seek personal
              information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Your choices and rights
            </h2>
            <p className="mt-3">
              Depending on your location, you may have rights to request access,
              correction, deletion, restriction, or objection concerning
              personal information. You may also manage browser cookies and
              tracking preferences through your device or browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Policy updates
            </h2>
            <p className="mt-3">
              This policy may be updated as the website, legal requirements, or
              third-party services change. The current version published on this
              page applies to your use of the website.
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
            href="/disclaimer"
            className="inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
          >
            Read disclaimer
          </Link>
        </div>
      </section>
    </main>
  );
}
