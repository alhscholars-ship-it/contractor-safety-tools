import assert from "node:assert/strict";
import test from "node:test";

import {
  generateDailyJobsiteSafetyInspection,
} from "../../src/features/daily-jobsite-safety-inspection-generator/generate-daily-jobsite-safety-inspection.ts";

const validInput = {
  companyName: "Summit Contractors",
  projectName: "Central Office Renovation",
  jobsiteLocation: "100 Main Street",
  inspectionDate: "2026-07-17",
  inspectorName: "Jordan Lee",
  weatherConditions: "Clear and dry",
  activeTrades: ["Electrical", "Carpentry"],
  inspectionAreas: [
    "Access and egress routes",
    "Housekeeping and material storage",
    "Fall protection systems",
  ],
  observedHazards: [
    "Extension cord crossing an access route",
    "Unsecured materials stored near an elevated edge",
  ],
  correctiveActions: [
    "Reroute or protect the extension cord",
    "Relocate and secure stored materials",
  ],
  responsiblePersons: ["Electrical foreperson", "Site superintendent"],
  followUpDate: "2026-07-18",
};

test("generates a daily jobsite safety inspection result", () => {
  const result = generateDailyJobsiteSafetyInspection(validInput);

  assert.equal(
    result.title,
    "Daily Jobsite Safety Inspection — Central Office Renovation",
  );
  assert.equal(result.sections.length, 7);
  assert.match(result.summary, /Summit Contractors/);
  assert.match(result.disclaimer, /informational documentation aid/);
});

test("deduplicates all list values", () => {
  const result = generateDailyJobsiteSafetyInspection({
    ...validInput,
    activeTrades: ["Electrical", "Electrical", "  Electrical  "],
    inspectionAreas: ["Housekeeping", "Housekeeping"],
    observedHazards: ["Blocked aisle", "Blocked aisle"],
    correctiveActions: ["Clear aisle", "Clear aisle"],
    responsiblePersons: ["Site superintendent", "Site superintendent"],
  });

  assert.deepEqual(result.sections[1].items, [
    "Active trade or crew: Electrical",
  ]);
  assert.deepEqual(result.sections[2].items, [
    "Inspect and document conditions in: Housekeeping",
  ]);
  assert.deepEqual(result.sections[3].items, ["1. Blocked aisle"]);
  assert.deepEqual(result.sections[4].items, ["1. Clear aisle"]);
  assert.deepEqual(result.sections[5].items, [
    "Corrective-action owner: Site superintendent",
  ]);
});

test("numbers hazards and corrective actions", () => {
  const result = generateDailyJobsiteSafetyInspection(validInput);

  assert.deepEqual(result.sections[3].items, [
    "1. Extension cord crossing an access route",
    "2. Unsecured materials stored near an elevated edge",
  ]);

  assert.deepEqual(result.sections[4].items, [
    "1. Reroute or protect the extension cord",
    "2. Relocate and secure stored materials",
  ]);
});

test("trims repeated whitespace", () => {
  const result = generateDailyJobsiteSafetyInspection({
    ...validInput,
    companyName: "  Summit   Contractors  ",
    weatherConditions: "  Clear   and   dry  ",
    activeTrades: ["  Electrical   crew  "],
  });

  assert.match(result.summary, /^Summit Contractors/);
  assert.ok(
    result.sections[0].items.includes(
      "Weather conditions: Clear and dry",
    ),
  );
  assert.deepEqual(result.sections[1].items, [
    "Active trade or crew: Electrical crew",
  ]);
});

const requiredFieldCases = [
  ["companyName", "", "Company name is required."],
  ["projectName", "", "Project name is required."],
  ["jobsiteLocation", "", "Jobsite location is required."],
  ["inspectionDate", "", "Inspection date is required."],
  ["inspectorName", "", "Inspector name is required."],
  ["weatherConditions", "", "Weather conditions are required."],
  ["followUpDate", "", "Follow-up date is required."],
];

for (const [field, value, message] of requiredFieldCases) {
  test(`rejects missing ${field}`, () => {
    assert.throws(
      () =>
        generateDailyJobsiteSafetyInspection({
          ...validInput,
          [field]: value,
        }),
      new Error(message),
    );
  });
}

const requiredListCases = [
  ["activeTrades", "At least one active trade is required."],
  ["inspectionAreas", "At least one inspection area is required."],
  ["observedHazards", "At least one observed hazard is required."],
  ["correctiveActions", "At least one corrective action is required."],
  ["responsiblePersons", "At least one responsible person is required."],
];

for (const [field, message] of requiredListCases) {
  test(`rejects empty ${field}`, () => {
    assert.throws(
      () =>
        generateDailyJobsiteSafetyInspection({
          ...validInput,
          [field]: [" ", ""],
        }),
      new Error(message),
    );
  });
}

test("includes project documentation reminders", () => {
  const result = generateDailyJobsiteSafetyInspection(validInput);
  const reminders = result.sections[6].items.join(" ");

  assert.match(reminders, /imminent-danger conditions/);
  assert.match(reminders, /affected workers/);
  assert.match(reminders, /Track incomplete corrective actions/);
  assert.match(reminders, /project safety records/);
});
