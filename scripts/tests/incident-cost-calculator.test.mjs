import assert from "node:assert/strict";
import test from "node:test";
import {
  calculateIncidentCost,
} from "../../src/features/incident-cost-calculator/calculate-incident-cost.ts";

const exampleInput = {
  medicalCosts: 25_000,
  wageReplacementCosts: 10_000,
  propertyDamageCosts: 5_000,
  emergencyResponseCosts: 1_500,
  replacementLaborCosts: 3_000,
  legalAndAdministrativeCosts: 2_000,
  otherDirectCosts: 500,
  investigationHours: 40,
  investigationHourlyCost: 60,
  lostProductivityHours: 120,
  productivityHourlyValue: 85,
  additionalIndirectCostMultiplier: 0.75,
};

function toCents(value) {
  return Math.round(
    (value + Number.EPSILON) * 100,
  );
}

test("calculates a complete incident cost estimate", () => {
  const result =
    calculateIncidentCost(exampleInput);

  assert.equal(result.directCostSubtotal, 47_000);
  assert.equal(result.investigationCost, 2_400);
  assert.equal(result.productivityLossCost, 10_200);

  assert.equal(
    result.documentedIndirectCostSubtotal,
    12_600,
  );

  assert.equal(result.documentedCostTotal, 59_600);

  assert.equal(
    result.estimatedAdditionalIndirectCosts,
    44_700,
  );

  assert.equal(
    result.estimatedTotalIncidentCost,
    104_300,
  );
});

test("calculates zero when every input is zero", () => {
  const result = calculateIncidentCost({
    medicalCosts: 0,
    wageReplacementCosts: 0,
    propertyDamageCosts: 0,
    emergencyResponseCosts: 0,
    replacementLaborCosts: 0,
    legalAndAdministrativeCosts: 0,
    otherDirectCosts: 0,
    investigationHours: 0,
    investigationHourlyCost: 0,
    lostProductivityHours: 0,
    productivityHourlyValue: 0,
    additionalIndirectCostMultiplier: 0,
  });

  assert.equal(result.directCostSubtotal, 0);
  assert.equal(result.investigationCost, 0);
  assert.equal(result.productivityLossCost, 0);
  assert.equal(result.documentedCostTotal, 0);

  assert.equal(
    result.estimatedAdditionalIndirectCosts,
    0,
  );

  assert.equal(
    result.estimatedTotalIncidentCost,
    0,
  );
});

test("uses a zero multiplier without adding costs", () => {
  const result = calculateIncidentCost({
    ...exampleInput,
    additionalIndirectCostMultiplier: 0,
  });

  assert.equal(
    result.estimatedAdditionalIndirectCosts,
    0,
  );

  assert.equal(
    result.estimatedTotalIncidentCost,
    result.documentedCostTotal,
  );
});

test("supports an indirect multiplier greater than one", () => {
  const result = calculateIncidentCost({
    ...exampleInput,
    additionalIndirectCostMultiplier: 2,
  });

  assert.equal(
    result.estimatedAdditionalIndirectCosts,
    119_200,
  );

  assert.equal(
    result.estimatedTotalIncidentCost,
    178_800,
  );
});

test("rounds all monetary components to integer cents", () => {
  const result = calculateIncidentCost({
    medicalCosts: 10.005,
    wageReplacementCosts: 0,
    propertyDamageCosts: 0,
    emergencyResponseCosts: 0,
    replacementLaborCosts: 0,
    legalAndAdministrativeCosts: 0,
    otherDirectCosts: 0,
    investigationHours: 1.25,
    investigationHourlyCost: 10.333,
    lostProductivityHours: 2.75,
    productivityHourlyValue: 20.125,
    additionalIndirectCostMultiplier: 0.1,
  });

  assert.equal(result.investigationCost, 12.92);
  assert.equal(result.productivityLossCost, 55.34);
  assert.equal(result.directCostSubtotal, 10.01);

  assert.equal(
    result.documentedIndirectCostSubtotal,
    68.26,
  );

  assert.equal(result.documentedCostTotal, 78.27);

  assert.equal(
    result.estimatedAdditionalIndirectCosts,
    7.83,
  );

  assert.equal(
    result.estimatedTotalIncidentCost,
    86.1,
  );
});

test("keeps all displayed subtotals consistent in cents", () => {
  const result = calculateIncidentCost({
    medicalCosts: 10.005,
    wageReplacementCosts: 0,
    propertyDamageCosts: 0,
    emergencyResponseCosts: 0,
    replacementLaborCosts: 0,
    legalAndAdministrativeCosts: 0,
    otherDirectCosts: 0,
    investigationHours: 1.25,
    investigationHourlyCost: 10.333,
    lostProductivityHours: 2.75,
    productivityHourlyValue: 20.125,
    additionalIndirectCostMultiplier: 0.1,
  });

  assert.equal(
    toCents(
      result.documentedIndirectCostSubtotal,
    ),
    toCents(result.investigationCost) +
      toCents(result.productivityLossCost),
  );

  assert.equal(
    toCents(result.documentedCostTotal),
    toCents(result.directCostSubtotal) +
      toCents(
        result.documentedIndirectCostSubtotal,
      ),
  );

  assert.equal(
    toCents(result.estimatedTotalIncidentCost),
    toCents(result.documentedCostTotal) +
      toCents(
        result.estimatedAdditionalIndirectCosts,
      ),
  );
});

test("provides transparent whole-dollar equations", () => {
  const result =
    calculateIncidentCost(exampleInput);

  assert.equal(
    result.investigationCostEquation,
    "40 hours × $60.00 = $2,400.00",
  );

  assert.equal(
    result.productivityLossEquation,
    "120 hours × $85.00 = $10,200.00",
  );

  assert.equal(
    result.totalCostEquation,
    "$59,600.00 + $44,700.00 = $104,300.00",
  );

  assert.match(
    result.directCostEquation,
    /= \$47,000\.00$/,
  );
});

test("provides a consistent fractional-cost equation", () => {
  const result = calculateIncidentCost({
    medicalCosts: 10.005,
    wageReplacementCosts: 0,
    propertyDamageCosts: 0,
    emergencyResponseCosts: 0,
    replacementLaborCosts: 0,
    legalAndAdministrativeCosts: 0,
    otherDirectCosts: 0,
    investigationHours: 1.25,
    investigationHourlyCost: 10.333,
    lostProductivityHours: 2.75,
    productivityHourlyValue: 20.125,
    additionalIndirectCostMultiplier: 0.1,
  });

  assert.equal(
    result.directCostEquation,
    "$10.01 + $0.00 + $0.00 + $0.00 + $0.00 + $0.00 + $0.00 = $10.01",
  );

  assert.equal(
    result.totalCostEquation,
    "$78.27 + $7.83 = $86.10",
  );
});

test("preserves all validated input values", () => {
  const result =
    calculateIncidentCost(exampleInput);

  for (const [key, value] of Object.entries(
    exampleInput,
  )) {
    assert.equal(result[key], value);
  }
});

test("provides an explicit cost interpretation", () => {
  const result =
    calculateIncidentCost(exampleInput);

  assert.match(
    result.interpretation,
    /estimated total incident cost of \$104,300\.00/,
  );

  assert.match(
    result.interpretation,
    /\$59,600\.00 in documented costs/,
  );

  assert.match(
    result.interpretation,
    /\$44,700\.00 in additional indirect costs/,
  );
});

test("includes financial and compliance limitations", () => {
  const result =
    calculateIncidentCost(exampleInput);

  assert.match(
    result.disclaimer,
    /not an OSHA-required cost formula/,
  );

  assert.match(
    result.disclaimer,
    /insurance valuation/,
  );

  assert.match(
    result.disclaimer,
    /workers' compensation determination/,
  );

  assert.match(
    result.disclaimer,
    /qualified professional review/,
  );
});

const invalidInputCases = [
  {
    name: "negative medical costs",
    field: "medicalCosts",
    value: -1,
    error: /Medical costs must not be negative/,
  },
  {
    name: "non-finite wage replacement costs",
    field: "wageReplacementCosts",
    value: Number.NaN,
    error:
      /Wage replacement costs must be a finite number/,
  },
  {
    name: "negative property damage costs",
    field: "propertyDamageCosts",
    value: -1,
    error:
      /Property damage costs must not be negative/,
  },
  {
    name: "non-finite emergency response costs",
    field: "emergencyResponseCosts",
    value: Number.POSITIVE_INFINITY,
    error:
      /Emergency response costs must be a finite number/,
  },
  {
    name: "negative replacement labor costs",
    field: "replacementLaborCosts",
    value: -1,
    error:
      /Replacement labor costs must not be negative/,
  },
  {
    name: "negative legal and administrative costs",
    field: "legalAndAdministrativeCosts",
    value: -1,
    error:
      /Legal and administrative costs must not be negative/,
  },
  {
    name: "negative other direct costs",
    field: "otherDirectCosts",
    value: -1,
    error:
      /Other direct costs must not be negative/,
  },
  {
    name: "negative investigation hours",
    field: "investigationHours",
    value: -1,
    error:
      /Investigation cost quantity must not be negative/,
  },
  {
    name: "non-finite investigation hourly cost",
    field: "investigationHourlyCost",
    value: Number.NaN,
    error:
      /Investigation cost unit value must be a finite number/,
  },
  {
    name: "negative lost productivity hours",
    field: "lostProductivityHours",
    value: -1,
    error:
      /Productivity loss cost quantity must not be negative/,
  },
  {
    name: "negative productivity hourly value",
    field: "productivityHourlyValue",
    value: -1,
    error:
      /Productivity loss cost unit value must not be negative/,
  },
  {
    name: "negative indirect cost multiplier",
    field: "additionalIndirectCostMultiplier",
    value: -0.1,
    error:
      /Estimated additional indirect costs must not be negative/,
  },
];

for (const invalidCase of invalidInputCases) {
  test(`rejects ${invalidCase.name}`, () => {
    assert.throws(
      () =>
        calculateIncidentCost({
          ...exampleInput,
          [invalidCase.field]: invalidCase.value,
        }),
      invalidCase.error,
    );
  });
}

test("rejects unsafe investigation multiplication", () => {
  assert.throws(
    () =>
      calculateIncidentCost({
        ...exampleInput,
        investigationHours:
          Number.MAX_SAFE_INTEGER,
        investigationHourlyCost: 2,
      }),
    /Investigation cost is too large to calculate safely/,
  );
});

test("rejects an unsafe direct-cost subtotal", () => {
  assert.throws(
    () =>
      calculateIncidentCost({
        ...exampleInput,
        medicalCosts:
          25_000_000_000_000,
        wageReplacementCosts:
          25_000_000_000_000,
        propertyDamageCosts:
          25_000_000_000_000,
        emergencyResponseCosts:
          25_000_000_000_000,
        replacementLaborCosts: 0,
        legalAndAdministrativeCosts: 0,
        otherDirectCosts: 0,
      }),
    /Direct cost subtotal is too large to calculate safely/,
  );
});

test("rejects unsafe additional indirect costs", () => {
  assert.throws(
    () =>
      calculateIncidentCost({
        ...exampleInput,
        additionalIndirectCostMultiplier:
          Number.MAX_SAFE_INTEGER,
      }),
    /Estimated additional indirect costs is too large to calculate safely/,
  );
});
