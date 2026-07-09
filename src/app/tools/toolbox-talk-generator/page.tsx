import type { Metadata } from "next";
import Link from "next/link";
import { ToolboxTalkGenerator } from "@/features/toolbox-talk-generator/toolbox-talk-generator";
import { createToolJsonLd } from "@/lib/seo/json-ld";

const toolJsonLd = createToolJsonLd({
  name: "Toolbox Talk Generator",
  description:
    "Generate contractor toolbox talk outlines for construction safety meetings, jobsite hazards, crew reminders, and attendance documentation.",
  url: "/tools/toolbox-talk-generator",
  keywords: ['toolbox talk generator', 'construction toolbox talks', 'safety meeting template'],
});

export const metadata: Metadata = {
  title: "Toolbox Talk Generator",
  description:
    "Generate contractor toolbox talk outlines for construction safety meetings, jobsite hazards, crew reminders, and attendance documentation.",
  alternates: {
    canonical: "/tools/toolbox-talk-generator",
  },
};

export default function ToolboxTalkGeneratorPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <Link href="/tools" className="text-sm font-semibold text-emerald-300">
          ← Back to tools
        </Link>

        <div className="mt-8 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Toolbox Talks
          </p>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            Toolbox Talk Generator for Construction Safety Meetings
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Create practical toolbox talk outlines for jobsite hazards, safety reminders,
            crew discussion points, and meeting documentation.
          </p>
        </div>

        <div className="mt-12">
          <ToolboxTalkGenerator />
        </div>
      </section>
    </main>
  );
}
