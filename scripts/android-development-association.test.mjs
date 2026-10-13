import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash, X509Certificate } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

// Public R4 source already integrated in mobile PR #7045. No native build or
// production-signing credentials are needed to check these tracked inputs.
const keeperSourceSha = "bb66cea459fbb00ec33c5c4ebd601d07c0d7c125";
const source = process.env.KEEPER_ANDROID_SOURCE;
assert.ok(
  source,
  "Set KEEPER_ANDROID_SOURCE to an isolated Keeper checkout at the pinned SHA"
);
assert.equal(
  execFileSync("git", ["-C", source, "rev-parse", "HEAD"], {
    encoding: "utf8",
  }).trim(),
  keeperSourceSha,
  "Use the pinned public mobile source, without changing an existing checkout"
);
assert.equal(
  execFileSync(
    "git",
    [
      "-C",
      source,
      "status",
      "--porcelain",
      "--",
      "android/app/build.gradle",
      "android/app/debug.keystore",
    ],
    { encoding: "utf8" }
  ).trim(),
  "",
  "The association source inputs must have no local changes"
);

const gradleBytes = readFileSync(resolve(source, "android/app/build.gradle"));
const keystore = resolve(source, "android/app/debug.keystore");
assert.equal(
  createHash("sha256").update(gradleBytes).digest("hex"),
  "a5a0d18b8fb3c4fee645bb8ab4400de4cc760ab83fc7ba3b08bc4e9d807336ee"
);
assert.equal(
  createHash("sha256").update(readFileSync(keystore)).digest("hex"),
  "221e0a3106aa4c3ccc154e0a418b55020b3f9ea6e84f92e8749cd9e2f39f5e58"
);
const gradle = gradleBytes.toString("utf8");
const assetLinks = JSON.parse(
  readFileSync(
    new URL("../client/public/.well-known/assetlinks.json", import.meta.url),
    "utf8"
  )
);

// Read the pinned file's literal sections. This deliberately fails if its
// structure or inputs change; it does not try to evaluate arbitrary Gradle.
function section(text, name) {
  const match = new RegExp(`\\b${name}\\s*\\{`).exec(text);
  assert.ok(match, `Missing Gradle section ${name}`);
  let depth = 1;
  const start = match.index + match[0].length;
  for (let end = start; end < text.length; end += 1) {
    if (text[end] === "{") depth += 1;
    if (text[end] === "}" && --depth === 0) return text.slice(start, end);
  }
  assert.fail(`Unclosed Gradle section ${name}`);
}

function literal(text, name) {
  const match = new RegExp(`^\\s*${name}\\s+["']([^"']+)["']\\s*$`, "m").exec(
    text
  );
  assert.ok(match, `Missing literal Gradle ${name}`);
  return match[1];
}

test("development association uses the actual mobile flavor package and debug certificate", () => {
  const defaults = section(gradle, "defaultConfig");
  const development = section(section(gradle, "productFlavors"), "development");
  assert.doesNotMatch(development, /^\s*applicationId\s/m);
  assert.doesNotMatch(defaults, /^\s*applicationIdSuffix\s/m);
  const packageName =
    literal(defaults, "applicationId") +
    literal(development, "applicationIdSuffix");
  const debugSigning = section(section(gradle, "signingConfigs"), "debug");
  assert.match(debugSigning, /storeFile\s+file\('debug\.keystore'\)/);
  assert.equal(literal(debugSigning, "keyAlias"), "androiddebugkey");
  assert.match(
    section(section(gradle, "buildTypes"), "debug"),
    /signingConfig\s+signingConfigs\.debug/
  );

  // Export only the public certificate from the tracked, publicly known debug
  // keystore. Neither a private key nor a release signing identity is loaded.
  const certificate = new X509Certificate(
    execFileSync(
      "keytool",
      [
        "-exportcert",
        "-keystore",
        keystore,
        "-alias",
        "androiddebugkey",
        "-storepass",
        "android",
      ],
      { stdio: ["ignore", "pipe", "pipe"] }
    )
  );
  const developmentLinks = assetLinks.filter(entry =>
    entry.target.package_name.endsWith(".development")
  );
  assert.deepEqual(developmentLinks, [
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: packageName,
        sha256_cert_fingerprints: [certificate.fingerprint256],
      },
    },
  ]);

  const productionPackage = literal(
    section(section(gradle, "productFlavors"), "production"),
    "applicationId"
  );
  assert.equal(assetLinks[0].target.package_name, productionPackage);
  assert.notEqual(packageName, `${productionPackage}.development`);
});
