import assert from "node:assert/strict";
import {
  readFile,
  readdir,
} from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { siteConfig } from "../../src/config/site.ts";

const canonicalBrand =
  "Contractor Safety Tools";

const retiredBrands = [
  "Contractor Safety Form Tools",
  "Safety Form Tools",
];

async function sourceFiles(
  directory,
) {
  const entries =
    await readdir(
      directory,
      {
        withFileTypes: true,
      },
    );

  const files = [];

  for (const entry of entries) {
    const fullPath =
      path.join(
        directory,
        entry.name,
      );

    if (entry.isDirectory()) {
      files.push(
        ...await sourceFiles(
          fullPath,
        ),
      );

      continue;
    }

    if (
      entry.name.endsWith(".ts") ||
      entry.name.endsWith(".tsx")
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

test(
  "uses one canonical Contractor Safety Tools entity name",
  () => {
    assert.equal(
      siteConfig.name,
      canonicalBrand,
    );

    assert.equal(
      siteConfig.shortName,
      canonicalBrand,
    );

    assert.equal(
      siteConfig.domain,
      "contractorsafetytools.com",
    );

    assert.equal(
      siteConfig.url,
      "https://contractorsafetytools.com",
    );
  },
);

test(
  "removes retired brand names from production source",
  async () => {
    const files =
      await sourceFiles(
        "src",
      );

    for (const file of files) {
      const source =
        await readFile(
          file,
          "utf8",
        );

      const normalizedSource =
        source.replace(
          /\\s+/g,
          " ",
        );

      for (
        const retiredBrand
        of retiredBrands
      ) {
        assert.equal(
          normalizedSource.includes(
            retiredBrand,
          ),
          false,
          `${file} still contains retired brand "${retiredBrand}", including across whitespace.`,
        );
      }
    }
  },
);

test(
  "derives root metadata and persistent navigation branding from siteConfig",
  async () => {
    const [
      layout,
      header,
      footer,
      home,
    ] = await Promise.all([
      readFile(
        "src/app/layout.tsx",
        "utf8",
      ),
      readFile(
        "src/components/layout/site-header.tsx",
        "utf8",
      ),
      readFile(
        "src/components/layout/site-footer.tsx",
        "utf8",
      ),
      readFile(
        "src/app/page.tsx",
        "utf8",
      ),
    ]);

    assert.match(
      layout,
      /default: siteConfig\.name/,
    );

    assert.match(
      layout,
      /template: `%s \| \$\{siteConfig\.name\}`/,
    );

    assert.match(
      layout,
      /name: siteConfig\.name/,
    );

    assert.match(
      header,
      /\{siteConfig\.name\}/,
    );

    assert.match(
      footer,
      /\{siteConfig\.name\}/,
    );

    assert.match(
      home,
      /\{siteConfig\.name\}/,
    );
  },
);
