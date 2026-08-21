import Link from "next/link";
import { siteConfig } from "@/config/site";

const popularTools = [
  { href: "/tools/safety-plan-generator", label: "Safety Plan Generator" },
  { href: "/tools/incident-report-generator", label: "Incident Report Generator" },
  { href: "/tools/jha-generator", label: "JHA Generator" },
  { href: "/tools/trir-calculator", label: "TRIR Calculator" },
  { href: "/tools/ppe-checklist-generator", label: "PPE Checklist Generator" },
  { href: "/tools/toolbox-talk-generator", label: "Toolbox Talk Generator" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/methodology", label: "Methodology" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

const legalLinks = [
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/contractorsafetytools",
    icon: (
      <path d="M4.98 3.5a2.5 2.5 0 11-.02 5.001A2.5 2.5 0 014.98 3.5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05 4.02 0 4.76 2.65 4.76 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4z" />
    ),
  },
  {
    label: "X",
    href: "https://x.com/safetytoolshq",
    icon: (
      <path d="M18.9 3H21.7l-6.06 6.93L22.8 21h-5.6l-4.38-5.73L7.8 21H5l6.48-7.41L4.2 3h5.74l3.96 5.24zm-.98 16.2h1.55L7.15 4.72H5.5z" />
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/contractorsafetytools",
    icon: (
      <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/contractorsafetytools",
    icon: (
      <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.55.55.9 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.13s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43-.26.66-.6 1.21-1.15 1.76a4.9 4.9 0 01-1.76 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.13-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.76-1.15 4.9 4.9 0 01-1.15-1.76c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76A4.9 4.9 0 015.44 2.5c.64-.25 1.37-.42 2.43-.47C8.94 2 9.28 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.2A3.2 3.2 0 1112 8.8a3.2 3.2 0 010 6.4zm5.2-8.4a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@contractorsafetytools",
    icon: (
      <path d="M22.5 6.2a2.8 2.8 0 00-1.97-2C18.9 3.7 12 3.7 12 3.7s-6.9 0-8.53.5A2.8 2.8 0 001.5 6.2 29 29 0 001 12a29 29 0 00.5 5.8 2.8 2.8 0 001.97 2c1.63.5 8.53.5 8.53.5s6.9 0 8.53-.5a2.8 2.8 0 001.97-2A29 29 0 0023 12a29 29 0 00-.5-5.8zM9.75 15.5v-7l6 3.5z" />
    ),
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy-950 text-steel-200">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.1fr_0.9fr_0.7fr_0.7fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <svg viewBox="0 0 34 34" fill="none" className="h-7 w-7 flex-shrink-0">
              <path
                d="M17 2 L31 9 V17 C31 25 25 30 17 32 C9 30 3 25 3 17 V9 Z"
                fill="var(--orange-600)"
              />
              <path
                d="M11 17 L15 21 L23 12"
                stroke="#fff"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-display text-lg font-bold text-white">
              {siteConfig.name}
            </span>
          </Link>

          <p className="mt-4 max-w-xs text-sm leading-6 text-steel-400">
            Free browser-based contractor safety forms, inspection
            checklists, reports, and structured jobsite documentation tools
            built around OSHA recordkeeping structure.
          </p>

          <p className="mt-4 max-w-xs text-xs leading-5 text-steel-400">
            Generated documents are informational drafts only and do not
            replace qualified safety, legal, regulatory, medical, or
            project-specific guidance.
          </p>

          <ul className="mt-6 flex items-center gap-3" aria-label="Follow us on social media">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-steel-400 transition hover:border-orange-500 hover:text-orange-500"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    {social.icon}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Popular safety tools">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-steel-400">
            Popular Tools
          </h2>
          <ul className="mt-5 space-y-3.5 text-sm">
            {popularTools.map((tool) => (
              <li key={tool.href}>
                <Link
                  href={tool.href}
                  className="text-steel-200 transition hover:text-orange-500"
                >
                  {tool.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-steel-400">
            Company
          </h2>
          <ul className="mt-5 space-y-3.5 text-sm">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-steel-200 transition hover:text-orange-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-steel-400">
            Legal
          </h2>
          <ul className="mt-5 space-y-3.5 text-sm">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-steel-200 transition hover:text-orange-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/sitemap.xml"
                className="text-steel-200 transition hover:text-orange-500"
              >
                Sitemap
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-steel-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>

          <Link
            href="/tools"
            className="font-mono font-semibold text-steel-400 transition hover:text-orange-500"
          >
            Browse all safety tools →
          </Link>
        </div>
      </div>
    </footer>
  );
}
