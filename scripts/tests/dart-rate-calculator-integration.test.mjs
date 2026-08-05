import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  officialSafetySourcesByTool,
} from "../../src/data/official-safety-sources.ts";
import { tools } from "../../src/data/tools.ts";

const pagePath =
  "src/app/tools/dart-rate-calculator/page.tsx";

const interfacePath =
  "src/features/dart-rate-calculator/dart-rate-calculator.tsx";

const indexPath =
  "src/features/dart-rate-calculator/index.ts";

const sitemapPath = "src/app/sitemap.ts";

test("publishes the DART calculator in the canonical catalog", () => {
  const tool = tools.find(
    (candidate) =>
      candidate.slug === "dart-rate-calculator",
  );

  assert.ok(tool);
  assert.equal(tool.name, "DART Rate Calculator");
  assert.equal(tool.category, "Safety Calculators");
  assert.equal(
    tool.href,
    "/tools/dart-rate-calculator",
  );
  assert.ok(
    tool.keywords.includes("DART rate calculator"),
  );
});

test("provides two official OSHA references for DART", () => {
  const sources =
    officialSafetySourcesByTool[
      "dart-rate-calculator"
    ];

  assert.equal(sources.length, 2);

  assert.deepEqual(
    sources.map((source) => source.url),
    [
      "https://www.osha.gov/recordkeeping",
      "https://www.osha.gov/fom/chapter-3",
    ],
  );
});

test("publishes a complete SEO and trust-oriented DART page", async () => {
  const source = await readFile(pagePath, "utf8");

  assert.match(
    source,
    /title: "DART Rate Calculator"/,
  );

  assert.match(
    source,
    /canonical: "\/tools\/dart-rate-calculator"/,
  );

  assert.match(source, /createToolJsonLd/);
  assert.match(source, /createBreadcrumbJsonLd/);
  assert.match(source, /createFaqJsonLd/);

  assert.match(
    source,
    /<DartRateCalculator \/>/,
  );

  assert.match(
    source,
    /<OfficialSafetySources toolSlug="dart-rate-calculator" \/>/,
  );

  assert.match(
    source,
    /does not determine whether a case\s+is recordable/,
  );
});

test("provides an accessible deterministic DART interface", async () => {
  const [interfaceSource, indexSource] =
    await Promise.all([
      readFile(interfacePath, "utf8"),
      readFile(indexPath, "utf8"),
    ]);

  assert.match(
    interfaceSource,
    /calculateDartRate\(\{/,
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
    /htmlFor="dart-days-away-cases"/,
  );

  assert.match(
    interfaceSource,
    /htmlFor="dart-restricted-transferred-cases"/,
  );

  assert.match(
    interfaceSource,
    /htmlFor="dart-employee-hours"/,
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
    /export \{ DartRateCalculator \} from "\.\/dart-rate-calculator";/,
  );
});

test("includes the DART route in the static sitemap", async () => {
  const sitemap = await readFile(
    sitemapPath,
    "utf8",
  );

  assert.equal(
    (
      sitemap.match(
        /`\$\{baseUrl\}\/tools\/dart-rate-calculator`/g,
      ) ?? []
    ).length,
    1,
  );
});
