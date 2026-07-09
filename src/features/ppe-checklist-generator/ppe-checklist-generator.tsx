"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  generatePpeChecklist,
  type PpeChecklistResult,
} from "./generate-ppe-checklist";

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

export function PpeChecklistGenerator() {
  const [companyName, setCompanyName] = useState("ABC Construction");
  const [projectName, setProjectName] = useState("Warehouse Buildout");
  const [trade, setTrade] = useState("Roofing");
  const [jobsiteLocation, setJobsiteLocation] = useState("South roof area");
  const [taskName, setTaskName] = useState("Roof edge work");
  const [hazards, setHazards] = useState("Falls\nSharp materials\nHeat exposure");
  const [requiredPpe, setRequiredPpe] = useState(
    "Hard hat\nSafety glasses\nFall protection harness",
  );
  const [inspectionItems, setInspectionItems] = useState(
    "Harness condition\nLanyard connection\nHard hat shell condition",
  );
  const [supervisorName, setSupervisorName] = useState("David Clark");
  const [error, setError] = useState("");
  const [result, setResult] = useState<PpeChecklistResult | null>(null);

  const previewInput = useMemo(
    () => ({
      companyName,
      projectName,
      trade,
      jobsiteLocation,
      taskName,
      hazards: splitLines(hazards),
      requiredPpe: splitLines(requiredPpe),
      inspectionItems: splitLines(inspectionItems),
      supervisorName,
    }),
    [
      companyName,
      hazards,
      inspectionItems,
      jobsiteLocation,
      projectName,
      requiredPpe,
      supervisorName,
      taskName,
      trade,
    ],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const generated = generatePpeChecklist(previewInput);
      setResult(generated);
      setError("");
    } catch (caughtError) {
      setResult(null);
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to generate PPE checklist.",
      );
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
      >
        <h2 className="text-2xl font-black">Create your PPE checklist</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Enter the trade, task, hazards, PPE, and inspection items. The generator
          will format a practical pre-task PPE checklist.
        </p>

        <div className="mt-6 grid gap-4">
          {[
            ["Company name", companyName, setCompanyName],
            ["Project name", projectName, setProjectName],
            ["Trade", trade, setTrade],
            ["Jobsite location", jobsiteLocation, setJobsiteLocation],
            ["Task name", taskName, setTaskName],
            ["Supervisor name", supervisorName, setSupervisorName],
          ].map(([label, value, setter]) => (
            <label key={label as string} className="grid gap-2">
              <span className="text-sm font-bold text-slate-200">{label as string}</span>
              <input
                value={value as string}
                onChange={(event) =>
                  (setter as (nextValue: string) => void)(event.target.value)
                }
                className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300"
              />
            </label>
          ))}

          {[
            ["Hazards, one per line", hazards, setHazards],
            ["Required PPE, one per line", requiredPpe, setRequiredPpe],
            ["Inspection items, one per line", inspectionItems, setInspectionItems],
          ].map(([label, value, setter]) => (
            <label key={label as string} className="grid gap-2">
              <span className="text-sm font-bold text-slate-200">{label as string}</span>
              <textarea
                value={value as string}
                onChange={(event) =>
                  (setter as (nextValue: string) => void)(event.target.value)
                }
                rows={4}
                className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300"
              />
            </label>
          ))}
        </div>

        {error ? (
          <p className="mt-4 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-100">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
        >
          Generate PPE Checklist
        </button>
      </form>

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="text-2xl font-black">Generated PPE checklist</h2>

        {result ? (
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-xl font-black text-emerald-200">{result.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{result.summary}</p>
            </div>

            {result.sections.map((section) => (
              <div key={section.title} className="rounded-2xl bg-slate-950/70 p-5">
                <h3 className="font-black">{section.title}</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            <p className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-xs leading-5 text-amber-100">
              {result.disclaimer}
            </p>
          </div>
        ) : (
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Fill out the form and generate a PPE checklist draft. Your result will appear here.
          </p>
        )}
      </section>
    </div>
  );
}
