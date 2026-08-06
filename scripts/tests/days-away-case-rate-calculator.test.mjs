import assert from "node:assert/strict";
import test from "node:test";
import {
  calculateDaysAwayCaseRate,
} from "../../src/features/days-away-case-rate-calculator/calculate-days-away-case-rate.ts";

test("uses the standardized 200,000-hour incidence-rate base", () => {
  const result =
    calculateDaysAwayCaseRate({
      daysAwayCases: 1,
      employeeHoursWorked: 200_000,
    });

  assert.equal(
    result.standardizedHours,
    200_000,
  );

  assert.equal(result.daysAwayCaseRate, 1);
});

test("calculates the OSHA example as a rate of 11.0", () => {
  const result =
    calculateDaysAwayCaseRate({
      daysAwayCases: 25,
      employeeHoursWorked: 452_680,
    });

  assert.equal(
    result.daysAwayCaseRate,
    11,
  );

  assert.equal(
    result.equation,
    "25 × 200,000 ÷ 452,680 = 11.0",
  );
});

test("calculates zero when there are no days-away cases", () => {
  const result =
    calculateDaysAwayCaseRate({
      daysAwayCases: 0,
      employeeHoursWorked: 500_000,
    });

  assert.equal(result.daysAwayCaseRate, 0);
  assert.equal(result.rawDaysAwayCaseRate, 0);
});

test("normalizes one case across 100,000 hours", () => {
  const result =
    calculateDaysAwayCaseRate({
      daysAwayCases: 1,
      employeeHoursWorked: 100_000,
    });

  assert.equal(result.daysAwayCaseRate, 2);
});

test("rounds the displayed rate to one decimal place", () => {
  const result =
    calculateDaysAwayCaseRate({
      daysAwayCases: 3,
      employeeHoursWorked: 80_000,
    });

  assert.equal(
    result.rawDaysAwayCaseRate,
    7.5,
  );

  assert.equal(result.daysAwayCaseRate, 7.5);
  assert.match(result.equation, /= 7\.5$/);
});

test("rounds a repeating result to one decimal place", () => {
  const result =
    calculateDaysAwayCaseRate({
      daysAwayCases: 1,
      employeeHoursWorked: 300_000,
    });

  assert.equal(
    result.daysAwayCaseRate,
    0.7,
  );
});

test("provides a transparent calculation equation", () => {
  const result =
    calculateDaysAwayCaseRate({
      daysAwayCases: 4,
      employeeHoursWorked: 320_000,
    });

  assert.equal(
    result.equation,
    "4 × 200,000 ÷ 320,000 = 2.5",
  );
});

test("preserves validated input values", () => {
  const result =
    calculateDaysAwayCaseRate({
      daysAwayCases: 7,
      employeeHoursWorked: 650_000,
    });

  assert.equal(result.daysAwayCases, 7);

  assert.equal(
    result.employeeHoursWorked,
    650_000,
  );
});

test("explains the standardized interpretation", () => {
  const result =
    calculateDaysAwayCaseRate({
      daysAwayCases: 2,
      employeeHoursWorked: 200_000,
    });

  assert.match(
    result.interpretation,
    /2\.0 cases involving days away from work per 100 full-time-equivalent employees/,
  );
});

test("distinguishes the rate from DART", () => {
  const result =
    calculateDaysAwayCaseRate({
      daysAwayCases: 2,
      employeeHoursWorked: 200_000,
    });

  assert.match(
    result.scopeNote,
    /Do not include cases involving only restricted work or job transfer/,
  );

  assert.match(
    result.scopeNote,
    /included in the DART rate/,
  );
});

test("includes recordkeeping and compliance limitations", () => {
  const result =
    calculateDaysAwayCaseRate({
      daysAwayCases: 2,
      employeeHoursWorked: 200_000,
    });

  assert.match(
    result.disclaimer,
    /not a determination of OSHA recordability/,
  );

  assert.match(
    result.disclaimer,
    /verified OSHA 300 Log information/,
  );

  assert.match(
    result.disclaimer,
    /few hours or cases/,
  );
});

test("rejects a negative days-away case count", () => {
  assert.throws(
    () =>
      calculateDaysAwayCaseRate({
        daysAwayCases: -1,
        employeeHoursWorked: 200_000,
      }),
    /Days-away case count must not be negative/,
  );
});

test("rejects a fractional days-away case count", () => {
  assert.throws(
    () =>
      calculateDaysAwayCaseRate({
        daysAwayCases: 1.5,
        employeeHoursWorked: 200_000,
      }),
    /Days-away case count must be a whole number/,
  );
});

test("rejects a non-finite days-away case count", () => {
  assert.throws(
    () =>
      calculateDaysAwayCaseRate({
        daysAwayCases: Number.NaN,
        employeeHoursWorked: 200_000,
      }),
    /Days-away case count must be a finite number/,
  );
});

test("rejects zero employee hours", () => {
  assert.throws(
    () =>
      calculateDaysAwayCaseRate({
        daysAwayCases: 1,
        employeeHoursWorked: 0,
      }),
    /Employee hours worked must be greater than zero/,
  );
});

test("rejects negative employee hours", () => {
  assert.throws(
    () =>
      calculateDaysAwayCaseRate({
        daysAwayCases: 1,
        employeeHoursWorked: -1,
      }),
    /Employee hours worked must be greater than zero/,
  );
});

test("rejects non-finite employee hours", () => {
  assert.throws(
    () =>
      calculateDaysAwayCaseRate({
        daysAwayCases: 1,
        employeeHoursWorked:
          Number.POSITIVE_INFINITY,
      }),
    /Employee hours worked must be a finite number/,
  );
});

test("rejects employee hours above the safe numeric range", () => {
  assert.throws(
    () =>
      calculateDaysAwayCaseRate({
        daysAwayCases: 1,
        employeeHoursWorked:
          Number.MAX_SAFE_INTEGER + 1,
      }),
    /Employee hours worked are too large to calculate safely/,
  );
});

test("rejects an unsafe standardized numerator", () => {
  assert.throws(
    () =>
      calculateDaysAwayCaseRate({
        daysAwayCases:
          Math.floor(
            Number.MAX_SAFE_INTEGER /
              200_000,
          ) + 1,
        employeeHoursWorked: 200_000,
      }),
    /Days-away case count is too large to calculate safely/,
  );
});
