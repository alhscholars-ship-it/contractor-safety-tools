import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/methodology", label: "Methodology" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-10 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <Link href="/" className="text-lg font-black text-white">
            Contractor Safety Form Tools
          </Link>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
            Free browser-based tools for contractor safety plans, toolbox talks,
            incident reports, job hazard analyses, and PPE checklists.
          </p>

          <p className="mt-4 max-w-xl text-xs leading-5 text-slate-400">
            Generated documents are informational drafts only and do not replace
            qualified safety, legal, regulatory, medical, or project-specific
            guidance.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-300">
            Website
          </h2>

          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-slate-400 transition hover:text-emerald-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Contractor Safety Form Tools.
          </p>

          <Link
            href="/tools"
            className="font-semibold text-slate-400 transition hover:text-emerald-300"
          >
            Browse all safety tools
          </Link>
        </div>
      </div>
    </footer>
  );
}
