import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const config = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));
const association = JSON.parse(
  readFileSync(new URL("../client/public/.well-known/apple-app-site-association", import.meta.url), "utf8"),
);
const assetLinks = JSON.parse(
  readFileSync(new URL("../client/public/.well-known/assetlinks.json", import.meta.url), "utf8"),
);
const fallback = readFileSync(new URL("../client/public/remote-link.html", import.meta.url), "utf8");
const developmentFallback = readFileSync(new URL("../client/public/remote-link-dev.html", import.meta.url), "utf8");

function associationRoute(path) {
  const index = config.routes.findIndex(entry => entry.src && new RegExp(entry.src).test(path));
  assert.ok(index >= 0 && index < config.routes.findIndex(entry => entry.handle === "filesystem"));
  const route = config.routes[index];
  assert.equal(route.dest, path);
  assert.equal(route.headers.Location, undefined);
  assert.ok(route.status === undefined || route.status === 200);
  assert.equal(new RegExp(route.src).test(`${path}/unexpected`), false);
  return route;
}

test("iOS association maps production and development links to their apps", () => {
  assert.deepEqual(association.applinks.details, [
    { appID: "Y5TCB759QL.io.hexawallet.keeper", paths: ["/app/prod/remote/*"] },
    { appID: "Y5TCB759QL.io.hexawallet.hexakeeper.dev", paths: ["/app/dev/remote/*"] },
  ]);
  assert.equal(
    associationRoute("/.well-known/apple-app-site-association").headers["Content-Type"],
    "application/json",
  );
});

test("Android association trusts only verified standalone and Play production certificates", () => {
  // Source: https://github.com/KeeperCommunity/bitcoin-keeper/releases/tag/v2.6.3
  // The release APK SHA-256 is a20d934ebd80ece779d3c171c7906bb4aff010337989ec1b826cab55c50eba46.
  // This standalone identity was also verified against 2.6.4 in Backlog232.
  // Play App Signing identity: authenticated Console receipt, 21 Oct 2026 11:38 UTC, Backlog232.
  assert.deepEqual(assetLinks, [
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: "io.hexawallet.bitcoinkeeper",
        sha256_cert_fingerprints: [
          "BF:A0:23:D9:9F:AC:EB:AF:A4:A9:AF:22:B9:E4:9A:13:DB:BF:A3:EE:82:5B:E3:DA:16:CC:A9:E3:EA:1B:24:3A",
          "66:56:8F:D4:FB:14:C0:13:4F:F4:05:57:62:60:70:38:AD:40:0B:A5:CB:C8:E2:3E:5E:25:26:5A:02:34:46:5C",
        ],
      },
    },
  ]);
  assert.equal(
    associationRoute("/.well-known/assetlinks.json").headers["Content-Type"],
    "application/json",
  );
});

test("remote links reach a generic preview rather than the 404 route", () => {
  const remoteRoute = config.routes.find((entry) => entry.dest === "/remote-link.html");
  const developmentRoute = config.routes.find((entry) => entry.dest === "/remote-link-dev.html");
  const catchAllIndex = config.routes.findIndex((entry) => entry.dest === "/404.html");
  assert.ok(remoteRoute);
  assert.ok(developmentRoute);
  assert.ok(config.routes.indexOf(remoteRoute) < catchAllIndex);
  assert.ok(config.routes.indexOf(developmentRoute) < catchAllIndex);
  const matches = new RegExp(remoteRoute.src);
  const key = "0123456789abcdef01234567";
  assert.ok(matches.test(`/app/prod/remote/${key}`));
  assert.ok(!matches.test(`/app/dev/remote/${key}`));
  assert.ok(!matches.test(`/app/prod/remote/${key}/unexpected`));
  assert.ok(!matches.test(`/app/prod/remote/${key.slice(1)}`));
  assert.ok(!matches.test(`/app/prod/remote/${key}0`));
  assert.ok(!matches.test(`/app/prod/remote/${key.toUpperCase()}`));
  const developmentMatches = new RegExp(developmentRoute.src);
  assert.ok(developmentMatches.test(`/app/dev/remote/${key}`));
  assert.ok(!developmentMatches.test(`/app/prod/remote/${key}`));
  assert.ok(!developmentMatches.test(`/app/dev/remote/${key}/unexpected`));
  assert.match(fallback, /property="og:image"/);
  assert.match(fallback, /name="robots" content="noindex,nofollow"/);
  assert.doesNotMatch(fallback, /location\.pathname|location\.href|document\.URL/);
  for (const html of [fallback, developmentFallback]) {
    assert.match(html, /name="referrer" content="no-referrer"/);
    assert.match(html, /name="robots" content="noindex,nofollow"/);
    assert.doesNotMatch(html, /<script\b|location\.|document\.|<input\b|<form\b/i);
  }
  assert.doesNotMatch(developmentFallback, /apps\.apple\.com|play\.google\.com/);
  assert.match(developmentFallback, /person coordinating this test/);
  assert.match(developmentFallback, /Android development links do not open the app automatically/);
});

test("Vercel legacy routes do not mix incompatible high-level routing fields", () => {
  for (const key of ["headers", "rewrites", "redirects", "cleanUrls", "trailingSlash"]) {
    assert.equal(Object.hasOwn(config, key), false, `Do not mix routes with ${key}`);
  }
});
