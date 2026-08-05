export const OSHA_INCIDENT_RATE_BASE_HOURS = 200_000;

export type TrirInput = Readonly<{
  recordableCases: number;
  employeeHoursWorked: number;
}>;

export type TrirResult = Readonly<{
  recordableCases: number;
  employeeHoursWorked: number;
  standardBaseHours: number;
  rate: number;
  roundedRate: number;
  equation: string;
  interpretation: string;
  disclaimer: string;
}>;

function formatNumber(value: number): string {
  const [wholeNumber, fractionalPart] = String(value).split(".");
  const formattedWholeNumber = wholeNumber.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ",",
  );

  return fractionalPart
    ? `${formattedWholeNumber}.${fractionalPart}`
    : formattedWholeNumber;
}

function roundToOneDecimal(value: number): number {
  return Math.round((value + Number.EPSILON) * 10) / 10;
}

function validateRecordableCases(value: number): void {
  if (!Number.isFinite(value)) {
    throw new Error("Recordable cases must be a finite number.");
  }

  if (!Number.isSafeInteger(value) || value < 0) {
    throw new Error(
      "Recordable cases must be a non-negative whole number.",
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

export function calculateTrir(input: TrirInput): TrirResult {
  const { recordableCases, employeeHoursWorked } = input;

  validateRecordableCases(recordableCases);
  validateEmployeeHoursWorked(employeeHoursWorked);

  const rate =
    (recordableCases * OSHA_INCIDENT_RATE_BASE_HOURS) /
    employeeHoursWorked;

  if (!Number.isFinite(rate)) {
    throw new Error(
      "The TRIR result could not be calculated safely.",
    );
  }

  const roundedRate = roundToOneDecimal(rate);

  return {
    recordableCases,
    employeeHoursWorked,
    standardBaseHours: OSHA_INCIDENT_RATE_BASE_HOURS,
    rate,
    roundedRate,
    equation:
      `(${formatNumber(recordableCases)} × ` +
      `${formatNumber(OSHA_INCIDENT_RATE_BASE_HOURS)}) ÷ ` +
      `${formatNumber(employeeHoursWorked)}`,
    interpretation:
      `${roundedRate.toFixed(1)} recordable cases per ` +
      "100 full-time-equivalent workers for the period represented " +
      "by the entered cases and hours.",
    disclaimer:
      "This calculation is an informational incidence-rate estimate. " +
      "It does not determine whether a case is OSHA-recordable, " +
      "certify recordkeeping accuracy, predict individual risk, or " +
      "establish regulatory compliance.",
  };
}
