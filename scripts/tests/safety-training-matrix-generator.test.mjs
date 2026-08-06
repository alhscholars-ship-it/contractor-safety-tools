import assert from "node:assert/strict";
import test from "node:test";
import {
  generateSafetyTrainingMatrix,
} from "../../src/features/safety-training-matrix-generator/generate-safety-training-matrix.ts";

const validInput = {
  companyName: "ABC Contractors",
  projectName: "Central Plant Expansion",
  preparedBy: "Morgan Ellis, Safety Manager",
  reviewDate: "August 6, 2026",
  programContacts: [
    "Morgan Ellis — Safety Manager",
    "Jordan Lee — Project Superintendent",
    "Morgan Ellis — Safety Manager",
  ],
  trainingAssignments: [
    {
      workerGroup:
        "Employees exposed to fall hazards",
      trainingTopic:
        "Fall hazard recognition and controls",
      hazardOrTask:
        "Work where employees may be exposed to fall hazards",
      trainingTiming:
        "Before initial exposure and when retraining is necessary under the applicable requirement",
      trainerQualification:
        "Competent person qualified in the applicable training areas",
      verificationMethod:
        "Questions, demonstration, and documented supervisor observation",
      recordOwner:
        "Project safety manager",
    },
    {
      workerGroup:
        "Employees using ladders and stairways",
      trainingTopic:
        "Ladder and stairway hazard recognition",
      hazardOrTask:
        "Selection, placement, use, and care of ladders and stairways",
      trainingTiming:
        "Before use as necessary and when knowledge or understanding is no longer maintained",
      trainerQualification:
        "Competent person",
      verificationMethod:
        "Practical demonstration and knowledge questions",
      recordOwner:
        "Site superintendent",
    },
    {
      workerGroup:
        " employees exposed to fall hazards ",
      trainingTopic:
        " Fall hazard recognition and controls ",
      hazardOrTask:
        " Work where employees may be exposed to fall hazards ",
      trainingTiming:
        " Before initial exposure and when retraining is necessary under the applicable requirement ",
      trainerQualification:
        " Competent person qualified in the applicable training areas ",
      verificationMethod:
        " Questions, demonstration, and documented supervisor observation ",
      recordOwner:
        " Project safety manager ",
    },
  ],
  changeTriggers: [
    "A worker receives a new task or role",
    "Equipment, materials, processes, or controls change",
    "Observation indicates that knowledge or skill is not maintained",
    "A worker receives a new task or role",
  ],
  documentationFields: [
    "Worker name or identifier",
    "Training topic and applicable assignment",
    "Training date and trainer",
    "Verification or evaluation evidence",
    "Worker name or identifier",
  ],
};

test("generates a complete safety training matrix", () => {
  const result =
    generateSafetyTrainingMatrix(
      validInput,
    );

  assert.equal(
    result.title,
    "Safety Training Matrix for Central Plant Expansion",
  );

  assert.match(
    result.summary,
    /ABC Contractors/,
  );

  assert.match(
    result.summary,
    /Morgan Ellis, Safety Manager/,
  );

  assert.equal(result.matrixRows.length, 2);
  assert.ok(result.sections.length >= 6);

  assert.match(
    result.disclaimer,
    /informational planning and documentation aid only/,
  );
});

test("deduplicates program contacts without changing their order", () => {
  const result =
    generateSafetyTrainingMatrix(
      validInput,
    );

  const section = result.sections.find(
    (candidate) =>
      candidate.title ===
      "Training Program Contacts",
  );

  assert.deepEqual(section?.items, [
    "Training contact or resource: Morgan Ellis — Safety Manager",
    "Training contact or resource: Jordan Lee — Project Superintendent",
  ]);
});

test("deduplicates change triggers and documentation fields", () => {
  const result =
    generateSafetyTrainingMatrix(
      validInput,
    );

  const triggers = result.sections.find(
    (candidate) =>
      candidate.title ===
      "Change and Retraining Review Triggers",
  );

  const fields = result.sections.find(
    (candidate) =>
      candidate.title ===
      "Training Documentation Fields",
  );

  assert.equal(triggers?.items.length, 3);
  assert.equal(fields?.items.length, 4);
});

test("deduplicates identical training assignments after cleaning", () => {
  const result =
    generateSafetyTrainingMatrix(
      validInput,
    );

  assert.equal(result.matrixRows.length, 2);

  assert.equal(
    result.matrixRows[0]?.workerGroup,
    "Employees exposed to fall hazards",
  );

  assert.equal(
    result.matrixRows[1]?.workerGroup,
    "Employees using ladders and stairways",
  );
});

test("deduplicates assignments case-insensitively", () => {
  const duplicate = {
    ...validInput.trainingAssignments[0],
    workerGroup:
      "EMPLOYEES EXPOSED TO FALL HAZARDS",
    trainingTopic:
      "FALL HAZARD RECOGNITION AND CONTROLS",
  };

  const result =
    generateSafetyTrainingMatrix({
      ...validInput,
      trainingAssignments: [
        validInput.trainingAssignments[0],
        duplicate,
      ],
    });

  assert.equal(result.matrixRows.length, 1);
});

test("preserves assignments that differ by a material field", () => {
  const secondAssignment = {
    ...validInput.trainingAssignments[0],
    recordOwner: "Project superintendent",
  };

  const result =
    generateSafetyTrainingMatrix({
      ...validInput,
      trainingAssignments: [
        validInput.trainingAssignments[0],
        secondAssignment,
      ],
    });

  assert.equal(result.matrixRows.length, 2);
});

test("numbers matrix rows in stable input order", () => {
  const result =
    generateSafetyTrainingMatrix(
      validInput,
    );

  assert.equal(
    result.matrixRows[0]?.rowNumber,
    1,
  );

  assert.equal(
    result.matrixRows[1]?.rowNumber,
    2,
  );

  const section = result.sections.find(
    (candidate) =>
      candidate.title ===
      "Training Assignment Matrix",
  );

  assert.match(
    section?.items[0] ?? "",
    /^1\. Worker group:/,
  );

  assert.match(
    section?.items[1] ?? "",
    /^2\. Worker group:/,
  );
});

test("trims repeated whitespace from program information", () => {
  const result =
    generateSafetyTrainingMatrix({
      ...validInput,
      companyName:
        "  ABC   Contractors  ",
      projectName:
        " Central   Plant   Expansion ",
      preparedBy:
        " Morgan   Ellis,   Safety Manager ",
    });

  assert.equal(
    result.title,
    "Safety Training Matrix for Central Plant Expansion",
  );

  assert.match(
    result.summary,
    /ABC Contractors/,
  );

  assert.match(
    result.summary,
    /Morgan Ellis, Safety Manager/,
  );
});

test("trims repeated whitespace from assignment fields", () => {
  const result =
    generateSafetyTrainingMatrix({
      ...validInput,
      trainingAssignments: [
        {
          ...validInput.trainingAssignments[0],
          workerGroup:
            " Employees   exposed   to fall hazards ",
          trainingTopic:
            " Fall   hazard recognition ",
        },
      ],
    });

  assert.equal(
    result.matrixRows[0]?.workerGroup,
    "Employees exposed to fall hazards",
  );

  assert.equal(
    result.matrixRows[0]?.trainingTopic,
    "Fall hazard recognition",
  );
});

test("does not mutate the input assignment array", () => {
  const assignments =
    validInput.trainingAssignments.map(
      (assignment) => ({
        ...assignment,
      }),
    );

  const snapshot =
    JSON.stringify(assignments);

  generateSafetyTrainingMatrix({
    ...validInput,
    trainingAssignments: assignments,
  });

  assert.equal(
    JSON.stringify(assignments),
    snapshot,
  );
});

test("includes change-driven training review reminders", () => {
  const result =
    generateSafetyTrainingMatrix(
      validInput,
    );

  const implementation =
    result.sections.find(
      (candidate) =>
        candidate.title ===
        "Implementation Review",
    );

  assert.ok(
    implementation?.items.some(
      (item) =>
        item.includes(
          "tasks, equipment, materials, processes",
        ),
    ),
  );
});

test("states that Outreach training does not replace task-specific training", () => {
  const result =
    generateSafetyTrainingMatrix(
      validInput,
    );

  const implementation =
    result.sections.find(
      (candidate) =>
        candidate.title ===
        "Implementation Review",
    );

  assert.ok(
    implementation?.items.some(
      (item) =>
        item.includes(
          "does not replace employer-provided task-specific training",
        ),
    ),
  );
});

test("does not prescribe a universal refresher interval", () => {
  const result =
    generateSafetyTrainingMatrix(
      validInput,
    );

  assert.match(
    result.disclaimer,
    /prescribe a universal refresher interval/,
  );

  assert.doesNotMatch(
    result.disclaimer,
    /annual training is required/i,
  );
});

test("includes federal, State Plan, and site-specific limitations", () => {
  const result =
    generateSafetyTrainingMatrix(
      validInput,
    );

  assert.match(
    result.disclaimer,
    /federal OSHA standards/,
  );

  assert.match(
    result.disclaimer,
    /OSHA-approved State Plan rules/,
  );

  assert.match(
    result.disclaimer,
    /changing site conditions/,
  );
});

const requiredProgramTextCases = [
  [
    "companyName",
    "Company name is required",
  ],
  [
    "projectName",
    "Project name is required",
  ],
  [
    "preparedBy",
    "Prepared-by name or role is required",
  ],
  [
    "reviewDate",
    "Review date is required",
  ],
];

for (
  const [field, message]
  of requiredProgramTextCases
) {
  test(`rejects missing ${field}`, () => {
    assert.throws(
      () =>
        generateSafetyTrainingMatrix({
          ...validInput,
          [field]: "   ",
        }),
      new RegExp(message),
    );
  });
}

const requiredProgramListCases = [
  [
    "programContacts",
    "At least one training program contact is required",
  ],
  [
    "trainingAssignments",
    "At least one training assignment is required",
  ],
  [
    "changeTriggers",
    "At least one change or retraining review trigger is required",
  ],
  [
    "documentationFields",
    "At least one training documentation field is required",
  ],
];

for (
  const [field, message]
  of requiredProgramListCases
) {
  test(`rejects empty ${field}`, () => {
    assert.throws(
      () =>
        generateSafetyTrainingMatrix({
          ...validInput,
          [field]:
            field ===
            "trainingAssignments"
              ? []
              : [" ", ""],
        }),
      new RegExp(message),
    );
  });
}

const requiredAssignmentFieldCases = [
  [
    "workerGroup",
    "Training assignment 1 worker group is required",
  ],
  [
    "trainingTopic",
    "Training assignment 1 training topic is required",
  ],
  [
    "hazardOrTask",
    "Training assignment 1 hazard or task basis is required",
  ],
  [
    "trainingTiming",
    "Training assignment 1 training timing or trigger is required",
  ],
  [
    "trainerQualification",
    "Training assignment 1 trainer qualification is required",
  ],
  [
    "verificationMethod",
    "Training assignment 1 verification method is required",
  ],
  [
    "recordOwner",
    "Training assignment 1 record owner is required",
  ],
];

for (
  const [field, message]
  of requiredAssignmentFieldCases
) {
  test(`rejects an assignment missing ${field}`, () => {
    assert.throws(
      () =>
        generateSafetyTrainingMatrix({
          ...validInput,
          trainingAssignments: [
            {
              ...validInput
                .trainingAssignments[0],
              [field]: "   ",
            },
          ],
        }),
      new RegExp(message),
    );
  });
}

test("identifies the correct invalid assignment row", () => {
  assert.throws(
    () =>
      generateSafetyTrainingMatrix({
        ...validInput,
        trainingAssignments: [
          validInput.trainingAssignments[0],
          {
            ...validInput
              .trainingAssignments[1],
            verificationMethod: " ",
          },
        ],
      }),
    /Training assignment 2 verification method is required/,
  );
});
