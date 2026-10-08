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

test("iOS association maps production and development links to their apps", () => {
  assert.deepEqual(association.applinks.details, [
    { appID: "Y5TCB759QL.io.hexawallet.keeper", paths: ["/app/prod/remote/*"] },
    { appID: "Y5TCB759QL.io.hexawallet.hexakeeper.dev", paths: ["/app/dev/remote/*"] },
  ]);
  assert.equal(
    config.headers.find((entry) => entry.source === "/.well-known/apple-app-site-association")
      ?.headers.find((entry) => entry.key === "Content-Type")?.value,
    "application/json",
  );
});

test("Android association matches the published 2.6.3 APK certificate", () => {
  // Source: https://github.com/KeeperCommunity/bitcoin-keeper/releases/tag/v2.6.3
  // The release APK SHA-256 is a20d934ebd80ece779d3c171c7906bb4aff010337989ec1b826cab55c50eba46.
  // apksigner reports this package and certificate; Play Store signing must be checked separately.
  assert.deepEqual(assetLinks, [{
    relation: ["delegate_permission/common.handle_all_urls"],
    target: {
      namespace: "android_app",
      package_name: "io.hexawallet.bitcoinkeeper",
      sha256_cert_fingerprints: [
        "BF:A0:23:D9:9F:AC:EB:AF:A4:A9:AF:22:B9:E4:9A:13:DB:BF:A3:EE:82:5B:E3:DA:16:CC:A9:E3:EA:1B:24:3A",
      ],
    },
  }]);
  assert.equal(
    config.headers.find((entry) => entry.source === "/.well-known/assetlinks.json")
      ?.headers.find((entry) => entry.key === "Content-Type")?.value,
    "application/json",
  );
});

test("remote links reach a generic preview rather than the 404 route", () => {
  const remoteRoute = config.routes.find((entry) => entry.dest === "/remote-link.html");
  const catchAllIndex = config.routes.findIndex((entry) => entry.dest === "/404.html");
  assert.ok(remoteRoute);
  assert.ok(config.routes.indexOf(remoteRoute) < catchAllIndex);
  const matches = new RegExp(remoteRoute.src);
  const key = "0123456789abcdef01234567";
  assert.ok(matches.test(`/app/prod/remote/${key}`));
  assert.ok(matches.test(`/app/dev/remote/${key}`));
  assert.ok(!matches.test(`/app/prod/remote/${key}/unexpected`));
  assert.match(fallback, /property="og:image"/);
  assert.match(fallback, /name="robots" content="noindex,nofollow"/);
  assert.doesNotMatch(fallback, /location\.pathname|location\.href|document\.URL/);
});
