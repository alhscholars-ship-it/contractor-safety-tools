import assert from "node:assert/strict";
import test from "node:test";
import {
  calculateRiskMatrix,
} from "../../src/features/risk-matrix-calculator/calculate-risk-matrix.ts";

test("calculates initial and residual risk scores", () => {
  const result = calculateRiskMatrix({
    initialLikelihood: 4,
    initialSeverity: 5,
    residualLikelihood: 2,
    residualSeverity: 4,
  });

  assert.equal(result.initial.score, 20);
  assert.equal(result.residual.score, 8);
  assert.equal(result.scoreChange, 12);
});

test("classifies a score of 1 as low risk", () => {
  const result = calculateRiskMatrix({
    initialLikelihood: 1,
    initialSeverity: 1,
    residualLikelihood: 1,
    residualSeverity: 1,
  });

  assert.equal(result.initial.level, "Low");
});

test("classifies a score of 4 as low risk", () => {
  const result = calculateRiskMatrix({
    initialLikelihood: 2,
    initialSeverity: 2,
    residualLikelihood: 1,
    residualSeverity: 1,
  });

  assert.equal(result.initial.score, 4);
  assert.equal(result.initial.level, "Low");
});

test("classifies a score of 5 as moderate risk", () => {
  const result = calculateRiskMatrix({
    initialLikelihood: 1,
    initialSeverity: 5,
    residualLikelihood: 1,
    residualSeverity: 1,
  });

  assert.equal(result.initial.level, "Moderate");
});

test("classifies a score of 9 as moderate risk", () => {
  const result = calculateRiskMatrix({
    initialLikelihood: 3,
    initialSeverity: 3,
    residualLikelihood: 1,
    residualSeverity: 1,
  });

  assert.equal(result.initial.level, "Moderate");
});

test("classifies a score of 10 as high risk", () => {
  const result = calculateRiskMatrix({
    initialLikelihood: 2,
    initialSeverity: 5,
    residualLikelihood: 1,
    residualSeverity: 1,
  });

  assert.equal(result.initial.level, "High");
});

test("classifies a score of 16 as high risk", () => {
  const result = calculateRiskMatrix({
    initialLikelihood: 4,
    initialSeverity: 4,
    residualLikelihood: 1,
    residualSeverity: 1,
  });

  assert.equal(result.initial.level, "High");
});

test("classifies a score above 16 as critical risk", () => {
  const result = calculateRiskMatrix({
    initialLikelihood: 4,
    initialSeverity: 5,
    residualLikelihood: 1,
    residualSeverity: 1,
  });

  assert.equal(result.initial.level, "Critical");
});

test("calculates the maximum matrix score", () => {
  const result = calculateRiskMatrix({
    initialLikelihood: 5,
    initialSeverity: 5,
    residualLikelihood: 5,
    residualSeverity: 5,
  });

  assert.equal(result.initial.score, 25);
  assert.equal(result.initial.level, "Critical");
});

test("maps likelihood and severity labels", () => {
  const result = calculateRiskMatrix({
    initialLikelihood: 4,
    initialSeverity: 5,
    residualLikelihood: 2,
    residualSeverity: 3,
  });

  assert.equal(
    result.initial.likelihoodLabel,
    "Likely",
  );

  assert.equal(
    result.initial.severityLabel,
    "Catastrophic",
  );

  assert.equal(
    result.residual.likelihoodLabel,
    "Unlikely",
  );

  assert.equal(
    result.residual.severityLabel,
    "Moderate",
  );
});

test("calculates risk reduction percentage", () => {
  const result = calculateRiskMatrix({
    initialLikelihood: 4,
    initialSeverity: 5,
    residualLikelihood: 2,
    residualSeverity: 4,
  });

  assert.equal(result.direction, "Reduced");
  assert.equal(result.percentageChange, 60);

  assert.match(
    result.interpretation,
    /reduction of 12 points or 60\.0%/,
  );
});

test("reports an unchanged score", () => {
  const result = calculateRiskMatrix({
    initialLikelihood: 4,
    initialSeverity: 3,
    residualLikelihood: 3,
    residualSeverity: 4,
  });

  assert.equal(result.scoreChange, 0);
  assert.equal(result.percentageChange, 0);
  assert.equal(result.direction, "Unchanged");

  assert.match(
    result.interpretation,
    /did not change the matrix score/,
  );
});

test("reports an increased residual score", () => {
  const result = calculateRiskMatrix({
    initialLikelihood: 2,
    initialSeverity: 3,
    residualLikelihood: 4,
    residualSeverity: 3,
  });

  assert.equal(result.scoreChange, -6);
  assert.equal(result.percentageChange, -100);
  assert.equal(result.direction, "Increased");

  assert.match(
    result.interpretation,
    /increase of 6 points or 100\.0%/,
  );
});

test("provides transparent score equations", () => {
  const result = calculateRiskMatrix({
    initialLikelihood: 5,
    initialSeverity: 4,
    residualLikelihood: 2,
    residualSeverity: 3,
  });

  assert.equal(
    result.initialEquation,
    "5 × 4 = 20",
  );

  assert.equal(
    result.residualEquation,
    "2 × 3 = 6",
  );
});

test("provides priorities for each risk level", () => {
  const low = calculateRiskMatrix({
    initialLikelihood: 1,
    initialSeverity: 2,
    residualLikelihood: 1,
    residualSeverity: 1,
  });

  const moderate = calculateRiskMatrix({
    initialLikelihood: 2,
    initialSeverity: 3,
    residualLikelihood: 1,
    residualSeverity: 1,
  });

  const high = calculateRiskMatrix({
    initialLikelihood: 3,
    initialSeverity: 4,
    residualLikelihood: 1,
    residualSeverity: 1,
  });

  const critical = calculateRiskMatrix({
    initialLikelihood: 5,
    initialSeverity: 4,
    residualLikelihood: 1,
    residualSeverity: 1,
  });

  assert.match(low.initial.priority, /Maintain/);
  assert.match(moderate.initial.priority, /Plan/);
  assert.match(high.initial.priority, /Prioritize/);
  assert.match(critical.initial.priority, /Escalate/);
});

test("states that the matrix is not an OSHA-required formula", () => {
  const result = calculateRiskMatrix({
    initialLikelihood: 3,
    initialSeverity: 4,
    residualLikelihood: 2,
    residualSeverity: 3,
  });

  assert.match(
    result.disclaimer,
    /not an OSHA-required scoring formula/,
  );

  assert.match(
    result.disclaimer,
    /cannot replace competent-person review/,
  );

  assert.match(
    result.disclaimer,
    /hierarchy of controls/,
  );
});

const invalidFactorCases = [
  {
    name: "initial likelihood below one",
    field: "initialLikelihood",
    value: 0,
    error:
      /Initial likelihood must be a whole number from 1 through 5/,
  },
  {
    name: "initial likelihood above five",
    field: "initialLikelihood",
    value: 6,
    error:
      /Initial likelihood must be a whole number from 1 through 5/,
  },
  {
    name: "fractional initial severity",
    field: "initialSeverity",
    value: 2.5,
    error:
      /Initial severity must be a whole number from 1 through 5/,
  },
  {
    name: "non-finite initial severity",
    field: "initialSeverity",
    value: Number.NaN,
    error:
      /Initial severity must be a finite number/,
  },
  {
    name: "residual likelihood below one",
    field: "residualLikelihood",
    value: 0,
    error:
      /Residual likelihood must be a whole number from 1 through 5/,
  },
  {
    name: "residual likelihood above five",
    field: "residualLikelihood",
    value: 6,
    error:
      /Residual likelihood must be a whole number from 1 through 5/,
  },
  {
    name: "fractional residual severity",
    field: "residualSeverity",
    value: 3.5,
    error:
      /Residual severity must be a whole number from 1 through 5/,
  },
  {
    name: "non-finite residual severity",
    field: "residualSeverity",
    value: Number.POSITIVE_INFINITY,
    error:
      /Residual severity must be a finite number/,
  },
];

for (const invalidCase of invalidFactorCases) {
  test(`rejects ${invalidCase.name}`, () => {
    const input = {
      initialLikelihood: 3,
      initialSeverity: 4,
      residualLikelihood: 2,
      residualSeverity: 3,
      [invalidCase.field]: invalidCase.value,
    };

    assert.throws(
      () => calculateRiskMatrix(input),
      invalidCase.error,
    );
  });
}
