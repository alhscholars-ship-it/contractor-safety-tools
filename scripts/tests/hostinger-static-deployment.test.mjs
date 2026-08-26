import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const htaccessPath = "public/.htaccess";

async function readHtaccess() {
  return readFile(
    htaccessPath,
    "utf8",
  );
}

test(
  "provides a Hostinger custom 404 mapping",
  async () => {
    const source = await readHtaccess();

    assert.match(
      source,
      /^ErrorDocument 404 \/404\.html$/m,
    );
  },
);

test(
  "canonicalizes the www host to the HTTPS apex domain",
  async () => {
    const source = await readHtaccess();

    assert.match(
      source,
      /RewriteEngine On/,
    );

    assert.match(
      source,
      /RewriteCond %\{HTTP_HOST\} \^www\\\.safetysitepro\\\.com\$ \[NC\]/,
    );

    assert.match(
      source,
      /RewriteRule \^ https:\/\/safetysitepro\.com%\{REQUEST_URI\} \[R=301,L\]/,
    );
  },
);

test(
  "does not duplicate Hostinger HTTPS enforcement",
  async () => {
    const source = await readHtaccess();

    assert.doesNotMatch(
      source,
      /%\{HTTPS\}/,
    );

    assert.doesNotMatch(
      source,
      /HTTP:X-Forwarded-Proto/i,
    );
  },
);

test(
  "does not rewrite application routes to a runtime entrypoint",
  async () => {
    const source = await readHtaccess();

    assert.doesNotMatch(
      source,
      /index\.(php|js|mjs)/i,
    );

    assert.doesNotMatch(
      source,
      /RewriteRule\s+\.\*\s+/,
    );
  },
);
