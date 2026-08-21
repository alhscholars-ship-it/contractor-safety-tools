import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] bg-navy-950 text-white">
      <section className="mx-auto flex w-full max-w-4xl flex-col px-6 py-20 sm:py-28">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
          Error 404
        </p>

        <h1 className="mt-4 text-4xl font-display font-black tracking-tight sm:text-6xl">
          Page not found.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-steel-200">
          The page you requested does not exist or may have moved. Browse the
          contractor safety tool library or return to the homepage.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/tools"
            className="rounded-full bg-orange-600 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-orange-500"
          >
            Browse Safety Tools
          </Link>

          <Link
            href="/"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Return Home
          </Link>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <h2 className="text-lg font-bold">
            Popular contractor safety tools
          </h2>

          <ul className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <li>
              <Link
                href="/tools/safety-plan-generator"
                className="text-steel-200 transition hover:text-orange-500"
              >
                Safety Plan Generator
              </Link>
            </li>

            <li>
              <Link
                href="/tools/jha-generator"
                className="text-steel-200 transition hover:text-orange-500"
              >
                JHA Generator
              </Link>
            </li>

            <li>
              <Link
                href="/tools/toolbox-talk-generator"
                className="text-steel-200 transition hover:text-orange-500"
              >
                Toolbox Talk Generator
              </Link>
            </li>

            <li>
              <Link
                href="/tools/incident-report-generator"
                className="text-steel-200 transition hover:text-orange-500"
              >
                Incident Report Generator
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
