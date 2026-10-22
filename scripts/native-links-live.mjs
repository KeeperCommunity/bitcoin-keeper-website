import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const origin = "https://www.bitcoinkeeper.app";
const dummyKey = "0123456789abcdef01234567";

export function verifyResponse(response, bytes, { path, status = 200, expectedBytes, json = false, html = false }) {
  assert.equal(response.status, status, `${path}: HTTP status`);
  assert.equal(response.redirected, false, `${path}: unexpected redirect`);
  assert.equal(response.headers.get("location"), null, `${path}: unexpected Location header`);
  assert.equal(response.url, `${origin}${path}`, `${path}: unexpected response URL`);
  if (json) {
    assert.match(response.headers.get("content-type") ?? "", /^application\/json(?:\s*;|$)/i, `${path}: JSON Content-Type`);
    JSON.parse(bytes.toString("utf8"));
  }
  if (html) assert.match(response.headers.get("content-type") ?? "", /^text\/html(?:\s*;|$)/i, `${path}: HTML Content-Type`);
  if (expectedBytes) assert.ok(bytes.equals(expectedBytes), `${path}: deployed bytes differ from source`);
  return {
    path,
    status: response.status,
    contentType: response.headers.get("content-type"),
    redirected: response.redirected,
    bytes: bytes.length,
    sha256: createHash("sha256").update(bytes).digest("hex"),
    ...(expectedBytes ? { sourceBytesMatch: true } : {}),
  };
}

async function request(check) {
  const response = await fetch(`${origin}${check.path}`, {
    redirect: "manual",
    signal: AbortSignal.timeout(15000),
    headers: { "User-Agent": "Keeper-R4-native-link-acceptance" },
  });
  const bytes = Buffer.from(await response.arrayBuffer());
  const expectedBytes = check.file
    ? await readFile(new URL(`../client/public/${check.file}`, import.meta.url))
    : undefined;
  return verifyResponse(response, bytes, { ...check, expectedBytes });
}

async function main() {
  const checks = [
    { path: "/.well-known/apple-app-site-association", file: ".well-known/apple-app-site-association", json: true },
    { path: "/.well-known/assetlinks.json", file: ".well-known/assetlinks.json", json: true },
    { path: `/app/prod/remote/${dummyKey}`, file: "remote-link.html", html: true },
    { path: `/app/dev/remote/${dummyKey}`, file: "remote-link-dev.html", html: true },
    { path: "/app/prod/remote/not-a-key", status: 404 },
    { path: `/app/prod/remote/${dummyKey}/extra`, status: 404 },
    { path: "/features", html: true },
    { path: "/ask-keeper", html: true },
  ];
  const results = await Promise.all(checks.map(request));
  console.log(JSON.stringify({ schema: 1, origin, state: "PUBLIC_HTTP_ACCEPTANCE_PASS", results }, null, 2));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
