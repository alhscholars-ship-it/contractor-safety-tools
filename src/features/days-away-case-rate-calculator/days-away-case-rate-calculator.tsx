"use client";

import {
  type FormEvent,
  useMemo,
  useState,
} from "react";
import { ExportPdfButton } from "@/components/export/export-pdf-button";
import { ExportTextButton } from "@/components/export/export-text-button";
import {
  calculateDaysAwayCaseRate,
  type DaysAwayCaseRateResult,
} from "./calculate-days-away-case-rate";

function parseRequiredNumber(
  value: string,
  label: string,
): number {
  if (!value.trim()) {
    throw new Error(`${label} is required.`);
  }

  return Number(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 20,
  }).format(value);
}

export function DaysAwayCaseRateCalculator() {
  const [
    daysAwayCases,
    setDaysAwayCases,
  ] = useState("25");

  const [
    employeeHoursWorked,
    setEmployeeHoursWorked,
  ] = useState("452680");

  const [result, setResult] =
    useState<DaysAwayCaseRateResult | null>(
      null,
    );

  const [error, setError] = useState("");

  const exportSections = useMemo(() => {
    if (!result) {
      return [];
    }

    return [
      {
        title: "Entered Recordkeeping Data",
        items: [
          `Cases involving days away from work: ${formatNumber(
            result.daysAwayCases,
          )}`,
          `Total employee hours worked: ${formatNumber(
            result.employeeHoursWorked,
          )}`,
          `Standardized hours: ${formatNumber(
            result.standardizedHours,
          )}`,
        ],
      },
      {
        title: "Calculated Result",
        items: [
          `Days Away Case Rate: ${result.daysAwayCaseRate.toFixed(
            1,
          )}`,
          `Equation: ${result.equation}`,
          result.interpretation,
        ],
      },
      {
        title: "Scope",
        items: [result.scopeNote],
      },
    ];
  }, [result]);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      const calculatedResult =
        calculateDaysAwayCaseRate({
          daysAwayCases:
            parseRequiredNumber(
              daysAwayCases,
              "Days-away case count",
            ),
          employeeHoursWorked:
            parseRequiredNumber(
              employeeHoursWorked,
              "Employee hours worked",
            ),
        });

      setResult(calculatedResult);
      setError("");
    } catch (caughtError) {
      setResult(null);

      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to calculate the Days Away Case Rate.",
      );
    }
  }

  function handleReset() {
    setDaysAwayCases("25");
    setEmployeeHoursWorked("452680");
    setResult(null);
    setError("");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
      >
        <h2 className="text-2xl font-black">
          Enter recordkeeping data
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-300">
          Use days-away case counts and total employee
          hours from the same reporting period.
        </p>

        <div className="mt-7 grid gap-6">
          <label
            htmlFor="days-away-case-count"
            className="grid gap-2"
          >
            <span className="text-sm font-bold text-slate-200">
              Cases involving days away from work
            </span>

            <input
              id="days-away-case-count"
              name="daysAwayCases"
              type="number"
              min="0"
              step="1"
              required
              inputMode="numeric"
              value={daysAwayCases}
              onChange={(event) =>
                setDaysAwayCases(
                  event.target.value,
                )
              }
              aria-describedby="days-away-case-count-help"
              className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-base text-white outline-none transition focus:border-emerald-300"
            />

            <span
              id="days-away-case-count-help"
              className="text-xs leading-5 text-slate-400"
            >
              Use the number of recordable cases
              classified as involving days away from
              work, not the number of days lost.
            </span>
          </label>

          <label
            htmlFor="days-away-employee-hours"
            className="grid gap-2"
          >
            <span className="text-sm font-bold text-slate-200">
              Total employee hours worked
            </span>

            <input
              id="days-away-employee-hours"
              name="employeeHoursWorked"
              type="number"
              min="0.01"
              step="0.01"
              required
              inputMode="decimal"
              value={employeeHoursWorked}
              onChange={(event) =>
                setEmployeeHoursWorked(
                  event.target.value,
                )
              }
              aria-describedby="days-away-employee-hours-help"
              className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-base text-white outline-none transition focus:border-emerald-300"
            />

            <span
              id="days-away-employee-hours-help"
              className="text-xs leading-5 text-slate-400"
            >
              Enter total hours worked by all employees
              during the same reporting period.
            </span>
          </label>
        </div>

        <article className="mt-6 rounded-2xl border border-sky-300/20 bg-sky-300/10 p-5">
          <h3 className="font-black text-sky-100">
            Numerator scope
          </h3>

          <p className="mt-2 text-sm leading-7 text-sky-100/90">
            Include cases involving days away from work.
            Do not add cases involving only restricted
            work or job transfer. Those additional cases
            belong in the DART rate.
          </p>
        </article>

        {error ? (
          <p
            role="alert"
            className="mt-5 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-100"
          >
            {error}
          </p>
        ) : null}

        <div className="mt-7 flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
          >
            Calculate Days Away Rate
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
          >
            Reset OSHA example
          </button>
        </div>
      </form>

      <section
        aria-labelledby="days-away-result-heading"
        aria-live="polite"
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
      >
        <h2
          id="days-away-result-heading"
          className="text-2xl font-black"
        >
          Days Away Case Rate result
        </h2>

        {result ? (
          <div className="mt-6 space-y-5">
            <article className="rounded-3xl border border-emerald-300/25 bg-emerald-300/[0.08] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">
                Calculated rate
              </p>

              <p className="mt-3 text-5xl font-black text-white sm:text-6xl">
                {result.daysAwayCaseRate.toFixed(
                  1,
                )}
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-300">
                {result.interpretation}
              </p>
            </article>

            <dl className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 p-5">
                <dt className="text-sm font-bold text-slate-400">
                  Days-away cases
                </dt>

                <dd className="mt-2 text-2xl font-black text-white">
                  {formatNumber(
                    result.daysAwayCases,
                  )}
                </dd>
              </div>

              <div className="rounded-2xl border border-white/10 p-5">
                <dt className="text-sm font-bold text-slate-400">
                  Employee hours
                </dt>

                <dd className="mt-2 text-2xl font-black text-white">
                  {formatNumber(
                    result.employeeHoursWorked,
                  )}
                </dd>
              </div>
            </dl>

            <article className="rounded-2xl bg-slate-950/70 p-5">
              <h3 className="font-black text-white">
                Calculation equation
              </h3>

              <p className="mt-3 break-words text-sm leading-7 text-slate-300">
                {result.equation}
              </p>
            </article>

            <article className="rounded-2xl border border-sky-300/20 bg-sky-300/10 p-5">
              <h3 className="font-black text-sky-100">
                Days Away Rate versus DART
              </h3>

              <p className="mt-3 text-sm leading-7 text-sky-100/90">
                {result.scopeNote}
              </p>
            </article>

            <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5">
              <p className="text-xs leading-6 text-amber-100">
                {result.disclaimer}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <ExportTextButton
                  fileName="days-away-case-rate.txt"
                  title="Days Away Case Rate"
                  summary={result.interpretation}
                  sections={exportSections}
                  disclaimer={result.disclaimer}
                />

                <ExportPdfButton
                  fileName="days-away-case-rate.pdf"
                  title="Days Away Case Rate"
                  summary={result.interpretation}
                  sections={exportSections}
                  disclaimer={result.disclaimer}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Enter the case count and employee hours to
            calculate a standardized rate per 100
            full-time-equivalent employees.
          </p>
        )}
      </section>
    </div>
  );
}
