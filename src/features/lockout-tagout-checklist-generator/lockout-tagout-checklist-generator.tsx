"use client";

import { FormEvent, useMemo, useState } from "react";
import { ExportPdfButton } from "@/components/export/export-pdf-button";
import { ExportTextButton } from "@/components/export/export-text-button";
import {
  generateLockoutTagoutChecklist,
  type LockoutTagoutChecklistResult,
} from "./generate-lockout-tagout-checklist";

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

export function LockoutTagoutChecklistGenerator() {
  const [companyName, setCompanyName] = useState("ABC Mechanical");
  const [projectName, setProjectName] = useState("Central Plant Upgrade");
  const [equipmentName, setEquipmentName] = useState("Air Handling Unit 4");
  const [equipmentLocation, setEquipmentLocation] =
    useState("Mechanical Room B");
  const [authorizedEmployee, setAuthorizedEmployee] = useState("Jordan Lee");
  const [supervisorName, setSupervisorName] = useState("Morgan Ellis");

  const [affectedEmployees, setAffectedEmployees] = useState(
    "HVAC crew\nElectrical crew\nBuilding operations",
  );
  const [energySources, setEnergySources] = useState(
    "480-volt electrical supply\nStored rotational energy\nPneumatic pressure",
  );
  const [isolationPoints, setIsolationPoints] = useState(
    "Main disconnect AHU-4\nLocal control circuit disconnect\nPneumatic supply valve",
  );
  const [requiredDevices, setRequiredDevices] = useState(
    "Personal safety lock\nDanger tag\nLockout hasp\nValve lockout device",
  );
  const [shutdownSteps, setShutdownSteps] = useState(
    "Notify affected employees\nStop equipment using normal controls\nOpen all identified disconnects\nClose and secure the pneumatic supply valve\nRelease or restrain stored energy",
  );
  const [verificationSteps, setVerificationSteps] = useState(
    "Attempt normal startup\nTest electrical conductors with an appropriately rated tester\nVerify pneumatic pressure is relieved\nReturn controls to the off position",
  );
  const [restorationSteps, setRestorationSteps] = useState(
    "Inspect the work area and remove tools\nConfirm guards and components are reinstalled\nVerify all employees are safely positioned\nRemove personal lockout devices\nNotify affected employees before restart\nRestore energy and observe equipment operation",
  );

  const [error, setError] = useState("");
  const [result, setResult] =
    useState<LockoutTagoutChecklistResult | null>(null);

  const previewInput = useMemo(
    () => ({
      companyName,
      projectName,
      equipmentName,
      equipmentLocation,
      authorizedEmployee,
      affectedEmployees: splitLines(affectedEmployees),
      energySources: splitLines(energySources),
      isolationPoints: splitLines(isolationPoints),
      shutdownSteps: splitLines(shutdownSteps),
      verificationSteps: splitLines(verificationSteps),
      restorationSteps: splitLines(restorationSteps),
      requiredDevices: splitLines(requiredDevices),
      supervisorName,
    }),
    [
      affectedEmployees,
      authorizedEmployee,
      companyName,
      energySources,
      equipmentLocation,
      equipmentName,
      isolationPoints,
      projectName,
      requiredDevices,
      restorationSteps,
      shutdownSteps,
      supervisorName,
      verificationSteps,
    ],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const generated = generateLockoutTagoutChecklist(previewInput);
      setResult(generated);
      setError("");
    } catch (caughtError) {
      setResult(null);
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to generate the lockout/tagout checklist.",
      );
    }
  }

  const textFields = [
    {
      label: "Company name",
      value: companyName,
      setter: setCompanyName,
    },
    {
      label: "Project name",
      value: projectName,
      setter: setProjectName,
    },
    {
      label: "Equipment name",
      value: equipmentName,
      setter: setEquipmentName,
    },
    {
      label: "Equipment location",
      value: equipmentLocation,
      setter: setEquipmentLocation,
    },
    {
      label: "Authorized employee",
      value: authorizedEmployee,
      setter: setAuthorizedEmployee,
    },
    {
      label: "Supervisor name",
      value: supervisorName,
      setter: setSupervisorName,
    },
  ];

  const listFields = [
    {
      label: "Affected employees or work groups, one per line",
      value: affectedEmployees,
      setter: setAffectedEmployees,
      rows: 4,
    },
    {
      label: "Hazardous energy sources, one per line",
      value: energySources,
      setter: setEnergySources,
      rows: 4,
    },
    {
      label: "Energy isolation points, one per line",
      value: isolationPoints,
      setter: setIsolationPoints,
      rows: 4,
    },
    {
      label: "Required lockout/tagout devices, one per line",
      value: requiredDevices,
      setter: setRequiredDevices,
      rows: 4,
    },
    {
      label: "Shutdown and isolation steps, one per line",
      value: shutdownSteps,
      setter: setShutdownSteps,
      rows: 6,
    },
    {
      label: "Zero-energy verification steps, one per line",
      value: verificationSteps,
      setter: setVerificationSteps,
      rows: 5,
    },
    {
      label: "Restoration and restart steps, one per line",
      value: restorationSteps,
      setter: setRestorationSteps,
      rows: 6,
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
      >
        <h2 className="text-2xl font-black">
          Create your lockout/tagout checklist
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-300">
          Enter equipment details, hazardous energy sources, isolation points,
          procedural steps, and responsible personnel. The generator will
          organize them into an equipment-specific checklist draft.
        </p>

        <div className="mt-6 grid gap-4">
          {textFields.map((field) => (
            <label key={field.label} className="grid gap-2">
              <span className="text-sm font-bold text-slate-200">
                {field.label}
              </span>
              <input
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
          Generate LOTO Checklist
        </button>
      </form>

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="text-2xl font-black">
          Generated lockout/tagout checklist
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
                  fileName="lockout-tagout-checklist.txt"
                  title={result.title}
                  summary={result.summary}
                  sections={result.sections}
                  disclaimer={result.disclaimer}
                />
                <ExportPdfButton
                  fileName="lockout-tagout-checklist.pdf"
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
            Form complete karke checklist generate karein. Generated result
            yahan display hoga.
          </p>
        )}
      </section>
    </div>
  );
}
