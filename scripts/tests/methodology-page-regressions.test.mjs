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
  const normalizedSource = source.replace(/\s+/g, " ");

  assert.match(source, /title: "Methodology and Editorial Standards"/);
  assert.match(source, /canonical: "\/methodology"/);
  assert.match(source, /<PageHero[\s\S]*title="Methodology and Editorial Standards"/);

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
    assert.ok(source.includes(heading), `The methodology page is missing: ${heading}`);
  }

  assert.match(source, /deterministic output/);
  assert.match(source, /does not issue certifications/);
  assert.ok(
    normalizedSource.includes("does not mean OSHA reviewed, endorsed, approved, or certified"),
    "The page must explain the limits of source inclusion.",
  );
  assert.match(source, /application\/ld\+json/);
});

test("uses secure primary-source links on the methodology page", async () => {
  const source = await readFile(methodologyPath, "utf8");
  assert.equal((source.match(/href="https:\/\/www\.osha\.gov\//g) ?? []).length, 2);
  assert.equal((source.match(/target="_blank"/g) ?? []).length, 2);
  assert.equal((source.match(/rel="noreferrer noopener"/g) ?? []).length, 2);
});

test("does not invent author or reviewer credentials", async () => {
  const source = (await readFile(methodologyPath, "utf8")).toLowerCase();
  for (const unsupportedClaim of [
    "reviewed by:",
    "written by:",
    "certified safety professional",
    "osha-approved website",
    "osha approved website",
  ]) {
    assert.equal(source.includes(unsupportedClaim), false);
  }
});

test("links the methodology route from trust architecture", async () => {
  const [about, footer] = await Promise.all([
    readFile(aboutPath, "utf8"),
    readFile(footerPath, "utf8"),
  ]);

  assert.equal((about.match(/href="\/methodology"/g) ?? []).length, 1);
  assert.equal((footer.match(/href: "\/methodology"/g) ?? []).length, 1);

  const expectedUrl = "https://safetysitepro.com/methodology/";
  assert.equal(sitemap().filter((entry) => entry.url === expectedUrl).length, 1);
});
