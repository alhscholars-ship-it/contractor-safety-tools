"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  generateToolboxTalk,
  type ToolboxTalkResult,
} from "./generate-toolbox-talk";

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

export function ToolboxTalkGenerator() {
  const [topic, setTopic] = useState("Fall Protection");
  const [trade, setTrade] = useState("Roofing");
  const [jobsite, setJobsite] = useState("Dallas warehouse roof");
  const [hazards, setHazards] = useState("Unprotected edges\nLadders\nOpen roof access");
  const [controls, setControls] = useState(
    "Guardrails\nPersonal fall arrest systems\nLadder inspection",
  );
  const [supervisorName, setSupervisorName] = useState("John Smith");
  const [error, setError] = useState("");
  const [result, setResult] = useState<ToolboxTalkResult | null>(null);

  const previewInput = useMemo(
    () => ({
      topic,
      trade,
      jobsite,
      hazards: splitLines(hazards),
      controls: splitLines(controls),
      supervisorName,
    }),
    [controls, hazards, jobsite, supervisorName, topic, trade],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const generated = generateToolboxTalk(previewInput);
      setResult(generated);
      setError("");
    } catch (caughtError) {
      setResult(null);
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to generate toolbox talk.",
      );
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
      >
        <h2 className="text-2xl font-black">Create your toolbox talk</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Enter the topic, trade, jobsite hazards, and controls. The generator will
          format a practical safety meeting outline.
        </p>

        <div className="mt-6 grid gap-4">
          {[
            ["Topic", topic, setTopic],
            ["Trade or crew type", trade, setTrade],
            ["Jobsite", jobsite, setJobsite],
            ["Supervisor or meeting leader", supervisorName, setSupervisorName],
          ].map(([label, value, setter]) => (
            <label key={label as string} className="grid gap-2">
              <span className="text-sm font-bold text-slate-200">{label as string}</span>
              <input
                value={value as string}
                onChange={(event) =>
                  (setter as (nextValue: string) => void)(event.target.value)
                }
                className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300"
              />
            </label>
          ))}

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-200">
              Hazards, one per line
            </span>
            <textarea
              value={hazards}
              onChange={(event) => setHazards(event.target.value)}
              rows={5}
              className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-200">
              Controls, one per line
            </span>
            <textarea
              value={controls}
              onChange={(event) => setControls(event.target.value)}
              rows={5}
              className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300"
            />
          </label>
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
          Generate Toolbox Talk
        </button>
      </form>

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <h2 className="text-2xl font-black">Generated toolbox talk</h2>

        {result ? (
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-xl font-black text-emerald-200">{result.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{result.opening}</p>
            </div>

            <div className="rounded-2xl bg-slate-950/70 p-5">
              <h3 className="font-black">Discussion Points</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
                {result.discussionPoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-slate-950/70 p-5">
              <h3 className="font-black">Crew Questions</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
                {result.crewQuestions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-slate-950/70 p-5">
              <h3 className="font-black">Documentation Notes</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
                {result.documentationNotes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <p className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-xs leading-5 text-amber-100">
              {result.disclaimer}
            </p>
          </div>
        ) : (
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Fill out the form and generate a toolbox talk. Your result will appear here.
          </p>
        )}
      </section>
    </div>
  );
}
