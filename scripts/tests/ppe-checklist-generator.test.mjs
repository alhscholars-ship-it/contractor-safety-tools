import assert from "node:assert/strict";
import test from "node:test";
import { generatePpeChecklist } from "../../src/features/ppe-checklist-generator/generate-ppe-checklist.ts";

const validInput = {
  companyName: "ABC Construction",
  projectName: "Warehouse Buildout",
  trade: "Roofing",
  jobsiteLocation: "South roof area",
  taskName: "Roof edge work",
  hazards: ["Falls", "Sharp materials", "Falls"],
  requiredPpe: ["Hard hat", "Safety glasses", "Hard hat"],
  inspectionItems: ["Harness condition", "Lanyard connection", "Harness condition"],
  supervisorName: "David Clark",
};

test("generates a PPE checklist result", () => {
  const result = generatePpeChecklist(validInput);

  assert.equal(result.title, "Roofing PPE Checklist for Roof edge work");
  assert.ok(result.summary.includes("ABC Construction"));
  assert.ok(result.sections.length >= 5);
  assert.ok(result.disclaimer.includes("not legal advice"));
});

test("deduplicates hazards, PPE, and inspection items", () => {
  const result = generatePpeChecklist(validInput);

  const hazards = result.sections.find((section) => section.title === "Known Hazards");
  const ppe = result.sections.find((section) => section.title === "Required PPE");
  const inspections = result.sections.find(
    (section) => section.title === "Pre-Use Inspection Items",
  );

  assert.equal(hazards?.items.length, 2);
  assert.equal(ppe?.items.length, 2);
  assert.equal(inspections?.items.length, 2);
});

test("trims whitespace from input fields", () => {
  const result = generatePpeChecklist({
    ...validInput,
    companyName: "  ABC   Construction  ",
    projectName: " Warehouse   Buildout ",
  });

  assert.ok(result.summary.includes("ABC Construction"));
  assert.equal(result.title, "Roofing PPE Checklist for Roof edge work");
});

test("rejects missing company name", () => {
  assert.throws(
    () => generatePpeChecklist({ ...validInput, companyName: " " }),
    /Company name is required/,
  );
});

test("rejects missing project name", () => {
  assert.throws(
    () => generatePpeChecklist({ ...validInput, projectName: " " }),
    /Project name is required/,
  );
});

test("rejects missing trade", () => {
  assert.throws(
    () => generatePpeChecklist({ ...validInput, trade: " " }),
    /Trade is required/,
  );
});

test("rejects missing jobsite location", () => {
  assert.throws(
    () => generatePpeChecklist({ ...validInput, jobsiteLocation: " " }),
    /Jobsite location is required/,
  );
});

test("rejects missing task name", () => {
  assert.throws(
    () => generatePpeChecklist({ ...validInput, taskName: " " }),
    /Task name is required/,
  );
});

test("rejects empty hazards", () => {
  assert.throws(
    () => generatePpeChecklist({ ...validInput, hazards: [" ", ""] }),
    /At least one hazard is required/,
  );
});

test("rejects empty PPE", () => {
  assert.throws(
    () => generatePpeChecklist({ ...validInput, requiredPpe: [" ", ""] }),
    /At least one PPE item is required/,
  );
});

test("rejects empty inspection items", () => {
  assert.throws(
    () => generatePpeChecklist({ ...validInput, inspectionItems: [" ", ""] }),
    /At least one inspection item is required/,
  );
});

test("rejects missing supervisor name", () => {
  assert.throws(
    () => generatePpeChecklist({ ...validInput, supervisorName: " " }),
    /Supervisor name is required/,
  );
});
