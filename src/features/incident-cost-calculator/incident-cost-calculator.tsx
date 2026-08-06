"use client";

import {
  type FormEvent,
  useMemo,
  useState,
} from "react";
import { ExportPdfButton } from "@/components/export/export-pdf-button";
import { ExportTextButton } from "@/components/export/export-text-button";
import {
  calculateIncidentCost,
  type IncidentCostResult,
} from "./calculate-incident-cost";

type NumericFieldProps = Readonly<{
  id: string;
  label: string;
  value: string;
  help: string;
  step?: string;
  onChange: (value: string) => void;
}>;

function NumericField({
  id,
  label,
  value,
  help,
  step = "0.01",
  onChange,
}: NumericFieldProps) {
  const helpId = `${id}-help`;

  return (
    <label
      htmlFor={id}
      className="grid gap-2"
    >
      <span className="text-sm font-bold text-slate-200">
        {label}
      </span>

      <input
        id={id}
        name={id}
        type="number"
        min="0"
        step={step}
        required
        inputMode="decimal"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        aria-describedby={helpId}
        className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-base text-white outline-none transition focus:border-emerald-300"
      />

      <span
        id={helpId}
        className="text-xs leading-5 text-slate-400"
      >
        {help}
      </span>
    </label>
  );
}

function parseRequiredNumber(
  value: string,
  label: string,
): number {
  if (!value.trim()) {
    throw new Error(`${label} is required.`);
  }

  return Number(value);
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function IncidentCostCalculator() {
  const [medicalCosts, setMedicalCosts] =
    useState("25000");

  const [
    wageReplacementCosts,
    setWageReplacementCosts,
  ] = useState("10000");

  const [
    propertyDamageCosts,
    setPropertyDamageCosts,
  ] = useState("5000");

  const [
    emergencyResponseCosts,
    setEmergencyResponseCosts,
  ] = useState("1500");

  const [
    replacementLaborCosts,
    setReplacementLaborCosts,
  ] = useState("3000");

  const [
    legalAndAdministrativeCosts,
    setLegalAndAdministrativeCosts,
  ] = useState("2000");

  const [
    otherDirectCosts,
    setOtherDirectCosts,
  ] = useState("500");

  const [
    investigationHours,
    setInvestigationHours,
  ] = useState("40");

  const [
    investigationHourlyCost,
    setInvestigationHourlyCost,
  ] = useState("60");

  const [
    lostProductivityHours,
    setLostProductivityHours,
  ] = useState("120");

  const [
    productivityHourlyValue,
    setProductivityHourlyValue,
  ] = useState("85");

  const [
    additionalIndirectCostMultiplier,
    setAdditionalIndirectCostMultiplier,
  ] = useState("0.75");

  const [result, setResult] =
    useState<IncidentCostResult | null>(null);

  const [error, setError] = useState("");

  const exportSections = useMemo(() => {
    if (!result) {
      return [];
    }

    return [
      {
        title: "Entered Direct and Immediate Costs",
        items: [
          `Medical costs: ${formatCurrency(result.medicalCosts)}`,
          `Wage replacement costs: ${formatCurrency(result.wageReplacementCosts)}`,
          `Property damage costs: ${formatCurrency(result.propertyDamageCosts)}`,
          `Emergency response costs: ${formatCurrency(result.emergencyResponseCosts)}`,
          `Replacement labor costs: ${formatCurrency(result.replacementLaborCosts)}`,
          `Legal and administrative costs: ${formatCurrency(result.legalAndAdministrativeCosts)}`,
          `Other entered costs: ${formatCurrency(result.otherDirectCosts)}`,
          `Subtotal: ${formatCurrency(result.directCostSubtotal)}`,
        ],
      },
      {
        title: "Documented Indirect Costs",
        items: [
          `Investigation cost: ${result.investigationCostEquation}`,
          `Productivity loss cost: ${result.productivityLossEquation}`,
          `Subtotal: ${formatCurrency(result.documentedIndirectCostSubtotal)}`,
        ],
      },
      {
        title: "Modeled Additional Indirect Costs",
        items: [
          `Documented cost total: ${formatCurrency(result.documentedCostTotal)}`,
          `Selected multiplier: ${result.additionalIndirectCostMultiplier}`,
          `Additional indirect costs: ${formatCurrency(result.estimatedAdditionalIndirectCosts)}`,
          `Estimated total incident cost: ${formatCurrency(result.estimatedTotalIncidentCost)}`,
          `Equation: ${result.totalCostEquation}`,
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
        calculateIncidentCost({
          medicalCosts: parseRequiredNumber(
            medicalCosts,
            "Medical costs",
          ),
          wageReplacementCosts:
            parseRequiredNumber(
              wageReplacementCosts,
              "Wage replacement costs",
            ),
          propertyDamageCosts:
            parseRequiredNumber(
              propertyDamageCosts,
              "Property damage costs",
            ),
          emergencyResponseCosts:
            parseRequiredNumber(
              emergencyResponseCosts,
              "Emergency response costs",
            ),
          replacementLaborCosts:
            parseRequiredNumber(
              replacementLaborCosts,
              "Replacement labor costs",
            ),
          legalAndAdministrativeCosts:
            parseRequiredNumber(
              legalAndAdministrativeCosts,
              "Legal and administrative costs",
            ),
          otherDirectCosts:
            parseRequiredNumber(
              otherDirectCosts,
              "Other entered costs",
            ),
          investigationHours:
            parseRequiredNumber(
              investigationHours,
              "Investigation hours",
            ),
          investigationHourlyCost:
            parseRequiredNumber(
              investigationHourlyCost,
              "Investigation hourly cost",
            ),
          lostProductivityHours:
            parseRequiredNumber(
              lostProductivityHours,
              "Lost productivity hours",
            ),
          productivityHourlyValue:
            parseRequiredNumber(
              productivityHourlyValue,
              "Productivity hourly value",
            ),
          additionalIndirectCostMultiplier:
            parseRequiredNumber(
              additionalIndirectCostMultiplier,
              "Additional indirect cost multiplier",
            ),
        });

      setResult(calculatedResult);
      setError("");
    } catch (caughtError) {
      setResult(null);

      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to calculate incident costs.",
      );
    }
  }

  function handleReset() {
    setMedicalCosts("25000");
    setWageReplacementCosts("10000");
    setPropertyDamageCosts("5000");
    setEmergencyResponseCosts("1500");
    setReplacementLaborCosts("3000");
    setLegalAndAdministrativeCosts("2000");
    setOtherDirectCosts("500");
    setInvestigationHours("40");
    setInvestigationHourlyCost("60");
    setLostProductivityHours("120");
    setProductivityHourlyValue("85");
    setAdditionalIndirectCostMultiplier("0.75");
    setResult(null);
    setError("");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
      >
        <h2 className="text-2xl font-black">
          Enter documented and estimated costs
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-300">
          Use verified organizational records where available.
          Enter zero when a category does not apply or no amount
          is currently known.
        </p>

        <fieldset className="mt-7 rounded-3xl border border-white/10 p-5">
          <legend className="px-2 text-lg font-black text-emerald-200">
            Direct and immediate cost inputs
          </legend>

          <div className="grid gap-5 md:grid-cols-2">
            <NumericField
              id="incident-medical-costs"
              label="Medical costs (USD)"
              value={medicalCosts}
              help="Medical treatment and related documented expenses."
              onChange={setMedicalCosts}
            />

            <NumericField
              id="incident-wage-replacement-costs"
              label="Wage replacement costs (USD)"
              value={wageReplacementCosts}
              help="Workers’ compensation or other wage-replacement amounts."
              onChange={setWageReplacementCosts}
            />

            <NumericField
              id="incident-property-damage-costs"
              label="Property damage costs (USD)"
              value={propertyDamageCosts}
              help="Repair or replacement amounts entered from internal records."
              onChange={setPropertyDamageCosts}
            />

            <NumericField
              id="incident-emergency-response-costs"
              label="Emergency response costs (USD)"
              value={emergencyResponseCosts}
              help="Emergency services, cleanup, containment, or response expenses."
              onChange={setEmergencyResponseCosts}
            />

            <NumericField
              id="incident-replacement-labor-costs"
              label="Replacement labor costs (USD)"
              value={replacementLaborCosts}
              help="Temporary labor, overtime, onboarding, or replacement staffing."
              onChange={setReplacementLaborCosts}
            />

            <NumericField
              id="incident-legal-administrative-costs"
              label="Legal and administrative costs (USD)"
              value={legalAndAdministrativeCosts}
              help="Documented legal, claim-management, and administrative expenses."
              onChange={setLegalAndAdministrativeCosts}
            />

            <NumericField
              id="incident-other-direct-costs"
              label="Other entered costs (USD)"
              value={otherDirectCosts}
              help="Other known immediate amounts not captured above."
              onChange={setOtherDirectCosts}
            />
          </div>
        </fieldset>

        <fieldset className="mt-6 rounded-3xl border border-white/10 p-5">
          <legend className="px-2 text-lg font-black text-emerald-200">
            Documented indirect cost inputs
          </legend>

          <div className="grid gap-5 md:grid-cols-2">
            <NumericField
              id="incident-investigation-hours"
              label="Investigation hours"
              value={investigationHours}
              help="Combined supervisor, safety, management, and administrative time."
              step="0.25"
              onChange={setInvestigationHours}
            />

            <NumericField
              id="incident-investigation-hourly-cost"
              label="Investigation hourly cost (USD)"
              value={investigationHourlyCost}
              help="Loaded hourly cost or another internally approved hourly value."
              onChange={setInvestigationHourlyCost}
            />

            <NumericField
              id="incident-productivity-hours"
              label="Lost productivity hours"
              value={lostProductivityHours}
              help="Estimated work hours lost through disruption, delay, or reduced output."
              step="0.25"
              onChange={setLostProductivityHours}
            />

            <NumericField
              id="incident-productivity-hourly-value"
              label="Productivity hourly value (USD)"
              value={productivityHourlyValue}
              help="Approved hourly labor, contribution, or production value."
              onChange={setProductivityHourlyValue}
            />
          </div>
        </fieldset>

        <fieldset className="mt-6 rounded-3xl border border-white/10 p-5">
          <legend className="px-2 text-lg font-black text-emerald-200">
            Additional indirect-cost assumption
          </legend>

          <NumericField
            id="incident-indirect-cost-multiplier"
            label="Additional indirect cost multiplier"
            value={additionalIndirectCostMultiplier}
            help="Example: 0.75 estimates additional indirect costs equal to 75% of documented costs. Use an organization-approved assumption."
            step="0.01"
            onChange={setAdditionalIndirectCostMultiplier}
          />
        </fieldset>

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
            Calculate Incident Cost
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
        aria-labelledby="incident-cost-result-heading"
        aria-live="polite"
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
      >
        <h2
          id="incident-cost-result-heading"
          className="text-2xl font-black"
        >
          Estimated incident cost
        </h2>

        {result ? (
          <div className="mt-6 space-y-5">
            <article className="rounded-3xl border border-emerald-300/25 bg-emerald-300/[0.08] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">
                Estimated total
              </p>

              <p className="mt-3 break-words text-4xl font-black text-white sm:text-5xl">
                {formatCurrency(
                  result.estimatedTotalIncidentCost,
                )}
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-300">
                {result.interpretation}
              </p>
            </article>

            <dl className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 p-5">
                <dt className="text-sm font-bold text-slate-400">
                  Entered cost subtotal
                </dt>

                <dd className="mt-2 text-2xl font-black text-white">
                  {formatCurrency(
                    result.directCostSubtotal,
                  )}
                </dd>
              </div>

              <div className="rounded-2xl border border-white/10 p-5">
                <dt className="text-sm font-bold text-slate-400">
                  Documented indirect subtotal
                </dt>

                <dd className="mt-2 text-2xl font-black text-white">
                  {formatCurrency(
                    result.documentedIndirectCostSubtotal,
                  )}
                </dd>
              </div>

              <div className="rounded-2xl border border-white/10 p-5">
                <dt className="text-sm font-bold text-slate-400">
                  Documented cost total
                </dt>

                <dd className="mt-2 text-2xl font-black text-white">
                  {formatCurrency(
                    result.documentedCostTotal,
                  )}
                </dd>
              </div>

              <div className="rounded-2xl border border-white/10 p-5">
                <dt className="text-sm font-bold text-slate-400">
                  Additional modeled indirect costs
                </dt>

                <dd className="mt-2 text-2xl font-black text-white">
                  {formatCurrency(
                    result.estimatedAdditionalIndirectCosts,
                  )}
                </dd>
              </div>
            </dl>

            <article className="rounded-2xl bg-slate-950/70 p-5">
              <h3 className="font-black text-white">
                Calculation trail
              </h3>

              <div className="mt-4 grid gap-4 text-sm leading-7 text-slate-300">
                <p>
                  <strong className="text-slate-100">
                    Investigation:
                  </strong>{" "}
                  {result.investigationCostEquation}
                </p>

                <p>
                  <strong className="text-slate-100">
                    Productivity:
                  </strong>{" "}
                  {result.productivityLossEquation}
                </p>

                <p>
                  <strong className="text-slate-100">
                    Total:
                  </strong>{" "}
                  {result.totalCostEquation}
                </p>
              </div>
            </article>

            <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5">
              <p className="text-xs leading-6 text-amber-100">
                {result.disclaimer}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <ExportTextButton
                  fileName="incident-cost-estimate.txt"
                  title="Incident Cost Estimate"
                  summary={result.interpretation}
                  sections={exportSections}
                  disclaimer={result.disclaimer}
                />

                <ExportPdfButton
                  fileName="incident-cost-estimate.pdf"
                  title="Incident Cost Estimate"
                  summary={result.interpretation}
                  sections={exportSections}
                  disclaimer={result.disclaimer}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Enter documented cost amounts, labor hours, hourly
            values, and an approved indirect-cost assumption to
            create a transparent estimate.
          </p>
        )}
      </section>
    </div>
  );
}
