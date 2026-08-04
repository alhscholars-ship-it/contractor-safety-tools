import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const headerPath = "src/components/layout/site-header.tsx";
const layoutPath = "src/app/layout.tsx";

test("provides global primary navigation to core site routes", async () => {
  const headerSource = await readFile(headerPath, "utf8");

  const expectedLinks = [
    'href="/"',
    'href: "/tools"',
    'href: "/about"',
    'href: "/faq"',
    'href: "/contact"',
  ];

  for (const expectedLink of expectedLinks) {
    assert.match(
      headerSource,
      new RegExp(
        expectedLink.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      ),
      `Missing global navigation destination: ${expectedLink}`,
    );
  }

  assert.match(
    headerSource,
    /<header\b/,
    "The global navigation must use a header landmark.",
  );

  assert.match(
    headerSource,
    /<nav aria-label="Primary navigation">/,
    "The global navigation must expose an accessible navigation label.",
  );

  assert.match(
    headerSource,
    /siteConfig\.name/,
    "The header brand must use central site configuration.",
  );
});

test("renders the site header exactly once in the root layout", async () => {
  const layoutSource = await readFile(layoutPath, "utf8");

  assert.equal(
    (
      layoutSource.match(
        /import \{ SiteHeader \} from "@\/components\/layout\/site-header";/g,
      ) ?? []
    ).length,
    1,
    "Root layout must import SiteHeader exactly once.",
  );

  assert.equal(
    (layoutSource.match(/<SiteHeader \/>/g) ?? []).length,
    1,
    "Root layout must render SiteHeader exactly once.",
  );

  assert.ok(
    layoutSource.indexOf("<SiteHeader />") <
      layoutSource.indexOf("{children}"),
    "The site header must render before page content.",
  );
});
