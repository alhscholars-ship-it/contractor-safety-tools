import assert from "node:assert/strict";
import test from "node:test";
import { generateLockoutTagoutChecklist } from "../../src/features/lockout-tagout-checklist-generator/generate-lockout-tagout-checklist.ts";

const validInput = {
  companyName: "ABC Mechanical",
  projectName: "Central Plant Upgrade",
  equipmentName: "Air Handling Unit 4",
  equipmentLocation: "Mechanical Room B",
  authorizedEmployee: "Jordan Lee",
  affectedEmployees: ["HVAC crew", "Electrical crew", "HVAC crew"],
  energySources: [
    "480-volt electrical supply",
    "Stored rotational energy",
    "480-volt electrical supply",
  ],
  isolationPoints: [
    "Main disconnect AHU-4",
    "Local control circuit disconnect",
    "Main disconnect AHU-4",
  ],
  shutdownSteps: [
    "Notify affected employees",
    "Stop equipment using normal controls",
    "Open all identified disconnects",
    "Notify affected employees",
  ],
  verificationSteps: [
    "Attempt normal startup",
    "Test electrical conductors with an appropriately rated tester",
    "Attempt normal startup",
  ],
  restorationSteps: [
    "Inspect work area and remove tools",
    "Confirm guards are reinstalled",
    "Notify affected employees before restart",
  ],
  requiredDevices: [
    "Personal safety lock",
    "Danger tag",
    "Personal safety lock",
  ],
  supervisorName: "Morgan Ellis",
};

test("generates a lockout tagout checklist result", () => {
  const result = generateLockoutTagoutChecklist(validInput);

  assert.equal(
    result.title,
    "Lockout/Tagout Checklist for Air Handling Unit 4",
  );
  assert.ok(result.summary.includes("ABC Mechanical"));
  assert.ok(result.sections.length >= 9);
  assert.ok(result.disclaimer.includes("not legal advice"));
});

test("deduplicates all list values", () => {
  const result = generateLockoutTagoutChecklist(validInput);

  const affected = result.sections.find(
    (section) => section.title === "Affected Employees and Work Groups",
  );
  const sources = result.sections.find(
    (section) => section.title === "Hazardous Energy Sources",
  );
  const isolation = result.sections.find(
    (section) => section.title === "Energy Isolation Points",
  );
  const devices = result.sections.find(
    (section) => section.title === "Required Lockout and Tagout Devices",
  );
  const shutdown = result.sections.find(
    (section) => section.title === "Shutdown and Isolation Sequence",
  );
  const verification = result.sections.find(
    (section) => section.title === "Zero-Energy Verification",
  );

  assert.equal(affected?.items.length, 2);
  assert.equal(sources?.items.length, 2);
  assert.equal(isolation?.items.length, 2);
  assert.equal(devices?.items.length, 2);
  assert.equal(shutdown?.items.length, 3);
  assert.equal(verification?.items.length, 2);
});

test("numbers procedural steps", () => {
  const result = generateLockoutTagoutChecklist(validInput);

  const shutdown = result.sections.find(
    (section) => section.title === "Shutdown and Isolation Sequence",
  );
  const restoration = result.sections.find(
    (section) =>
      section.title === "Restoration and Return-to-Service Sequence",
  );

  assert.equal(shutdown?.items[0], "1. Notify affected employees");
  assert.equal(restoration?.items[1], "2. Confirm guards are reinstalled");
});

test("trims repeated whitespace", () => {
  const result = generateLockoutTagoutChecklist({
    ...validInput,
    companyName: "  ABC   Mechanical  ",
    equipmentName: " Air   Handling   Unit 4 ",
  });

  assert.equal(
    result.title,
    "Lockout/Tagout Checklist for Air Handling Unit 4",
  );
  assert.ok(result.summary.includes("ABC Mechanical"));
});

const requiredTextCases = [
  ["companyName", "Company name is required"],
  ["projectName", "Project name is required"],
  ["equipmentName", "Equipment name is required"],
  ["equipmentLocation", "Equipment location is required"],
  ["authorizedEmployee", "Authorized employee is required"],
  ["supervisorName", "Supervisor name is required"],
];

for (const [field, message] of requiredTextCases) {
  test(`rejects missing ${field}`, () => {
    assert.throws(
      () =>
        generateLockoutTagoutChecklist({
          ...validInput,
          [field]: " ",
        }),
      new RegExp(message),
    );
  });
}

const requiredListCases = [
  [
    "affectedEmployees",
    "At least one affected employee or work group is required",
  ],
  ["energySources", "At least one hazardous energy source is required"],
  ["isolationPoints", "At least one energy isolation point is required"],
  ["shutdownSteps", "At least one shutdown step is required"],
  [
    "verificationSteps",
    "At least one zero-energy verification step is required",
  ],
  ["restorationSteps", "At least one restoration step is required"],
  [
    "requiredDevices",
    "At least one lockout or tagout device is required",
  ],
];

for (const [field, message] of requiredListCases) {
  test(`rejects empty ${field}`, () => {
    assert.throws(
      () =>
        generateLockoutTagoutChecklist({
          ...validInput,
          [field]: [" ", ""],
        }),
      new RegExp(message),
    );
  });
}
