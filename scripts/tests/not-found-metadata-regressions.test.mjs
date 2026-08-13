import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const layoutPath = "src/app/layout.tsx";
const homePath = "src/app/page.tsx";
const notFoundPath = "src/app/not-found.tsx";

test(
  "keeps homepage-only canonical and robots metadata out of the root layout",
  async () => {
    const layout = await readFile(
      layoutPath,
      "utf8",
    );

    assert.doesNotMatch(
      layout,
      /alternates:\s*\{\s*canonical:\s*"\/"/,
    );

    assert.doesNotMatch(
      layout,
      /robots:\s*\{\s*index:\s*true/,
    );
  },
);

test(
  "publishes explicit homepage canonical and index metadata",
  async () => {
    const home = await readFile(
      homePath,
      "utf8",
    );

    assert.match(
      home,
      /export const metadata: Metadata/,
    );

    assert.match(
      home,
      /absolute:\s*siteConfig\.name/,
    );

    assert.match(
      home,
      /canonical:\s*"\/"/,
    );

    assert.match(
      home,
      /robots:\s*\{\s*index:\s*true,\s*follow:\s*true/,
    );
  },
);

test(
  "provides a useful branded custom not-found experience",
  async () => {
    const notFound = await readFile(
      notFoundPath,
      "utf8",
    );

    assert.match(
      notFound,
      /Page not found\./,
    );

    assert.match(
      notFound,
      /Error 404/,
    );

    assert.match(
      notFound,
      /href="\/tools"/,
    );

    assert.match(
      notFound,
      /href="\/"/,
    );

    assert.match(
      notFound,
      /Safety Plan Generator/,
    );

    assert.doesNotMatch(
      notFound,
      /canonical:/,
    );

    assert.doesNotMatch(
      notFound,
      /robots:/,
    );
  },
);
