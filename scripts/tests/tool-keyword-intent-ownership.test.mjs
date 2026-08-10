import assert from "node:assert/strict";
import test from "node:test";

import { tools } from "../../src/data/tools.ts";

test(
  "keeps near miss report template owned by the dedicated near-miss tool",
  () => {
    const incident =
      tools.find(
        tool =>
          tool.slug ===
          "incident-report-generator",
      );

    const nearMiss =
      tools.find(
        tool =>
          tool.slug ===
          "near-miss-report-generator",
      );

    assert.ok(
      incident,
      "Incident Report Generator catalog entry is required.",
    );

    assert.ok(
      nearMiss,
      "Near Miss Report Generator catalog entry is required.",
    );

    assert.equal(
      incident.keywords.includes(
        "near miss report template",
      ),
      false,
      "Incident Report Generator must not target the dedicated near-miss template intent.",
    );

    assert.ok(
      incident.keywords.includes(
        "construction incident report template",
      ),
      "Incident Report Generator should retain a distinct incident-template intent.",
    );

    assert.ok(
      nearMiss.keywords.includes(
        "near miss report template",
      ),
      "Near Miss Report Generator should own the near-miss template intent.",
    );

    const owners =
      tools
        .filter(
          tool =>
            tool.keywords.includes(
              "near miss report template",
            ),
        )
        .map(tool => tool.slug);

    assert.deepEqual(
      owners,
      ["near-miss-report-generator"],
    );
  },
);
