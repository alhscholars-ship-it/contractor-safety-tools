import assert from "node:assert/strict";
import test from "node:test";
import { createToolJsonLd } from "../../src/lib/seo/json-ld.ts";

test("creates SoftwareApplication JSON-LD for a tool", () => {
  const schema = createToolJsonLd({
    name: "Safety Plan Generator",
    description: "Create contractor safety plans.",
    url: "/tools/safety-plan-generator",
    keywords: ["safety plan generator", "contractor safety plan"],
  });

  assert.equal(schema["@context"], "https://schema.org");
  assert.equal(schema["@type"], "SoftwareApplication");
  assert.equal(schema.name, "Safety Plan Generator");
  assert.equal(schema.isAccessibleForFree, true);
  assert.ok(schema.url.endsWith("/tools/safety-plan-generator"));
  assert.ok(schema.keywords.includes("contractor safety plan"));
});
