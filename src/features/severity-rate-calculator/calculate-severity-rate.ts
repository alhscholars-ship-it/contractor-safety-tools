export const OSHA_SEVERITY_RATE_BASE_HOURS = 200_000;

export type SeverityRateInput = Readonly<{
  daysAwayFromWork: number;
  jobTransferOrRestrictionDays: number;
  employeeHoursWorked: number;
}>;

export type SeverityRateResult = Readonly<{
  daysAwayFromWork: number;
  jobTransferOrRestrictionDays: number;
  totalLostOrRestrictedDays: number;
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

function validateDayCount(
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

export function calculateSeverityRate(
  input: SeverityRateInput,
): SeverityRateResult {
  const {
    daysAwayFromWork,
    jobTransferOrRestrictionDays,
    employeeHoursWorked,
  } = input;

  validateDayCount(
    daysAwayFromWork,
    "Days away from work",
  );

  validateDayCount(
    jobTransferOrRestrictionDays,
    "Job transfer or restriction days",
  );

  validateEmployeeHoursWorked(employeeHoursWorked);

  const totalLostOrRestrictedDays =
    daysAwayFromWork +
    jobTransferOrRestrictionDays;

  if (!Number.isSafeInteger(totalLostOrRestrictedDays)) {
    throw new Error(
      "The combined lost or restricted day count is too large to calculate safely.",
    );
  }

  const rate =
    (
      totalLostOrRestrictedDays *
      OSHA_SEVERITY_RATE_BASE_HOURS
    ) /
    employeeHoursWorked;

  if (!Number.isFinite(rate)) {
    throw new Error(
      "The severity rate could not be calculated safely.",
    );
  }

  const roundedRate = roundToOneDecimal(rate);

  return {
    daysAwayFromWork,
    jobTransferOrRestrictionDays,
    totalLostOrRestrictedDays,
    employeeHoursWorked,
    standardBaseHours:
      OSHA_SEVERITY_RATE_BASE_HOURS,
    rate,
    roundedRate,
    equation:
      `((${formatNumber(daysAwayFromWork)} + ` +
      `${formatNumber(jobTransferOrRestrictionDays)}) × ` +
      `${formatNumber(OSHA_SEVERITY_RATE_BASE_HOURS)}) ÷ ` +
      `${formatNumber(employeeHoursWorked)}`,
    interpretation:
      `${roundedRate.toFixed(1)} lost or restricted workdays per ` +
      "100 full-time-equivalent workers for the period represented " +
      "by the entered days and employee hours.",
    disclaimer:
      "This severity-rate calculation is an informational measurement aid. " +
      "It does not determine OSHA recordability, validate OSHA 300 Log day " +
      "counts or employee-hour totals, replace current recordkeeping rules, " +
      "measure every form of harm, predict individual risk, or establish " +
      "regulatory compliance.",
  };
}
