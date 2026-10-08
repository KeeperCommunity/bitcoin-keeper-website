import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const config = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));
const association = JSON.parse(
  readFileSync(new URL("../client/public/.well-known/apple-app-site-association", import.meta.url), "utf8"),
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
