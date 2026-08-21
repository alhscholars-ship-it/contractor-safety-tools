"use client";

import { FormEvent, useState } from "react";
import { ExportTextButton } from "@/components/export/export-text-button";
import { ExportPdfButton } from "@/components/export/export-pdf-button";
import {
  generateFallProtectionInspection,
  type FallProtectionInspectionResult,
} from "./generate-fall-protection-inspection";

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

export function FallProtectionInspectionGenerator() {
  const [companyName, setCompanyName] = useState("ABC Construction");
  const [projectName, setProjectName] = useState("Commercial Build");
  const [jobsiteLocation, setJobsiteLocation] = useState("Main work area");
  const [workArea, setWorkArea] = useState("Roof work");
  const [supervisorName, setSupervisorName] = useState("Safety Supervisor");

  const [hazards, setHazards] = useState(
    "Unprotected edges\nElevated work surfaces\nImproper fall protection",
  );

  const [inspectionItems, setInspectionItems] = useState(
    "Guardrails installed\nHarness and lanyard condition\nAnchor points verified",
  );

  const [result, setResult] =
    useState<FallProtectionInspectionResult | null>(null);

  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const generated = generateFallProtectionInspection({
        companyName,
        projectName,
        jobsiteLocation,
        workArea,
        supervisorName,
        hazards: splitLines(hazards),
        inspectionItems: splitLines(inspectionItems),
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
        <h2 className="text-2xl font-display font-black">
          Create Fall Protection Inspection
        </h2>

        {[
          ["Company", companyName, setCompanyName],
          ["Project", projectName, setProjectName],
          ["Location", jobsiteLocation, setJobsiteLocation],
          ["Work Area", workArea, setWorkArea],
          ["Supervisor", supervisorName, setSupervisorName],
        ].map(([label, value, setter]) => (
          <label key={label as string} className="mt-4 grid gap-2">
            <span className="text-sm font-bold">
              {label as string}
            </span>

            <input
              value={value as string}
              onChange={(event) =>
                (setter as (value: string) => void)(
                  event.target.value,
                )
              }
              className="rounded-2xl border border-white/10 bg-navy-950 px-4 py-3"
            />
          </label>
        ))}

        {[
          ["Fall Hazards", hazards, setHazards],
          ["Inspection Items", inspectionItems, setInspectionItems],
        ].map(([label, value, setter]) => (
          <label key={label as string} className="mt-4 grid gap-2">
            <span className="text-sm font-bold">
              {label as string}
            </span>

            <textarea
              value={value as string}
              onChange={(event) =>
                (setter as (value: string) => void)(
                  event.target.value,
                )
              }
              rows={4}
              className="rounded-2xl border border-white/10 bg-navy-950 px-4 py-3"
            />
          </label>
        ))}

        {error ? (
          <p className="mt-4 text-red-300">{error}</p>
        ) : null}

        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-orange-600 px-6 py-3 font-display font-black text-slate-950"
        >
          Generate Checklist
        </button>
      </form>

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="text-2xl font-display font-black">
          Generated Checklist
        </h2>

        {result ? (
          <div className="mt-6 space-y-5">
            <h3 className="text-xl font-display font-black text-orange-500">
              {result.title}
            </h3>

            <p className="text-steel-200">
              {result.summary}
            </p>

            {result.sections.map((section) => (
              <div
                key={section.title}
                className="rounded-2xl bg-navy-950 p-5"
              >
                <h4 className="font-display font-black">
                  {section.title}
                </h4>

                <ul className="mt-3 list-disc pl-5 text-sm">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            <ExportTextButton
              fileName="fall-protection-inspection.txt"
              title={result.title}
              summary={result.summary}
              sections={result.sections}
              disclaimer={result.disclaimer}
            />

            <ExportPdfButton
              fileName="fall-protection-inspection.pdf"
              title={result.title}
              summary={result.summary}
              sections={result.sections}
              disclaimer={result.disclaimer}
            />
          </div>
        ) : (
          <p className="text-steel-200">
            Generate your checklist to preview it here.
          </p>
        )}
      </section>
    </div>
  );
}
