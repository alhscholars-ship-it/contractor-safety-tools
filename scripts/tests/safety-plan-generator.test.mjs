import assert from "node:assert/strict";
import test from "node:test";
import { generateSafetyPlan } from "../../src/features/safety-plan-generator/generate-safety-plan.ts";

const validInput = {
  companyName: "ABC Roofing",
  projectName: "Warehouse Roof Repair",
  trade: "Roofing",
  jobsiteLocation: "Dallas, Texas",
  primaryHazards: ["Falls", "Heat exposure", "Falls"],
  requiredPpe: ["Hard hat", "Fall protection", "Hard hat"],
  emergencyContact: "Site supervisor: 555-123-4567",
};

test("generates a safety plan result", () => {
  const result = generateSafetyPlan(validInput);

  assert.equal(result.title, "Roofing Safety Plan for Warehouse Roof Repair");
  assert.ok(result.summary.includes("ABC Roofing"));
  assert.ok(result.sections.length >= 5);
  assert.ok(result.disclaimer.includes("not legal advice"));
});

test("deduplicates hazards and PPE", () => {
  const result = generateSafetyPlan(validInput);
  const hazardSection = result.sections.find((section) => section.title === "Primary Jobsite Hazards");
  const ppeSection = result.sections.find((section) => section.title === "Required PPE");

  assert.equal(hazardSection?.items.length, 2);
  assert.equal(ppeSection?.items.length, 2);
});

test("trims whitespace from input fields", () => {
  const result = generateSafetyPlan({
    ...validInput,
    companyName: "  ABC   Roofing  ",
    projectName: " Warehouse   Roof Repair ",
  });

  assert.ok(result.summary.includes("ABC Roofing"));
  assert.equal(result.title, "Roofing Safety Plan for Warehouse Roof Repair");
});

test("rejects missing company name", () => {
  assert.throws(
    () => generateSafetyPlan({ ...validInput, companyName: " " }),
    /Company name is required/,
  );
});

test("rejects missing project name", () => {
  assert.throws(
    () => generateSafetyPlan({ ...validInput, projectName: " " }),
    /Project name is required/,
  );
});

test("rejects missing trade", () => {
  assert.throws(
    () => generateSafetyPlan({ ...validInput, trade: " " }),
    /Trade is required/,
  );
});

test("rejects missing jobsite location", () => {
  assert.throws(
    () => generateSafetyPlan({ ...validInput, jobsiteLocation: " " }),
    /Jobsite location is required/,
  );
});

test("rejects empty hazards", () => {
  assert.throws(
    () => generateSafetyPlan({ ...validInput, primaryHazards: [" ", ""] }),
    /At least one primary hazard is required/,
  );
});

test("rejects empty PPE", () => {
  assert.throws(
    () => generateSafetyPlan({ ...validInput, requiredPpe: [" ", ""] }),
    /At least one PPE item is required/,
  );
});

test("rejects missing emergency contact", () => {
  assert.throws(
    () => generateSafetyPlan({ ...validInput, emergencyContact: " " }),
    /Emergency contact is required/,
  );
});
