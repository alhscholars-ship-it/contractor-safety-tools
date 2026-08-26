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
  "src/app/tools/trir-calculator/page.tsx";
const interfacePath =
  "src/features/trir-calculator/trir-calculator.tsx";
const indexPath =
  "src/features/trir-calculator/index.ts";

test("publishes the TRIR calculator in the canonical catalog", () => {
  const tool = tools.find(
    (candidate) => candidate.slug === "trir-calculator",
  );

  assert.ok(tool);
  assert.equal(tool.name, "TRIR Calculator");
  assert.equal(tool.category, "Safety Calculators");
  assert.equal(tool.href, "/tools/trir-calculator");
  assert.ok(tool.keywords.includes("TRIR calculator"));
});

test("provides two official OSHA references for TRIR", () => {
  const sources =
    officialSafetySourcesByTool["trir-calculator"];

  assert.equal(sources.length, 2);

  assert.deepEqual(
    sources.map((source) => source.url),
    [
      "https://www.osha.gov/recordkeeping",
      "https://www.osha.gov/laws-regs/standardinterpretations/2016-08-23",
    ],
  );
});

test("publishes a complete SEO and trust-oriented TRIR page", async () => {
  const source = await readFile(pagePath, "utf8");

  assert.match(
    source,
    /title: "TRIR Calculator"/,
  );

  assert.match(
    source,
    /canonical: "\/tools\/trir-calculator"/,
  );

  assert.match(
    source,
    /createToolJsonLd/,
  );

  assert.match(
    source,
    /createBreadcrumbJsonLd/,
  );

  assert.match(
    source,
    /createFaqJsonLd/,
  );

  assert.match(
    source,
    /<TrirCalculator \/>/,
  );

  assert.match(
    source,
    /<OfficialSafetySources toolSlug="trir-calculator" \/>/,
  );

  assert.match(
    source,
    /does not decide whether an injury or\s+illness is recordable/,
  );
});

test("provides an accessible deterministic calculator interface", async () => {
  const [interfaceSource, indexSource] = await Promise.all([
    readFile(interfacePath, "utf8"),
    readFile(indexPath, "utf8"),
  ]);

  assert.match(
    interfaceSource,
    /calculateTrir\(\{/,
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
    /htmlFor="trir-recordable-cases"/,
  );

  assert.match(
    interfaceSource,
    /htmlFor="trir-employee-hours"/,
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
    /export \{ TrirCalculator \} from "\.\/trir-calculator";/,
  );
});

test(
  "includes the TRIR route in the static sitemap",
  () => {
    const expectedUrl =
      "https://safetysitepro.com/tools/trir-calculator/";

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
