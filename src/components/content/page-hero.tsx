import Link from "next/link";

export function PageHero({
  eyebrow,
  title,
  lede,
  backHref = "/",
  backLabel = "Back to home",
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <section className="bg-navy-950 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-4xl px-6">
        <Link
          href={backHref}
          className="font-mono text-xs font-semibold text-steel-400 transition hover:text-orange-500"
        >
          ← {backLabel}
        </Link>

        <div className="mt-6">
          <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">
            <span className="inline-block h-[2px] w-3.5 bg-orange-500" />
            {eyebrow}
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          {lede ? (
            <p className="mt-6 max-w-2xl text-base leading-7 text-steel-200 sm:text-lg">
              {lede}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
