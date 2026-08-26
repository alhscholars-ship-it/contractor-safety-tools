import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import * as sitemapModule from "../../src/app/sitemap.ts";
import { tools } from "../../src/data/tools.ts";

const origin = "https://safetysitepro.com";

const sitemap =
  typeof sitemapModule.default === "function"
    ? sitemapModule.default
    : sitemapModule.default?.default;

assert.equal(
  typeof sitemap,
  "function",
  "Expected sitemap default export to resolve to a function",
);

const staticRoutes = [
  "/",
  "/tools",
  "/tools/safety-calculators",
  "/tools/inspection-checklists",
  "/about",
  "/methodology",
  "/disclaimer",
  "/privacy",
  "/terms",
  "/contact",
  "/faq",
];

function canonicalUrl(route) {
  if (route === "/") {
    return `${origin}/`;
  }

  return `${origin}${route}/`;
}

test(
  "sitemap contains exactly every physical indexable route once",
  () => {
    const entries = sitemap();

    const expectedUrls = [
      ...staticRoutes,
      ...tools.map((tool) => tool.href),
    ].map(canonicalUrl);

    const actualUrls = entries.map(
      (entry) => entry.url,
    );

    assert.equal(
      actualUrls.length,
      33,
    );

    assert.equal(
      new Set(actualUrls).size,
      actualUrls.length,
    );

    assert.deepEqual(
      [...actualUrls].sort(),
      [...expectedUrls].sort(),
    );
  },
);

test(
  "sitemap URLs use the production HTTPS apex canonical with trailing slashes",
  () => {
    for (const entry of sitemap()) {
      assert.match(
        entry.url,
        /^https:\/\/safetysitepro\.com\/(?:.*\/)?$/,
      );

      assert.equal(
        entry.url.endsWith("/"),
        true,
      );
    }
  },
);

test(
  "sitemap does not publish unverifiable freshness or ignored priority hints",
  () => {
    for (const entry of sitemap()) {
      assert.equal(
        Object.hasOwn(
          entry,
          "lastModified",
        ),
        false,
      );

      assert.equal(
        Object.hasOwn(
          entry,
          "changeFrequency",
        ),
        false,
      );

      assert.equal(
        Object.hasOwn(
          entry,
          "priority",
        ),
        false,
      );
    }
  },
);

test(
  "sitemap source does not regenerate fake modification dates",
  async () => {
    const source = await readFile(
      "src/app/sitemap.ts",
      "utf8",
    );

    assert.doesNotMatch(
      source,
      /new Date\s*\(/,
    );

    assert.doesNotMatch(
      source,
      /\bchangeFrequency\b/,
    );

    assert.doesNotMatch(
      source,
      /\bpriority\b/,
    );
  },
);
