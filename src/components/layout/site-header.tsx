import Link from "next/link";
import { siteConfig } from "@/config/site";

const primaryLinks = [
  { href: "/tools", label: "Safety Tools" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex w-fit items-center gap-2.5">
          <svg viewBox="0 0 34 34" fill="none" className="h-8 w-8 flex-shrink-0">
            <path
              d="M17 2 L31 9 V17 C31 25 25 30 17 32 C9 30 3 25 3 17 V9 Z"
              fill="var(--orange-600)"
              stroke="var(--navy-950)"
              strokeWidth="1.5"
            />
            <path
              d="M11 17 L15 21 L23 12"
              stroke="#fff"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-display text-base font-bold leading-tight tracking-tight text-white">
            {siteConfig.name}
            <span className="mt-0.5 block font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-steel-400">
              Jobsite Documentation
            </span>
          </span>
        </Link>

        <nav aria-label="Primary navigation">
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-medium">
            {primaryLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="border-b-2 border-transparent pb-1 text-steel-200 transition hover:border-orange-500 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/tools"
          className="inline-flex w-fit items-center gap-2 rounded-[3px] border border-orange-600 bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-500"
        >
          Browse Tools →
        </Link>
      </div>
    </header>
  );
}
