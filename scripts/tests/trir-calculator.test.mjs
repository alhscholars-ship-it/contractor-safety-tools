import assert from "node:assert/strict";
import test from "node:test";
import {
  calculateTrir,
  OSHA_INCIDENT_RATE_BASE_HOURS,
} from "../../src/features/trir-calculator/calculate-trir.ts";

test("uses the standardized 200,000-hour incidence-rate base", () => {
  assert.equal(OSHA_INCIDENT_RATE_BASE_HOURS, 200_000);
});

test("calculates a TRIR of 2.5", () => {
  const result = calculateTrir({
    recordableCases: 5,
    employeeHoursWorked: 400_000,
  });

  assert.equal(result.rate, 2.5);
  assert.equal(result.roundedRate, 2.5);
  assert.equal(result.standardBaseHours, 200_000);
});

test("calculates zero when there are no recordable cases", () => {
  const result = calculateTrir({
    recordableCases: 0,
    employeeHoursWorked: 250_000,
  });

  assert.equal(result.rate, 0);
  assert.equal(result.roundedRate, 0);
  assert.match(result.interpretation, /^0\.0 recordable cases/);
});

test("normalizes one case across 100,000 hours", () => {
  const result = calculateTrir({
    recordableCases: 1,
    employeeHoursWorked: 100_000,
  });

  assert.equal(result.rate, 2);
  assert.equal(result.roundedRate, 2);
});

test("rounds the displayed rate to one decimal place", () => {
  const result = calculateTrir({
    recordableCases: 7,
    employeeHoursWorked: 333_333,
  });

  assert.ok(result.rate > 4.2);
  assert.ok(result.rate < 4.21);
  assert.equal(result.roundedRate, 4.2);
  assert.match(result.interpretation, /^4\.2 recordable cases/);
});

test("provides a transparent calculation equation", () => {
  const result = calculateTrir({
    recordableCases: 12,
    employeeHoursWorked: 1_250_000,
  });

  assert.equal(
    result.equation,
    "(12 × 200,000) ÷ 1,250,000",
  );
});

test("preserves the validated input values in the result", () => {
  const result = calculateTrir({
    recordableCases: 3,
    employeeHoursWorked: 175_500.5,
  });

  assert.equal(result.recordableCases, 3);
  assert.equal(result.employeeHoursWorked, 175_500.5);
});

test("includes recordkeeping and compliance limitations", () => {
  const result = calculateTrir({
    recordableCases: 2,
    employeeHoursWorked: 200_000,
  });

  assert.match(
    result.disclaimer,
    /does not determine whether a case is OSHA-recordable/,
  );

  assert.match(
    result.disclaimer,
    /establish regulatory compliance/,
  );
});

test("rejects a negative recordable-case count", () => {
  assert.throws(
    () =>
      calculateTrir({
        recordableCases: -1,
        employeeHoursWorked: 200_000,
      }),
    /non-negative whole number/,
  );
});

test("rejects a fractional recordable-case count", () => {
  assert.throws(
    () =>
      calculateTrir({
        recordableCases: 1.5,
        employeeHoursWorked: 200_000,
      }),
    /non-negative whole number/,
  );
});

test("rejects a non-finite recordable-case count", () => {
  assert.throws(
    () =>
      calculateTrir({
        recordableCases: Number.NaN,
        employeeHoursWorked: 200_000,
      }),
    /finite number/,
  );

  assert.throws(
    () =>
      calculateTrir({
        recordableCases: Number.POSITIVE_INFINITY,
        employeeHoursWorked: 200_000,
      }),
    /finite number/,
  );
});

test("rejects zero employee hours", () => {
  assert.throws(
    () =>
      calculateTrir({
        recordableCases: 1,
        employeeHoursWorked: 0,
      }),
    /greater than zero/,
  );
});

test("rejects negative employee hours", () => {
  assert.throws(
    () =>
      calculateTrir({
        recordableCases: 1,
        employeeHoursWorked: -10,
      }),
    /greater than zero/,
  );
});

test("rejects non-finite employee hours", () => {
  assert.throws(
    () =>
      calculateTrir({
        recordableCases: 1,
        employeeHoursWorked: Number.NaN,
      }),
    /finite number/,
  );

  assert.throws(
    () =>
      calculateTrir({
        recordableCases: 1,
        employeeHoursWorked: Number.POSITIVE_INFINITY,
      }),
    /finite number/,
  );
});

test("rejects employee hours above the safe numeric range", () => {
  assert.throws(
    () =>
      calculateTrir({
        recordableCases: 1,
        employeeHoursWorked: Number.MAX_SAFE_INTEGER + 1,
      }),
    /too large to calculate safely/,
  );
});
