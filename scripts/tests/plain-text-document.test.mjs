import assert from "node:assert/strict";
import test from "node:test";
import { createPlainTextDocument } from "../../src/lib/export/plain-text-document.ts";

test("creates a plain text export document", () => {
  const text = createPlainTextDocument({
    title: "Safety Plan",
    summary: "Project safety summary.",
    sections: [
      {
        title: "Hazards",
        items: ["Falls", "Heat exposure"],
      },
    ],
    disclaimer: "Informational aid only.",
  });

  assert.ok(text.startsWith("Safety Plan"));
  assert.ok(text.includes("Project safety summary."));
  assert.ok(text.includes("Hazards"));
  assert.ok(text.includes("- Falls"));
  assert.ok(text.includes("Disclaimer"));
  assert.ok(text.endsWith("\n"));
});
