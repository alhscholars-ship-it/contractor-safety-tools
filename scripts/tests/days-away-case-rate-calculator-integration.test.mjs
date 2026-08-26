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
  "src/app/tools/days-away-case-rate-calculator/page.tsx";

const interfacePath =
  "src/features/days-away-case-rate-calculator/days-away-case-rate-calculator.tsx";

const indexPath =
  "src/features/days-away-case-rate-calculator/index.ts";

const enginePath =
  "src/features/days-away-case-rate-calculator/calculate-days-away-case-rate.ts";

test("publishes the Days Away Case Rate calculator in the canonical catalog", () => {
  const tool = tools.find(
    (candidate) =>
      candidate.slug ===
      "days-away-case-rate-calculator",
  );

  assert.ok(tool);

  assert.equal(
    tool.name,
    "Days Away Case Rate Calculator",
  );

  assert.equal(
    tool.category,
    "Safety Calculators",
  );

  assert.equal(
    tool.href,
    "/tools/days-away-case-rate-calculator",
  );

  assert.ok(
    tool.keywords.includes(
      "DAFWII rate calculator",
    ),
  );
});

test("provides two official OSHA Days Away Rate references", () => {
  const sources =
    officialSafetySourcesByTool[
      "days-away-case-rate-calculator"
    ];

  assert.equal(sources.length, 2);

  assert.deepEqual(
    sources.map((source) => source.url),
    [
      "https://www.osha.gov/enforcement/directives/05-05-cpl-02",
      "https://www.osha.gov/laws-regs/regulations/standardnumber/1904/1904.7",
    ],
  );
});

test("publishes a complete SEO and trust-oriented Days Away Rate page", async () => {
  const source = await readFile(
    pagePath,
    "utf8",
  );

  assert.match(
    source,
    /title: "Days Away Case Rate Calculator"/,
  );

  assert.match(
    source,
    /canonical:\s*"\/tools\/days-away-case-rate-calculator"/,
  );

  assert.match(source, /createToolJsonLd/);
  assert.match(source, /createBreadcrumbJsonLd/);
  assert.match(source, /createFaqJsonLd/);

  assert.match(
    source,
    /<DaysAwayCaseRateCalculator \/>/,
  );

  assert.match(
    source,
    /<OfficialSafetySources toolSlug="days-away-case-rate-calculator" \/>/,
  );

  assert.match(
    source,
    /Use cases, not days lost/,
  );

  assert.match(
    source,
    /Days Away Case Rate versus DART/,
  );
});

test("provides an accessible deterministic Days Away Rate interface", async () => {
  const [interfaceSource, indexSource] =
    await Promise.all([
      readFile(interfacePath, "utf8"),
      readFile(indexPath, "utf8"),
    ]);

  assert.match(
    interfaceSource,
    /calculateDaysAwayCaseRate\(\{/,
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
    /aria-describedby="days-away-case-count-help"/,
  );

  assert.match(
    interfaceSource,
    /aria-describedby="days-away-employee-hours-help"/,
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
    /export \{ DaysAwayCaseRateCalculator \} from "\.\/days-away-case-rate-calculator";/,
  );
});

test("retains the standardized formula and DART distinction in the engine", async () => {
  const source = await readFile(
    enginePath,
    "utf8",
  );

  assert.match(
    source,
    /const STANDARDIZED_HOURS = 200_000;/,
  );

  assert.match(
    source,
    /Do not include cases involving only restricted/,
  );

  assert.match(
    source,
    /included in the DART/,
  );

  assert.match(
    source,
    /not a determination of OSHA recordability/,
  );
});

test(
  "includes the Days Away Rate route in the static sitemap",
  () => {
    const expectedUrl =
      "https://safetysitepro.com/tools/days-away-case-rate-calculator/";

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
