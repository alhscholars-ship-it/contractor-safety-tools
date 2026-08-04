import assert from "node:assert/strict";
import test from "node:test";
import {
  generateExcavationInspection,
} from "../../src/features/excavation-inspection-generator/generate-excavation-inspection.ts";

const validInput = {
  companyName: "Summit Contractors",
  projectName: "Central Utility Upgrade",
  inspectionDate: "2026-07-18",
  inspectorName: "Jordan Lee",
  excavationId: "EXC-021",
  excavationLocation: "North service corridor",
  excavationDepth: "8 feet",
  soilClassification: "Type C soil",
  competentPerson: "Morgan Reed",
  protectiveSystemCondition:
    "Trench shield is properly installed and suitable for the excavation depth",
  accessEgressCondition:
    "Secured ladder is positioned within the required travel distance",
  spoilPileCondition:
    "Spoil piles and materials are maintained at least two feet from the edge",
  undergroundUtilityCondition:
    "Known utilities are identified, marked, exposed safely, and protected",
  waterAccumulationCondition:
    "No hazardous water accumulation is present and drainage controls are operational",
  atmosphericCondition:
    "Atmospheric testing completed with acceptable readings before entry",
  adjacentStructureCondition:
    "Nearby foundations and structures show no evidence of instability",
  mobileEquipmentCondition:
    "Traffic controls and warning systems protect employees from mobile equipment",
  barricadeCondition:
    "Barricades and warning markers are installed around exposed excavation edges",
  weatherCondition:
    "Weather and soil conditions remain suitable for continued work",
  inspectionFindings: [
    "Replace one damaged barricade panel",
    "Remove loose material from the trench shield access point",
  ],
  correctiveActions: [
    "Replace the damaged barricade before work continues",
    "Clear the access point and verify safe ladder access",
  ],
  responsiblePersons: [
    "Site superintendent",
    "Excavation competent person",
  ],
  nextInspectionDate: "2026-07-19",
};

test("generates an excavation inspection result", () => {
  const result = generateExcavationInspection(validInput);

  assert.equal(
    result.title,
    "Central Utility Upgrade Excavation Inspection",
  );
  assert.match(result.summary, /EXC-021/);
  assert.match(result.summary, /North service corridor/);
  assert.ok(result.sections.length >= 8);
  assert.match(result.disclaimer, /documentation aid/i);
});

test("deduplicates all list values", () => {
  const result = generateExcavationInspection({
    ...validInput,
    inspectionFindings: [
      "Damaged barricade",
      "damaged barricade",
    ],
    correctiveActions: [
      "Replace barricade",
      "replace barricade",
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

  assert.equal(findings?.content, "1. Damaged barricade");
  assert.equal(actions?.content, "1. Replace barricade");
  assert.equal(persons?.content, "1. Site supervisor");
});

test("numbers findings and corrective actions", () => {
  const result = generateExcavationInspection(validInput);

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
  const result = generateExcavationInspection({
    ...validInput,
    companyName: "  Summit    Contractors  ",
    excavationLocation: "  North    service corridor ",
    inspectionFindings: ["  Damaged    barricade  "],
  });

  assert.match(result.summary, /Summit Contractors/);
  assert.match(result.summary, /North service corridor/);

  const findings = result.sections.find(
    (section) => section.heading === "Inspection Findings",
  );

  assert.equal(findings?.content, "1. Damaged barricade");
});

const requiredTextFields = [
  "companyName",
  "projectName",
  "inspectionDate",
  "inspectorName",
  "excavationId",
  "excavationLocation",
  "excavationDepth",
  "soilClassification",
  "competentPerson",
  "protectiveSystemCondition",
  "accessEgressCondition",
  "spoilPileCondition",
  "undergroundUtilityCondition",
  "waterAccumulationCondition",
  "atmosphericCondition",
  "adjacentStructureCondition",
  "mobileEquipmentCondition",
  "barricadeCondition",
  "weatherCondition",
  "nextInspectionDate",
];

for (const field of requiredTextFields) {
  test(`rejects missing ${field}`, () => {
    assert.throws(
      () =>
        generateExcavationInspection({
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
        generateExcavationInspection({
          ...validInput,
          [field]: [" ", ""],
        }),
      new RegExp(`${field} must contain at least one item`),
    );
  });
}

test("includes entry restriction and follow-up reminders", () => {
  const result = generateExcavationInspection(validInput);

  const followUp = result.sections.find(
    (section) =>
      section.heading === "Access Restriction and Follow-Up",
  );

  assert.match(followUp?.content ?? "", /restrict entry/i);
  assert.match(followUp?.content ?? "", /competent person/i);
  assert.match(followUp?.content ?? "", /2026-07-19/);
});
