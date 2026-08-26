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
  "src/app/tools/severity-rate-calculator/page.tsx";

const interfacePath =
  "src/features/severity-rate-calculator/severity-rate-calculator.tsx";

const indexPath =
  "src/features/severity-rate-calculator/index.ts";

test("publishes the severity-rate calculator in the canonical catalog", () => {
  const tool = tools.find(
    (candidate) =>
      candidate.slug ===
      "severity-rate-calculator",
  );

  assert.ok(tool);

  assert.equal(
    tool.name,
    "Severity Rate Calculator",
  );

  assert.equal(
    tool.category,
    "Safety Calculators",
  );

  assert.equal(
    tool.href,
    "/tools/severity-rate-calculator",
  );

  assert.ok(
    tool.keywords.includes(
      "severity rate calculator",
    ),
  );
});

test("provides two official OSHA references for severity rate", () => {
  const sources =
    officialSafetySourcesByTool[
      "severity-rate-calculator"
    ];

  assert.equal(sources.length, 2);

  assert.deepEqual(
    sources.map((source) => source.url),
    [
      "https://www.osha.gov/otm/section-7-ergonomics/chapter-1",
      "https://www.osha.gov/laws-regs/regulations/standardnumber/1904/1904.7",
    ],
  );
});

test("publishes a complete SEO and trust-oriented severity-rate page", async () => {
  const source = await readFile(
    pagePath,
    "utf8",
  );

  assert.match(
    source,
    /title: "Severity Rate Calculator"/,
  );

  assert.match(
    source,
    /canonical: "\/tools\/severity-rate-calculator"/,
  );

  assert.match(source, /createToolJsonLd/);
  assert.match(source, /createBreadcrumbJsonLd/);
  assert.match(source, /createFaqJsonLd/);

  assert.match(
    source,
    /<SeverityRateCalculator \/>/,
  );

  assert.match(
    source,
    /<OfficialSafetySources toolSlug="severity-rate-calculator" \/>/,
  );

  assert.match(
    source,
    /does not determine OSHA\s+recordability/,
  );
});

test("provides an accessible deterministic severity-rate interface", async () => {
  const [interfaceSource, indexSource] =
    await Promise.all([
      readFile(interfacePath, "utf8"),
      readFile(indexPath, "utf8"),
    ]);

  assert.match(
    interfaceSource,
    /calculateSeverityRate\(\{/,
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
    /htmlFor="severity-days-away"/,
  );

  assert.match(
    interfaceSource,
    /htmlFor="severity-restricted-days"/,
  );

  assert.match(
    interfaceSource,
    /htmlFor="severity-employee-hours"/,
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
    /export \{ SeverityRateCalculator \} from "\.\/severity-rate-calculator";/,
  );
});

test(
  "includes the severity-rate route in the static sitemap",
  () => {
    const expectedUrl =
      "https://safetysitepro.com/tools/severity-rate-calculator/";

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
