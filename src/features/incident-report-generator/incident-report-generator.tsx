"use client";

import { FormEvent, useMemo, useState } from "react";
import { ExportTextButton } from "@/components/export/export-text-button";
import { ExportPdfButton } from "@/components/export/export-pdf-button";
import {
  generateIncidentReport,
  type IncidentReportResult,
} from "./generate-incident-report";

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

export function IncidentReportGenerator() {
  const [companyName, setCompanyName] = useState("ABC Construction");
  const [projectName, setProjectName] = useState("Warehouse Buildout");
  const [incidentDate, setIncidentDate] = useState("2026-07-09");
  const [incidentLocation, setIncidentLocation] = useState("North loading dock");
  const [incidentType, setIncidentType] = useState("Near Miss");
  const [description, setDescription] = useState(
    "A pallet was dropped near the pedestrian walkway without injury.",
  );
  const [peopleInvolved, setPeopleInvolved] = useState("John Smith\nMaria Lopez");
  const [witnesses, setWitnesses] = useState("Site foreman");
  const [immediateActions, setImmediateActions] = useState(
    "Stopped nearby work\nBlocked the walkway",
  );
  const [correctiveActions, setCorrectiveActions] = useState(
    "Review material handling procedure\nRefresh spotter requirements",
  );
  const [supervisorName, setSupervisorName] = useState("David Clark");
  const [error, setError] = useState("");
  const [result, setResult] = useState<IncidentReportResult | null>(null);

  const previewInput = useMemo(
    () => ({
      companyName,
      projectName,
      incidentDate,
      incidentLocation,
      incidentType,
      description,
      peopleInvolved: splitLines(peopleInvolved),
      witnesses: splitLines(witnesses),
      immediateActions: splitLines(immediateActions),
      correctiveActions: splitLines(correctiveActions),
      supervisorName,
    }),
    [
      companyName,
      correctiveActions,
      description,
      immediateActions,
      incidentDate,
      incidentLocation,
      incidentType,
      peopleInvolved,
      projectName,
      supervisorName,
      witnesses,
    ],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const generated = generateIncidentReport(previewInput);
      setResult(generated);
      setError("");
    } catch (caughtError) {
      setResult(null);
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to generate incident report.",
      );
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
      >
        <h2 className="text-2xl font-display font-black">Create your incident report</h2>
        <p className="mt-2 text-sm leading-6 text-steel-200">
          Enter event details, involved people, immediate actions, and corrective
          actions. The generator will format a structured report draft.
        </p>

        <div className="mt-6 grid gap-4">
          {[
            ["Company name", companyName, setCompanyName],
            ["Project name", projectName, setProjectName],
            ["Incident date", incidentDate, setIncidentDate],
            ["Incident location", incidentLocation, setIncidentLocation],
            ["Incident type", incidentType, setIncidentType],
            ["Supervisor name", supervisorName, setSupervisorName],
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
              Incident description
            </span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              className="rounded-2xl border border-white/10 bg-navy-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300"
            />
          </label>

          {[
            ["People involved, one per line", peopleInvolved, setPeopleInvolved],
            ["Witnesses, one per line", witnesses, setWitnesses],
            ["Immediate actions, one per line", immediateActions, setImmediateActions],
            ["Corrective actions, one per line", correctiveActions, setCorrectiveActions],
          ].map(([label, value, setter]) => (
            <label key={label as string} className="grid gap-2">
              <span className="text-sm font-bold text-slate-200">{label as string}</span>
              <textarea
                value={value as string}
                onChange={(event) =>
                  (setter as (nextValue: string) => void)(event.target.value)
                }
                rows={4}
                className="rounded-2xl border border-white/10 bg-navy-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300"
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
          className="mt-6 w-full rounded-full bg-orange-600 px-6 py-3 text-sm font-display font-black text-slate-950 transition hover:bg-orange-500"
        >
          Generate Incident Report
        </button>
      </form>

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="text-2xl font-display font-black">Generated incident report</h2>

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
                  fileName="incident-report.txt"
                  title={result.title}
                  summary={result.summary}
                  sections={result.sections}
                  disclaimer={result.disclaimer}
                />
                <ExportPdfButton
                  fileName="incident-report.pdf"
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
            Fill out the form and generate an incident report draft. Your result will appear here.
          </p>
        )}
      </section>
    </div>
  );
}
