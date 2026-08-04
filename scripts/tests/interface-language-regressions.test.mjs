import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const sourceDirectory = path.join(process.cwd(), "src");

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, {
    withFileTypes: true,
  });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectSourceFiles(entryPath)));
      continue;
    }

    if (/\.(?:ts|tsx)$/.test(entry.name)) {
      files.push(entryPath);
    }
  }

  return files;
}

const forbiddenInterfacePhrases = [
  {
    label: "Roman-Urdu form instruction",
    pattern: /Form complete karke/i,
  },
  {
    label: "Roman-Urdu generation instruction",
    pattern: /generate karein/i,
  },
  {
    label: "Roman-Urdu result location",
    pattern: /yahan display hoga/i,
  },
];

test("keeps production interface copy consistently English", async () => {
  const sourceFiles = await collectSourceFiles(sourceDirectory);
  const violations = [];

  for (const filePath of sourceFiles) {
    const source = await readFile(filePath, "utf8");

    for (const phrase of forbiddenInterfacePhrases) {
      if (phrase.pattern.test(source)) {
        violations.push(
          `${phrase.label}: ${path.relative(process.cwd(), filePath)}`,
        );
      }
    }
  }

  assert.deepEqual(
    violations,
    [],
    `Non-English production interface copy found:\n${violations.join("\n")}`,
  );
});
