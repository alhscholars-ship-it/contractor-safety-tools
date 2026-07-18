"use client";

import { FormEvent, useMemo, useState } from "react";
import { ExportPdfButton } from "@/components/export/export-pdf-button";
import { ExportTextButton } from "@/components/export/export-text-button";
import {
  generateDailyJobsiteSafetyInspection,
  type DailyJobsiteSafetyInspectionResult,
} from "./generate-daily-jobsite-safety-inspection";

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

export function DailyJobsiteSafetyInspectionGenerator() {
  const [companyName, setCompanyName] = useState("Summit Contractors");
  const [projectName, setProjectName] = useState(
    "Central Office Renovation",
  );
  const [jobsiteLocation, setJobsiteLocation] =
    useState("100 Main Street");
  const [inspectionDate, setInspectionDate] = useState("2026-07-17");
  const [inspectorName, setInspectorName] = useState("Jordan Lee");
  const [weatherConditions, setWeatherConditions] =
    useState("Clear and dry");
  const [followUpDate, setFollowUpDate] = useState("2026-07-18");

  const [activeTrades, setActiveTrades] = useState(
    "Electrical\nCarpentry\nDrywall",
  );
  const [inspectionAreas, setInspectionAreas] = useState(
    "Access and egress routes\nHousekeeping and material storage\nFall protection systems\nElectrical cords and temporary power\nLadders and scaffolds",
  );
  const [observedHazards, setObservedHazards] = useState(
    "Extension cord crossing an access route\nUnsecured materials stored near an elevated edge",
  );
  const [correctiveActions, setCorrectiveActions] = useState(
    "Reroute or protect the extension cord\nRelocate and secure stored materials",
  );
  const [responsiblePersons, setResponsiblePersons] = useState(
    "Electrical foreperson\nSite superintendent",
  );

  const [error, setError] = useState("");
  const [result, setResult] =
    useState<DailyJobsiteSafetyInspectionResult | null>(null);

  const previewInput = useMemo(
    () => ({
      companyName,
      projectName,
      jobsiteLocation,
      inspectionDate,
      inspectorName,
      weatherConditions,
      activeTrades: splitLines(activeTrades),
      inspectionAreas: splitLines(inspectionAreas),
      observedHazards: splitLines(observedHazards),
      correctiveActions: splitLines(correctiveActions),
      responsiblePersons: splitLines(responsiblePersons),
      followUpDate,
    }),
    [
      activeTrades,
      companyName,
      correctiveActions,
      followUpDate,
      inspectionAreas,
      inspectionDate,
      inspectorName,
      jobsiteLocation,
      observedHazards,
      projectName,
      responsiblePersons,
      weatherConditions,
    ],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const generated =
        generateDailyJobsiteSafetyInspection(previewInput);

      setResult(generated);
      setError("");
    } catch (caughtError) {
      setResult(null);
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to generate the daily jobsite safety inspection.",
      );
    }
  }

  const textFields = [
    {
      label: "Company name",
      value: companyName,
      setter: setCompanyName,
      type: "text",
    },
    {
      label: "Project name",
      value: projectName,
      setter: setProjectName,
      type: "text",
    },
    {
      label: "Jobsite location",
      value: jobsiteLocation,
      setter: setJobsiteLocation,
      type: "text",
    },
    {
      label: "Inspection date",
      value: inspectionDate,
      setter: setInspectionDate,
      type: "date",
    },
    {
      label: "Inspector name",
      value: inspectorName,
      setter: setInspectorName,
      type: "text",
    },
    {
      label: "Weather conditions",
      value: weatherConditions,
      setter: setWeatherConditions,
      type: "text",
    },
    {
      label: "Corrective-action follow-up date",
      value: followUpDate,
      setter: setFollowUpDate,
      type: "date",
    },
  ];

  const listFields = [
    {
      label: "Active trades or crews, one per line",
      value: activeTrades,
      setter: setActiveTrades,
      rows: 4,
    },
    {
      label: "Jobsite areas to inspect, one per line",
      value: inspectionAreas,
      setter: setInspectionAreas,
      rows: 6,
    },
    {
      label: "Observed hazards or deficiencies, one per line",
      value: observedHazards,
      setter: setObservedHazards,
      rows: 5,
    },
    {
      label: "Required corrective actions, one per line",
      value: correctiveActions,
      setter: setCorrectiveActions,
      rows: 5,
    },
    {
      label: "Responsible persons, one per line",
      value: responsiblePersons,
      setter: setResponsiblePersons,
      rows: 4,
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
      >
        <h2 className="text-2xl font-black">
          Create your daily jobsite safety inspection
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-300">
          Enter project details, active trades, inspection areas, observed
          hazards, corrective actions, and follow-up ownership. The generator
          will organize the information into a downloadable daily inspection
          draft.
        </p>

        <div className="mt-6 grid gap-4">
          {textFields.map((field) => (
            <label key={field.label} className="grid gap-2">
              <span className="text-sm font-bold text-slate-200">
                {field.label}
              </span>

              <input
                type={field.type}
                value={field.value}
                onChange={(event) => field.setter(event.target.value)}
                className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300"
              />
            </label>
          ))}

          {listFields.map((field) => (
            <label key={field.label} className="grid gap-2">
              <span className="text-sm font-bold text-slate-200">
                {field.label}
              </span>

              <textarea
                value={field.value}
                onChange={(event) => field.setter(event.target.value)}
                rows={field.rows}
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
          Generate Daily Inspection
        </button>
      </form>

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="text-2xl font-black">
          Generated daily jobsite safety inspection
        </h2>

        {result ? (
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-xl font-black text-emerald-200">
                {result.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                {result.summary}
              </p>
            </div>

            {result.sections.map((section) => (
              <div
                key={section.title}
                className="rounded-2xl bg-slate-950/70 p-5"
              >
                <h3 className="font-black">{section.title}</h3>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
              <p className="text-xs leading-5 text-amber-100">
                {result.disclaimer}
              </p>

              <div className="flex flex-wrap gap-2">
                <ExportTextButton
                  fileName="daily-jobsite-safety-inspection.txt"
                  title={result.title}
                  summary={result.summary}
                  sections={result.sections}
                  disclaimer={result.disclaimer}
                />

                <ExportPdfButton
                  fileName="daily-jobsite-safety-inspection.pdf"
                  title={result.title}
                  summary={result.summary}
                  sections={result.sections}
                  disclaimer={result.disclaimer}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Form complete karke daily inspection generate karein. Generated
            result yahan display hoga.
          </p>
        )}
      </section>
    </div>
  );
}
