"use client";

import { FormEvent, useMemo, useState } from "react";
import { ExportPdfButton } from "@/components/export/export-pdf-button";
import { ExportTextButton } from "@/components/export/export-text-button";
import {
  generateScaffoldInspection,
  type ScaffoldInspectionResult,
} from "./generate-scaffold-inspection";

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

export function ScaffoldInspectionGenerator() {
  const [companyName, setCompanyName] = useState("Summit Contractors");
  const [projectName, setProjectName] = useState(
    "Central Tower Renovation",
  );
  const [inspectionDate, setInspectionDate] = useState("2026-07-17");
  const [inspectorName, setInspectorName] = useState("Jordan Lee");
  const [scaffoldId, setScaffoldId] = useState("SCF-018");
  const [scaffoldType, setScaffoldType] = useState(
    "Supported frame scaffold",
  );
  const [scaffoldLocation, setScaffoldLocation] = useState(
    "Building A east elevation",
  );
  const [competentPerson, setCompetentPerson] =
    useState("Morgan Reed");
  const [foundationCondition, setFoundationCondition] = useState(
    "Base plates and mudsills are level, stable, and fully supported",
  );
  const [frameCondition, setFrameCondition] = useState(
    "Frames, posts, uprights, and coupling pins are straight and secure",
  );
  const [bracingCondition, setBracingCondition] = useState(
    "Cross braces and diagonal braces are installed and secured",
  );
  const [platformCondition, setPlatformCondition] = useState(
    "Platforms are fully planked, secured, and free from damage",
  );
  const [accessCondition, setAccessCondition] = useState(
    "Access ladder is secured and extends to the platform landing",
  );
  const [guardrailCondition, setGuardrailCondition] = useState(
    "Toprails, midrails, and toeboards are installed where required",
  );
  const [fallProtectionCondition, setFallProtectionCondition] =
    useState(
      "Required fall protection systems are available and properly configured",
    );
  const [tieInCondition, setTieInCondition] = useState(
    "Tie-ins and anchorage points are installed at required locations",
  );
  const [loadCondition, setLoadCondition] = useState(
    "Materials remain within the scaffold load rating and are evenly distributed",
  );
  const [
    electricalClearanceCondition,
    setElectricalClearanceCondition,
  ] = useState(
    "Required clearance from energized electrical conductors is maintained",
  );
  const [weatherCondition, setWeatherCondition] = useState(
    "Weather and surface conditions are suitable for scaffold use",
  );
  const [inspectionFindings, setInspectionFindings] = useState(
    [
      "Remove loose material from the second-level platform",
      "Replace one damaged access ladder rung",
    ].join("\n"),
  );
  const [correctiveActions, setCorrectiveActions] = useState(
    [
      "Remove loose material before work resumes",
      "Restrict access until the damaged rung is replaced",
    ].join("\n"),
  );
  const [responsiblePersons, setResponsiblePersons] = useState(
    ["Site superintendent", "Scaffold competent person"].join("\n"),
  );
  const [nextInspectionDate, setNextInspectionDate] =
    useState("2026-07-18");

  const [error, setError] = useState("");
  const [result, setResult] =
    useState<ScaffoldInspectionResult | null>(null);

  const previewInput = useMemo(
    () => ({
      companyName,
      projectName,
      inspectionDate,
      inspectorName,
      scaffoldId,
      scaffoldType,
      scaffoldLocation,
      competentPerson,
      foundationCondition,
      frameCondition,
      bracingCondition,
      platformCondition,
      accessCondition,
      guardrailCondition,
      fallProtectionCondition,
      tieInCondition,
      loadCondition,
      electricalClearanceCondition,
      weatherCondition,
      inspectionFindings: splitLines(inspectionFindings),
      correctiveActions: splitLines(correctiveActions),
      responsiblePersons: splitLines(responsiblePersons),
      nextInspectionDate,
    }),
    [
      accessCondition,
      bracingCondition,
      companyName,
      competentPerson,
      correctiveActions,
      electricalClearanceCondition,
      fallProtectionCondition,
      foundationCondition,
      frameCondition,
      guardrailCondition,
      inspectionDate,
      inspectionFindings,
      inspectorName,
      loadCondition,
      nextInspectionDate,
      platformCondition,
      projectName,
      responsiblePersons,
      scaffoldId,
      scaffoldLocation,
      scaffoldType,
      tieInCondition,
      weatherCondition,
    ],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const generated = generateScaffoldInspection(previewInput);

      setResult(generated);
      setError("");
    } catch (caughtError) {
      setResult(null);
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to generate the scaffold inspection.",
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
      label: "Scaffold ID or reference number",
      value: scaffoldId,
      setter: setScaffoldId,
      type: "text",
    },
    {
      label: "Scaffold type",
      value: scaffoldType,
      setter: setScaffoldType,
      type: "text",
    },
    {
      label: "Scaffold location",
      value: scaffoldLocation,
      setter: setScaffoldLocation,
      type: "text",
    },
    {
      label: "Competent person",
      value: competentPerson,
      setter: setCompetentPerson,
      type: "text",
    },
    {
      label: "Foundation, base plates, and mudsills",
      value: foundationCondition,
      setter: setFoundationCondition,
      type: "text",
    },
    {
      label: "Frames, posts, and uprights",
      value: frameCondition,
      setter: setFrameCondition,
      type: "text",
    },
    {
      label: "Cross braces and structural bracing",
      value: bracingCondition,
      setter: setBracingCondition,
      type: "text",
    },
    {
      label: "Platforms and planking",
      value: platformCondition,
      setter: setPlatformCondition,
      type: "text",
    },
    {
      label: "Access ladders and entry points",
      value: accessCondition,
      setter: setAccessCondition,
      type: "text",
    },
    {
      label: "Guardrails, midrails, and toeboards",
      value: guardrailCondition,
      setter: setGuardrailCondition,
      type: "text",
    },
    {
      label: "Personal fall protection",
      value: fallProtectionCondition,
      setter: setFallProtectionCondition,
      type: "text",
    },
    {
      label: "Tie-ins, guys, and anchorage",
      value: tieInCondition,
      setter: setTieInCondition,
      type: "text",
    },
    {
      label: "Load capacity and stored materials",
      value: loadCondition,
      setter: setLoadCondition,
      type: "text",
    },
    {
      label: "Electrical clearance",
      value: electricalClearanceCondition,
      setter: setElectricalClearanceCondition,
      type: "text",
    },
    {
      label: "Weather and environmental conditions",
      value: weatherCondition,
      setter: setWeatherCondition,
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
      label: "Inspection findings, one per line",
      value: inspectionFindings,
      setter: setInspectionFindings,
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
        <h2 className="text-2xl font-black">
          Create your scaffold inspection
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-300">
          Enter the scaffold identity, competent-person details,
          structural condition, access controls, fall protection,
          inspection findings, corrective actions, and follow-up date.
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
          Generate Scaffold Inspection
        </button>
      </form>

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="text-2xl font-black">
          Generated scaffold inspection
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
                key={section.heading}
                className="rounded-2xl bg-slate-950/70 p-5"
              >
                <h3 className="font-black">{section.heading}</h3>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
                  {section.content
                    .split("\n")
                    .filter(Boolean)
                    .map((item) => (
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
                  fileName="scaffold-inspection-checklist.txt"
                  title={result.title}
                  summary={result.summary}
                  sections={exportSections}
                  disclaimer={result.disclaimer}
                />

                <ExportPdfButton
                  fileName="scaffold-inspection-checklist.pdf"
                  title={result.title}
                  summary={result.summary}
                  sections={exportSections}
                  disclaimer={result.disclaimer}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Form complete karke inspection generate karein. Generated
            result yahan display hoga.
          </p>
        )}
      </section>
    </div>
  );
}
