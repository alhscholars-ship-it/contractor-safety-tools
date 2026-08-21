"use client";

import { FormEvent, useMemo, useState } from "react";
import { ExportPdfButton } from "@/components/export/export-pdf-button";
import { ExportTextButton } from "@/components/export/export-text-button";
import {
  generateFireExtinguisherInspection,
  type FireExtinguisherInspectionResult,
} from "./generate-fire-extinguisher-inspection";

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

export function FireExtinguisherInspectionGenerator() {
  const [companyName, setCompanyName] = useState("Summit Contractors");
  const [projectName, setProjectName] = useState(
    "Central Office Renovation",
  );
  const [inspectionDate, setInspectionDate] = useState("2026-07-17");
  const [inspectorName, setInspectorName] = useState("Jordan Lee");
  const [extinguisherId, setExtinguisherId] = useState("FE-104");
  const [extinguisherType, setExtinguisherType] =
    useState("ABC dry chemical");
  const [extinguisherLocation, setExtinguisherLocation] = useState(
    "First-floor electrical room",
  );
  const [pressureGaugeStatus, setPressureGaugeStatus] = useState(
    "Needle is within the operable range",
  );
  const [safetyPinStatus, setSafetyPinStatus] = useState(
    "Pin and tamper seal are present and intact",
  );
  const [hoseNozzleStatus, setHoseNozzleStatus] = useState(
    "Hose and nozzle are unobstructed and undamaged",
  );
  const [physicalCondition, setPhysicalCondition] = useState(
    "Cylinder has no visible corrosion, leakage, or damage",
  );
  const [accessibilityStatus, setAccessibilityStatus] = useState(
    "Extinguisher is mounted, visible, and unobstructed",
  );
  const [inspectionFindings, setInspectionFindings] = useState(
    "Inspection tag is legible\nOperating instructions face outward",
  );
  const [correctiveActions, setCorrectiveActions] = useState(
    "Update the monthly inspection record\nConfirm annual maintenance date",
  );
  const [responsiblePersons, setResponsiblePersons] = useState(
    "Site superintendent\nFire protection contractor",
  );
  const [nextInspectionDate, setNextInspectionDate] =
    useState("2026-08-17");

  const [error, setError] = useState("");
  const [result, setResult] =
    useState<FireExtinguisherInspectionResult | null>(null);

  const previewInput = useMemo(
    () => ({
      companyName,
      projectName,
      inspectionDate,
      inspectorName,
      extinguisherId,
      extinguisherType,
      extinguisherLocation,
      pressureGaugeStatus,
      safetyPinStatus,
      hoseNozzleStatus,
      physicalCondition,
      accessibilityStatus,
      inspectionFindings: splitLines(inspectionFindings),
      correctiveActions: splitLines(correctiveActions),
      responsiblePersons: splitLines(responsiblePersons),
      nextInspectionDate,
    }),
    [
      accessibilityStatus,
      companyName,
      correctiveActions,
      extinguisherId,
      extinguisherLocation,
      extinguisherType,
      hoseNozzleStatus,
      inspectionDate,
      inspectionFindings,
      inspectorName,
      nextInspectionDate,
      physicalCondition,
      pressureGaugeStatus,
      projectName,
      responsiblePersons,
      safetyPinStatus,
    ],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const generated = generateFireExtinguisherInspection(previewInput);

      setResult(generated);
      setError("");
    } catch (caughtError) {
      setResult(null);
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to generate the fire extinguisher inspection.",
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
      label: "Extinguisher ID or asset number",
      value: extinguisherId,
      setter: setExtinguisherId,
      type: "text",
    },
    {
      label: "Extinguisher type",
      value: extinguisherType,
      setter: setExtinguisherType,
      type: "text",
    },
    {
      label: "Extinguisher location",
      value: extinguisherLocation,
      setter: setExtinguisherLocation,
      type: "text",
    },
    {
      label: "Pressure gauge status",
      value: pressureGaugeStatus,
      setter: setPressureGaugeStatus,
      type: "text",
    },
    {
      label: "Safety pin and tamper seal status",
      value: safetyPinStatus,
      setter: setSafetyPinStatus,
      type: "text",
    },
    {
      label: "Hose and nozzle condition",
      value: hoseNozzleStatus,
      setter: setHoseNozzleStatus,
      type: "text",
    },
    {
      label: "Cylinder and physical condition",
      value: physicalCondition,
      setter: setPhysicalCondition,
      type: "text",
    },
    {
      label: "Mounting, visibility, and accessibility",
      value: accessibilityStatus,
      setter: setAccessibilityStatus,
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

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
      >
        <h2 className="text-2xl font-display font-black">
          Create your fire extinguisher inspection
        </h2>

        <p className="mt-2 text-sm leading-6 text-steel-200">
          Enter extinguisher identification, location, condition checks,
          findings, corrective actions, and follow-up details. The generator
          will organize them into a downloadable inspection record.
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
          Generate Fire Extinguisher Inspection
        </button>
      </form>

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="text-2xl font-display font-black">
          Generated fire extinguisher inspection
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
                key={section.title}
                className="rounded-2xl bg-navy-950/70 p-5"
              >
                <h3 className="font-display font-black">{section.title}</h3>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-steel-200">
                  {section.items.map((item) => (
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
                  fileName="fire-extinguisher-inspection.txt"
                  title={result.title}
                  summary={result.summary}
                  sections={result.sections}
                  disclaimer={result.disclaimer}
                />

                <ExportPdfButton
                  fileName="fire-extinguisher-inspection.pdf"
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
            Complete the form and generate the inspection. The finished
            fire extinguisher inspection record will appear here.
          </p>
        )}
      </section>
    </div>
  );
}
