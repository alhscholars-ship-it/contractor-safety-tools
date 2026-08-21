"use client";

import { FormEvent, useMemo, useState } from "react";
import { ExportPdfButton } from "@/components/export/export-pdf-button";
import { ExportTextButton } from "@/components/export/export-text-button";
import {
  generateFirstAidKitInspection,
  type FirstAidKitInspectionResult,
} from "./generate-first-aid-kit-inspection";

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

export function FirstAidKitInspectionGenerator() {
  const [companyName, setCompanyName] = useState("Summit Contractors");
  const [projectName, setProjectName] = useState(
    "Central Office Renovation",
  );
  const [inspectionDate, setInspectionDate] = useState("2026-07-17");
  const [inspectorName, setInspectorName] = useState("Jordan Lee");
  const [kitId, setKitId] = useState("FAK-204");
  const [kitLocation, setKitLocation] = useState(
    "Site office near main entrance",
  );
  const [kitType, setKitType] = useState(
    "General workplace first aid kit",
  );
  const [accessibilityStatus, setAccessibilityStatus] = useState(
    "Clearly marked, visible, and unobstructed",
  );
  const [containerCondition, setContainerCondition] = useState(
    "Container is clean, dry, secure, and undamaged",
  );
  const [inventoryStatus, setInventoryStatus] = useState(
    "Supplies match the approved inventory list",
  );
  const [expirationStatus, setExpirationStatus] = useState(
    "All dated supplies remain within expiration",
  );
  const [requiredSupplies, setRequiredSupplies] = useState(
    [
      "Adhesive bandages",
      "Sterile gauze pads",
      "Medical tape",
      "Disposable gloves",
    ].join("\n"),
  );
  const [missingOrExpiredItems, setMissingOrExpiredItems] = useState(
    [
      "Replace one opened antiseptic wipe packet",
      "Restock two pairs of disposable gloves",
    ].join("\n"),
  );
  const [correctiveActions, setCorrectiveActions] = useState(
    ["Restock identified supplies", "Update the inspection record"].join(
      "\n",
    ),
  );
  const [responsiblePersons, setResponsiblePersons] = useState(
    ["Site superintendent", "Safety coordinator"].join("\n"),
  );
  const [nextInspectionDate, setNextInspectionDate] =
    useState("2026-08-17");

  const [error, setError] = useState("");
  const [result, setResult] =
    useState<FirstAidKitInspectionResult | null>(null);

  const previewInput = useMemo(
    () => ({
      companyName,
      projectName,
      inspectionDate,
      inspectorName,
      kitId,
      kitLocation,
      kitType,
      accessibilityStatus,
      containerCondition,
      inventoryStatus,
      expirationStatus,
      requiredSupplies: splitLines(requiredSupplies),
      missingOrExpiredItems: splitLines(missingOrExpiredItems),
      correctiveActions: splitLines(correctiveActions),
      responsiblePersons: splitLines(responsiblePersons),
      nextInspectionDate,
    }),
    [
      accessibilityStatus,
      companyName,
      containerCondition,
      correctiveActions,
      expirationStatus,
      inspectionDate,
      inspectorName,
      inventoryStatus,
      kitId,
      kitLocation,
      kitType,
      missingOrExpiredItems,
      nextInspectionDate,
      projectName,
      requiredSupplies,
      responsiblePersons,
    ],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const generated = generateFirstAidKitInspection(previewInput);

      setResult(generated);
      setError("");
    } catch (caughtError) {
      setResult(null);
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to generate the first aid kit inspection.",
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
      label: "First aid kit ID",
      value: kitId,
      setter: setKitId,
      type: "text",
    },
    {
      label: "Kit location",
      value: kitLocation,
      setter: setKitLocation,
      type: "text",
    },
    {
      label: "Kit type",
      value: kitType,
      setter: setKitType,
      type: "text",
    },
    {
      label: "Accessibility and visibility status",
      value: accessibilityStatus,
      setter: setAccessibilityStatus,
      type: "text",
    },
    {
      label: "Container condition",
      value: containerCondition,
      setter: setContainerCondition,
      type: "text",
    },
    {
      label: "Inventory status",
      value: inventoryStatus,
      setter: setInventoryStatus,
      type: "text",
    },
    {
      label: "Expiration-date status",
      value: expirationStatus,
      setter: setExpirationStatus,
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
      label: "Required supplies reviewed, one per line",
      value: requiredSupplies,
      setter: setRequiredSupplies,
      rows: 6,
    },
    {
      label: "Missing, damaged, or expired items, one per line",
      value: missingOrExpiredItems,
      setter: setMissingOrExpiredItems,
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
          Create your first aid kit inspection
        </h2>

        <p className="mt-2 text-sm leading-6 text-steel-200">
          Enter the kit identity, location, condition, inventory findings,
          missing or expired supplies, corrective actions, and follow-up
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
          Generate First Aid Kit Inspection
        </button>
      </form>

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="text-2xl font-display font-black">
          Generated first aid kit inspection
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
                  fileName="first-aid-kit-inspection.txt"
                  title={result.title}
                  summary={result.summary}
                  sections={result.sections}
                  disclaimer={result.disclaimer}
                />

                <ExportPdfButton
                  fileName="first-aid-kit-inspection.pdf"
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
            first aid kit inspection record will appear here.
          </p>
        )}
      </section>
    </div>
  );
}
