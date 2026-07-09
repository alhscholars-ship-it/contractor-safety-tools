import assert from "node:assert/strict";
import test from "node:test";
import { generateJha } from "../../src/features/jha-generator/generate-jha.ts";

const validInput = {
  companyName: "ABC Construction",
  projectName: "Warehouse Buildout",
  taskName: "Scaffold Setup",
  jobsiteLocation: "North elevation",
  taskSteps: ["Inspect scaffold parts", "Install base plates", "Install guardrails"],
  hazards: ["Falls", "Falling objects", "Falls"],
  controls: ["Use competent person inspection", "Install toe boards"],
  requiredPpe: ["Hard hat", "Safety glasses", "Hard hat"],
  supervisorName: "David Clark",
};

test("generates a JHA result", () => {
  const result = generateJha(validInput);

  assert.equal(result.title, "Scaffold Setup JHA for Warehouse Buildout");
  assert.ok(result.summary.includes("ABC Construction"));
  assert.ok(result.sections.length >= 6);
  assert.ok(result.disclaimer.includes("not legal advice"));
});

test("deduplicates hazards and PPE", () => {
  const result = generateJha(validInput);
  const hazards = result.sections.find((section) => section.title === "Potential Hazards");
  const ppe = result.sections.find((section) => section.title === "Required PPE");

  assert.equal(hazards?.items.length, 2);
  assert.equal(ppe?.items.length, 2);
});

test("numbers task steps", () => {
  const result = generateJha(validInput);
  const steps = result.sections.find((section) => section.title === "Task Steps");

  assert.equal(steps?.items[0], "1. Inspect scaffold parts");
  assert.equal(steps?.items[2], "3. Install guardrails");
});

test("trims whitespace from input fields", () => {
  const result = generateJha({
    ...validInput,
    companyName: "  ABC   Construction  ",
    projectName: " Warehouse   Buildout ",
  });

  assert.ok(result.summary.includes("ABC Construction"));
  assert.equal(result.title, "Scaffold Setup JHA for Warehouse Buildout");
});

test("rejects missing company name", () => {
  assert.throws(
    () => generateJha({ ...validInput, companyName: " " }),
    /Company name is required/,
  );
});

test("rejects missing project name", () => {
  assert.throws(
    () => generateJha({ ...validInput, projectName: " " }),
    /Project name is required/,
  );
});

test("rejects missing task name", () => {
  assert.throws(
    () => generateJha({ ...validInput, taskName: " " }),
    /Task name is required/,
  );
});

test("rejects missing jobsite location", () => {
  assert.throws(
    () => generateJha({ ...validInput, jobsiteLocation: " " }),
    /Jobsite location is required/,
  );
});

test("rejects empty task steps", () => {
  assert.throws(
    () => generateJha({ ...validInput, taskSteps: [" ", ""] }),
    /At least one task step is required/,
  );
});

test("rejects empty hazards", () => {
  assert.throws(
    () => generateJha({ ...validInput, hazards: [" ", ""] }),
    /At least one hazard is required/,
  );
});

test("rejects empty controls", () => {
  assert.throws(
    () => generateJha({ ...validInput, controls: [" ", ""] }),
    /At least one control is required/,
  );
});

test("rejects empty PPE", () => {
  assert.throws(
    () => generateJha({ ...validInput, requiredPpe: [" ", ""] }),
    /At least one PPE item is required/,
  );
});

test("rejects missing supervisor name", () => {
  assert.throws(
    () => generateJha({ ...validInput, supervisorName: " " }),
    /Supervisor name is required/,
  );
});
