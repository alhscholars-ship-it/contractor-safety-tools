import assert from "node:assert/strict";
import test from "node:test";
import { createFaqJsonLd } from "../../src/lib/seo/faq-json-ld.ts";

test("creates FAQPage structured data", () => {
  const schema = createFaqJsonLd([
    {
      question: "Is this tool free?",
      answer: "Yes. The tool is free to use.",
    },
    {
      question: "Does it guarantee compliance?",
      answer: "No. Professional review is still required.",
    },
  ]);

  assert.equal(schema["@context"], "https://schema.org");
  assert.equal(schema["@type"], "FAQPage");
  assert.equal(schema.mainEntity.length, 2);
  assert.equal(schema.mainEntity[0]["@type"], "Question");
  assert.equal(schema.mainEntity[0].name, "Is this tool free?");
  assert.equal(
    schema.mainEntity[0].acceptedAnswer["@type"],
    "Answer",
  );
  assert.equal(
    schema.mainEntity[1].acceptedAnswer.text,
    "No. Professional review is still required.",
  );
});
