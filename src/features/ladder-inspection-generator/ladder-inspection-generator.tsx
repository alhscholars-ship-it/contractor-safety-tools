"use client";

import { FormEvent, useMemo, useState } from "react";
import { ExportPdfButton } from "@/components/export/export-pdf-button";
import { ExportTextButton } from "@/components/export/export-text-button";
import {
  generateLadderInspection,
  type LadderInspectionResult,
} from "./generate-ladder-inspection";

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

export function LadderInspectionGenerator() {
  const [companyName, setCompanyName] = useState("Summit Contractors");
  const [projectName, setProjectName] = useState("Warehouse Expansion");
  const [inspectionDate, setInspectionDate] = useState("2026-07-17");
  const [inspectorName, setInspectorName] = useState("Jordan Lee");
  const [ladderId, setLadderId] = useState("LAD-014");
  const [ladderType, setLadderType] = useState("Extension ladder");
  const [ladderMaterial, setLadderMaterial] = useState("Fiberglass");
  const [ladderLocation, setLadderLocation] = useState(
    "North loading area",
  );
  const [manufacturer, setManufacturer] = useState("SafeClimb");
  const [dutyRating, setDutyRating] = useState("Type IA - 300 lb");
  const [overallCondition, setOverallCondition] =
    useState("Serviceable");
  const [railsCondition, setRailsCondition] = useState(
    "No cracks, bends, splits, or corrosion",
  );
  const [rungsCondition, setRungsCondition] = useState(
    "Clean, secure, evenly spaced, and undamaged",
  );
  const [feetCondition, setFeetCondition] = useState(
    "Slip-resistant feet are intact and secure",
  );
  const [hardwareCondition, setHardwareCondition] = useState(
    "Locks, spreaders, rope, pulleys, and fasteners operate correctly",
  );
  const [labelsCondition, setLabelsCondition] = useState(
    "Safety labels and duty-rating markings are legible",
  );
  const [setupCondition, setSetupCondition] = useState(
    "Ladder is positioned on a stable surface at the correct angle",
  );
  const [defectsFound, setDefectsFound] = useState(
    [
      "Minor dirt on lower rungs",
      "Inspection tag is worn and difficult to read",
    ].join("\n"),
  );
  const [correctiveActions, setCorrectiveActions] = useState(
    [
      "Clean all rungs before the ladder is used",
      "Replace the worn inspection tag",
    ].join("\n"),
  );
  const [responsiblePersons, setResponsiblePersons] = useState(
    ["Site supervisor", "Equipment coordinator"].join("\n"),
  );
  const [nextInspectionDate, setNextInspectionDate] =
    useState("2026-08-17");

  const [error, setError] = useState("");
  const [result, setResult] =
    useState<LadderInspectionResult | null>(null);

  const previewInput = useMemo(
    () => ({
      companyName,
      projectName,
      inspectionDate,
      inspectorName,
      ladderId,
      ladderType,
      ladderMaterial,
      ladderLocation,
      manufacturer,
      dutyRating,
      overallCondition,
      railsCondition,
      rungsCondition,
      feetCondition,
      hardwareCondition,
      labelsCondition,
      setupCondition,
      defectsFound: splitLines(defectsFound),
      correctiveActions: splitLines(correctiveActions),
      responsiblePersons: splitLines(responsiblePersons),
      nextInspectionDate,
    }),
    [
      companyName,
      correctiveActions,
      defectsFound,
      dutyRating,
      feetCondition,
      hardwareCondition,
      inspectionDate,
      inspectorName,
      labelsCondition,
      ladderId,
      ladderLocation,
      ladderMaterial,
      ladderType,
      manufacturer,
      nextInspectionDate,
      overallCondition,
      projectName,
      railsCondition,
      responsiblePersons,
      rungsCondition,
      setupCondition,
    ],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const generated = generateLadderInspection(previewInput);

      setResult(generated);
      setError("");
    } catch (caughtError) {
      setResult(null);
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to generate the ladder inspection.",
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
      label: "Project or facility name",
      value: projectName,
      setter: setProjectName,
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
      label: "Ladder ID or asset number",
      value: ladderId,
      setter: setLadderId,
      type: "text",
    },
    {
      label: "Ladder type",
      value: ladderType,
      setter: setLadderType,
      type: "text",
    },
    {
      label: "Ladder material",
      value: ladderMaterial,
      setter: setLadderMaterial,
      type: "text",
    },
    {
      label: "Current ladder location",
      value: ladderLocation,
      setter: setLadderLocation,
      type: "text",
    },
    {
      label: "Manufacturer",
      value: manufacturer,
      setter: setManufacturer,
      type: "text",
    },
    {
      label: "Duty rating",
      value: dutyRating,
      setter: setDutyRating,
      type: "text",
    },
    {
      label: "Overall condition",
      value: overallCondition,
      setter: setOverallCondition,
      type: "text",
    },
    {
      label: "Side rails condition",
      value: railsCondition,
      setter: setRailsCondition,
      type: "text",
    },
    {
      label: "Rungs or steps condition",
      value: rungsCondition,
      setter: setRungsCondition,
      type: "text",
    },
    {
      label: "Feet and slip-resistant surfaces",
      value: feetCondition,
      setter: setFeetCondition,
      type: "text",
    },
    {
      label: "Hardware and locking components",
      value: hardwareCondition,
      setter: setHardwareCondition,
      type: "text",
    },
    {
      label: "Labels and warnings condition",
      value: labelsCondition,
      setter: setLabelsCondition,
      type: "text",
    },
    {
      label: "Setup and placement condition",
      value: setupCondition,
      setter: setSetupCondition,
      type: "text",
    },
    {
      label: "Next inspection date",
      value: nextInspectionDate,
      setter: setNextInspectionDate,
      type: "date",
    },
  ];

  const listFields = [
    {
      label: "Defects or inspection findings, one per line",
      value: defectsFound,
      setter: setDefectsFound,
      rows: 5,
    },
    {
      label: "Corrective actions, one per line",
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

  const exportSections =
    result?.sections.map((section) => ({
      title: section.heading,
      items: section.content.split("\n").filter(Boolean),
    })) ?? [];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
      >
        <h2 className="text-2xl font-display font-black">
          Create your ladder inspection
        </h2>

        <p className="mt-2 text-sm leading-6 text-steel-200">
          Enter the ladder identity, duty rating, physical condition,
          setup findings, defects, corrective actions, and follow-up
          details.
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
                className="rounded-2xl border border-white/10 bg-navy-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300"
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
          Generate Ladder Inspection
        </button>
      </form>

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="text-2xl font-display font-black">
          Generated ladder inspection
        </h2>

        {result ? (
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-xl font-display font-black text-orange-500">
                {result.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-steel-200">
                {result.summary}
              </p>
            </div>

            {result.sections.map((section) => (
              <div
                key={section.heading}
                className="rounded-2xl bg-navy-950/70 p-5"
              >
                <h3 className="font-display font-black">{section.heading}</h3>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-steel-200">
                  {section.content
                    .split("\n")
                    .filter(Boolean)
                    .map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                </ul>
              </div>
            ))}

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-4">
              <p className="text-xs leading-5 text-orange-100">
                {result.disclaimer}
              </p>

              <div className="flex flex-wrap gap-2">
                <ExportTextButton
                  fileName="ladder-inspection-checklist.txt"
                  title={result.title}
                  summary={result.summary}
                  sections={exportSections}
                  disclaimer={result.disclaimer}
                />

                <ExportPdfButton
                  fileName="ladder-inspection-checklist.pdf"
                  title={result.title}
                  summary={result.summary}
                  sections={exportSections}
                  disclaimer={result.disclaimer}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm leading-6 text-steel-200">
            Complete the form and generate the inspection. The finished
            ladder inspection record will appear here.
          </p>
        )}
      </section>
    </div>
  );
}
