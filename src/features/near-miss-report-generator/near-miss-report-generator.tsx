"use client";

import { FormEvent, useMemo, useState } from "react";
import { ExportPdfButton } from "@/components/export/export-pdf-button";
import { ExportTextButton } from "@/components/export/export-text-button";
import {
  generateNearMissReport,
  type NearMissReportResult,
} from "./generate-near-miss-report";

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

export function NearMissReportGenerator() {
  const [companyName, setCompanyName] = useState("ABC Construction");
  const [projectName, setProjectName] = useState("Warehouse Buildout");
  const [eventDate, setEventDate] = useState("2026-07-16");
  const [eventLocation, setEventLocation] = useState("North loading dock");
  const [reportedBy, setReportedBy] = useState("John Smith");
  const [supervisorName, setSupervisorName] = useState("David Clark");
  const [eventDescription, setEventDescription] = useState(
    "A suspended pallet shifted toward a marked pedestrian route without striking anyone.",
  );
  const [potentialOutcome, setPotentialOutcome] = useState(
    "A worker could have sustained a serious struck-by injury.",
  );
  const [whatPreventedInjury, setWhatPreventedInjury] = useState(
    "Pedestrian noticed the load movement\nSpotter warned the operator",
  );
  const [contributingFactors, setContributingFactors] = useState(
    "Load was not centered\nPedestrian route was too close to material handling activity",
  );
  const [immediateActions, setImmediateActions] = useState(
    "Stopped lifting operations\nClosed the pedestrian route",
  );
  const [correctiveActions, setCorrectiveActions] = useState(
    "Revise the lifting plan\nRelocate the pedestrian route",
  );
  const [responsiblePersons, setResponsiblePersons] = useState(
    "Site superintendent\nSafety manager",
  );
  const [followUpDate, setFollowUpDate] = useState("2026-07-18");
  const [witnesses, setWitnesses] = useState("Site foreman");
  const [error, setError] = useState("");
  const [result, setResult] = useState<NearMissReportResult | null>(null);

  const previewInput = useMemo(
    () => ({
      companyName,
      projectName,
      eventDate,
      eventLocation,
      reportedBy,
      supervisorName,
      eventDescription,
      potentialOutcome,
      whatPreventedInjury: splitLines(whatPreventedInjury),
      contributingFactors: splitLines(contributingFactors),
      immediateActions: splitLines(immediateActions),
      correctiveActions: splitLines(correctiveActions),
      responsiblePersons: splitLines(responsiblePersons),
      followUpDate,
      witnesses: splitLines(witnesses),
    }),
    [
      companyName,
      contributingFactors,
      correctiveActions,
      eventDate,
      eventDescription,
      eventLocation,
      followUpDate,
      immediateActions,
      potentialOutcome,
      projectName,
      reportedBy,
      responsiblePersons,
      supervisorName,
      whatPreventedInjury,
      witnesses,
    ],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const generated = generateNearMissReport(previewInput);
      setResult(generated);
      setError("");
    } catch (caughtError) {
      setResult(null);
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to generate near-miss report.",
      );
    }
  }

  const textFields = [
    ["Company name", companyName, setCompanyName],
    ["Project name", projectName, setProjectName],
    ["Near-miss date", eventDate, setEventDate],
    ["Event location", eventLocation, setEventLocation],
    ["Reported by", reportedBy, setReportedBy],
    ["Supervisor name", supervisorName, setSupervisorName],
    ["Follow-up date", followUpDate, setFollowUpDate],
  ] as const;

  const listFields = [
    [
      "What prevented injury or damage, one per line",
      whatPreventedInjury,
      setWhatPreventedInjury,
    ],
    [
      "Contributing factors, one per line",
      contributingFactors,
      setContributingFactors,
    ],
    ["Witnesses, one per line", witnesses, setWitnesses],
    ["Immediate actions, one per line", immediateActions, setImmediateActions],
    ["Corrective actions, one per line", correctiveActions, setCorrectiveActions],
    [
      "Responsible persons, one per line",
      responsiblePersons,
      setResponsiblePersons,
    ],
  ] as const;

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
      >
        <h2 className="text-2xl font-black">Create your near-miss report</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Record what happened, what prevented harm, contributing factors,
          immediate controls, corrective actions, and follow-up ownership.
        </p>

        <div className="mt-6 grid gap-4">
          {textFields.map(([label, value, setter]) => (
            <label key={label} className="grid gap-2">
              <span className="text-sm font-bold text-slate-200">{label}</span>
              <input
                value={value}
                onChange={(event) => setter(event.target.value)}
                className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300"
              />
            </label>
          ))}

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-200">
              Near-miss description
            </span>
            <textarea
              value={eventDescription}
              onChange={(event) => setEventDescription(event.target.value)}
              rows={4}
              className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-200">
              Potential injury, damage, or loss
            </span>
            <textarea
              value={potentialOutcome}
              onChange={(event) => setPotentialOutcome(event.target.value)}
              rows={3}
              className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300"
            />
          </label>

          {listFields.map(([label, value, setter]) => (
            <label key={label} className="grid gap-2">
              <span className="text-sm font-bold text-slate-200">{label}</span>
              <textarea
                value={value}
                onChange={(event) => setter(event.target.value)}
                rows={4}
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
          Generate Near-Miss Report
        </button>
      </form>

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="text-2xl font-black">Generated near-miss report</h2>

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
                  fileName="near-miss-report.txt"
                  title={result.title}
                  summary={result.summary}
                  sections={result.sections}
                  disclaimer={result.disclaimer}
                />
                <ExportPdfButton
                  fileName="near-miss-report.pdf"
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
            Complete the form and generate a near-miss report draft. The
            structured result will appear here.
          </p>
        )}
      </section>
    </div>
  );
}
