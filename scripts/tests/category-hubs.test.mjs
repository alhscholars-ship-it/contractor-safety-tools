import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { access } from "node:fs/promises";
import test from "node:test";

import { tools } from "../../src/data/tools.ts";

const toolsHubPath = "src/app/tools/page.tsx";
const calculatorsHubPath =
  "src/app/tools/safety-calculators/page.tsx";
const inspectionsHubPath =
  "src/app/tools/inspection-checklists/page.tsx";

const calculatorSlugs = [
  "days-away-case-rate-calculator",
  "incident-cost-calculator",
  "risk-matrix-calculator",
  "severity-rate-calculator",
  "dart-rate-calculator",
  "trir-calculator",
];

const inspectionSlugs = [
  "daily-jobsite-safety-inspection-generator",
  "fire-extinguisher-inspection-generator",
  "first-aid-kit-inspection-generator",
  "ladder-inspection-generator",
  "excavation-inspection-generator",
  "scaffold-inspection-generator",
  "ppe-checklist-generator",
];

test("category hub source files exist", async () => {
  await access(calculatorsHubPath);
  await access(inspectionsHubPath);
});

test("safety calculator hub exposes exactly the calculator category", async () => {
  const source = await readFile(calculatorsHubPath, "utf8");
  const categoryTools = tools.filter(
    (tool) => tool.category === "Safety Calculators",
  );

  assert.equal(categoryTools.length, calculatorSlugs.length);
  assert.deepEqual(
    categoryTools.map((tool) => tool.slug),
    calculatorSlugs,
  );

  assert.match(
    source,
    /tool\.category === "Safety Calculators"/,
  );

  assert.match(
    source,
    /href={tool\.href}/,
  );
});

test("inspection checklist hub exposes exactly the inspection category", async () => {
  const source = await readFile(inspectionsHubPath, "utf8");
  const categoryTools = tools.filter(
    (tool) => tool.category === "Inspections",
  );

  assert.equal(categoryTools.length, inspectionSlugs.length);
  assert.deepEqual(
    categoryTools.map((tool) => tool.slug),
    inspectionSlugs,
  );

  assert.match(
    source,
    /tool\.category === "Inspections"/,
  );

  assert.match(
    source,
    /href={tool\.href}/,
  );
});

test("main tools hub links to both category hubs", async () => {
  const source = await readFile(toolsHubPath, "utf8");

  assert.match(
    source,
    /href: "\/tools\/safety-calculators"/,
  );

  assert.match(
    source,
    /href: "\/tools\/inspection-checklists"/,
  );

  assert.match(
    source,
    /Start with focused safety tool collections/,
  );
});
