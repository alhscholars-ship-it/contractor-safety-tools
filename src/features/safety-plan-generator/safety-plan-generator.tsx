"use client";

import { FormEvent, useMemo, useState } from "react";
import { ExportTextButton } from "@/components/export/export-text-button";
import { ExportPdfButton } from "@/components/export/export-pdf-button";
import { generateSafetyPlan, type SafetyPlanResult } from "./generate-safety-plan";

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

export function SafetyPlanGenerator() {
  const [companyName, setCompanyName] = useState("ABC Roofing");
  const [projectName, setProjectName] = useState("Warehouse Roof Repair");
  const [trade, setTrade] = useState("Roofing");
  const [jobsiteLocation, setJobsiteLocation] = useState("Dallas, Texas");
  const [primaryHazards, setPrimaryHazards] = useState("Falls\nHeat exposure\nPower tools");
  const [requiredPpe, setRequiredPpe] = useState("Hard hat\nSafety glasses\nFall protection");
  const [emergencyContact, setEmergencyContact] = useState("Site supervisor: 555-123-4567");
  const [error, setError] = useState("");
  const [result, setResult] = useState<SafetyPlanResult | null>(null);

  const previewInput = useMemo(
    () => ({
      companyName,
      projectName,
      trade,
      jobsiteLocation,
      primaryHazards: splitLines(primaryHazards),
      requiredPpe: splitLines(requiredPpe),
      emergencyContact,
    }),
    [
      companyName,
      emergencyContact,
      jobsiteLocation,
      primaryHazards,
      projectName,
      requiredPpe,
      trade,
    ],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const generated = generateSafetyPlan(previewInput);
      setResult(generated);
      setError("");
    } catch (caughtError) {
      setResult(null);
      setError(caughtError instanceof Error ? caughtError.message : "Unable to generate plan.");
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
      >
        <h2 className="text-2xl font-display font-black">Create your safety plan</h2>
        <p className="mt-2 text-sm leading-6 text-steel-200">
          Enter basic project details. The generator will format a practical safety
          plan outline you can review and adapt.
        </p>

        <div className="mt-6 grid gap-4">
          {[
            ["Company name", companyName, setCompanyName],
            ["Project name", projectName, setProjectName],
            ["Trade or work type", trade, setTrade],
            ["Jobsite location", jobsiteLocation, setJobsiteLocation],
            ["Emergency contact", emergencyContact, setEmergencyContact],
          ].map(([label, value, setter]) => (
            <label key={label as string} className="grid gap-2">
              <span className="text-sm font-bold text-slate-200">{label as string}</span>
              <input
                value={value as string}
                onChange={(event) =>
                  (setter as (nextValue: string) => void)(event.target.value)
                }
                className="rounded-2xl border border-white/10 bg-navy-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300"
              />
            </label>
          ))}

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-200">
              Primary hazards, one per line
            </span>
            <textarea
              value={primaryHazards}
              onChange={(event) => setPrimaryHazards(event.target.value)}
              rows={5}
              className="rounded-2xl border border-white/10 bg-navy-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-200">
              Required PPE, one per line
            </span>
            <textarea
              value={requiredPpe}
              onChange={(event) => setRequiredPpe(event.target.value)}
              rows={5}
              className="rounded-2xl border border-white/10 bg-navy-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300"
            />
          </label>
        </div>

        {error ? (
          <p className="mt-4 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-100">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-orange-600 px-6 py-3 text-sm font-display font-black text-slate-950 transition hover:bg-orange-500"
        >
          Generate Safety Plan
        </button>
      </form>

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="text-2xl font-display font-black">Generated safety plan</h2>

        {result ? (
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-xl font-display font-black text-orange-500">{result.title}</h3>
              <p className="mt-3 text-sm leading-6 text-steel-200">{result.summary}</p>
            </div>

            {result.sections.map((section) => (
              <div key={section.title} className="rounded-2xl bg-navy-950/70 p-5">
                <h3 className="font-display font-black">{section.title}</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-steel-200">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-4">
              <p className="text-xs leading-5 text-orange-100">{result.disclaimer}</p>
              <div className="flex flex-wrap gap-2">
                <ExportTextButton
                  fileName="safety-plan.txt"
                  title={result.title}
                  summary={result.summary}
                  sections={result.sections}
                  disclaimer={result.disclaimer}
                />
                <ExportPdfButton
                  fileName="safety-plan.pdf"
                  title={result.title}
                  summary={result.summary}
                  sections={result.sections}
                  disclaimer={result.disclaimer}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm leading-6 text-steel-200">
            Fill out the form and generate a safety plan draft. Your result will appear here.
          </p>
        )}
      </section>
    </div>
  );
}
