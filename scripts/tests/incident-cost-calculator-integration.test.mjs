import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import * as sitemapModule from "../../src/app/sitemap.ts";
import {
  officialSafetySourcesByTool,
} from "../../src/data/official-safety-sources.ts";
import { tools } from "../../src/data/tools.ts";

const sitemap =
  typeof sitemapModule.default === "function"
    ? sitemapModule.default
    : sitemapModule.default?.default;

assert.equal(
  typeof sitemap,
  "function",
  "Expected sitemap default export to resolve to a function",
);

const pagePath =
  "src/app/tools/incident-cost-calculator/page.tsx";

const interfacePath =
  "src/features/incident-cost-calculator/incident-cost-calculator.tsx";

const indexPath =
  "src/features/incident-cost-calculator/index.ts";

const enginePath =
  "src/features/incident-cost-calculator/calculate-incident-cost.ts";


test("publishes the incident cost calculator in the canonical catalog", () => {
  const tool = tools.find(
    (candidate) =>
      candidate.slug ===
      "incident-cost-calculator",
  );

  assert.ok(tool);
  assert.equal(
    tool.name,
    "Incident Cost Calculator",
  );

  assert.equal(
    tool.category,
    "Safety Calculators",
  );

  assert.equal(
    tool.href,
    "/tools/incident-cost-calculator",
  );

  assert.ok(
    tool.keywords.includes(
      "incident cost calculator",
    ),
  );
});

test("provides two official OSHA incident-cost references", () => {
  const sources =
    officialSafetySourcesByTool[
      "incident-cost-calculator"
    ];

  assert.equal(sources.length, 2);

  assert.deepEqual(
    sources.map((source) => source.url),
    [
      "https://www.osha.gov/businesscase/costs",
      "https://www.osha.gov/safetypays/estimator-info",
    ],
  );
});

test("publishes a complete SEO and trust-oriented incident cost page", async () => {
  const source = await readFile(
    pagePath,
    "utf8",
  );

  assert.match(
    source,
    /title: "Incident Cost Calculator"/,
  );

  assert.match(
    source,
    /canonical: "\/tools\/incident-cost-calculator"/,
  );

  assert.match(source, /createToolJsonLd/);
  assert.match(source, /createBreadcrumbJsonLd/);
  assert.match(source, /createFaqJsonLd/);

  assert.match(
    source,
    /<IncidentCostCalculator \/>/,
  );

  assert.match(
    source,
    /<OfficialSafetySources toolSlug="incident-cost-calculator" \/>/,
  );

  assert.match(
    source,
    /not the OSHA Safety Pays\s+program/,
  );

  assert.match(
    source,
    /integer cents/,
  );
});

test("provides an accessible deterministic incident cost interface", async () => {
  const [interfaceSource, indexSource] =
    await Promise.all([
      readFile(interfacePath, "utf8"),
      readFile(indexPath, "utf8"),
    ]);

  assert.match(
    interfaceSource,
    /calculateIncidentCost\(\{/,
  );

  assert.match(
    interfaceSource,
    /aria-live="polite"/,
  );

  assert.match(
    interfaceSource,
    /role="alert"/,
  );

  assert.match(
    interfaceSource,
    /htmlFor=\{id\}/,
  );

  assert.match(
    interfaceSource,
    /aria-describedby=\{helpId\}/,
  );

  assert.match(
    interfaceSource,
    /ExportTextButton/,
  );

  assert.match(
    interfaceSource,
    /ExportPdfButton/,
  );

  assert.match(
    indexSource,
    /export \{ IncidentCostCalculator \} from "\.\/incident-cost-calculator";/,
  );
});

test("uses integer-cent arithmetic in the incident cost engine", async () => {
  const source = await readFile(
    enginePath,
    "utf8",
  );

  assert.match(
    source,
    /function toCents\(/,
  );

  assert.match(
    source,
    /function sumCents\(/,
  );

  assert.match(
    source,
    /estimatedTotalIncidentCostCents/,
  );

  assert.match(
    source,
    /not an OSHA-required cost formula/,
  );
});

test(
  "includes the incident cost route in the static sitemap",
  () => {
    const expectedUrl =
      "https://contractorsafetytools.com/tools/incident-cost-calculator/";

    assert.equal(
      sitemap().filter(
        (entry) =>
          entry.url === expectedUrl,
      ).length,
      1,
      `The sitemap must include ${expectedUrl} exactly once.`,
    );
  },
);
