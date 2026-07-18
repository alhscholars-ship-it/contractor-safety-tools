import assert from "node:assert/strict";
import test from "node:test";

import {
  generateLadderInspection,
} from "../../src/features/ladder-inspection-generator/generate-ladder-inspection.ts";

const validInput = {
  companyName: " Summit Contractors ",
  projectName: " Warehouse Expansion ",
  inspectionDate: "2026-07-17",
  inspectorName: " Jordan Lee ",
  ladderId: " LAD-014 ",
  ladderType: " Extension ladder ",
  ladderMaterial: " Fiberglass ",
  ladderLocation: " North loading area ",
  manufacturer: " SafeClimb ",
  dutyRating: " Type IA - 300 lb ",
  overallCondition: " Serviceable ",
  railsCondition: " No cracks, bends, or splits ",
  rungsCondition: " Clean, secure, and undamaged ",
  feetCondition: " Slip-resistant feet intact ",
  hardwareCondition: " Locks and rope operate correctly ",
  labelsCondition: " Labels legible and attached ",
  setupCondition: " Stable surface and correct angle ",
  defectsFound: [
    " Minor dirt on lower rungs ",
    " Worn inspection tag ",
    "Minor dirt on lower rungs",
  ],
  correctiveActions: [
    " Clean all rungs before use ",
    " Replace inspection tag ",
    "Clean all rungs before use",
  ],
  responsiblePersons: [
    " Site supervisor ",
    " Equipment coordinator ",
    "Site supervisor",
  ],
  nextInspectionDate: "2026-08-17",
};

test("generates a ladder inspection result", () => {
  const result = generateLadderInspection(validInput);

  assert.equal(result.title, "Ladder Inspection Checklist");
  assert.match(result.summary, /Summit Contractors/);
  assert.match(result.summary, /LAD-014/);
  assert.equal(result.sections.length, 7);
});

test("deduplicates all list values", () => {
  const result = generateLadderInspection(validInput);

  assert.equal(
    result.sections.find(
      (section) => section.heading === "Defects Found",
    )?.content,
    "1. Minor dirt on lower rungs\n2. Worn inspection tag",
  );

  assert.equal(
    result.sections.find(
      (section) => section.heading === "Corrective Actions",
    )?.content,
    "1. Clean all rungs before use\n2. Replace inspection tag",
  );

  assert.equal(
    result.sections.find(
      (section) => section.heading === "Responsible Persons",
    )?.content,
    "1. Site supervisor\n2. Equipment coordinator",
  );
});

test("numbers defects and corrective actions", () => {
  const result = generateLadderInspection(validInput);

  assert.match(
    result.sections[3].content,
    /^1\. Minor dirt on lower rungs/m,
  );
  assert.match(
    result.sections[4].content,
    /^1\. Clean all rungs before use/m,
  );
});

test("trims repeated whitespace", () => {
  const result = generateLadderInspection({
    ...validInput,
    projectName: " Warehouse    Expansion ",
  });

  assert.match(result.summary, /Warehouse Expansion/);
  assert.doesNotMatch(result.summary, /Warehouse {2,}Expansion/);
});

const requiredTextCases = [
  ["companyName", "Company name is required."],
  ["projectName", "Project name is required."],
  ["inspectionDate", "Inspection date is required."],
  ["inspectorName", "Inspector name is required."],
  ["ladderId", "Ladder ID is required."],
  ["ladderType", "Ladder type is required."],
  ["ladderMaterial", "Ladder material is required."],
  ["ladderLocation", "Ladder location is required."],
  ["manufacturer", "Manufacturer is required."],
  ["dutyRating", "Duty rating is required."],
  ["overallCondition", "Overall condition is required."],
  ["railsCondition", "Rails condition is required."],
  ["rungsCondition", "Rungs condition is required."],
  ["feetCondition", "Feet condition is required."],
  ["hardwareCondition", "Hardware condition is required."],
  ["labelsCondition", "Labels condition is required."],
  ["setupCondition", "Setup condition is required."],
  ["nextInspectionDate", "Next inspection date is required."],
];

for (const [field, message] of requiredTextCases) {
  test(`rejects missing ${field}`, () => {
    assert.throws(
      () =>
        generateLadderInspection({
          ...validInput,
          [field]: "   ",
        }),
      new RegExp(message.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
  });
}

const requiredListCases = [
  ["defectsFound", "Defects found must contain at least one item."],
  [
    "correctiveActions",
    "Corrective actions must contain at least one item.",
  ],
  [
    "responsiblePersons",
    "Responsible persons must contain at least one item.",
  ],
];

for (const [field, message] of requiredListCases) {
  test(`rejects empty ${field}`, () => {
    assert.throws(
      () =>
        generateLadderInspection({
          ...validInput,
          [field]: [" ", ""],
        }),
      new RegExp(message.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
  });
}

test("includes removal from service and follow-up reminders", () => {
  const result = generateLadderInspection(validInput);
  const followUp = result.sections.find(
    (section) => section.heading === "Documentation and Follow-Up",
  );

  assert.match(followUp?.content ?? "", /Remove unsafe ladders from service/);
  assert.match(followUp?.content ?? "", /Reinspect the ladder by 2026-08-17/);
});
