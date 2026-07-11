import assert from "node:assert/strict";
import test from "node:test";
import { createPdfDocument } from "../../src/lib/export/pdf-document.ts";

test("exports the PDF document generator function", () => {
  assert.equal(typeof createPdfDocument, "function");
});
