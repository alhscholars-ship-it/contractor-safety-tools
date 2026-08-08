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
  "src/app/tools/safety-training-matrix-generator/page.tsx";

const interfacePath =
  "src/features/safety-training-matrix-generator/safety-training-matrix-generator.tsx";

const indexPath =
  "src/features/safety-training-matrix-generator/index.ts";

const enginePath =
  "src/features/safety-training-matrix-generator/generate-safety-training-matrix.ts";

const toolsPath = "src/data/tools.ts";

function normalizeWhitespace(
  value,
) {
  return value.replace(/\s+/g, " ").trim();
}

test("publishes the Safety Training Matrix Generator in the canonical catalog", () => {
  const tool = tools.find(
    (candidate) =>
      candidate.slug ===
      "safety-training-matrix-generator",
  );

  assert.ok(tool);

  assert.equal(
    tool.name,
    "Safety Training Matrix Generator",
  );

  assert.equal(
    tool.category,
    "Safety Training",
  );

  assert.equal(
    tool.href,
    "/tools/safety-training-matrix-generator",
  );

  assert.ok(
    tool.keywords.includes(
      "OSHA training matrix template",
    ),
  );
});

test("adds the Safety Training category to the canonical type", async () => {
  const source = await readFile(
    toolsPath,
    "utf8",
  );

  assert.match(
    source,
    /\| "Safety Training";/,
  );
});

test("provides two official OSHA training references", () => {
  const sources =
    officialSafetySourcesByTool[
      "safety-training-matrix-generator"
    ];

  assert.equal(sources.length, 2);

  assert.deepEqual(
    sources.map((source) => source.url),
    [
      "https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.21",
      "https://www.osha.gov/safety-management/education-training",
    ],
  );
});

test("publishes a complete SEO and trust-oriented training matrix page", async () => {
  const source = await readFile(
    pagePath,
    "utf8",
  );

  assert.match(
    source,
    /title: "Safety Training Matrix Generator"/,
  );

  assert.match(
    source,
    /canonical:\s*"\/tools\/safety-training-matrix-generator"/,
  );

  assert.match(source, /createToolJsonLd/);
  assert.match(source, /createBreadcrumbJsonLd/);
  assert.match(source, /createFaqJsonLd/);

  assert.match(
    source,
    /<SafetyTrainingMatrixGenerator \/>/,
  );

  assert.match(
    source,
    /<OfficialSafetySources toolSlug="safety-training-matrix-generator" \/>/,
  );

  assert.match(
    source,
    /Do not invent renewal intervals/,
  );

  assert.match(
    source,
    /Outreach cards are not OSHA/,
  );

  assert.match(
    source,
    /Important compliance limitation/,
  );
});

test("provides an accessible dynamic training matrix interface", async () => {
  const [interfaceSource, indexSource] =
    await Promise.all([
      readFile(interfacePath, "utf8"),
      readFile(indexPath, "utf8"),
    ]);

  const normalized =
    normalizeWhitespace(interfaceSource);

  assert.match(
    interfaceSource,
    /generateSafetyTrainingMatrix\(\{/,
  );

  assert.match(
    interfaceSource,
    /aria-live="polite"/,
  );

  assert.match(
    interfaceSource,
    /role="alert"/,
  );

  assert.match(interfaceSource, /<fieldset/);
  assert.match(interfaceSource, /<legend/);

  assert.match(
    interfaceSource,
    /Add training assignment/,
  );

  assert.match(
    interfaceSource,
    /Remove assignment/,
  );

  assert.match(interfaceSource, /<table/);

  assert.match(
    interfaceSource,
    /<caption className="sr-only">/,
  );

  assert.match(
    interfaceSource,
    /ExportTextButton/,
  );

  assert.match(
    interfaceSource,
    /ExportPdfButton/,
  );

  assert.ok(
    normalized.includes(
      "Do not invent an annual interval.",
    ),
  );

  assert.match(
    indexSource,
    /export \{ SafetyTrainingMatrixGenerator \} from "\.\/safety-training-matrix-generator";/,
  );
});

test("retains professional training limitations in the deterministic engine", async () => {
  const source = await readFile(
    enginePath,
    "utf8",
  );

  assert.match(
    source,
    /does not replace employer-provided task-specific training/,
  );

  assert.match(
    source,
    /prescribe a universal refresher interval/,
  );

  assert.match(
    source,
    /OSHA-approved State Plan rules/,
  );

  assert.match(
    source,
    /A qualified safety professional or other authorized responsible person should verify every matrix assignment before use/,
  );
});

test(
  "includes the Safety Training Matrix route in the static sitemap",
  () => {
    const expectedUrl =
      "https://contractorsafetytools.com/tools/safety-training-matrix-generator/";

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
