export type DaysAwayCaseRateInput = Readonly<{
  daysAwayCases: number;
  employeeHoursWorked: number;
}>;

export type DaysAwayCaseRateResult = Readonly<{
  daysAwayCases: number;
  employeeHoursWorked: number;
  standardizedHours: number;
  daysAwayCaseRate: number;
  rawDaysAwayCaseRate: number;
  equation: string;
  interpretation: string;
  scopeNote: string;
  disclaimer: string;
}>;

const STANDARDIZED_HOURS = 200_000;

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 20,
  }).format(value);
}

function validateDaysAwayCases(
  daysAwayCases: number,
): void {
  if (!Number.isFinite(daysAwayCases)) {
    throw new Error(
      "Days-away case count must be a finite number.",
    );
  }

  if (!Number.isInteger(daysAwayCases)) {
    throw new Error(
      "Days-away case count must be a whole number.",
    );
  }

  if (daysAwayCases < 0) {
    throw new Error(
      "Days-away case count must not be negative.",
    );
  }

  if (
    daysAwayCases >
    Number.MAX_SAFE_INTEGER / STANDARDIZED_HOURS
  ) {
    throw new Error(
      "Days-away case count is too large to calculate safely.",
    );
  }
}

function validateEmployeeHours(
  employeeHoursWorked: number,
): void {
  if (!Number.isFinite(employeeHoursWorked)) {
    throw new Error(
      "Employee hours worked must be a finite number.",
    );
  }

  if (employeeHoursWorked <= 0) {
    throw new Error(
      "Employee hours worked must be greater than zero.",
    );
  }

  if (
    employeeHoursWorked >
    Number.MAX_SAFE_INTEGER
  ) {
    throw new Error(
      "Employee hours worked are too large to calculate safely.",
    );
  }
}

function roundToOneDecimal(value: number): number {
  return Math.round(
    (value + Number.EPSILON) * 10,
  ) / 10;
}

export function calculateDaysAwayCaseRate(
  input: DaysAwayCaseRateInput,
): DaysAwayCaseRateResult {
  const {
    daysAwayCases,
    employeeHoursWorked,
  } = input;

  validateDaysAwayCases(daysAwayCases);
  validateEmployeeHours(employeeHoursWorked);

  const standardizedCaseHours =
    daysAwayCases * STANDARDIZED_HOURS;

  if (
    !Number.isSafeInteger(
      standardizedCaseHours,
    )
  ) {
    throw new Error(
      "Standardized case-hours value is too large to calculate safely.",
    );
  }

  const rawDaysAwayCaseRate =
    standardizedCaseHours /
    employeeHoursWorked;

  if (!Number.isFinite(rawDaysAwayCaseRate)) {
    throw new Error(
      "Days Away Case Rate could not be calculated safely.",
    );
  }

  const daysAwayCaseRate =
    roundToOneDecimal(rawDaysAwayCaseRate);

  return {
    daysAwayCases,
    employeeHoursWorked,
    standardizedHours: STANDARDIZED_HOURS,
    daysAwayCaseRate,
    rawDaysAwayCaseRate,
    equation:
      `${formatNumber(daysAwayCases)} × ` +
      `${formatNumber(STANDARDIZED_HOURS)} ÷ ` +
      `${formatNumber(employeeHoursWorked)} = ` +
      daysAwayCaseRate.toFixed(1),
    interpretation:
      `The calculated Days Away Case Rate is ` +
      `${daysAwayCaseRate.toFixed(1)} cases involving ` +
      `days away from work per 100 full-time-equivalent ` +
      `employees for the measured period.`,
    scopeNote:
      "Use the number of recordable cases involving days away " +
      "from work. Do not include cases involving only restricted " +
      "work or job transfer; those cases are included in the DART " +
      "rate but not in the Days Away Case Rate.",
    disclaimer:
      "This calculator is a recordkeeping and benchmarking aid, " +
      "not a determination of OSHA recordability, compliance, " +
      "citation exposure, insurance liability, or workplace safety. " +
      "Use verified OSHA 300 Log information and total employee " +
      "hours for the same reporting period. Rates can fluctuate " +
      "substantially in establishments with relatively few hours " +
      "or cases and should be interpreted in appropriate context.",
  };
}
