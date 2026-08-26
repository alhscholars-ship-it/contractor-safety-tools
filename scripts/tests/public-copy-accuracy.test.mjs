import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const paths = {
  config: "src/config/site.ts",
  layout: "src/app/layout.tsx",
  home: "src/app/page.tsx",
  tools: "src/app/tools/page.tsx",
  about: "src/app/about/page.tsx",
  footer: "src/components/layout/site-footer.tsx",
  contact: "src/app/contact/page.tsx",
  faq: "src/app/faq/page.tsx",
  privacy: "src/app/privacy/page.tsx",
};

test("avoids overbroad OSHA alignment and compliance marketing claims", async () => {
  const sources = await Promise.all(
    [
      paths.config,
      paths.layout,
      paths.home,
      paths.tools,
      paths.about,
      paths.footer,
    ].map((path) => readFile(path, "utf8")),
  );

  const combined = sources.join("\n");

  for (const unsupportedClaim of [
    "OSHA-aligned",
    "OSHA aligned",
    "jobsite compliance tools",
  ]) {
    assert.equal(
      combined.includes(unsupportedClaim),
      false,
      `Overbroad marketing claim detected: ${unsupportedClaim}`,
    );
  }

  assert.match(
    combined,
    /official-source references/,
    "Public configuration must accurately describe source references.",
  );

  assert.match(
    combined,
    /Generate contractor-ready safety plans, toolbox talks,\s+inspection checklists, and incident reports/,
    "The homepage must use accurate product positioning.",
  );
});

test("publishes an actionable public feedback channel", async () => {
  const [config, contact] = await Promise.all([
    readFile(paths.config, "utf8"),
    readFile(paths.contact, "utf8"),
  ]);

  for (const url of [
    "https://github.com/alhscholars-ship-it/contractor-safety-tools",
    "https://github.com/alhscholars-ship-it/contractor-safety-tools/issues",
    "https://github.com/alhscholars-ship-it/contractor-safety-tools/issues/new",
  ]) {
    assert.ok(
      config.includes(url),
      `Central configuration is missing: ${url}`,
    );
  }

  assert.match(
    contact,
    /href=\{siteConfig\.newIssueUrl\}/,
    "The Contact page must link to a new public issue.",
  );

  assert.match(
    contact,
    /href=\{siteConfig\.issuesUrl\}/,
    "The Contact page must link to existing public issues.",
  );

  assert.equal(
    (contact.match(/target="_blank"/g) ?? []).length,
    2,
    "Both external support links must open separately.",
  );

  assert.equal(
    (
      contact.match(
        /rel="(?:noreferrer noopener|noopener noreferrer)"/g,
      ) ?? []
    ).length,
    2,
    "Both external support links must prevent opener access.",
  );

  for (const staleValue of [
    "final launch",
    "will be added",
    "until then",
    "do not publish",
    "source code",
  ]) {
    assert.equal(
      contact.toLowerCase().includes(staleValue),
      false,
      `Contact placeholder detected: ${staleValue}`,
    );
  }
});

test("keeps FAQ tool coverage synchronized with the canonical catalog", async () => {
  const faq = await readFile(paths.faq, "utf8");

  assert.match(
    faq,
    /import \{ tools \} from "@\/data\/tools";/,
    "FAQ must import the canonical tool catalog.",
  );

  assert.match(
    faq,
    /tools\.length/,
    "FAQ must derive the published tool count from the catalog.",
  );

  assert.match(
    faq,
    /tools\.map\(\(tool\) => tool\.name\)/,
    "FAQ must derive tool names from the catalog.",
  );

  assert.equal(
    faq.includes(
      "The website currently includes a Safety Plan Generator, Toolbox Talk Generator, Incident Report Generator, JHA Generator, and PPE Checklist Generator.",
    ),
    false,
    "The obsolete five-tool FAQ list must not return.",
  );
});

test("describes current privacy implementation instead of speculative analytics", async () => {
  const privacy = await readFile(paths.privacy, "utf8");

  for (const requiredValue of [
    "no user accounts",
    "form-submission API",
    "application database",
    "analytics SDK",
    "advertising tracker",
    "localStorage",
    "sessionStorage",
    "separate from generator field input",
  ]) {
    assert.ok(
      privacy.includes(requiredValue),
      `Privacy page is missing: ${requiredValue}`,
    );
  }

  for (const staleValue of [
    "Like most websites",
    "Cookies or similar technologies may be used",
    "Third-party hosting, analytics, security, or performance services",
  ]) {
    assert.equal(
      privacy.includes(staleValue),
      false,
      `Speculative privacy wording detected: ${staleValue}`,
    );
  }
});

test("broadens public catalog descriptions beyond the original five tools", async () => {
  const [about, footer] = await Promise.all([
    readFile(paths.about, "utf8"),
    readFile(paths.footer, "utf8"),
  ]);

  for (const expectedTopic of [
    "near-miss reports",
    "lockout/tagout",
    "ladders",
    "scaffolds",
    "excavations",
    "fire extinguishers",
    "first aid kits",
  ]) {
    assert.ok(
      about.includes(expectedTopic),
      `About page is missing catalog topic: ${expectedTopic}`,
    );
  }

  assert.match(
    footer,
    /inspection\s+checklists, reports, and structured jobsite documentation tools/,
    "Footer must describe the broader product catalog.",
  );
});
