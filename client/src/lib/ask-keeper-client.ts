import { detectSensitiveInput } from "./ask-keeper-sensitive";
import {
  sanitizeHelpAiReplyLinks,
  sanitizeHelpAiSources,
} from "./ask-keeper-links";

// The same production Relay used by the mobile app. No mobile API key or wallet
// identity is sent by this independent website client.
const RELAY_URL = "https://relay.bitcoinkeeper.app/";
export class ReportSubmissionUncertainError extends Error {
  constructor() {
    super(
      "The report’s submission could not be confirmed. It may have reached GitHub. Check the reports before submitting it again."
    );
  }
}
export type ChatMessage = { role: "user" | "ai"; text: string; time?: string };
export type HelpDraft = {
  kind: "bug" | "feature";
  title: string;
  steps?: string[];
  expected?: string;
  actual?: string;
  problem?: string;
  proposed?: string;
};
export type ChatReply = {
  reply: string;
  sources: { title: string; url: string }[];
  draft?: HelpDraft;
  escalation?: "telegram" | "advisor" | "developer_email";
};

export function browserAppId(): string {
  const storageKey = "keeper-help-browser-id";
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved && /^web_[a-f0-9-]{36}$/.test(saved)) return saved;
  } catch {
    /* Chat also works when browser storage is unavailable. */
  }
  const id = `web_${crypto.randomUUID()}`;
  try {
    localStorage.setItem(storageKey, id);
  } catch {
    /* Keep this session's ID. */
  }
  return id;
}

function friendlyError(status: number, code: string): string {
  if (status === 429)
    return "AskKeeper’s chat limit has been reached. Please try again later or ask the community on Telegram.";
  if (/SENSITIVE|SEED|PRIVATE_KEY/i.test(code))
    return "AskKeeper could not accept this message. Remove any wallet secrets and try rephrasing your question.";
  return "AskKeeper is unavailable right now. Please try again or ask the community on Telegram.";
}

async function relayRequest(
  route: "chat" | "submitHelpIssue",
  body: unknown
): Promise<Record<string, any>> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000);
  try {
    const response = await fetch(`${RELAY_URL}${route}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "omit",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const data = await response.json().catch(() => ({}));
    if (route === "submitHelpIssue" && response.status >= 500)
      throw new ReportSubmissionUncertainError();
    if (!response.ok)
      throw new Error(
        friendlyError(response.status, String(data.error ?? data.err ?? ""))
      );
    return data;
  } catch (error) {
    if (error instanceof ReportSubmissionUncertainError) throw error;
    if (
      error instanceof Error &&
      (error.message.startsWith("AskKeeper") ||
        error.message.startsWith("This looks like"))
    )
      throw error;
    if (route === "submitHelpIssue") throw new ReportSubmissionUncertainError();
    throw new Error(
      "Unable to reach AskKeeper. Check your connection and try again."
    );
  } finally {
    clearTimeout(timeout);
  }
}

export function readDraft(value: unknown): HelpDraft | undefined {
  if (!value || typeof value !== "object") return;
  const draft = value as Record<string, unknown>;
  if (
    (draft.kind !== "bug" && draft.kind !== "feature") ||
    typeof draft.title !== "string" ||
    !draft.title.trim()
  )
    return;
  const result: HelpDraft = {
    kind: draft.kind,
    title: draft.title.slice(0, 500),
  };
  if (Array.isArray(draft.steps))
    result.steps = draft.steps
      .filter((step): step is string => typeof step === "string")
      .slice(0, 20);
  for (const key of ["expected", "actual", "problem", "proposed"] as const) {
    if (typeof draft[key] === "string") result[key] = draft[key].slice(0, 5000);
  }
  return result;
}

export async function askKeeper(params: {
  appId: string;
  conversationId: string;
  history: ChatMessage[];
  text: string;
}): Promise<ChatReply> {
  const sensitive = detectSensitiveInput(params.text);
  if (sensitive) throw new Error(sensitive.message);
  const history = params.history.slice(-6);
  for (const message of history) {
    const found = detectSensitiveInput(message.text);
    if (found) throw new Error(found.message);
  }
  const data = await relayRequest("chat", {
    appId: params.appId,
    conversationId: params.conversationId,
    // The Relay adds userText to the model prompt; send prior turns only.
    messages: history,
    userText: params.text,
    metadata: {
      appVersion: "website",
      platform: "web",
      device: "web browser",
      currentScreen: "AskKeeper",
      locale: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });
  if (typeof data.reply !== "string" || !data.reply.trim())
    throw new Error("AskKeeper returned an empty answer. Please try again.");
  const sources = Array.isArray(data.sources)
    ? data.sources.filter(
        source =>
          source &&
          typeof source.url === "string" &&
          typeof source.title === "string"
      )
    : [];
  const escalation = data.escalationCard?.type;
  return {
    reply: sanitizeHelpAiReplyLinks(data.reply),
    sources: sanitizeHelpAiSources(sources),
    draft:
      data.draftReadyForConfirmation === true
        ? readDraft(data.draft)
        : undefined,
    escalation: ["telegram", "advisor", "developer_email"].includes(escalation)
      ? escalation
      : undefined,
  };
}

export async function submitKeeperDraft(params: {
  appId: string;
  conversationId: string;
  draft: HelpDraft;
  idempotencyKey: string;
}) {
  const text = [
    params.draft.title,
    ...(params.draft.steps ?? []),
    params.draft.expected,
    params.draft.actual,
    params.draft.problem,
    params.draft.proposed,
  ]
    .filter(Boolean)
    .join(" ");
  const sensitive = detectSensitiveInput(text);
  if (sensitive) throw new Error(sensitive.message);
  const data = await relayRequest("submitHelpIssue", {
    appId: params.appId,
    conversationId: params.conversationId,
    draft: params.draft,
    kind: params.draft.kind,
    confirm: true,
    idempotencyKey: params.idempotencyKey,
    metadata: { appVersion: "website", platform: "web", device: "web browser" },
  });
  if (
    typeof data.issueUrl !== "string" ||
    !/^https:\/\/github\.com\/KeeperCommunity\/bitcoin-keeper\/issues\/\d+$/.test(
      data.issueUrl
    )
  ) {
    throw new ReportSubmissionUncertainError();
  }
  return data.issueUrl as string;
}
