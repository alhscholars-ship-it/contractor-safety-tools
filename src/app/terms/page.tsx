import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/content/page-hero";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Read the Terms of Use for Contractor Safety Tools, including acceptable use, user responsibilities, intellectual property, and limitations.",
  alternates: {
    canonical: "/terms",
  },
};

const sections = [
  {
    title: "Acceptance of terms",
    body: "By accessing or using this website, you agree to these Terms of Use, the Privacy Policy, and the Disclaimer. If you do not agree, do not use the website.",
  },
  {
    title: "Permitted use",
    body: "You may use the website for lawful business, educational, and internal documentation purposes. Generated content may be reviewed, adapted, downloaded, and used subject to these terms.",
  },
  {
    title: "Prohibited use",
    body: "You may not misuse the website, attempt unauthorized access, interfere with service operation, upload malicious content, violate applicable law, or use generated content in a deceptive, unsafe, or unlawful manner.",
  },
  {
    title: "User responsibility",
    body: "You are responsible for the accuracy of information entered, reviewing generated documents, confirming applicable requirements, and obtaining qualified professional guidance where appropriate.",
  },
  {
    title: "Intellectual property",
    body: "The website design, source code, branding, written content, and original features are protected by applicable intellectual property laws. These terms do not transfer ownership of the website or its underlying materials.",
  },
  {
    title: "Generated documents",
    body: "Generated documents are provided as editable informational drafts. You are responsible for verifying, modifying, and approving them before operational or compliance use.",
  },
  {
    title: "Service availability",
    body: "We may update, suspend, restrict, or discontinue any part of the website without notice. Continuous or error-free availability is not guaranteed.",
  },
  {
    title: "Limitation of liability",
    body: "To the maximum extent permitted by law, Contractor Safety Tools is not liable for losses, claims, injuries, penalties, business interruption, data loss, or damages resulting from use of the website or generated content.",
  },
  {
    title: "Changes to these terms",
    body: "These terms may be updated when the website, applicable laws, or service practices change. Continued use after publication of updated terms means you accept the revised terms.",
  },
];

export default function TermsOfUsePage() {
  return (
    <main className="bg-paper">
      <PageHero
        eyebrow="Legal Information"
        title="Terms of Use"
        lede="These terms govern your use of Contractor Safety Tools and its browser-based generators."
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
              href="/privacy"
              className="inline-flex rounded-[3px] border border-navy-800 px-6 py-3 text-sm font-semibold text-navy-950 transition hover:border-orange-500 hover:text-orange-600"
            >
              Read privacy policy
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
