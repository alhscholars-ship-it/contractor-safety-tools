import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  officialSafetySourcesByTool,
} from "../../src/data/official-safety-sources.ts";
import { tools } from "../../src/data/tools.ts";

const pagePath =
  "src/app/tools/risk-matrix-calculator/page.tsx";

const interfacePath =
  "src/features/risk-matrix-calculator/risk-matrix-calculator.tsx";

const indexPath =
  "src/features/risk-matrix-calculator/index.ts";

const sitemapPath = "src/app/sitemap.ts";

test("publishes the risk matrix calculator in the canonical catalog", () => {
  const tool = tools.find(
    (candidate) =>
      candidate.slug ===
      "risk-matrix-calculator",
  );

  assert.ok(tool);
  assert.equal(tool.name, "Risk Matrix Calculator");
  assert.equal(tool.category, "Safety Calculators");

  assert.equal(
    tool.href,
    "/tools/risk-matrix-calculator",
  );

  assert.ok(
    tool.keywords.includes(
      "risk matrix calculator",
    ),
  );
});

test("provides two official OSHA references for risk assessment", () => {
  const sources =
    officialSafetySourcesByTool[
      "risk-matrix-calculator"
    ];

  assert.equal(sources.length, 2);

  assert.deepEqual(
    sources.map((source) => source.url),
    [
      "https://www.osha.gov/safety-management/hazard-identification",
      "https://www.osha.gov/safety-management/hazard-prevention",
    ],
  );
});

test("publishes a complete SEO and trust-oriented risk matrix page", async () => {
  const source = await readFile(
    pagePath,
    "utf8",
  );

  assert.match(
    source,
    /title: "Risk Matrix Calculator"/,
  );

  assert.match(
    source,
    /canonical: "\/tools\/risk-matrix-calculator"/,
  );

  assert.match(source, /createToolJsonLd/);
  assert.match(source, /createBreadcrumbJsonLd/);
  assert.match(source, /createFaqJsonLd/);

  assert.match(
    source,
    /<RiskMatrixCalculator \/>/,
  );

  assert.match(
    source,
    /<OfficialSafetySources toolSlug="risk-matrix-calculator" \/>/,
  );

  assert.match(
    source,
    /not an OSHA-required scoring\s+formula/,
  );
});

test("provides an accessible deterministic risk matrix interface", async () => {
  const [interfaceSource, indexSource] =
    await Promise.all([
      readFile(interfacePath, "utf8"),
      readFile(indexPath, "utf8"),
    ]);

  assert.match(
    interfaceSource,
    /calculateRiskMatrix\(\{/,
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
    /htmlFor="risk-initial-likelihood"/,
  );

  assert.match(
    interfaceSource,
    /htmlFor="risk-initial-severity"/,
  );

  assert.match(
    interfaceSource,
    /htmlFor="risk-residual-likelihood"/,
  );

  assert.match(
    interfaceSource,
    /htmlFor="risk-residual-severity"/,
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
    /export \{ RiskMatrixCalculator \} from "\.\/risk-matrix-calculator";/,
  );
});

test("includes the risk matrix route in the static sitemap", async () => {
  const sitemap = await readFile(
    sitemapPath,
    "utf8",
  );

  assert.equal(
    (
      sitemap.match(
        /`\$\{baseUrl\}\/tools\/risk-matrix-calculator`/g,
      ) ?? []
    ).length,
    1,
  );
});
