import assert from "node:assert/strict";
import test from "node:test";
import { createBreadcrumbJsonLd } from "../../src/lib/seo/breadcrumb-json-ld.ts";

test("creates breadcrumb structured data", () => {
  const schema = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    {
      name: "Safety Plan Generator",
      path: "/tools/safety-plan-generator",
    },
  ]);

  assert.equal(schema["@type"], "BreadcrumbList");
  assert.equal(schema.itemListElement.length, 3);
  assert.equal(schema.itemListElement[0].position, 1);
  assert.equal(schema.itemListElement[2].name, "Safety Plan Generator");
  assert.ok(
    schema.itemListElement[2].item.endsWith(
      "/tools/safety-plan-generator",
    ),
  );
});
