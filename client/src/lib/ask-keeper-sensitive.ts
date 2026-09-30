// Reused from KeeperCommunity/bitcoin-keeper at 1adf4f6 (MIT).
import { BIP39_WORD_SET } from "./bip39-word-set";

export type SensitiveDetectionResult = {
  kind: "mnemonic" | "extended_private_key" | "extended_public_key" | "wif_key";
  message: string;
};

// ─── Private detectors ────────────────────────────────────────────────────────

/**
 * Detects actual extended private key strings (xprv/yprv/zprv + variants) by
 * requiring the 4-char prefix to be followed by ≥100 base58 characters.
 * The word "xprv" alone, without a long suffix, does NOT trigger this.
 */
const EXTENDED_PRIVATE_KEY_PATTERN =
  /\b(xprv|yprv|zprv|Xprv|Yprv|Zprv|tprv|uprv|vprv)[1-9A-HJ-NP-Za-km-z]{100,}\b/;

/**
 * Detects actual extended public key strings (xpub/ypub/zpub + variants).
 * Same length requirement — the word "xpub" alone does NOT trigger this.
 */
const EXTENDED_PUBLIC_KEY_PATTERN =
  /\b(xpub|ypub|zpub|Xpub|Ypub|Zpub|tpub|upub|vpub)[1-9A-HJ-NP-Za-km-z]{100,}\b/;

/**
 * Detects WIF-encoded private keys:
 *   5…  = mainnet uncompressed (51 chars)
 *   K…  = mainnet compressed   (52 chars)
 *   L…  = mainnet compressed   (52 chars)
 *   c…  = testnet              (52 chars)
 */
const WIF_KEY_PATTERN = /\b[5KLc][1-9A-HJ-NP-Za-km-z]{49,51}\b/;

/** Minimum number of consecutive BIP39 words to flag as a potential mnemonic. */
const MNEMONIC_THRESHOLD = 8;

function detectExtendedPrivateKey(
  text: string
): SensitiveDetectionResult | null {
  if (EXTENDED_PRIVATE_KEY_PATTERN.test(text)) {
    return {
      kind: "extended_private_key",
      message:
        "This looks like an extended private key. Please remove it — private keys must never be shared.",
    };
  }
  return null;
}

function detectExtendedPublicKey(
  text: string
): SensitiveDetectionResult | null {
  if (EXTENDED_PUBLIC_KEY_PATTERN.test(text)) {
    return {
      kind: "extended_public_key",
      message:
        "This looks like an extended public key (xpub). Please remove it — sharing your xpub exposes your full transaction history.",
    };
  }
  return null;
}

function detectWIF(text: string): SensitiveDetectionResult | null {
  if (WIF_KEY_PATTERN.test(text)) {
    return {
      kind: "wif_key",
      message:
        "This looks like a private key. Please remove it — private keys must never be shared.",
    };
  }
  return null;
}

function detectMnemonic(text: string): SensitiveDetectionResult | null {
  // Normalize before tokenizing so common paste formats don't bypass detection:
  //   "abandon, ability, able..."  (comma-separated)
  //   "1. abandon 2. ability..."   (numbered with dot)
  //   "1) abandon 2) ability..."   (numbered with parenthesis)
  // Replace every non-letter character with a space, then collapse runs.
  const normalized = text
    .toLowerCase()
    .replace(/[^a-z]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const tokens = normalized.split(" ").filter(t => t.length > 0);
  let consecutiveCount = 0;

  for (const token of tokens) {
    if (BIP39_WORD_SET.has(token)) {
      consecutiveCount++;
      if (consecutiveCount >= MNEMONIC_THRESHOLD) {
        return {
          kind: "mnemonic",
          message:
            "This looks like a seed phrase. Please remove it — seed words must never be shared.",
        };
      }
    } else {
      consecutiveCount = 0;
    }
  }

  return null;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Scans a chat input string for sensitive Bitcoin key material.
 * Runs detectors in priority order: extended keys → WIF → mnemonic → keywords.
 *
 * @returns A detection result describing what was found, or `null` if clean.
 */
export function detectSensitiveInput(
  text: string
): SensitiveDetectionResult | null {
  if (!text) return null;
  if (/-----BEGIN(?: [A-Z0-9]+)? PRIVATE KEY-----/i.test(text)) {
    return {
      kind: "extended_private_key",
      message:
        "This looks like a private key. Please remove it — private keys must never be shared.",
    };
  }
  if (
    /\b(?:my|the)\s+(?:wallet\s+)?passphrase\s*(?::|=|\bis\b)\s*\S+/i.test(text)
  ) {
    return {
      kind: "extended_private_key",
      message:
        "Please remove any passphrase details and describe the problem without sharing wallet secrets.",
    };
  }
  return (
    detectExtendedPrivateKey(text) ??
    detectExtendedPublicKey(text) ??
    detectWIF(text) ??
    detectMnemonic(text)
  );
}
