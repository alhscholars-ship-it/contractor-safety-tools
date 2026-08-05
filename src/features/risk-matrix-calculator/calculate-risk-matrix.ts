export type RiskMatrixFactor = 1 | 2 | 3 | 4 | 5;

export type RiskLevel =
  | "Low"
  | "Moderate"
  | "High"
  | "Critical";

export type RiskDirection =
  | "Reduced"
  | "Unchanged"
  | "Increased";

export type RiskMatrixInput = Readonly<{
  initialLikelihood: number;
  initialSeverity: number;
  residualLikelihood: number;
  residualSeverity: number;
}>;

export type RiskAssessment = Readonly<{
  likelihood: RiskMatrixFactor;
  likelihoodLabel: string;
  severity: RiskMatrixFactor;
  severityLabel: string;
  score: number;
  level: RiskLevel;
  priority: string;
}>;

export type RiskMatrixResult = Readonly<{
  initial: RiskAssessment;
  residual: RiskAssessment;
  scoreChange: number;
  percentageChange: number;
  direction: RiskDirection;
  initialEquation: string;
  residualEquation: string;
  interpretation: string;
  disclaimer: string;
}>;

const likelihoodLabels: Readonly<
  Record<RiskMatrixFactor, string>
> = {
  1: "Rare",
  2: "Unlikely",
  3: "Possible",
  4: "Likely",
  5: "Almost certain",
};

const severityLabels: Readonly<
  Record<RiskMatrixFactor, string>
> = {
  1: "Negligible",
  2: "Minor",
  3: "Moderate",
  4: "Major",
  5: "Catastrophic",
};

function validateFactor(
  value: number,
  label: string,
): RiskMatrixFactor {
  if (!Number.isFinite(value)) {
    throw new Error(`${label} must be a finite number.`);
  }

  if (
    !Number.isSafeInteger(value) ||
    value < 1 ||
    value > 5
  ) {
    throw new Error(
      `${label} must be a whole number from 1 through 5.`,
    );
  }

  return value as RiskMatrixFactor;
}

function classifyRisk(score: number): RiskLevel {
  if (score <= 4) {
    return "Low";
  }

  if (score <= 9) {
    return "Moderate";
  }

  if (score <= 16) {
    return "High";
  }

  return "Critical";
}

function getPriority(level: RiskLevel): string {
  switch (level) {
    case "Low":
      return (
        "Maintain effective controls and monitor the hazard " +
        "for workplace or task changes."
      );

    case "Moderate":
      return (
        "Plan additional controls, assign responsibility, " +
        "and verify completion."
      );

    case "High":
      return (
        "Prioritize prompt risk reduction and competent review " +
        "before relying on routine work controls."
      );

    case "Critical":
      return (
        "Escalate immediately and avoid relying on the score " +
        "as authorization to proceed until effective controls " +
        "and competent review reduce the risk."
      );
  }
}

function buildAssessment(
  likelihood: RiskMatrixFactor,
  severity: RiskMatrixFactor,
): RiskAssessment {
  const score = likelihood * severity;
  const level = classifyRisk(score);

  return {
    likelihood,
    likelihoodLabel: likelihoodLabels[likelihood],
    severity,
    severityLabel: severityLabels[severity],
    score,
    level,
    priority: getPriority(level),
  };
}

function roundToOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}

function describeChange(
  initial: RiskAssessment,
  residual: RiskAssessment,
  scoreChange: number,
  percentageChange: number,
  direction: RiskDirection,
): string {
  const percentage = Math.abs(
    percentageChange,
  ).toFixed(1);

  if (direction === "Reduced") {
    return (
      `The modeled risk decreased from ${initial.score} ` +
      `(${initial.level}) to ${residual.score} ` +
      `(${residual.level}), a reduction of ${scoreChange} ` +
      `points or ${percentage}%.`
    );
  }

  if (direction === "Increased") {
    return (
      `The modeled risk increased from ${initial.score} ` +
      `(${initial.level}) to ${residual.score} ` +
      `(${residual.level}), an increase of ` +
      `${Math.abs(scoreChange)} points or ${percentage}%.`
    );
  }

  return (
    `The modeled risk remained at ${initial.score} ` +
    `(${initial.level}); the selected controls did not change ` +
    "the matrix score."
  );
}

export function calculateRiskMatrix(
  input: RiskMatrixInput,
): RiskMatrixResult {
  const initialLikelihood = validateFactor(
    input.initialLikelihood,
    "Initial likelihood",
  );

  const initialSeverity = validateFactor(
    input.initialSeverity,
    "Initial severity",
  );

  const residualLikelihood = validateFactor(
    input.residualLikelihood,
    "Residual likelihood",
  );

  const residualSeverity = validateFactor(
    input.residualSeverity,
    "Residual severity",
  );

  const initial = buildAssessment(
    initialLikelihood,
    initialSeverity,
  );

  const residual = buildAssessment(
    residualLikelihood,
    residualSeverity,
  );

  const scoreChange =
    initial.score - residual.score;

  const percentageChange = roundToOneDecimal(
    (scoreChange / initial.score) * 100,
  );

  const direction: RiskDirection =
    scoreChange > 0
      ? "Reduced"
      : scoreChange < 0
        ? "Increased"
        : "Unchanged";

  return {
    initial,
    residual,
    scoreChange,
    percentageChange,
    direction,
    initialEquation:
      `${initial.likelihood} × ` +
      `${initial.severity} = ${initial.score}`,
    residualEquation:
      `${residual.likelihood} × ` +
      `${residual.severity} = ${residual.score}`,
    interpretation: describeChange(
      initial,
      residual,
      scoreChange,
      percentageChange,
      direction,
    ),
    disclaimer:
      "This 5 × 5 risk matrix is a transparent prioritization aid, " +
      "not an OSHA-required scoring formula or compliance determination. " +
      "Results depend on user judgment and cannot replace competent-person " +
      "review, task-specific standards, exposure assessment, worker input, " +
      "the hierarchy of controls, or immediate action for recognized " +
      "serious or imminent hazards.",
  };
}
