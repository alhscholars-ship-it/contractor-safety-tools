import assert from "node:assert/strict";
import test from "node:test";
import {
  calculateSeverityRate,
  OSHA_SEVERITY_RATE_BASE_HOURS,
} from "../../src/features/severity-rate-calculator/calculate-severity-rate.ts";

test("uses the standardized 200,000-hour severity-rate base", () => {
  assert.equal(
    OSHA_SEVERITY_RATE_BASE_HOURS,
    200_000,
  );
});

test("calculates a severity rate of 15.0", () => {
  const result = calculateSeverityRate({
    daysAwayFromWork: 20,
    jobTransferOrRestrictionDays: 10,
    employeeHoursWorked: 400_000,
  });

  assert.equal(result.totalLostOrRestrictedDays, 30);
  assert.equal(result.rate, 15);
  assert.equal(result.roundedRate, 15);
});

test("combines days away and restricted or transfer days", () => {
  const result = calculateSeverityRate({
    daysAwayFromWork: 12,
    jobTransferOrRestrictionDays: 8,
    employeeHoursWorked: 200_000,
  });

  assert.equal(result.totalLostOrRestrictedDays, 20);
  assert.equal(result.rate, 20);
});

test("calculates zero when both day categories are zero", () => {
  const result = calculateSeverityRate({
    daysAwayFromWork: 0,
    jobTransferOrRestrictionDays: 0,
    employeeHoursWorked: 250_000,
  });

  assert.equal(result.totalLostOrRestrictedDays, 0);
  assert.equal(result.rate, 0);
  assert.equal(result.roundedRate, 0);

  assert.match(
    result.interpretation,
    /^0\.0 lost or restricted workdays/,
  );
});

test("rounds the displayed rate to one decimal place", () => {
  const result = calculateSeverityRate({
    daysAwayFromWork: 5,
    jobTransferOrRestrictionDays: 2,
    employeeHoursWorked: 333_333,
  });

  assert.ok(result.rate > 4.2);
  assert.ok(result.rate < 4.21);
  assert.equal(result.roundedRate, 4.2);
});

test("provides a transparent severity-rate equation", () => {
  const result = calculateSeverityRate({
    daysAwayFromWork: 17,
    jobTransferOrRestrictionDays: 9,
    employeeHoursWorked: 1_250_000,
  });

  assert.equal(
    result.equation,
    "((17 + 9) × 200,000) ÷ 1,250,000",
  );
});

test("preserves validated input values", () => {
  const result = calculateSeverityRate({
    daysAwayFromWork: 4,
    jobTransferOrRestrictionDays: 3,
    employeeHoursWorked: 175_500.5,
  });

  assert.equal(result.daysAwayFromWork, 4);

  assert.equal(
    result.jobTransferOrRestrictionDays,
    3,
  );

  assert.equal(
    result.employeeHoursWorked,
    175_500.5,
  );

  assert.equal(
    result.standardBaseHours,
    200_000,
  );
});

test("includes recordkeeping and compliance limitations", () => {
  const result = calculateSeverityRate({
    daysAwayFromWork: 1,
    jobTransferOrRestrictionDays: 1,
    employeeHoursWorked: 200_000,
  });

  assert.match(
    result.disclaimer,
    /does not determine OSHA recordability/,
  );

  assert.match(
    result.disclaimer,
    /validate OSHA 300 Log day counts/,
  );

  assert.match(
    result.disclaimer,
    /establish regulatory compliance/,
  );
});

test("rejects negative days away from work", () => {
  assert.throws(
    () =>
      calculateSeverityRate({
        daysAwayFromWork: -1,
        jobTransferOrRestrictionDays: 0,
        employeeHoursWorked: 200_000,
      }),
    /Days away from work must be a non-negative whole number/,
  );
});

test("rejects fractional days away from work", () => {
  assert.throws(
    () =>
      calculateSeverityRate({
        daysAwayFromWork: 1.5,
        jobTransferOrRestrictionDays: 0,
        employeeHoursWorked: 200_000,
      }),
    /Days away from work must be a non-negative whole number/,
  );
});

test("rejects non-finite days away from work", () => {
  assert.throws(
    () =>
      calculateSeverityRate({
        daysAwayFromWork: Number.NaN,
        jobTransferOrRestrictionDays: 0,
        employeeHoursWorked: 200_000,
      }),
    /Days away from work must be a finite number/,
  );
});

test("rejects negative restriction days", () => {
  assert.throws(
    () =>
      calculateSeverityRate({
        daysAwayFromWork: 0,
        jobTransferOrRestrictionDays: -1,
        employeeHoursWorked: 200_000,
      }),
    /Job transfer or restriction days must be a non-negative whole number/,
  );
});

test("rejects fractional restriction days", () => {
  assert.throws(
    () =>
      calculateSeverityRate({
        daysAwayFromWork: 0,
        jobTransferOrRestrictionDays: 1.5,
        employeeHoursWorked: 200_000,
      }),
    /Job transfer or restriction days must be a non-negative whole number/,
  );
});

test("rejects non-finite restriction days", () => {
  assert.throws(
    () =>
      calculateSeverityRate({
        daysAwayFromWork: 0,
        jobTransferOrRestrictionDays:
          Number.POSITIVE_INFINITY,
        employeeHoursWorked: 200_000,
      }),
    /Job transfer or restriction days must be a finite number/,
  );
});

test("rejects zero employee hours", () => {
  assert.throws(
    () =>
      calculateSeverityRate({
        daysAwayFromWork: 1,
        jobTransferOrRestrictionDays: 1,
        employeeHoursWorked: 0,
      }),
    /Employee hours worked must be greater than zero/,
  );
});

test("rejects negative employee hours", () => {
  assert.throws(
    () =>
      calculateSeverityRate({
        daysAwayFromWork: 1,
        jobTransferOrRestrictionDays: 1,
        employeeHoursWorked: -10,
      }),
    /Employee hours worked must be greater than zero/,
  );
});

test("rejects non-finite employee hours", () => {
  assert.throws(
    () =>
      calculateSeverityRate({
        daysAwayFromWork: 1,
        jobTransferOrRestrictionDays: 1,
        employeeHoursWorked: Number.NaN,
      }),
    /Employee hours worked must be a finite number/,
  );
});

test("rejects employee hours above the safe numeric range", () => {
  assert.throws(
    () =>
      calculateSeverityRate({
        daysAwayFromWork: 1,
        jobTransferOrRestrictionDays: 1,
        employeeHoursWorked:
          Number.MAX_SAFE_INTEGER + 1,
      }),
    /too large to calculate safely/,
  );
});

test("rejects an unsafe combined day count", () => {
  assert.throws(
    () =>
      calculateSeverityRate({
        daysAwayFromWork:
          Number.MAX_SAFE_INTEGER,
        jobTransferOrRestrictionDays: 1,
        employeeHoursWorked: 200_000,
      }),
    /combined lost or restricted day count is too large/,
  );
});
