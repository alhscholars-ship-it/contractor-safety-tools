import assert from "node:assert/strict";
import test from "node:test";
import {
  calculateDartRate,
  OSHA_DART_RATE_BASE_HOURS,
} from "../../src/features/dart-rate-calculator/calculate-dart-rate.ts";

test("uses the standardized 200,000-hour DART base", () => {
  assert.equal(OSHA_DART_RATE_BASE_HOURS, 200_000);
});

test("calculates the OSHA example as a DART rate of 6.8", () => {
  const result = calculateDartRate({
    daysAwayCases: 10,
    restrictedOrTransferredCases: 12,
    employeeHoursWorked: 645_089,
  });

  assert.equal(result.totalDartCases, 22);
  assert.equal(result.roundedRate, 6.8);
});

test("combines days-away and restricted or transferred cases", () => {
  const result = calculateDartRate({
    daysAwayCases: 3,
    restrictedOrTransferredCases: 2,
    employeeHoursWorked: 400_000,
  });

  assert.equal(result.totalDartCases, 5);
  assert.equal(result.rate, 2.5);
  assert.equal(result.roundedRate, 2.5);
});

test("calculates zero when both case categories are zero", () => {
  const result = calculateDartRate({
    daysAwayCases: 0,
    restrictedOrTransferredCases: 0,
    employeeHoursWorked: 250_000,
  });

  assert.equal(result.totalDartCases, 0);
  assert.equal(result.rate, 0);
  assert.equal(result.roundedRate, 0);
  assert.match(result.interpretation, /^0\.0 DART cases/);
});

test("rounds the displayed DART rate to one decimal place", () => {
  const result = calculateDartRate({
    daysAwayCases: 4,
    restrictedOrTransferredCases: 3,
    employeeHoursWorked: 333_333,
  });

  assert.ok(result.rate > 4.2);
  assert.ok(result.rate < 4.21);
  assert.equal(result.roundedRate, 4.2);
});

test("provides a transparent calculation equation", () => {
  const result = calculateDartRate({
    daysAwayCases: 7,
    restrictedOrTransferredCases: 5,
    employeeHoursWorked: 1_250_000,
  });

  assert.equal(
    result.equation,
    "((7 + 5) × 200,000) ÷ 1,250,000",
  );
});

test("preserves validated input values", () => {
  const result = calculateDartRate({
    daysAwayCases: 2,
    restrictedOrTransferredCases: 1,
    employeeHoursWorked: 175_500.5,
  });

  assert.equal(result.daysAwayCases, 2);
  assert.equal(result.restrictedOrTransferredCases, 1);
  assert.equal(result.employeeHoursWorked, 175_500.5);
  assert.equal(result.standardBaseHours, 200_000);
});

test("includes recordkeeping and compliance limitations", () => {
  const result = calculateDartRate({
    daysAwayCases: 1,
    restrictedOrTransferredCases: 1,
    employeeHoursWorked: 200_000,
  });

  assert.match(
    result.disclaimer,
    /does not determine whether a case is OSHA-recordable/,
  );

  assert.match(
    result.disclaimer,
    /validate OSHA 300 Log classifications/,
  );

  assert.match(
    result.disclaimer,
    /establish regulatory compliance/,
  );
});

test("rejects negative days-away cases", () => {
  assert.throws(
    () =>
      calculateDartRate({
        daysAwayCases: -1,
        restrictedOrTransferredCases: 0,
        employeeHoursWorked: 200_000,
      }),
    /Days-away cases must be a non-negative whole number/,
  );
});

test("rejects fractional days-away cases", () => {
  assert.throws(
    () =>
      calculateDartRate({
        daysAwayCases: 1.5,
        restrictedOrTransferredCases: 0,
        employeeHoursWorked: 200_000,
      }),
    /Days-away cases must be a non-negative whole number/,
  );
});

test("rejects non-finite days-away cases", () => {
  assert.throws(
    () =>
      calculateDartRate({
        daysAwayCases: Number.NaN,
        restrictedOrTransferredCases: 0,
        employeeHoursWorked: 200_000,
      }),
    /Days-away cases must be a finite number/,
  );
});

test("rejects negative restricted or transferred cases", () => {
  assert.throws(
    () =>
      calculateDartRate({
        daysAwayCases: 0,
        restrictedOrTransferredCases: -1,
        employeeHoursWorked: 200_000,
      }),
    /Restricted or transferred cases must be a non-negative whole number/,
  );
});

test("rejects fractional restricted or transferred cases", () => {
  assert.throws(
    () =>
      calculateDartRate({
        daysAwayCases: 0,
        restrictedOrTransferredCases: 1.5,
        employeeHoursWorked: 200_000,
      }),
    /Restricted or transferred cases must be a non-negative whole number/,
  );
});

test("rejects non-finite restricted or transferred cases", () => {
  assert.throws(
    () =>
      calculateDartRate({
        daysAwayCases: 0,
        restrictedOrTransferredCases:
          Number.POSITIVE_INFINITY,
        employeeHoursWorked: 200_000,
      }),
    /Restricted or transferred cases must be a finite number/,
  );
});

test("rejects zero employee hours", () => {
  assert.throws(
    () =>
      calculateDartRate({
        daysAwayCases: 1,
        restrictedOrTransferredCases: 1,
        employeeHoursWorked: 0,
      }),
    /Employee hours worked must be greater than zero/,
  );
});

test("rejects negative employee hours", () => {
  assert.throws(
    () =>
      calculateDartRate({
        daysAwayCases: 1,
        restrictedOrTransferredCases: 1,
        employeeHoursWorked: -10,
      }),
    /Employee hours worked must be greater than zero/,
  );
});

test("rejects non-finite employee hours", () => {
  assert.throws(
    () =>
      calculateDartRate({
        daysAwayCases: 1,
        restrictedOrTransferredCases: 1,
        employeeHoursWorked: Number.NaN,
      }),
    /Employee hours worked must be a finite number/,
  );
});

test("rejects employee hours above the safe numeric range", () => {
  assert.throws(
    () =>
      calculateDartRate({
        daysAwayCases: 1,
        restrictedOrTransferredCases: 1,
        employeeHoursWorked:
          Number.MAX_SAFE_INTEGER + 1,
      }),
    /too large to calculate safely/,
  );
});

test("rejects an unsafe combined case count", () => {
  assert.throws(
    () =>
      calculateDartRate({
        daysAwayCases: Number.MAX_SAFE_INTEGER,
        restrictedOrTransferredCases: 1,
        employeeHoursWorked: 200_000,
      }),
    /combined DART case count is too large/,
  );
});
