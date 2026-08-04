import Link from "next/link";
import { siteConfig } from "@/config/site";

const primaryLinks = [
  {
    href: "/tools",
    label: "Safety Tools",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/faq",
    label: "FAQ",
  },
  {
    href: "/contact",
    label: "Contact",
  },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-white/10 bg-slate-950 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="w-fit text-lg font-black tracking-tight text-white transition hover:text-emerald-300"
        >
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary navigation">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold">
            {primaryLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-slate-300 transition hover:text-emerald-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
