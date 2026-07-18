import assert from "node:assert/strict";
import test from "node:test";
import {
  generateScaffoldInspection,
} from "../../src/features/scaffold-inspection-generator/generate-scaffold-inspection.ts";

const validInput = {
  companyName: "Summit Contractors",
  projectName: "Central Tower Renovation",
  inspectionDate: "2026-07-17",
  inspectorName: "Jordan Lee",
  scaffoldId: "SCF-018",
  scaffoldType: "Supported frame scaffold",
  scaffoldLocation: "Building A east elevation",
  competentPerson: "Morgan Reed",
  foundationCondition:
    "Base plates and mudsills are level, stable, and fully supported",
  frameCondition:
    "Frames, posts, uprights, and coupling pins are straight and secure",
  bracingCondition:
    "Cross braces and diagonal braces are installed and secured",
  platformCondition:
    "Platforms are fully planked, secured, and free from damage",
  accessCondition:
    "Access ladder is secured and extends to the platform landing",
  guardrailCondition:
    "Toprails, midrails, and toeboards are installed where required",
  fallProtectionCondition:
    "Required fall protection systems are available and properly configured",
  tieInCondition:
    "Tie-ins and anchorage points are installed at required locations",
  loadCondition:
    "Materials remain within the scaffold load rating and are evenly distributed",
  electricalClearanceCondition:
    "Required clearance from energized electrical conductors is maintained",
  weatherCondition:
    "Weather and surface conditions are suitable for scaffold use",
  inspectionFindings: [
    "Remove loose material from the second-level platform",
    "Replace one damaged access ladder rung",
  ],
  correctiveActions: [
    "Remove loose material before work resumes",
    "Restrict access until the damaged rung is replaced",
  ],
  responsiblePersons: [
    "Site superintendent",
    "Scaffold competent person",
  ],
  nextInspectionDate: "2026-07-18",
};

test("generates a scaffold inspection result", () => {
  const result = generateScaffoldInspection(validInput);

  assert.equal(
    result.title,
    "Central Tower Renovation Scaffold Inspection",
  );
  assert.match(result.summary, /SCF-018/);
  assert.match(result.summary, /Building A east elevation/);
  assert.ok(result.sections.length >= 8);
  assert.match(result.disclaimer, /documentation aid/i);
});

test("deduplicates all list values", () => {
  const result = generateScaffoldInspection({
    ...validInput,
    inspectionFindings: [
      "Loose platform material",
      "loose platform material",
    ],
    correctiveActions: [
      "Remove loose material",
      "remove loose material",
    ],
    responsiblePersons: [
      "Site supervisor",
      "site supervisor",
    ],
  });

  const findings = result.sections.find(
    (section) => section.heading === "Inspection Findings",
  );
  const actions = result.sections.find(
    (section) => section.heading === "Corrective Actions",
  );
  const persons = result.sections.find(
    (section) => section.heading === "Responsible Persons",
  );

  assert.equal(findings?.content, "1. Loose platform material");
  assert.equal(actions?.content, "1. Remove loose material");
  assert.equal(persons?.content, "1. Site supervisor");
});

test("numbers findings and corrective actions", () => {
  const result = generateScaffoldInspection(validInput);

  const findings = result.sections.find(
    (section) => section.heading === "Inspection Findings",
  );
  const actions = result.sections.find(
    (section) => section.heading === "Corrective Actions",
  );

  assert.match(findings?.content ?? "", /^1\./);
  assert.match(findings?.content ?? "", /\n2\./);
  assert.match(actions?.content ?? "", /^1\./);
  assert.match(actions?.content ?? "", /\n2\./);
});

test("trims repeated whitespace", () => {
  const result = generateScaffoldInspection({
    ...validInput,
    companyName: "  Summit    Contractors  ",
    scaffoldLocation: "  Building A    east elevation ",
    inspectionFindings: ["  Loose    platform material  "],
  });

  assert.match(result.summary, /Summit Contractors/);
  assert.match(result.summary, /Building A east elevation/);

  const findings = result.sections.find(
    (section) => section.heading === "Inspection Findings",
  );

  assert.equal(findings?.content, "1. Loose platform material");
});

const requiredTextFields = [
  "companyName",
  "projectName",
  "inspectionDate",
  "inspectorName",
  "scaffoldId",
  "scaffoldType",
  "scaffoldLocation",
  "competentPerson",
  "foundationCondition",
  "frameCondition",
  "bracingCondition",
  "platformCondition",
  "accessCondition",
  "guardrailCondition",
  "fallProtectionCondition",
  "tieInCondition",
  "loadCondition",
  "electricalClearanceCondition",
  "weatherCondition",
  "nextInspectionDate",
];

for (const field of requiredTextFields) {
  test(`rejects missing ${field}`, () => {
    assert.throws(
      () =>
        generateScaffoldInspection({
          ...validInput,
          [field]: "   ",
        }),
      new RegExp(`${field} is required`),
    );
  });
}

const requiredListFields = [
  "inspectionFindings",
  "correctiveActions",
  "responsiblePersons",
];

for (const field of requiredListFields) {
  test(`rejects empty ${field}`, () => {
    assert.throws(
      () =>
        generateScaffoldInspection({
          ...validInput,
          [field]: [" ", ""],
        }),
      new RegExp(`${field} must contain at least one item`),
    );
  });
}

test("includes access restriction and follow-up reminders", () => {
  const result = generateScaffoldInspection(validInput);

  const followUp = result.sections.find(
    (section) =>
      section.heading === "Removal from Service and Follow-Up",
  );

  assert.match(followUp?.content ?? "", /restrict access/i);
  assert.match(followUp?.content ?? "", /competent person/i);
  assert.match(followUp?.content ?? "", /2026-07-18/);
});
