import assert from "node:assert/strict";
import test from "node:test";
import { verifyResponse } from "./native-links-live.mjs";

const path = "/.well-known/assetlinks.json";
const bytes = Buffer.from('[{"public":"fixture"}]\n');
const check = { path, json: true, expectedBytes: bytes };
function response(overrides = {}) {
  return {
    status: 200,
    redirected: false,
    url: `https://www.bitcoinkeeper.app${path}`,
    headers: new Headers({ "content-type": "application/json; charset=utf-8" }),
    ...overrides,
  };
}

test("live probe accepts direct JSON with exact source bytes", () => {
  assert.equal(verifyResponse(response(), bytes, check).sourceBytesMatch, true);
});
test("live probe rejects redirects and a different final origin", () => {
  assert.throws(() => verifyResponse(response({ status: 307 }), bytes, check));
  assert.throws(() => verifyResponse(response({ redirected: true }), bytes, check));
  assert.throws(() => verifyResponse(response({ headers: new Headers({ location: "https://example.com" }) }), bytes, check));
  assert.throws(() => verifyResponse(response({ url: `https://example.com${path}` }), bytes, check));
});
test("live probe rejects HTML, invalid JSON and stale deployment bytes", () => {
  assert.throws(() => verifyResponse(response({ headers: new Headers({ "content-type": "text/html" }) }), bytes, check));
  assert.throws(() => verifyResponse(response(), Buffer.from("not JSON"), check));
  assert.throws(() => verifyResponse(response(), Buffer.from("[]"), check));
});
test("live probe requires actual404 for malformed routes", () => {
  assert.equal(verifyResponse(response({ status: 404 }), bytes, { path, status: 404 }).status, 404);
  assert.throws(() => verifyResponse(response(), bytes, { path, status: 404 }));
});
test("live probe requires HTML content type for browser fallbacks", () => {
  const html = { path, html: true, expectedBytes: bytes };
  assert.equal(verifyResponse(response({ headers: new Headers({ "content-type": "text/html; charset=utf-8" }) }), bytes, html).sourceBytesMatch, true);
  for (const contentType of ["text/plain", "application/octet-stream", "application/json"]) {
    assert.throws(() => verifyResponse(response({ headers: new Headers({ "content-type": contentType }) }), bytes, html));
  }
});
