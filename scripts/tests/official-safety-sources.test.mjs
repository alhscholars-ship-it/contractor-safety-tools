import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import {
  officialSafetySourcesByTool,
} from "../../src/data/official-safety-sources.ts";
import { tools } from "../../src/data/tools.ts";

const componentPath =
  "src/components/seo/official-safety-sources.tsx";

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("provides official sources for every catalog tool", () => {
  const catalogSlugs = tools
    .map((tool) => tool.slug)
    .sort();

  const sourceSlugs = Object
    .keys(officialSafetySourcesByTool)
    .sort();

  assert.deepEqual(
    sourceSlugs,
    catalogSlugs,
    "Official-source coverage must match the complete tool catalog.",
  );
});

test("uses two valid primary OSHA sources per tool", () => {
  for (
    const [toolSlug, sources]
    of Object.entries(officialSafetySourcesByTool)
  ) {
    assert.equal(
      sources.length,
      2,
      `${toolSlug} must provide exactly two focused sources.`,
    );

    const urls = new Set();

    for (const source of sources) {
      const parsedUrl = new URL(source.url);

      assert.equal(
        parsedUrl.protocol,
        "https:",
        `${source.url} must use HTTPS.`,
      );

      assert.equal(
        parsedUrl.hostname,
        "www.osha.gov",
        `${source.url} must be an official OSHA destination.`,
      );

      assert.ok(
        source.title.trim().length >= 8,
        `${toolSlug} contains an incomplete source title.`,
      );

      assert.ok(
        source.description.trim().length >= 40,
        `${toolSlug} contains an incomplete source description.`,
      );

      assert.equal(
        urls.has(source.url),
        false,
        `${toolSlug} contains a duplicate source URL.`,
      );

      urls.add(source.url);
    }
  }
});

test("renders secure and accessible external source links", async () => {
  const componentSource = await readFile(componentPath, "utf8");

  assert.match(
    componentSource,
    /aria-labelledby=\{headingId\}/,
    "The source section must have an accessible heading relationship.",
  );

  assert.match(
    componentSource,
    /target="_blank"/,
    "Official sources must open separately from an in-progress form.",
  );

  assert.match(
    componentSource,
    /rel="noreferrer noopener"/,
    "External links must prevent opener access.",
  );

  assert.match(
    componentSource,
    /does not make a generated document compliant/,
    "The component must preserve the compliance limitation.",
  );
});

test("integrates official sources exactly once on every tool page", async () => {
  const expectedImport =
    'import { OfficialSafetySources } from "@/components/seo/official-safety-sources";';

  for (const tool of tools) {
    const pagePath = path.join(
      "src/app/tools",
      tool.slug,
      "page.tsx",
    );

    const pageSource = await readFile(pagePath, "utf8");
    const expectedRender =
      `<OfficialSafetySources toolSlug="${tool.slug}" />`;

    assert.equal(
      (
        pageSource.match(
          new RegExp(escapeRegExp(expectedImport), "g"),
        ) ?? []
      ).length,
      1,
      `${pagePath} must import the source component exactly once.`,
    );

    assert.equal(
      (
        pageSource.match(
          new RegExp(escapeRegExp(expectedRender), "g"),
        ) ?? []
      ).length,
      1,
      `${pagePath} must render its source section exactly once.`,
    );

    assert.ok(
      pageSource.indexOf(expectedRender) <
        pageSource.lastIndexOf("</main>"),
      `${pagePath} must render sources inside the main landmark.`,
    );
  }
});
