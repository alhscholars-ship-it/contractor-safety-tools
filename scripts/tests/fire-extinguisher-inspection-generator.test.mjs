import assert from "node:assert/strict";
import test from "node:test";
import {
  generateFireExtinguisherInspection,
} from "../../src/features/fire-extinguisher-inspection-generator/generate-fire-extinguisher-inspection.ts";

const validInput = {
  companyName: "Summit Contractors",
  projectName: "Central Office Renovation",
  inspectionDate: "2026-07-17",
  inspectorName: "Jordan Lee",
  extinguisherId: "FE-104",
  extinguisherType: "ABC dry chemical",
  extinguisherLocation: "First-floor electrical room",
  pressureGaugeStatus: "Needle is within the operable range",
  safetyPinStatus: "Pin and tamper seal are present and intact",
  hoseNozzleStatus: "Hose and nozzle are unobstructed and undamaged",
  physicalCondition: "Cylinder has no visible corrosion, leakage, or damage",
  accessibilityStatus: "Extinguisher is mounted, visible, and unobstructed",
  inspectionFindings: [
    "Inspection tag is legible",
    "Operating instructions face outward",
  ],
  correctiveActions: [
    "Update the monthly inspection record",
    "Confirm annual maintenance date",
  ],
  responsiblePersons: [
    "Site superintendent",
    "Fire protection contractor",
  ],
  nextInspectionDate: "2026-08-17",
};

test("generates a fire extinguisher inspection result", () => {
  const result = generateFireExtinguisherInspection(validInput);

  assert.equal(
    result.title,
    "Central Office Renovation Fire Extinguisher Inspection",
  );
  assert.match(result.summary, /FE-104/);
  assert.match(result.summary, /Jordan Lee/);
  assert.equal(result.sections.length, 6);
  assert.match(result.disclaimer, /informational documentation aid/i);
});

test("deduplicates all list values", () => {
  const result = generateFireExtinguisherInspection({
    ...validInput,
    inspectionFindings: [
      "Inspection tag is legible",
      "Inspection tag is legible",
    ],
    correctiveActions: [
      "Update inspection record",
      "Update inspection record",
    ],
    responsiblePersons: [
      "Site superintendent",
      "Site superintendent",
    ],
  });

  const findings = result.sections.find(
    (section) => section.title === "Inspection Findings",
  );
  const actions = result.sections.find(
    (section) => section.title === "Corrective Actions",
  );
  const persons = result.sections.find(
    (section) => section.title === "Responsible Persons",
  );

  assert.deepEqual(findings?.items, ["1. Inspection tag is legible"]);
  assert.deepEqual(actions?.items, ["1. Update inspection record"]);
  assert.deepEqual(persons?.items, ["Site superintendent"]);
});

test("numbers findings and corrective actions", () => {
  const result = generateFireExtinguisherInspection(validInput);

  const findings = result.sections.find(
    (section) => section.title === "Inspection Findings",
  );
  const actions = result.sections.find(
    (section) => section.title === "Corrective Actions",
  );

  assert.deepEqual(findings?.items, [
    "1. Inspection tag is legible",
    "2. Operating instructions face outward",
  ]);
  assert.deepEqual(actions?.items, [
    "1. Update the monthly inspection record",
    "2. Confirm annual maintenance date",
  ]);
});

test("trims repeated whitespace", () => {
  const result = generateFireExtinguisherInspection({
    ...validInput,
    companyName: "  Summit   Contractors  ",
    extinguisherLocation: "  First-floor   electrical room ",
    inspectionFindings: ["  Inspection   tag is legible  "],
  });

  assert.match(result.summary, /^Summit Contractors/);

  const details = result.sections.find(
    (section) => section.title === "Inspection Details",
  );
  const findings = result.sections.find(
    (section) => section.title === "Inspection Findings",
  );

  assert.ok(details?.items.includes(
    "Location: First-floor electrical room",
  ));
  assert.deepEqual(findings?.items, [
    "1. Inspection tag is legible",
  ]);
});

const requiredTextFields = [
  "companyName",
  "projectName",
  "inspectionDate",
  "inspectorName",
  "extinguisherId",
  "extinguisherType",
  "extinguisherLocation",
  "pressureGaugeStatus",
  "safetyPinStatus",
  "hoseNozzleStatus",
  "physicalCondition",
  "accessibilityStatus",
  "nextInspectionDate",
];

for (const field of requiredTextFields) {
  test(`rejects missing ${field}`, () => {
    assert.throws(
      () =>
        generateFireExtinguisherInspection({
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
        generateFireExtinguisherInspection({
          ...validInput,
          [field]: ["   "],
        }),
      new RegExp(`${field} must include at least one item`),
    );
  });
}

test("includes maintenance and documentation reminders", () => {
  const result = generateFireExtinguisherInspection(validInput);

  const section = result.sections.find(
    (item) => item.title === "Documentation and Follow-Up",
  );

  assert.ok(section);
  assert.ok(
    section.items.some((item) =>
      item.includes("fire protection inspection log"),
    ),
  );
  assert.ok(
    section.items.some((item) =>
      item.includes("Remove an extinguisher from service"),
    ),
  );
  assert.ok(
    section.items.some((item) =>
      item.includes("2026-08-17"),
    ),
  );
});
