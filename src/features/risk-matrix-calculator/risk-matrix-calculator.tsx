"use client";

import {
  type FormEvent,
  useMemo,
  useState,
} from "react";
import { ExportPdfButton } from "@/components/export/export-pdf-button";
import { ExportTextButton } from "@/components/export/export-text-button";
import {
  calculateRiskMatrix,
  type RiskMatrixResult,
} from "./calculate-risk-matrix";

const likelihoodOptions = [
  {
    value: 1,
    label: "1 — Rare",
  },
  {
    value: 2,
    label: "2 — Unlikely",
  },
  {
    value: 3,
    label: "3 — Possible",
  },
  {
    value: 4,
    label: "4 — Likely",
  },
  {
    value: 5,
    label: "5 — Almost certain",
  },
] as const;

const severityOptions = [
  {
    value: 1,
    label: "1 — Negligible",
  },
  {
    value: 2,
    label: "2 — Minor",
  },
  {
    value: 3,
    label: "3 — Moderate",
  },
  {
    value: 4,
    label: "4 — Major",
  },
  {
    value: 5,
    label: "5 — Catastrophic",
  },
] as const;

function parseFactor(
  value: string,
  label: string,
): number {
  if (!value.trim()) {
    throw new Error(`${label} is required.`);
  }

  return Number(value);
}

export function RiskMatrixCalculator() {
  const [
    initialLikelihood,
    setInitialLikelihood,
  ] = useState("4");

  const [
    initialSeverity,
    setInitialSeverity,
  ] = useState("5");

  const [
    residualLikelihood,
    setResidualLikelihood,
  ] = useState("2");

  const [
    residualSeverity,
    setResidualSeverity,
  ] = useState("4");

  const [result, setResult] =
    useState<RiskMatrixResult | null>(null);

  const [error, setError] = useState("");

  const exportSections = useMemo(() => {
    if (!result) {
      return [];
    }

    return [
      {
        title: "Initial Risk",
        items: [
          `Likelihood: ${result.initial.likelihood} — ${result.initial.likelihoodLabel}`,
          `Severity: ${result.initial.severity} — ${result.initial.severityLabel}`,
          `Equation: ${result.initialEquation}`,
          `Risk level: ${result.initial.level}`,
          `Priority guidance: ${result.initial.priority}`,
        ],
      },
      {
        title: "Residual Risk",
        items: [
          `Likelihood: ${result.residual.likelihood} — ${result.residual.likelihoodLabel}`,
          `Severity: ${result.residual.severity} — ${result.residual.severityLabel}`,
          `Equation: ${result.residualEquation}`,
          `Risk level: ${result.residual.level}`,
          `Priority guidance: ${result.residual.priority}`,
        ],
      },
      {
        title: "Modeled Change",
        items: [
          `Direction: ${result.direction}`,
          `Score change: ${result.scoreChange}`,
          `Percentage change: ${result.percentageChange.toFixed(1)}%`,
          result.interpretation,
        ],
      },
    ];
  }, [result]);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      const calculatedResult =
        calculateRiskMatrix({
          initialLikelihood: parseFactor(
            initialLikelihood,
            "Initial likelihood",
          ),
          initialSeverity: parseFactor(
            initialSeverity,
            "Initial severity",
          ),
          residualLikelihood: parseFactor(
            residualLikelihood,
            "Residual likelihood",
          ),
          residualSeverity: parseFactor(
            residualSeverity,
            "Residual severity",
          ),
        });

      setResult(calculatedResult);
      setError("");
    } catch (caughtError) {
      setResult(null);

      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to calculate the risk matrix.",
      );
    }
  }

  function handleReset() {
    setInitialLikelihood("4");
    setInitialSeverity("5");
    setResidualLikelihood("2");
    setResidualSeverity("4");
    setResult(null);
    setError("");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
      >
        <h2 className="text-2xl font-display font-black">
          Assess initial and residual risk
        </h2>

        <p className="mt-3 text-sm leading-7 text-steel-200">
          Select the likelihood and severity before controls,
          then estimate the residual values expected after the
          proposed controls are implemented and verified.
        </p>

        <fieldset className="mt-7 rounded-3xl border border-white/10 p-5">
          <legend className="px-2 text-lg font-display font-black text-orange-500">
            Initial risk
          </legend>

          <div className="grid gap-5">
            <label
              htmlFor="risk-initial-likelihood"
              className="grid gap-2"
            >
              <span className="text-sm font-bold text-slate-200">
                Initial likelihood
              </span>

              <select
                id="risk-initial-likelihood"
                name="initialLikelihood"
                required
                value={initialLikelihood}
                onChange={(event) =>
                  setInitialLikelihood(
                    event.target.value,
                  )
                }
                aria-describedby="risk-likelihood-help"
                className="rounded-2xl border border-white/10 bg-navy-950 px-4 py-3 text-base text-white outline-none transition focus:border-emerald-300"
              >
                {likelihoodOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label
              htmlFor="risk-initial-severity"
              className="grid gap-2"
            >
              <span className="text-sm font-bold text-slate-200">
                Initial severity
              </span>

              <select
                id="risk-initial-severity"
                name="initialSeverity"
                required
                value={initialSeverity}
                onChange={(event) =>
                  setInitialSeverity(
                    event.target.value,
                  )
                }
                aria-describedby="risk-severity-help"
                className="rounded-2xl border border-white/10 bg-navy-950 px-4 py-3 text-base text-white outline-none transition focus:border-emerald-300"
              >
                {severityOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </fieldset>

        <fieldset className="mt-6 rounded-3xl border border-white/10 p-5">
          <legend className="px-2 text-lg font-display font-black text-orange-500">
            Residual risk after controls
          </legend>

          <div className="grid gap-5">
            <label
              htmlFor="risk-residual-likelihood"
              className="grid gap-2"
            >
              <span className="text-sm font-bold text-slate-200">
                Residual likelihood
              </span>

              <select
                id="risk-residual-likelihood"
                name="residualLikelihood"
                required
                value={residualLikelihood}
                onChange={(event) =>
                  setResidualLikelihood(
                    event.target.value,
                  )
                }
                aria-describedby="risk-likelihood-help"
                className="rounded-2xl border border-white/10 bg-navy-950 px-4 py-3 text-base text-white outline-none transition focus:border-emerald-300"
              >
                {likelihoodOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label
              htmlFor="risk-residual-severity"
              className="grid gap-2"
            >
              <span className="text-sm font-bold text-slate-200">
                Residual severity
              </span>

              <select
                id="risk-residual-severity"
                name="residualSeverity"
                required
                value={residualSeverity}
                onChange={(event) =>
                  setResidualSeverity(
                    event.target.value,
                  )
                }
                aria-describedby="risk-severity-help"
                className="rounded-2xl border border-white/10 bg-navy-950 px-4 py-3 text-base text-white outline-none transition focus:border-emerald-300"
              >
                {severityOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </fieldset>

        <div className="mt-5 grid gap-2 text-xs leading-5 text-steel-400">
          <p id="risk-likelihood-help">
            Likelihood describes the estimated chance that the
            hazardous event or exposure will occur.
          </p>

          <p id="risk-severity-help">
            Severity describes the credible consequence rather
            than the most convenient expected outcome.
          </p>
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
            className="rounded-full bg-orange-600 px-6 py-3 text-sm font-display font-black text-slate-950 transition hover:bg-orange-500"
          >
            Calculate Risk Scores
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-display font-black text-white transition hover:bg-white/10"
          >
            Reset example
          </button>
        </div>
      </form>

      <section
        aria-labelledby="risk-result-heading"
        aria-live="polite"
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
      >
        <h2
          id="risk-result-heading"
          className="text-2xl font-display font-black"
        >
          Risk matrix result
        </h2>

        {result ? (
          <div className="mt-6 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-3xl border border-orange-500/25 bg-amber-300/[0.08] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-100">
                  Initial risk
                </p>

                <p className="mt-3 text-5xl font-display font-black text-white">
                  {result.initial.score}
                </p>

                <p className="mt-2 text-lg font-display font-black text-orange-100">
                  {result.initial.level}
                </p>

                <p className="mt-3 text-sm leading-6 text-steel-200">
                  {result.initialEquation}
                </p>
              </article>

              <article className="rounded-3xl border border-orange-500/25 bg-navy-800 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                  Residual risk
                </p>

                <p className="mt-3 text-5xl font-display font-black text-white">
                  {result.residual.score}
                </p>

                <p className="mt-2 text-lg font-display font-black text-orange-100">
                  {result.residual.level}
                </p>

                <p className="mt-3 text-sm leading-6 text-steel-200">
                  {result.residualEquation}
                </p>
              </article>
            </div>

            <div className="rounded-2xl bg-navy-950/70 p-5">
              <h3 className="font-display font-black text-white">
                Modeled control effect
              </h3>

              <p className="mt-3 text-sm leading-7 text-steel-200">
                {result.interpretation}
              </p>

              <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-bold text-steel-400">
                    Direction
                  </dt>

                  <dd className="mt-1 text-slate-200">
                    {result.direction}
                  </dd>
                </div>

                <div>
                  <dt className="font-bold text-steel-400">
                    Percentage change
                  </dt>

                  <dd className="mt-1 text-slate-200">
                    {result.percentageChange.toFixed(1)}%
                  </dd>
                </div>
              </dl>
            </div>

            <div className="grid gap-4">
              <article className="rounded-2xl border border-white/10 p-5">
                <h3 className="font-display font-black text-white">
                  Initial priority
                </h3>

                <p className="mt-3 text-sm leading-7 text-steel-200">
                  {result.initial.priority}
                </p>
              </article>

              <article className="rounded-2xl border border-white/10 p-5">
                <h3 className="font-display font-black text-white">
                  Residual priority
                </h3>

                <p className="mt-3 text-sm leading-7 text-steel-200">
                  {result.residual.priority}
                </p>
              </article>
            </div>

            <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 p-5">
              <p className="text-xs leading-6 text-orange-100">
                {result.disclaimer}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <ExportTextButton
                  fileName="risk-matrix-assessment.txt"
                  title="Risk Matrix Assessment"
                  summary={result.interpretation}
                  sections={exportSections}
                  disclaimer={result.disclaimer}
                />

                <ExportPdfButton
                  fileName="risk-matrix-assessment.pdf"
                  title="Risk Matrix Assessment"
                  summary={result.interpretation}
                  sections={exportSections}
                  disclaimer={result.disclaimer}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm leading-7 text-steel-200">
            Select initial and residual likelihood and severity
            values, then calculate the modeled risk scores.
          </p>
        )}
      </section>
    </div>
  );
}
