import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/content/page-hero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read how Contractor Safety Tools processes generator input in the browser, creates downloads, handles technical requests, and links to external services.",
  alternates: {
    canonical: "/privacy",
  },
};

const sections = [
  {
    title: "Generator input processing",
    body: "Tool input is processed in your browser to create a document draft. The current application has no user accounts, form-submission API, or application database that receives generator entries.",
  },
  {
    title: "TXT and PDF downloads",
    body: "TXT and PDF exports are generated through the browser download process. After a file is saved, its storage, retention, sharing, backup, and deletion are controlled by your browser, device, and any storage service you choose to use.",
  },
  {
    title: "Website request data",
    body: "Hosting, network, and security providers may process standard request information needed to deliver and protect the website, such as an IP address, requested page, request time, browser identifier, and error or security event data. This technical request data is separate from generator field input.",
  },
  {
    title: "Cookies, analytics, and advertising",
    body: "The current application source does not include an analytics SDK, advertising tracker, or application code that stores generator input in cookies, localStorage, or sessionStorage.",
  },
  {
    title: "External links and services",
    body: "The website links to external resources, including OSHA pages and the public GitHub issue tracker. When you follow an external link, the destination service receives the request and applies its own privacy, security, account, and retention practices.",
  },
  {
    title: "Data retention",
    body: "Because generator entries are not submitted to an application backend, we do not retain them in an application database. Hosting, network, or security providers may retain technical request logs according to their operational and legal requirements.",
  },
  {
    title: "Sensitive information",
    body: "Do not enter confidential employee, medical, financial, legal, client, incident, or personally identifying information unless you are authorized to process it and have assessed the security of your browser, device, downloads, and workplace procedures.",
  },
  {
    title: "Data security",
    body: "Browser-based processing reduces application-side collection of generator input, but no browser, device, network, download, transmission, or storage environment can be guaranteed to be completely secure.",
  },
  {
    title: "Children's privacy",
    body: "This website is intended for professional and business use and is not directed to children. The application does not provide user accounts or knowingly request information from children.",
  },
  {
    title: "Policy changes",
    body: "This policy may be revised when application behavior, hosting, external services, or legal requirements change. The version published on this page describes the current website.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-paper">
      <PageHero
        eyebrow="Privacy"
        title="Privacy Policy"
        lede="This policy describes the current application's data flow, browser-based document generation, downloads, technical requests, and external links."
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
              href="/methodology"
              className="inline-flex rounded-[3px] border border-orange-600 bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
            >
              Read our methodology →
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-[3px] border border-navy-800 px-6 py-3 text-sm font-semibold text-navy-950 transition hover:border-orange-500 hover:text-orange-600"
            >
              Report a website issue
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
