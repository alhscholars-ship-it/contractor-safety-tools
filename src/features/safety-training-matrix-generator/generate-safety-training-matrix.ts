export type SafetyTrainingAssignmentInput = Readonly<{
  workerGroup: string;
  trainingTopic: string;
  hazardOrTask: string;
  trainingTiming: string;
  trainerQualification: string;
  verificationMethod: string;
  recordOwner: string;
}>;

export type SafetyTrainingMatrixInput = Readonly<{
  companyName: string;
  projectName: string;
  preparedBy: string;
  reviewDate: string;
  programContacts: readonly string[];
  trainingAssignments:
    readonly SafetyTrainingAssignmentInput[];
  changeTriggers: readonly string[];
  documentationFields: readonly string[];
}>;

export type SafetyTrainingMatrixRow = Readonly<{
  rowNumber: number;
  workerGroup: string;
  trainingTopic: string;
  hazardOrTask: string;
  trainingTiming: string;
  trainerQualification: string;
  verificationMethod: string;
  recordOwner: string;
}>;

export type SafetyTrainingMatrixSection = Readonly<{
  title: string;
  items: readonly string[];
}>;

export type SafetyTrainingMatrixResult = Readonly<{
  title: string;
  summary: string;
  matrixRows: readonly SafetyTrainingMatrixRow[];
  sections: readonly SafetyTrainingMatrixSection[];
  disclaimer: string;
}>;

function cleanText(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

function cleanList(
  values: readonly string[],
): string[] {
  const cleanedValues: string[] = [];
  const seenValues = new Set<string>();

  for (const value of values) {
    const cleanedValue = cleanText(value);

    if (!cleanedValue) {
      continue;
    }

    const identity =
      cleanedValue.toLocaleLowerCase("en-US");

    if (seenValues.has(identity)) {
      continue;
    }

    seenValues.add(identity);
    cleanedValues.push(cleanedValue);
  }

  return cleanedValues;
}

function cleanAssignment(
  assignment: SafetyTrainingAssignmentInput,
): Omit<SafetyTrainingMatrixRow, "rowNumber"> {
  return {
    workerGroup:
      cleanText(assignment.workerGroup),
    trainingTopic:
      cleanText(assignment.trainingTopic),
    hazardOrTask:
      cleanText(assignment.hazardOrTask),
    trainingTiming:
      cleanText(assignment.trainingTiming),
    trainerQualification:
      cleanText(
        assignment.trainerQualification,
      ),
    verificationMethod:
      cleanText(assignment.verificationMethod),
    recordOwner:
      cleanText(assignment.recordOwner),
  };
}

function createAssignmentIdentity(
  assignment: Omit<
    SafetyTrainingMatrixRow,
    "rowNumber"
  >,
): string {
  return [
    assignment.workerGroup,
    assignment.trainingTopic,
    assignment.hazardOrTask,
    assignment.trainingTiming,
    assignment.trainerQualification,
    assignment.verificationMethod,
    assignment.recordOwner,
  ]
    .map((value) =>
      value.toLocaleLowerCase("en-US"),
    )
    .join("\u0000");
}

function cleanAssignments(
  assignments:
    readonly SafetyTrainingAssignmentInput[],
): Omit<
  SafetyTrainingMatrixRow,
  "rowNumber"
>[] {
  const cleanedAssignments: Omit<
    SafetyTrainingMatrixRow,
    "rowNumber"
  >[] = [];

  const seenAssignments = new Set<string>();

  for (const assignment of assignments) {
    const cleanedAssignment =
      cleanAssignment(assignment);

    const identity =
      createAssignmentIdentity(
        cleanedAssignment,
      );

    if (seenAssignments.has(identity)) {
      continue;
    }

    seenAssignments.add(identity);
    cleanedAssignments.push(
      cleanedAssignment,
    );
  }

  return cleanedAssignments;
}

function validateRequiredText(
  value: string,
  message: string,
): void {
  if (!value) {
    throw new Error(message);
  }
}

function validateAssignment(
  assignment: Omit<
    SafetyTrainingMatrixRow,
    "rowNumber"
  >,
  index: number,
): void {
  const rowLabel = `Training assignment ${
    index + 1
  }`;

  validateRequiredText(
    assignment.workerGroup,
    `${rowLabel} worker group is required.`,
  );

  validateRequiredText(
    assignment.trainingTopic,
    `${rowLabel} training topic is required.`,
  );

  validateRequiredText(
    assignment.hazardOrTask,
    `${rowLabel} hazard or task basis is required.`,
  );

  validateRequiredText(
    assignment.trainingTiming,
    `${rowLabel} training timing or trigger is required.`,
  );

  validateRequiredText(
    assignment.trainerQualification,
    `${rowLabel} trainer qualification is required.`,
  );

  validateRequiredText(
    assignment.verificationMethod,
    `${rowLabel} verification method is required.`,
  );

  validateRequiredText(
    assignment.recordOwner,
    `${rowLabel} record owner is required.`,
  );
}

function formatMatrixRow(
  row: SafetyTrainingMatrixRow,
): string {
  return (
    `${row.rowNumber}. ` +
    `Worker group: ${row.workerGroup} | ` +
    `Topic: ${row.trainingTopic} | ` +
    `Hazard or task: ${row.hazardOrTask} | ` +
    `Timing or trigger: ${row.trainingTiming} | ` +
    `Trainer qualification: ${row.trainerQualification} | ` +
    `Verification: ${row.verificationMethod} | ` +
    `Record owner: ${row.recordOwner}`
  );
}

export function generateSafetyTrainingMatrix(
  input: SafetyTrainingMatrixInput,
): SafetyTrainingMatrixResult {
  const companyName =
    cleanText(input.companyName);

  const projectName =
    cleanText(input.projectName);

  const preparedBy =
    cleanText(input.preparedBy);

  const reviewDate =
    cleanText(input.reviewDate);

  const programContacts =
    cleanList(input.programContacts);

  const changeTriggers =
    cleanList(input.changeTriggers);

  const documentationFields =
    cleanList(input.documentationFields);

  const cleanedAssignments =
    cleanAssignments(
      input.trainingAssignments,
    );

  validateRequiredText(
    companyName,
    "Company name is required.",
  );

  validateRequiredText(
    projectName,
    "Project name is required.",
  );

  validateRequiredText(
    preparedBy,
    "Prepared-by name or role is required.",
  );

  validateRequiredText(
    reviewDate,
    "Review date is required.",
  );

  if (programContacts.length === 0) {
    throw new Error(
      "At least one training program contact is required.",
    );
  }

  if (cleanedAssignments.length === 0) {
    throw new Error(
      "At least one training assignment is required.",
    );
  }

  if (changeTriggers.length === 0) {
    throw new Error(
      "At least one change or retraining review trigger is required.",
    );
  }

  if (documentationFields.length === 0) {
    throw new Error(
      "At least one training documentation field is required.",
    );
  }

  cleanedAssignments.forEach(
    (assignment, index) => {
      validateAssignment(assignment, index);
    },
  );

  const matrixRows =
    cleanedAssignments.map(
      (assignment, index) => ({
        rowNumber: index + 1,
        ...assignment,
      }),
    );

  return {
    title:
      `Safety Training Matrix for ${projectName}`,
    summary:
      `${companyName} prepared this planning matrix for ` +
      `${projectName}. ${preparedBy} should coordinate ` +
      `assignment review, applicable-requirement verification, ` +
      `training delivery, knowledge or skill verification, and ` +
      `record control. The matrix review date is ${reviewDate}.`,
    matrixRows,
    sections: [
      {
        title: "Program Information",
        items: [
          `Company: ${companyName}`,
          `Project or operation: ${projectName}`,
          `Prepared by: ${preparedBy}`,
          `Matrix review date: ${reviewDate}`,
        ],
      },
      {
        title: "Training Program Contacts",
        items: programContacts.map(
          (contact) =>
            `Training contact or resource: ${contact}`,
        ),
      },
      {
        title: "Training Assignment Matrix",
        items: matrixRows.map(
          formatMatrixRow,
        ),
      },
      {
        title:
          "Change and Retraining Review Triggers",
        items: changeTriggers.map(
          (trigger) =>
            `Reassess training needs when: ${trigger}`,
        ),
      },
      {
        title: "Training Documentation Fields",
        items: documentationFields.map(
          (field) =>
            `Capture or retain: ${field}`,
        ),
      },
      {
        title: "Implementation Review",
        items: [
          "Verify each assignment against the OSHA standard, State Plan requirement, manufacturer instruction, employer program, contract, and site-specific hazard that actually applies.",
          "Provide training before employees perform work for which applicable standards or identified hazards require knowledge or skills.",
          "Use a language and vocabulary that workers can understand and provide an opportunity for questions and feedback.",
          "Confirm understanding or practical ability using the verification method documented for each assignment.",
          "Reassess training when tasks, equipment, materials, processes, assignments, hazards, procedures, or applicable requirements change.",
          "OSHA 10-hour or 30-hour Outreach training does not replace employer-provided task-specific training.",
          "Document completion, trainer information, evaluation evidence, corrective follow-up, and any retraining decisions according to applicable requirements.",
        ],
      },
    ],
    disclaimer:
      "This generated safety training matrix is an informational planning and documentation aid only. It does not identify every training requirement, determine employee competency, certify a trainer or worker, prescribe a universal refresher interval, create an OSHA certification, or establish compliance. Training duties and timing depend on applicable federal OSHA standards, OSHA-approved State Plan rules, worker roles, assigned tasks, workplace hazards, equipment, substances, manufacturer instructions, employer procedures, contracts, and changing site conditions. A qualified safety professional or other authorized responsible person should verify every matrix assignment before use.",
  };
}
