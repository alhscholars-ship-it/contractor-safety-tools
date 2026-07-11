import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Read the Terms of Use for Contractor Safety Form Tools, including acceptable use, user responsibilities, intellectual property, and limitations.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsOfUsePage() {
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
            Terms of Use
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            These terms govern your use of Contractor Safety Form Tools and its
            browser-based generators.
          </p>
        </div>

        <div className="mt-12 space-y-8 text-base leading-8 text-slate-300">
          <section>
            <h2 className="text-2xl font-black text-white">
              Acceptance of terms
            </h2>
            <p className="mt-3">
              By accessing or using this website, you agree to these Terms of Use,
              the Privacy Policy, and the Disclaimer. If you do not agree, do not
              use the website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Permitted use
            </h2>
            <p className="mt-3">
              You may use the website for lawful business, educational, and
              internal documentation purposes. Generated content may be reviewed,
              adapted, downloaded, and used subject to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Prohibited use
            </h2>
            <p className="mt-3">
              You may not misuse the website, attempt unauthorized access,
              interfere with service operation, upload malicious content,
              violate applicable law, or use generated content in a deceptive,
              unsafe, or unlawful manner.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              User responsibility
            </h2>
            <p className="mt-3">
              You are responsible for the accuracy of information entered,
              reviewing generated documents, confirming applicable requirements,
              and obtaining qualified professional guidance where appropriate.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Intellectual property
            </h2>
            <p className="mt-3">
              The website design, source code, branding, written content, and
              original features are protected by applicable intellectual
              property laws. These terms do not transfer ownership of the
              website or its underlying materials.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Generated documents
            </h2>
            <p className="mt-3">
              Generated documents are provided as editable informational drafts.
              You are responsible for verifying, modifying, and approving them
              before operational or compliance use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Service availability
            </h2>
            <p className="mt-3">
              We may update, suspend, restrict, or discontinue any part of the
              website without notice. Continuous or error-free availability is
              not guaranteed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Limitation of liability
            </h2>
            <p className="mt-3">
              To the maximum extent permitted by law, Contractor Safety Form
              Tools is not liable for losses, claims, injuries, penalties,
              business interruption, data loss, or damages resulting from use of
              the website or generated content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white">
              Changes to these terms
            </h2>
            <p className="mt-3">
              These terms may be updated when the website, applicable laws, or
              service practices change. Continued use after publication of
              updated terms means you accept the revised terms.
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
            href="/privacy"
            className="inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
          >
            Read privacy policy
          </Link>
        </div>
      </section>
    </main>
  );
}
