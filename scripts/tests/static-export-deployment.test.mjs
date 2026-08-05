import assert from "node:assert/strict";
import {
  readdir,
  readFile,
  stat,
} from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";

test("configures a directory-based Next.js static export", async () => {
  const source = await readFile(
    "next.config.ts",
    "utf8",
  );

  assert.match(
    source,
    /output: "export"/,
    "Next.js must produce a static out directory.",
  );

  assert.match(
    source,
    /trailingSlash: true/,
    "Static pages must use directory index files for shared hosting.",
  );
});

test("uses a dependency-free static production server", async () => {
  const packageJson = JSON.parse(
    await readFile("package.json", "utf8"),
  );

  assert.equal(
    packageJson.scripts.start,
    "node scripts/serve-static.mjs",
    "The production command must serve the exported out directory.",
  );

  const source = await readFile(
    "scripts/serve-static.mjs",
    "utf8",
  );

  for (const requiredValue of [
    'resolve(process.cwd(), "out")',
    'readArgument("--hostname")',
    'readArgument("--port")',
    "decodeURIComponent(pathname)",
    "404.html",
    'request.method !== "GET"',
    'request.method !== "HEAD"',
    '"X-Content-Type-Options": "nosniff"',
  ]) {
    assert.ok(
      source.includes(requiredValue),
      `Static server is missing: ${requiredValue}`,
    );
  }

  assert.equal(
    /from ["'][^"']+["']/.test(
      source.replaceAll(
        /from ["']node:[^"']+["']/g,
        "",
      ),
    ),
    false,
    "Static server must not import third-party packages.",
  );
});

test("keeps application routes compatible with static export", async () => {
  const serverOnlyPatterns = [
    /["']use server["']/,
    /\bcookies\(/,
    /\bheaders\(/,
    /\bdraftMode\(/,
    /\bNextRequest\b/,
    /\bNextResponse\b/,
    /\bserver-only\b/,
  ];

  async function collectFiles(directory) {
    const results = [];

    for (const entry of await readdir(directory, {
      withFileTypes: true,
    })) {
      const fullPath = join(directory, entry.name);

      if (entry.isDirectory()) {
        results.push(...await collectFiles(fullPath));
        continue;
      }

      if (/\.(?:ts|tsx|js|jsx)$/.test(entry.name)) {
        results.push(fullPath);
      }
    }

    return results;
  }

  const files = await collectFiles("src");

  for (const file of files) {
    const source = await readFile(file, "utf8");

    for (const pattern of serverOnlyPatterns) {
      assert.doesNotMatch(
        source,
        pattern,
        `${file} contains a server-only feature.`,
      );
    }

    assert.equal(
      /(?:^|\/)(?:route|middleware|proxy)\.(?:ts|tsx|js|jsx)$/.test(
        file,
      ),
      false,
      `${file} requires a server runtime.`,
    );
  }
});

test("keeps generated deployment output outside version control", async () => {
  const gitignore = await readFile(".gitignore", "utf8");

  assert.match(
    gitignore,
    /^\/out\/$/m,
    "The generated out directory must remain ignored.",
  );

  const packageStat = await stat("package.json");

  assert.equal(
    packageStat.isFile(),
    true,
    "Deployment tests require a valid package manifest.",
  );
});

test("marks generated metadata routes as static", async () => {
  for (const file of [
    "src/app/robots.ts",
    "src/app/sitemap.ts",
  ]) {
    const source = await readFile(file, "utf8");

    assert.match(
      source,
      /export const dynamic = "force-static";/,
      `${file} must be explicitly static for output export.`,
    );
  }
});
