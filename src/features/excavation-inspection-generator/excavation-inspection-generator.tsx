"use client";

import { FormEvent, useMemo, useState } from "react";
import { ExportPdfButton } from "@/components/export/export-pdf-button";
import { ExportTextButton } from "@/components/export/export-text-button";
import {
  generateExcavationInspection,
  type ExcavationInspectionResult,
} from "./generate-excavation-inspection";

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

export function ExcavationInspectionGenerator() {
  const [companyName, setCompanyName] = useState("Summit Contractors");
  const [projectName, setProjectName] = useState(
    "Central Utility Upgrade",
  );
  const [inspectionDate, setInspectionDate] = useState("2026-07-18");
  const [inspectorName, setInspectorName] = useState("Jordan Lee");
  const [excavationId, setExcavationId] = useState("EXC-021");
  const [excavationLocation, setExcavationLocation] = useState(
    "North service corridor",
  );
  const [excavationDepth, setExcavationDepth] = useState("8 feet");
  const [soilClassification, setSoilClassification] =
    useState("Type C soil");
  const [competentPerson, setCompetentPerson] =
    useState("Morgan Reed");
  const [protectiveSystemCondition, setProtectiveSystemCondition] =
    useState(
      "Trench shield is properly installed and suitable for the excavation depth",
    );
  const [accessEgressCondition, setAccessEgressCondition] = useState(
    "Secured ladder is positioned within the required travel distance",
  );
  const [spoilPileCondition, setSpoilPileCondition] = useState(
    "Spoil piles and materials are maintained at least two feet from the edge",
  );
  const [
    undergroundUtilityCondition,
    setUndergroundUtilityCondition,
  ] = useState(
    "Known utilities are identified, marked, exposed safely, and protected",
  );
  const [
    waterAccumulationCondition,
    setWaterAccumulationCondition,
  ] = useState(
    "No hazardous water accumulation is present and drainage controls are operational",
  );
  const [atmosphericCondition, setAtmosphericCondition] = useState(
    "Atmospheric testing completed with acceptable readings before entry",
  );
  const [adjacentStructureCondition, setAdjacentStructureCondition] =
    useState(
      "Nearby foundations and structures show no evidence of instability",
    );
  const [mobileEquipmentCondition, setMobileEquipmentCondition] =
    useState(
      "Traffic controls and warning systems protect employees from mobile equipment",
    );
  const [barricadeCondition, setBarricadeCondition] = useState(
    "Barricades and warning markers are installed around exposed excavation edges",
  );
  const [weatherCondition, setWeatherCondition] = useState(
    "Weather and soil conditions remain suitable for continued work",
  );
  const [inspectionFindings, setInspectionFindings] = useState(
    [
      "Replace one damaged barricade panel",
      "Remove loose material from the trench shield access point",
    ].join("\n"),
  );
  const [correctiveActions, setCorrectiveActions] = useState(
    [
      "Replace the damaged barricade before work continues",
      "Clear the access point and verify safe ladder access",
    ].join("\n"),
  );
  const [responsiblePersons, setResponsiblePersons] = useState(
    [
      "Site superintendent",
      "Excavation competent person",
    ].join("\n"),
  );
  const [nextInspectionDate, setNextInspectionDate] =
    useState("2026-07-19");

  const [error, setError] = useState("");
  const [result, setResult] =
    useState<ExcavationInspectionResult | null>(null);

  const previewInput = useMemo(
    () => ({
      companyName,
      projectName,
      inspectionDate,
      inspectorName,
      excavationId,
      excavationLocation,
      excavationDepth,
      soilClassification,
      competentPerson,
      protectiveSystemCondition,
      accessEgressCondition,
      spoilPileCondition,
      undergroundUtilityCondition,
      waterAccumulationCondition,
      atmosphericCondition,
      adjacentStructureCondition,
      mobileEquipmentCondition,
      barricadeCondition,
      weatherCondition,
      inspectionFindings: splitLines(inspectionFindings),
      correctiveActions: splitLines(correctiveActions),
      responsiblePersons: splitLines(responsiblePersons),
      nextInspectionDate,
    }),
    [
      accessEgressCondition,
      adjacentStructureCondition,
      atmosphericCondition,
      barricadeCondition,
      companyName,
      competentPerson,
      correctiveActions,
      excavationDepth,
      excavationId,
      excavationLocation,
      inspectionDate,
      inspectionFindings,
      inspectorName,
      mobileEquipmentCondition,
      nextInspectionDate,
      projectName,
      protectiveSystemCondition,
      responsiblePersons,
      soilClassification,
      spoilPileCondition,
      undergroundUtilityCondition,
      waterAccumulationCondition,
      weatherCondition,
    ],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const generated = generateExcavationInspection(previewInput);

      setResult(generated);
      setError("");
    } catch (caughtError) {
      setResult(null);
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to generate the excavation inspection.",
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
      label: "Excavation ID or reference number",
      value: excavationId,
      setter: setExcavationId,
      type: "text",
    },
    {
      label: "Excavation location",
      value: excavationLocation,
      setter: setExcavationLocation,
      type: "text",
    },
    {
      label: "Excavation depth",
      value: excavationDepth,
      setter: setExcavationDepth,
      type: "text",
    },
    {
      label: "Soil classification",
      value: soilClassification,
      setter: setSoilClassification,
      type: "text",
    },
    {
      label: "Competent person",
      value: competentPerson,
      setter: setCompetentPerson,
      type: "text",
    },
    {
      label: "Protective system condition",
      value: protectiveSystemCondition,
      setter: setProtectiveSystemCondition,
      type: "text",
    },
    {
      label: "Safe access and egress",
      value: accessEgressCondition,
      setter: setAccessEgressCondition,
      type: "text",
    },
    {
      label: "Spoil piles, materials, and equipment setback",
      value: spoilPileCondition,
      setter: setSpoilPileCondition,
      type: "text",
    },
    {
      label: "Underground utility identification and protection",
      value: undergroundUtilityCondition,
      setter: setUndergroundUtilityCondition,
      type: "text",
    },
    {
      label: "Water accumulation and drainage controls",
      value: waterAccumulationCondition,
      setter: setWaterAccumulationCondition,
      type: "text",
    },
    {
      label: "Atmospheric testing and hazardous atmospheres",
      value: atmosphericCondition,
      setter: setAtmosphericCondition,
      type: "text",
    },
    {
      label: "Adjacent structures and stability",
      value: adjacentStructureCondition,
      setter: setAdjacentStructureCondition,
      type: "text",
    },
    {
      label: "Mobile equipment and traffic controls",
      value: mobileEquipmentCondition,
      setter: setMobileEquipmentCondition,
      type: "text",
    },
    {
      label: "Barricades and edge protection",
      value: barricadeCondition,
      setter: setBarricadeCondition,
      type: "text",
    },
    {
      label: "Weather and changing site conditions",
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
          Create your excavation inspection
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-300">
          Enter the excavation details, competent-person information,
          protective systems, access controls, observed conditions,
          corrective actions, and follow-up date.
        </p>

        <div className="mt-6 grid gap-4">
          {textFields.map((field) => (
            <label key={field.label} className="grid gap-2">
              <span className="text-sm font-bold text-slate-200">
                {field.label}
              </span>

              <input
                required
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
                required
                value={field.value}
                onChange={(event) => field.setter(event.target.value)}
                rows={field.rows}
                className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300"
              />
            </label>
          ))}
        </div>

        {error ? (
          <p
            aria-live="polite"
            className="mt-4 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-100"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
        >
          Generate Excavation Inspection
        </button>
      </form>

      <section
        aria-live="polite"
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
      >
        <h2 className="text-2xl font-black">
          Generated excavation inspection
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
                  fileName="excavation-inspection-checklist.txt"
                  title={result.title}
                  summary={result.summary}
                  sections={exportSections}
                  disclaimer={result.disclaimer}
                />

                <ExportPdfButton
                  fileName="excavation-inspection-checklist.pdf"
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
            Complete the form and generate the inspection. The finished
            excavation inspection record will appear here.
          </p>
        )}
      </section>
    </div>
  );
}
