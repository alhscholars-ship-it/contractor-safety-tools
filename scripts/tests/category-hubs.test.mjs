import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

import { tools } from "../../src/data/tools.ts";

const toolsHubPath = "src/app/tools/page.tsx";
const calculatorsHubPath =
  "src/app/tools/safety-calculators/page.tsx";
const inspectionsHubPath =
  "src/app/tools/inspection-checklists/page.tsx";

const calculatorTools = tools.filter(
  (tool) => tool.category === "Safety Calculators",
);
const inspectionTools = tools.filter(
  (tool) => tool.category === "Inspections",
);

test("category hub source files exist", async () => {
  await access(calculatorsHubPath);
  await access(inspectionsHubPath);
});

test("safety calculator hub exposes exactly the calculator category", async () => {
  const source = await readFile(calculatorsHubPath, "utf8");

  assert.ok(calculatorTools.length > 0);
  assert.match(source, /tool\.category === "Safety Calculators"/);
  assert.match(source, /href={tool\.href}/);

  for (const tool of calculatorTools) {
    assert.match(
      tool.href,
      /^\/tools\/[^/]+$/,
      `${tool.slug} must use the canonical source route without a trailing slash`,
    );
  }
});

test("inspection checklist hub exposes exactly the inspection category", async () => {
  const source = await readFile(inspectionsHubPath, "utf8");

  assert.ok(inspectionTools.length > 0);
  assert.match(source, /tool\.category === "Inspections"/);
  assert.match(source, /href={tool\.href}/);

  for (const tool of inspectionTools) {
    assert.match(
      tool.href,
      /^\/tools\/[^/]+$/,
      `${tool.slug} must use the canonical source route without a trailing slash`,
    );
  }
});

test("main tools hub links to both category hubs", async () => {
  const source = await readFile(toolsHubPath, "utf8");

  assert.match(source, /href: "\/tools\/safety-calculators"/);
  assert.match(source, /href: "\/tools\/inspection-checklists"/);
  assert.match(source, /Start with focused safety tool collections/);
});

test("category hubs use trailing-slash internal links and breadcrumbs", async () => {
  const calculatorSource = await readFile(calculatorsHubPath, "utf8");
  const inspectionSource = await readFile(inspectionsHubPath, "utf8");

  for (const source of [calculatorSource, inspectionSource]) {
    assert.match(source, /href="\/"|href=\{["']\/["']\}/);
    assert.match(source, /href="\/tools"|href=\{["']\/tools["']\}/);
  }
});

test("category tool hrefs are generated from the tool catalog", () => {
  for (const tool of [...calculatorTools, ...inspectionTools]) {
    assert.match(
      tool.href,
      /^\/tools\/[^/]+$/,
      `${tool.slug} must use the canonical source route without a trailing slash`,
    );
  }
});
