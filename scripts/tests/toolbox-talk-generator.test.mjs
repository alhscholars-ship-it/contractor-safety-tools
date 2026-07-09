import assert from "node:assert/strict";
import test from "node:test";
import { generateToolboxTalk } from "../../src/features/toolbox-talk-generator/generate-toolbox-talk.ts";

const validInput = {
  topic: "Fall Protection",
  trade: "Roofing",
  jobsite: "Dallas warehouse roof",
  hazards: ["Unprotected edges", "Ladders", "Unprotected edges"],
  controls: ["Guardrails", "Personal fall arrest systems", "Guardrails"],
  supervisorName: "John Smith",
};

test("generates a toolbox talk result", () => {
  const result = generateToolboxTalk(validInput);

  assert.equal(result.title, "Fall Protection Toolbox Talk for Roofing");
  assert.ok(result.opening.includes("John Smith"));
  assert.ok(result.discussionPoints.length >= 5);
  assert.ok(result.crewQuestions.length >= 3);
  assert.ok(result.documentationNotes.length >= 4);
  assert.ok(result.disclaimer.includes("not legal advice"));
});

test("deduplicates hazards and controls", () => {
  const result = generateToolboxTalk(validInput);

  const hazardMentions = result.discussionPoints.filter((item) =>
    item.includes("Unprotected edges"),
  );
  const controlMentions = result.discussionPoints.filter((item) =>
    item.includes("Guardrails"),
  );

  assert.equal(hazardMentions.length, 1);
  assert.equal(controlMentions.length, 1);
});

test("trims whitespace from input fields", () => {
  const result = generateToolboxTalk({
    ...validInput,
    topic: "  Fall   Protection  ",
    trade: "  Roofing  ",
  });

  assert.equal(result.title, "Fall Protection Toolbox Talk for Roofing");
});

test("rejects missing topic", () => {
  assert.throws(
    () => generateToolboxTalk({ ...validInput, topic: " " }),
    /Topic is required/,
  );
});

test("rejects missing trade", () => {
  assert.throws(
    () => generateToolboxTalk({ ...validInput, trade: " " }),
    /Trade is required/,
  );
});

test("rejects missing jobsite", () => {
  assert.throws(
    () => generateToolboxTalk({ ...validInput, jobsite: " " }),
    /Jobsite is required/,
  );
});

test("rejects empty hazards", () => {
  assert.throws(
    () => generateToolboxTalk({ ...validInput, hazards: [" ", ""] }),
    /At least one hazard is required/,
  );
});

test("rejects empty controls", () => {
  assert.throws(
    () => generateToolboxTalk({ ...validInput, controls: [" ", ""] }),
    /At least one control is required/,
  );
});

test("rejects missing supervisor name", () => {
  assert.throws(
    () => generateToolboxTalk({ ...validInput, supervisorName: " " }),
    /Supervisor name is required/,
  );
});
