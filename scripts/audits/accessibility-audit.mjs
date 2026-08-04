import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";
import { readdir } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.AUDIT_BASE_URL ?? "http://127.0.0.1:3000";
const appDirectory = path.join(process.cwd(), "src/app");

async function collectPageRoutes(directory, segments = []) {
  const entries = await readdir(directory, {
    withFileTypes: true,
  });
  const routes = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      if (
        entry.name === "page.tsx" &&
        segments.every(
          (segment) =>
            !segment.startsWith("[") &&
            !segment.startsWith("@") &&
            !segment.startsWith("_"),
        )
      ) {
        routes.push(
          segments.length === 0 ? "/" : `/${segments.join("/")}`,
        );
      }

      continue;
    }

    if (
      entry.name.startsWith("@") ||
      entry.name.startsWith("_")
    ) {
      continue;
    }

    const nextSegments =
      entry.name.startsWith("(") && entry.name.endsWith(")")
        ? segments
        : [...segments, entry.name];

    routes.push(
      ...(await collectPageRoutes(
        path.join(directory, entry.name),
        nextSegments,
      )),
    );
  }

  return routes;
}

const routes = [
  ...new Set(await collectPageRoutes(appDirectory)),
].sort((left, right) => {
  if (left === "/") {
    return -1;
  }

  if (right === "/") {
    return 1;
  }

  return left.localeCompare(right);
});

if (routes.length === 0) {
  throw new Error("No physical application routes were found.");
}

console.log(`Auditing ${routes.length} physical routes.`);

const browser = await chromium.launch({ headless: true });
let failed = false;

try {
  const context = await browser.newContext({
    viewport: {
      width: 1440,
      height: 1200,
    },
  });

  for (const route of routes) {
    const page = await context.newPage();
    const url = `${baseUrl}${route}`;

    const response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    await page.locator("body").waitFor({
      state: "visible",
      timeout: 10000,
    });

    if (!response || !response.ok()) {
      failed = true;
      console.error(
        `FAIL: ${route} returned ${response?.status() ?? "no response"}`,
      );
      await page.close();
      continue;
    }

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    if (results.violations.length === 0) {
      console.log(`PASS: ${route}`);
    } else {
      failed = true;
      console.error(`FAIL: ${route}`);

      for (const violation of results.violations) {
        console.error(
          `  ${violation.id}: ${violation.help} (${violation.impact ?? "unknown"})`,
        );

        for (const node of violation.nodes) {
          console.error(`    Target: ${node.target.join(", ")}`);
          console.error(
            `    Summary: ${node.failureSummary ?? "No summary"}`,
          );
        }
      }
    }

    await page.close();
  }
} finally {
  await browser.close();
}

if (failed) {
  process.exitCode = 1;
}
