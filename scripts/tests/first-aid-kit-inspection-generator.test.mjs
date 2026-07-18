import assert from "node:assert/strict";
import test from "node:test";
import {
  generateFirstAidKitInspection,
} from "../../src/features/first-aid-kit-inspection-generator/generate-first-aid-kit-inspection.ts";

const validInput = {
  companyName: "Summit Contractors",
  projectName: "Central Office Renovation",
  inspectionDate: "2026-07-17",
  inspectorName: "Jordan Lee",
  kitId: "FAK-204",
  kitLocation: "Site office near main entrance",
  kitType: "General workplace first aid kit",
  accessibilityStatus: "Clearly marked, visible, and unobstructed",
  containerCondition: "Container is clean, dry, secure, and undamaged",
  inventoryStatus: "Supplies match the approved inventory list",
  expirationStatus: "All dated supplies remain within expiration",
  requiredSupplies: [
    "Adhesive bandages",
    "Sterile gauze pads",
    "Medical tape",
    "Disposable gloves",
  ],
  missingOrExpiredItems: [
    "Replace one opened antiseptic wipe packet",
    "Restock two pairs of disposable gloves",
  ],
  correctiveActions: [
    "Restock identified supplies",
    "Update the inspection record",
  ],
  responsiblePersons: [
    "Site superintendent",
    "Safety coordinator",
  ],
  nextInspectionDate: "2026-08-17",
};

test("generates a first aid kit inspection result", () => {
  const result = generateFirstAidKitInspection(validInput);

  assert.equal(
    result.title,
    "Central Office Renovation First Aid Kit Inspection",
  );
  assert.match(result.summary, /FAK-204/);
  assert.match(result.summary, /Jordan Lee/);
  assert.equal(result.sections.length, 7);
  assert.match(result.disclaimer, /informational documentation aid/i);
});

test("deduplicates all list values", () => {
  const result = generateFirstAidKitInspection({
    ...validInput,
    requiredSupplies: ["Adhesive bandages", "Adhesive bandages"],
    missingOrExpiredItems: ["Restock gloves", "Restock gloves"],
    correctiveActions: ["Update inventory", "Update inventory"],
    responsiblePersons: ["Safety coordinator", "Safety coordinator"],
  });

  const supplies = result.sections.find(
    (section) => section.title === "Required Supplies Reviewed",
  );
  const missing = result.sections.find(
    (section) => section.title === "Missing, Damaged, or Expired Items",
  );
  const actions = result.sections.find(
    (section) => section.title === "Corrective Actions",
  );
  const persons = result.sections.find(
    (section) => section.title === "Responsible Persons",
  );

  assert.deepEqual(supplies?.items, ["1. Adhesive bandages"]);
  assert.deepEqual(missing?.items, ["1. Restock gloves"]);
  assert.deepEqual(actions?.items, ["1. Update inventory"]);
  assert.deepEqual(persons?.items, ["Safety coordinator"]);
});

test("numbers supply, deficiency, and corrective action items", () => {
  const result = generateFirstAidKitInspection(validInput);

  const supplies = result.sections.find(
    (section) => section.title === "Required Supplies Reviewed",
  );
  const missing = result.sections.find(
    (section) => section.title === "Missing, Damaged, or Expired Items",
  );

  assert.deepEqual(supplies?.items, [
    "1. Adhesive bandages",
    "2. Sterile gauze pads",
    "3. Medical tape",
    "4. Disposable gloves",
  ]);

  assert.deepEqual(missing?.items, [
    "1. Replace one opened antiseptic wipe packet",
    "2. Restock two pairs of disposable gloves",
  ]);
});

test("trims repeated whitespace", () => {
  const result = generateFirstAidKitInspection({
    ...validInput,
    companyName: "  Summit   Contractors  ",
    kitLocation: "  Site office   near main entrance ",
    requiredSupplies: ["  Sterile   gauze pads  "],
  });

  assert.match(result.summary, /^Summit Contractors/);

  const details = result.sections.find(
    (section) => section.title === "Inspection Details",
  );
  const supplies = result.sections.find(
    (section) => section.title === "Required Supplies Reviewed",
  );

  assert.ok(
    details?.items.includes(
      "Kit location: Site office near main entrance",
    ),
  );
  assert.deepEqual(supplies?.items, ["1. Sterile gauze pads"]);
});

const requiredTextFields = [
  "companyName",
  "projectName",
  "inspectionDate",
  "inspectorName",
  "kitId",
  "kitLocation",
  "kitType",
  "accessibilityStatus",
  "containerCondition",
  "inventoryStatus",
  "expirationStatus",
  "nextInspectionDate",
];

for (const field of requiredTextFields) {
  test(`rejects missing ${field}`, () => {
    assert.throws(
      () =>
        generateFirstAidKitInspection({
          ...validInput,
          [field]: "   ",
        }),
      new RegExp(`${field} is required`),
    );
  });
}

const requiredListFields = [
  "requiredSupplies",
  "missingOrExpiredItems",
  "correctiveActions",
  "responsiblePersons",
];

for (const field of requiredListFields) {
  test(`rejects empty ${field}`, () => {
    assert.throws(
      () =>
        generateFirstAidKitInspection({
          ...validInput,
          [field]: ["   "],
        }),
      new RegExp(`${field} must include at least one item`),
    );
  });
}

test("includes restocking and follow-up reminders", () => {
  const result = generateFirstAidKitInspection(validInput);

  const section = result.sections.find(
    (item) => item.title === "Documentation and Follow-Up",
  );

  assert.ok(section);
  assert.ok(
    section.items.some((item) =>
      item.includes("Restock or replace"),
    ),
  );
  assert.ok(
    section.items.some((item) =>
      item.includes("accessible, clearly identified"),
    ),
  );
  assert.ok(
    section.items.some((item) =>
      item.includes("2026-08-17"),
    ),
  );
});
