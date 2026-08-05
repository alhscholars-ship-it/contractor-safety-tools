"use client";

import {
  type FormEvent,
  useMemo,
  useState,
} from "react";
import { ExportPdfButton } from "@/components/export/export-pdf-button";
import { ExportTextButton } from "@/components/export/export-text-button";
import {
  calculateTrir,
  type TrirResult,
} from "./calculate-trir";

function parseRequiredNumber(
  value: string,
  label: string,
): number {
  if (!value.trim()) {
    throw new Error(`${label} is required.`);
  }

  return Number(value);
}

export function TrirCalculator() {
  const [recordableCases, setRecordableCases] = useState("5");
  const [employeeHoursWorked, setEmployeeHoursWorked] =
    useState("400000");
  const [result, setResult] = useState<TrirResult | null>(null);
  const [error, setError] = useState("");

  const exportSections = useMemo(() => {
    if (!result) {
      return [];
    }

    return [
      {
        title: "Entered Data",
        items: [
          `OSHA-recordable cases entered: ${result.recordableCases}`,
          `Employee hours worked entered: ${result.employeeHoursWorked.toLocaleString("en-US")}`,
          `Standard incidence-rate base: ${result.standardBaseHours.toLocaleString("en-US")} hours`,
        ],
      },
      {
        title: "Calculation",
        items: [
          `Equation: ${result.equation}`,
          `Unrounded result: ${result.rate}`,
          `TRIR rounded to one decimal place: ${result.roundedRate.toFixed(1)}`,
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
      const calculatedResult = calculateTrir({
        recordableCases: parseRequiredNumber(
          recordableCases,
          "Recordable cases",
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
          : "Unable to calculate the TRIR.",
      );
    }
  }

  function handleReset() {
    setRecordableCases("5");
    setEmployeeHoursWorked("400000");
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
          Calculate your TRIR
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-300">
          Enter the total OSHA-recordable cases and employee
          hours worked for the same reporting period.
        </p>

        <div className="mt-7 grid gap-5">
          <label
            htmlFor="trir-recordable-cases"
            className="grid gap-2"
          >
            <span className="text-sm font-bold text-slate-200">
              Total recordable cases
            </span>

            <input
              id="trir-recordable-cases"
              name="recordableCases"
              type="number"
              inputMode="numeric"
              min="0"
              step="1"
              required
              value={recordableCases}
              onChange={(event) =>
                setRecordableCases(event.target.value)
              }
              aria-describedby="trir-recordable-cases-help"
              className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-base text-white outline-none transition focus:border-emerald-300"
            />

            <span
              id="trir-recordable-cases-help"
              className="text-xs leading-5 text-slate-400"
            >
              Use the total recordable case count for the
              selected period. Enter a whole number.
            </span>
          </label>

          <label
            htmlFor="trir-employee-hours"
            className="grid gap-2"
          >
            <span className="text-sm font-bold text-slate-200">
              Total employee hours worked
            </span>

            <input
              id="trir-employee-hours"
              name="employeeHoursWorked"
              type="number"
              inputMode="decimal"
              min="0.01"
              step="any"
              required
              value={employeeHoursWorked}
              onChange={(event) =>
                setEmployeeHoursWorked(event.target.value)
              }
              aria-describedby="trir-employee-hours-help"
              className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-base text-white outline-none transition focus:border-emerald-300"
            />

            <span
              id="trir-employee-hours-help"
              className="text-xs leading-5 text-slate-400"
            >
              Use actual hours worked by all included employees
              during the same period as the case count.
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
            Calculate TRIR
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
        aria-labelledby="trir-result-heading"
        aria-live="polite"
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
      >
        <h2
          id="trir-result-heading"
          className="text-2xl font-black"
        >
          TRIR result
        </h2>

        {result ? (
          <div className="mt-6 space-y-6">
            <div className="rounded-3xl border border-emerald-300/25 bg-emerald-300/[0.08] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
                Total recordable incident rate
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
                  fileName="trir-calculation.txt"
                  title="TRIR Calculation"
                  summary={result.interpretation}
                  sections={exportSections}
                  disclaimer={result.disclaimer}
                />

                <ExportPdfButton
                  fileName="trir-calculation.pdf"
                  title="TRIR Calculation"
                  summary={result.interpretation}
                  sections={exportSections}
                  disclaimer={result.disclaimer}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Enter the recordable cases and employee hours worked,
            then select Calculate TRIR. The normalized rate and
            equation will appear here.
          </p>
        )}
      </section>
    </div>
  );
}
