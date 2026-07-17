import assert from "node:assert/strict";
import test from "node:test";
import { generateNearMissReport } from "../../src/features/near-miss-report-generator/generate-near-miss-report.ts";

const validInput = {
  companyName: "ABC Construction",
  projectName: "Warehouse Buildout",
  eventDate: "2026-07-16",
  eventLocation: "North loading dock",
  reportedBy: "John Smith",
  supervisorName: "David Clark",
  eventDescription:
    "A suspended pallet shifted toward a marked pedestrian route without striking anyone.",
  potentialOutcome:
    "A worker could have sustained a serious struck-by injury.",
  whatPreventedInjury: [
    "Pedestrian noticed the load movement",
    "Spotter warned the operator",
    "Spotter warned the operator",
  ],
  contributingFactors: [
    "Load was not centered",
    "Pedestrian route was too close to material handling activity",
  ],
  immediateActions: [
    "Stopped lifting operations",
    "Closed the pedestrian route",
  ],
  correctiveActions: [
    "Revise the lifting plan",
    "Relocate the pedestrian route",
  ],
  responsiblePersons: ["Site superintendent", "Safety manager"],
  followUpDate: "2026-07-18",
  witnesses: ["Site foreman", "Site foreman"],
};

test("generates a near-miss report result", () => {
  const result = generateNearMissReport(validInput);

  assert.equal(result.title, "Near Miss Report for Warehouse Buildout");
  assert.ok(result.summary.includes("ABC Construction"));
  assert.ok(result.sections.length >= 10);
  assert.ok(result.disclaimer.includes("not legal advice"));
});

test("deduplicates list values", () => {
  const result = generateNearMissReport(validInput);

  const prevention = result.sections.find(
    (section) => section.title === "What Prevented Injury or Damage",
  );
  const witnesses = result.sections.find(
    (section) => section.title === "Witnesses",
  );

  assert.equal(prevention?.items.length, 2);
  assert.equal(witnesses?.items.length, 1);
});

test("uses fallback when witnesses are empty", () => {
  const result = generateNearMissReport({
    ...validInput,
    witnesses: [" ", ""],
  });

  const witnesses = result.sections.find(
    (section) => section.title === "Witnesses",
  );

  assert.deepEqual(witnesses?.items, ["No witnesses listed."]);
});

test("trims repeated whitespace", () => {
  const result = generateNearMissReport({
    ...validInput,
    companyName: "  ABC   Construction ",
    projectName: " Warehouse   Buildout ",
  });

  assert.equal(result.title, "Near Miss Report for Warehouse Buildout");
  assert.ok(result.summary.includes("ABC Construction"));
});

const requiredFieldCases = [
  ["companyName", " ", /Company name is required/],
  ["projectName", " ", /Project name is required/],
  ["eventDate", " ", /Near-miss date is required/],
  ["eventLocation", " ", /Near-miss location is required/],
  ["reportedBy", " ", /Reporter name is required/],
  ["supervisorName", " ", /Supervisor name is required/],
  ["eventDescription", " ", /Near-miss description is required/],
  ["potentialOutcome", " ", /Potential outcome is required/],
  ["followUpDate", " ", /Follow-up date is required/],
];

for (const [field, value, pattern] of requiredFieldCases) {
  test(`rejects missing ${field}`, () => {
    assert.throws(
      () =>
        generateNearMissReport({
          ...validInput,
          [field]: value,
        }),
      pattern,
    );
  });
}

const requiredListCases = [
  [
    "whatPreventedInjury",
    /At least one injury-prevention factor is required/,
  ],
  ["contributingFactors", /At least one contributing factor is required/],
  ["immediateActions", /At least one immediate action is required/],
  ["correctiveActions", /At least one corrective action is required/],
  ["responsiblePersons", /At least one responsible person is required/],
];

for (const [field, pattern] of requiredListCases) {
  test(`rejects empty ${field}`, () => {
    assert.throws(
      () =>
        generateNearMissReport({
          ...validInput,
          [field]: [" ", ""],
        }),
      pattern,
    );
  });
}
