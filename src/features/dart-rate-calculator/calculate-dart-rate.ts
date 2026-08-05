export const OSHA_DART_RATE_BASE_HOURS = 200_000;

export type DartRateInput = Readonly<{
  daysAwayCases: number;
  restrictedOrTransferredCases: number;
  employeeHoursWorked: number;
}>;

export type DartRateResult = Readonly<{
  daysAwayCases: number;
  restrictedOrTransferredCases: number;
  totalDartCases: number;
  employeeHoursWorked: number;
  standardBaseHours: number;
  rate: number;
  roundedRate: number;
  equation: string;
  interpretation: string;
  disclaimer: string;
}>;

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 20,
    useGrouping: true,
  }).format(value);
}

function roundToOneDecimal(value: number): number {
  return Math.round((value + Number.EPSILON) * 10) / 10;
}

function validateCaseCount(
  value: number,
  label: string,
): void {
  if (!Number.isFinite(value)) {
    throw new Error(`${label} must be a finite number.`);
  }

  if (!Number.isSafeInteger(value) || value < 0) {
    throw new Error(
      `${label} must be a non-negative whole number.`,
    );
  }
}

function validateEmployeeHoursWorked(value: number): void {
  if (!Number.isFinite(value)) {
    throw new Error(
      "Employee hours worked must be a finite number.",
    );
  }

  if (value <= 0) {
    throw new Error(
      "Employee hours worked must be greater than zero.",
    );
  }

  if (value > Number.MAX_SAFE_INTEGER) {
    throw new Error(
      "Employee hours worked is too large to calculate safely.",
    );
  }
}

export function calculateDartRate(
  input: DartRateInput,
): DartRateResult {
  const {
    daysAwayCases,
    restrictedOrTransferredCases,
    employeeHoursWorked,
  } = input;

  validateCaseCount(
    daysAwayCases,
    "Days-away cases",
  );

  validateCaseCount(
    restrictedOrTransferredCases,
    "Restricted or transferred cases",
  );

  validateEmployeeHoursWorked(employeeHoursWorked);

  const totalDartCases =
    daysAwayCases + restrictedOrTransferredCases;

  if (!Number.isSafeInteger(totalDartCases)) {
    throw new Error(
      "The combined DART case count is too large to calculate safely.",
    );
  }

  const rate =
    (totalDartCases * OSHA_DART_RATE_BASE_HOURS) /
    employeeHoursWorked;

  if (!Number.isFinite(rate)) {
    throw new Error(
      "The DART rate could not be calculated safely.",
    );
  }

  const roundedRate = roundToOneDecimal(rate);

  return {
    daysAwayCases,
    restrictedOrTransferredCases,
    totalDartCases,
    employeeHoursWorked,
    standardBaseHours: OSHA_DART_RATE_BASE_HOURS,
    rate,
    roundedRate,
    equation:
      `((${formatNumber(daysAwayCases)} + ` +
      `${formatNumber(restrictedOrTransferredCases)}) × ` +
      `${formatNumber(OSHA_DART_RATE_BASE_HOURS)}) ÷ ` +
      `${formatNumber(employeeHoursWorked)}`,
    interpretation:
      `${roundedRate.toFixed(1)} DART cases per ` +
      "100 full-time-equivalent workers for the period represented " +
      "by the entered cases and employee hours.",
    disclaimer:
      "This calculation is an informational incidence-rate estimate. " +
      "It does not determine whether a case is OSHA-recordable, " +
      "validate OSHA 300 Log classifications or employee-hour totals, " +
      "select an appropriate industry benchmark, predict individual " +
      "risk, or establish regulatory compliance.",
  };
}
