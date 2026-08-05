"use client";

import {
  type FormEvent,
  useMemo,
  useState,
} from "react";
import { ExportPdfButton } from "@/components/export/export-pdf-button";
import { ExportTextButton } from "@/components/export/export-text-button";
import {
  calculateDartRate,
  type DartRateResult,
} from "./calculate-dart-rate";

function parseRequiredNumber(
  value: string,
  label: string,
): number {
  if (!value.trim()) {
    throw new Error(`${label} is required.`);
  }

  return Number(value);
}

export function DartRateCalculator() {
  const [daysAwayCases, setDaysAwayCases] =
    useState("10");

  const [
    restrictedOrTransferredCases,
    setRestrictedOrTransferredCases,
  ] = useState("12");

  const [
    employeeHoursWorked,
    setEmployeeHoursWorked,
  ] = useState("645089");

  const [result, setResult] =
    useState<DartRateResult | null>(null);

  const [error, setError] = useState("");

  const exportSections = useMemo(() => {
    if (!result) {
      return [];
    }

    return [
      {
        title: "Entered Data",
        items: [
          `Days-away cases entered: ${result.daysAwayCases}`,
          `Restricted or job-transfer cases entered: ${result.restrictedOrTransferredCases}`,
          `Combined DART cases: ${result.totalDartCases}`,
          `Employee hours worked entered: ${result.employeeHoursWorked.toLocaleString("en-US")}`,
          `Standard incidence-rate base: ${result.standardBaseHours.toLocaleString("en-US")} hours`,
        ],
      },
      {
        title: "Calculation",
        items: [
          `Equation: ${result.equation}`,
          `Unrounded result: ${result.rate}`,
          `DART rate rounded to one decimal place: ${result.roundedRate.toFixed(1)}`,
        ],
      },
      {
        title: "Interpretation",
        items: [result.interpretation],
      },
    ];
  }, [result]);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      const calculatedResult = calculateDartRate({
        daysAwayCases: parseRequiredNumber(
          daysAwayCases,
          "Days-away cases",
        ),
        restrictedOrTransferredCases:
          parseRequiredNumber(
            restrictedOrTransferredCases,
            "Restricted or transferred cases",
          ),
        employeeHoursWorked: parseRequiredNumber(
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
          : "Unable to calculate the DART rate.",
      );
    }
  }

  function handleReset() {
    setDaysAwayCases("10");
    setRestrictedOrTransferredCases("12");
    setEmployeeHoursWorked("645089");
    setResult(null);
    setError("");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
      >
        <h2 className="text-2xl font-black">
          Calculate your DART rate
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-300">
          Enter the OSHA 300 Log case counts and employee
          hours worked for the same reporting period.
        </p>

        <div className="mt-7 grid gap-5">
          <label
            htmlFor="dart-days-away-cases"
            className="grid gap-2"
          >
            <span className="text-sm font-bold text-slate-200">
              Cases with days away from work
            </span>

            <input
              id="dart-days-away-cases"
              name="daysAwayCases"
              type="number"
              inputMode="numeric"
              min="0"
              step="1"
              required
              value={daysAwayCases}
              onChange={(event) =>
                setDaysAwayCases(event.target.value)
              }
              aria-describedby="dart-days-away-help"
              className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-base text-white outline-none transition focus:border-emerald-300"
            />

            <span
              id="dart-days-away-help"
              className="text-xs leading-5 text-slate-400"
            >
              Enter the number of cases classified as involving
              days away from work, not the number of days.
            </span>
          </label>

          <label
            htmlFor="dart-restricted-transferred-cases"
            className="grid gap-2"
          >
            <span className="text-sm font-bold text-slate-200">
              Restricted-work or job-transfer cases
            </span>

            <input
              id="dart-restricted-transferred-cases"
              name="restrictedOrTransferredCases"
              type="number"
              inputMode="numeric"
              min="0"
              step="1"
              required
              value={restrictedOrTransferredCases}
              onChange={(event) =>
                setRestrictedOrTransferredCases(
                  event.target.value,
                )
              }
              aria-describedby="dart-restricted-help"
              className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-base text-white outline-none transition focus:border-emerald-300"
            />

            <span
              id="dart-restricted-help"
              className="text-xs leading-5 text-slate-400"
            >
              Enter the number of cases involving job transfer
              or restriction, not the number of restricted days.
            </span>
          </label>

          <label
            htmlFor="dart-employee-hours"
            className="grid gap-2"
          >
            <span className="text-sm font-bold text-slate-200">
              Total employee hours worked
            </span>

            <input
              id="dart-employee-hours"
              name="employeeHoursWorked"
              type="number"
              inputMode="decimal"
              min="0.01"
              step="any"
              required
              value={employeeHoursWorked}
              onChange={(event) =>
                setEmployeeHoursWorked(
                  event.target.value,
                )
              }
              aria-describedby="dart-hours-help"
              className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-base text-white outline-none transition focus:border-emerald-300"
            />

            <span
              id="dart-hours-help"
              className="text-xs leading-5 text-slate-400"
            >
              Use actual hours worked by all included employees
              during the same period as the entered cases.
            </span>
          </label>
        </div>

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
            Calculate DART Rate
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
          >
            Reset example
          </button>
        </div>
      </form>

      <section
        aria-labelledby="dart-result-heading"
        aria-live="polite"
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
      >
        <h2
          id="dart-result-heading"
          className="text-2xl font-black"
        >
          DART rate result
        </h2>

        {result ? (
          <div className="mt-6 space-y-6">
            <div className="rounded-3xl border border-emerald-300/25 bg-emerald-300/[0.08] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
                Days away, restricted, or transferred rate
              </p>

              <p className="mt-3 text-6xl font-black tracking-tight text-white">
                {result.roundedRate.toFixed(1)}
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-300">
                {result.interpretation}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950/70 p-5">
              <h3 className="font-black text-white">
                Calculation details
              </h3>

              <dl className="mt-4 grid gap-4 text-sm">
                <div>
                  <dt className="font-bold text-slate-400">
                    Combined DART cases
                  </dt>
                  <dd className="mt-1 text-slate-200">
                    {result.totalDartCases}
                  </dd>
                </div>

                <div>
                  <dt className="font-bold text-slate-400">
                    Formula with entered values
                  </dt>
                  <dd className="mt-1 break-words text-slate-200">
                    {result.equation}
                  </dd>
                </div>

                <div>
                  <dt className="font-bold text-slate-400">
                    Unrounded result
                  </dt>
                  <dd className="mt-1 text-slate-200">
                    {result.rate}
                  </dd>
                </div>

                <div>
                  <dt className="font-bold text-slate-400">
                    Standard base
                  </dt>
                  <dd className="mt-1 text-slate-200">
                    {result.standardBaseHours.toLocaleString(
                      "en-US",
                    )}{" "}
                    hours
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5">
              <p className="text-xs leading-6 text-amber-100">
                {result.disclaimer}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <ExportTextButton
                  fileName="dart-rate-calculation.txt"
                  title="DART Rate Calculation"
                  summary={result.interpretation}
                  sections={exportSections}
                  disclaimer={result.disclaimer}
                />

                <ExportPdfButton
                  fileName="dart-rate-calculation.pdf"
                  title="DART Rate Calculation"
                  summary={result.interpretation}
                  sections={exportSections}
                  disclaimer={result.disclaimer}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Enter both DART case categories and employee hours,
            then select Calculate DART Rate. The normalized rate
            and equation will appear here.
          </p>
        )}
      </section>
    </div>
  );
}
