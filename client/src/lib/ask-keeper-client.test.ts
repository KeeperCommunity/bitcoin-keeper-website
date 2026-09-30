import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  askKeeper,
  ReportSubmissionUncertainError,
  submitKeeperDraft,
} from "./ask-keeper-client";
import { detectSensitiveInput } from "./ask-keeper-sensitive";
import { sanitizeHelpAiSources } from "./ask-keeper-links";

const request = {
  appId: "web_test",
  conversationId: "web_conv_test",
  history: [],
  text: "What is Keeper?",
};
const fetchMock = vi.fn();
beforeEach(() => {
  vi.stubGlobal("fetch", fetchMock);
  vi.stubGlobal("navigator", { language: "en" });
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  fetchMock.mockReset();
});

describe("AskKeeper website integration", () => {
  it("sends prior context without duplicating the question or using mobile credentials", async () => {
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          reply: "Keeper manages wallets.",
          sources: [],
          debug: { internal: "not for display" },
        })
      )
    );
    const history = [
      { role: "user" as const, text: "Hello" },
      { role: "ai" as const, text: "How can I help?" },
    ];
    const result = await askKeeper({ ...request, history });
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("https://relay.bitcoinkeeper.app/chat");
    expect(options.credentials).toBe("omit");
    expect(options.headers).toEqual({ "Content-Type": "application/json" });
    const body = JSON.parse(options.body);
    expect(body.messages).toEqual(history);
    expect(body.userText).toBe(request.text);
    expect(body.metadata.platform).toBe("web");
    expect(result).not.toHaveProperty("debug");
  });

  it("blocks sensitive input before a network request", async () => {
    await expect(
      askKeeper({
        ...request,
        text: "abandon ability able about above absent absorb abstract",
      })
    ).rejects.toThrow("seed phrase");
    await expect(
      askKeeper({ ...request, text: "-----BEGIN RSA PRIVATE KEY-----" })
    ).rejects.toThrow("private key");
    await expect(
      askKeeper({ ...request, text: "my passphrase is example-secret" })
    ).rejects.toThrow("passphrase");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(
      detectSensitiveInput("How do I back up my Recovery Key?")
    ).toBeNull();
  });

  it("blocks sensitive material restored into prior chat history", async () => {
    await expect(
      askKeeper({
        ...request,
        history: [{ role: "user", text: "xprv" + "1".repeat(105) }],
      })
    ).rejects.toThrow("private key");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("accepts only ready drafts and never auto-submits a generated report", async () => {
    const draft = { kind: "bug", title: "Signing failed" };
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          reply: "Tell me more.",
          draft,
          draftReadyForConfirmation: false,
        })
      )
    );
    expect((await askKeeper(request)).draft).toBeUndefined();
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          reply: "Review this report.",
          draft,
          draftReadyForConfirmation: true,
        })
      )
    );
    expect((await askKeeper(request)).draft).toEqual(draft);
    expect(fetchMock.mock.calls.every(([url]) => url.endsWith("/chat"))).toBe(
      true
    );
  });

  it("removes retired and unsafe citation destinations", () => {
    const sources = [
      {
        title: "Old Zendesk",
        url: "https://help.bitcoinkeeper.app/hc/en-us/articles/1",
      },
      { title: "Local", url: "https://127.0.0.1/" },
      {
        title: "Lookalike",
        url: "https://bitcoinkeeper.app.attacker.example/",
      },
      {
        title: "Source",
        url: "https://github.com/KeeperCommunity/bitcoin-keeper",
      },
    ];
    expect(sanitizeHelpAiSources(sources)).toEqual([sources[3]]);
  });

  it("handles limits without exposing backend error details", async () => {
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          error: "HELP_AI_DAILY_MESSAGE_LIMIT_REACHED",
          debug: "private",
        }),
        { status: 429 }
      )
    );
    await expect(askKeeper(request)).rejects.toThrow("chat limit");
  });

  it("requires a real Keeper issue URL and retains the submission key", async () => {
    const draft = { kind: "bug" as const, title: "Signing failed" };
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          issueUrl:
            "https://github.com/KeeperCommunity/bitcoin-keeper/issues/999",
        })
      )
    );
    const result = await submitKeeperDraft({
      ...request,
      draft,
      idempotencyKey: "stable-retry-key",
    });
    expect(result.endsWith("/999")).toBe(true);
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.confirm).toBe(true);
    expect(body.idempotencyKey).toBe("stable-retry-key");
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({ issueUrl: "https://example.com/issues/999" })
      )
    );
    await expect(
      submitKeeperDraft({
        ...request,
        draft,
        idempotencyKey: "stable-retry-key",
      })
    ).rejects.toBeInstanceOf(ReportSubmissionUncertainError);
  });

  it("marks report transport failures as uncertain instead of inviting overlapping retries", async () => {
    fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));
    await expect(
      submitKeeperDraft({
        ...request,
        draft: { kind: "feature", title: "Improve signing help" },
        idempotencyKey: "stable-key",
      })
    ).rejects.toBeInstanceOf(ReportSubmissionUncertainError);
  });
});
