import assert from "node:assert/strict";
import test from "node:test";
import { generateIncidentReport } from "../../src/features/incident-report-generator/generate-incident-report.ts";

const validInput = {
  companyName: "ABC Construction",
  projectName: "Warehouse Buildout",
  incidentDate: "2026-07-09",
  incidentLocation: "North loading dock",
  incidentType: "Near Miss",
  description: "A pallet was dropped near the pedestrian walkway without injury.",
  peopleInvolved: ["John Smith", "Maria Lopez", "John Smith"],
  witnesses: ["Site foreman", "Site foreman"],
  immediateActions: ["Stopped nearby work", "Blocked the walkway"],
  correctiveActions: ["Review material handling procedure", "Refresh spotter requirements"],
  supervisorName: "David Clark",
};

test("generates an incident report result", () => {
  const result = generateIncidentReport(validInput);

  assert.equal(result.title, "Near Miss Incident Report for Warehouse Buildout");
  assert.ok(result.summary.includes("ABC Construction"));
  assert.ok(result.sections.length >= 7);
  assert.ok(result.disclaimer.includes("not legal advice"));
});

test("deduplicates people and witnesses", () => {
  const result = generateIncidentReport(validInput);

  const people = result.sections.find((section) => section.title === "People Involved");
  const witnesses = result.sections.find((section) => section.title === "Witnesses");

  assert.equal(people?.items.length, 2);
  assert.equal(witnesses?.items.length, 1);
});

test("uses fallback when no witnesses are listed", () => {
  const result = generateIncidentReport({ ...validInput, witnesses: [] });
  const witnesses = result.sections.find((section) => section.title === "Witnesses");

  assert.deepEqual(witnesses?.items, ["No witnesses listed."]);
});

test("trims whitespace from input fields", () => {
  const result = generateIncidentReport({
    ...validInput,
    companyName: "  ABC   Construction  ",
    projectName: " Warehouse   Buildout ",
  });

  assert.ok(result.summary.includes("ABC Construction"));
  assert.equal(result.title, "Near Miss Incident Report for Warehouse Buildout");
});

test("rejects missing company name", () => {
  assert.throws(
    () => generateIncidentReport({ ...validInput, companyName: " " }),
    /Company name is required/,
  );
});

test("rejects missing project name", () => {
  assert.throws(
    () => generateIncidentReport({ ...validInput, projectName: " " }),
    /Project name is required/,
  );
});

test("rejects missing incident date", () => {
  assert.throws(
    () => generateIncidentReport({ ...validInput, incidentDate: " " }),
    /Incident date is required/,
  );
});

test("rejects missing incident location", () => {
  assert.throws(
    () => generateIncidentReport({ ...validInput, incidentLocation: " " }),
    /Incident location is required/,
  );
});

test("rejects missing incident type", () => {
  assert.throws(
    () => generateIncidentReport({ ...validInput, incidentType: " " }),
    /Incident type is required/,
  );
});

test("rejects missing incident description", () => {
  assert.throws(
    () => generateIncidentReport({ ...validInput, description: " " }),
    /Incident description is required/,
  );
});

test("rejects empty people involved", () => {
  assert.throws(
    () => generateIncidentReport({ ...validInput, peopleInvolved: [" ", ""] }),
    /At least one involved person is required/,
  );
});

test("rejects empty immediate actions", () => {
  assert.throws(
    () => generateIncidentReport({ ...validInput, immediateActions: [" ", ""] }),
    /At least one immediate action is required/,
  );
});

test("rejects empty corrective actions", () => {
  assert.throws(
    () => generateIncidentReport({ ...validInput, correctiveActions: [" ", ""] }),
    /At least one corrective action is required/,
  );
});

test("rejects missing supervisor name", () => {
  assert.throws(
    () => generateIncidentReport({ ...validInput, supervisorName: " " }),
    /Supervisor name is required/,
  );
});
