"use client";

import { FormEvent, useState } from "react";
import { ExportTextButton } from "@/components/export/export-text-button";
import { ExportPdfButton } from "@/components/export/export-pdf-button";
import {
  generateOshaInspectionChecklist,
  type OshaInspectionChecklistResult,
} from "./generate-osha-inspection-checklist";

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

export function OshaInspectionChecklistGenerator() {
  const [companyName, setCompanyName] = useState("ABC Construction");
  const [projectName, setProjectName] = useState("Commercial Building Project");
  const [siteLocation, setSiteLocation] = useState("Main Jobsite");
  const [inspectionType, setInspectionType] = useState("Weekly Safety Inspection");
  const [inspectorName, setInspectorName] = useState("Safety Supervisor");
  const [areas, setAreas] = useState(
    "Fall protection\nElectrical systems\nHousekeeping\nEquipment safety",
  );

  const [result, setResult] =
    useState<OshaInspectionChecklistResult | null>(null);

  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const generated = generateOshaInspectionChecklist({
        companyName,
        projectName,
        siteLocation,
        inspectionType,
        inspectorName,
        areas: splitLines(areas),
      });

      setResult(generated);
      setError("");
    } catch (caughtError) {
      setResult(null);

      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to generate checklist.",
      );
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
      >
        <h2 className="text-2xl font-black">
          Create OSHA inspection checklist
        </h2>

        <div className="mt-6 grid gap-4">
          {[
            ["Company name", companyName, setCompanyName],
            ["Project name", projectName, setProjectName],
            ["Site location", siteLocation, setSiteLocation],
            ["Inspection type", inspectionType, setInspectionType],
            ["Inspector name", inspectorName, setInspectorName],
          ].map(([label, value, setter]) => (
            <label key={label as string} className="grid gap-2">
              <span className="text-sm font-bold text-slate-200">
                {label as string}
              </span>

              <input
                value={value as string}
                onChange={(event) =>
                  (setter as (value: string) => void)(
                    event.target.value,
                  )
                }
                className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white"
              />
            </label>
          ))}

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-200">
              Inspection areas (one per line)
            </span>

            <textarea
              value={areas}
              onChange={(event) => setAreas(event.target.value)}
              rows={5}
              className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white"
            />
          </label>
        </div>

        {error && (
          <p className="mt-4 rounded-2xl bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-emerald-400 px-6 py-3 font-black text-slate-950"
        >
          Generate Inspection Checklist
        </button>
      </form>


      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="text-2xl font-black">
          Generated checklist
        </h2>

        {result ? (
          <div className="mt-6 space-y-6">
            <h3 className="text-xl font-black text-emerald-200">
              {result.title}
            </h3>

            <p className="text-sm text-slate-300">
              {result.summary}
            </p>

            {result.sections.map((section) => (
              <div
                key={section.title}
                className="rounded-2xl bg-slate-950/70 p-5"
              >
                <h4 className="font-black">
                  {section.title}
                </h4>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex flex-wrap gap-3">
              <ExportTextButton
                fileName="osha-inspection-checklist.txt"
                title={result.title}
                summary={result.summary}
                sections={result.sections}
                disclaimer={result.disclaimer}
              />

              <ExportPdfButton
                fileName="osha-inspection-checklist.pdf"
                title={result.title}
                summary={result.summary}
                sections={result.sections}
                disclaimer={result.disclaimer}
              />
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-300">
            Generate your checklist to preview it here.
          </p>
        )}
      </section>
    </div>
  );
}
