import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import * as sitemapModule from "../../src/app/sitemap.ts";

const sitemap =
  typeof sitemapModule.default === "function"
    ? sitemapModule.default
    : sitemapModule.default?.default;

assert.equal(
  typeof sitemap,
  "function",
  "Expected sitemap default export to resolve to a function",
);

const methodologyPath = "src/app/methodology/page.tsx";
const aboutPath = "src/app/about/page.tsx";
const footerPath = "src/components/layout/site-footer.tsx";

test("publishes a complete methodology and editorial standards page", async () => {
  const source = await readFile(methodologyPath, "utf8");

  assert.match(
    source,
    /title: "Methodology and Editorial Standards"/,
    "The methodology page must provide focused metadata.",
  );

  assert.match(
    source,
    /canonical: "\/methodology"/,
    "The methodology page must provide its canonical route.",
  );

  assert.equal(
    (source.match(/<h1\b/g) ?? []).length,
    1,
    "The methodology page must contain exactly one H1.",
  );

  for (const heading of [
    "Purpose of the website",
    "Source hierarchy",
    "How tool-specific references are selected",
    "Generator design process",
    "Quality assurance",
    "Review and maintenance triggers",
    "Corrections and feedback",
    "Editorial limitations",
  ]) {
    assert.ok(
      source.includes(heading),
      `The methodology page is missing: ${heading}`,
    );
  }

  assert.match(
    source,
    /deterministic output/,
    "The page must explain deterministic generation.",
  );

  assert.match(
    source,
    /does not issue certifications/,
    "The page must reject certification claims.",
  );

  assert.match(
    source,
    /does not mean OSHA reviewed, endorsed, approved,\s+or certified/,
    "The page must explain the limits of source inclusion.",
  );

  assert.match(
    source,
    /application\/ld\+json/,
    "The page must provide WebPage structured data.",
  );
});

test("uses secure primary-source links on the methodology page", async () => {
  const source = await readFile(methodologyPath, "utf8");

  assert.equal(
    (
      source.match(
        /href="https:\/\/www\.osha\.gov\//g,
      ) ?? []
    ).length,
    2,
    "The methodology page must contain two OSHA links.",
  );

  assert.equal(
    (source.match(/target="_blank"/g) ?? []).length,
    2,
    "Both external references must open separately.",
  );

  assert.equal(
    (
      source.match(
        /rel="noreferrer noopener"/g,
      ) ?? []
    ).length,
    2,
    "Both external references must prevent opener access.",
  );
});

test("does not invent author or reviewer credentials", async () => {
  const source = (
    await readFile(methodologyPath, "utf8")
  ).toLowerCase();

  for (const unsupportedClaim of [
    "reviewed by:",
    "written by:",
    "certified safety professional",
    "osha-approved website",
    "osha approved website",
  ]) {
    assert.equal(
      source.includes(unsupportedClaim),
      false,
      `Unsupported trust claim detected: ${unsupportedClaim}`,
    );
  }
});

test(
  "links the methodology route from trust architecture",
  async () => {
    const [about, footer] =
      await Promise.all([
        readFile(
          aboutPath,
          "utf8",
        ),
        readFile(
          footerPath,
          "utf8",
        ),
      ]);

    assert.equal(
      (
        about.match(
          /href="\/methodology"/g,
        ) ?? []
      ).length,
      1,
      "The About page must link to methodology exactly once.",
    );

    assert.equal(
      (
        footer.match(
          /href: "\/methodology"/g,
        ) ?? []
      ).length,
      1,
      "The footer must link to methodology exactly once.",
    );

    const expectedUrl =
      "https://contractorsafetytools.com/methodology/";

    assert.equal(
      sitemap().filter(
        (entry) =>
          entry.url === expectedUrl,
      ).length,
      1,
      "The sitemap must include methodology exactly once.",
    );
  },
);
