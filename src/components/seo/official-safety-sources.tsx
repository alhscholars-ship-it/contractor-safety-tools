import {
  officialSafetySourcesByTool,
  type OfficialSafetySourceToolSlug,
} from "@/data/official-safety-sources";

type OfficialSafetySourcesProps = {
  toolSlug: OfficialSafetySourceToolSlug;
};

export function OfficialSafetySources({
  toolSlug,
}: OfficialSafetySourcesProps) {
  const sources = officialSafetySourcesByTool[toolSlug];
  const headingId = `official-safety-sources-${toolSlug}`;

  return (
    <section
      aria-labelledby={headingId}
      className="mt-16 rounded-3xl border border-emerald-300/20 bg-emerald-300/[0.05] p-7"
    >
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
        Primary references
      </p>

      <h2
        id={headingId}
        className="mt-3 text-3xl font-black tracking-tight"
      >
        Official safety sources
      </h2>

      <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
        Review these primary OSHA resources alongside current state-plan,
        local, project, manufacturer, employer, and qualified-professional
        requirements that apply to the work.
      </p>

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {sources.map((source) => (
          <article
            key={source.url}
            className="rounded-2xl border border-white/10 bg-slate-950/60 p-5"
          >
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer noopener"
              className="font-black text-emerald-200 underline decoration-emerald-300/40 underline-offset-4 transition hover:text-emerald-100"
            >
              {source.title}
            </a>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              {source.description}
            </p>
          </article>
        ))}
      </div>

      <p className="mt-6 text-xs leading-5 text-slate-400">
        External references are provided for research and verification.
        Their inclusion does not make a generated document compliant,
        approved, certified, or complete for a particular workplace.
      </p>
    </section>
  );
}
