import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, MessageSquare, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  askKeeper,
  browserAppId,
  submitKeeperDraft,
  ReportSubmissionUncertainError,
  type ChatMessage,
  type ChatReply,
} from "@/lib/ask-keeper-client";
import { detectSensitiveInput } from "@/lib/ask-keeper-sensitive";
import { sanitizeHelpAiSources } from "@/lib/ask-keeper-links";
import KeeperGuide from "@/components/KeeperGuide";

type DisplayMessage = ChatMessage & { sources?: ChatReply["sources"] };
type DraftState = {
  draft: NonNullable<ChatReply["draft"]>;
  idempotencyKey: string;
  issueUrl?: string;
};
const SESSION_KEY = "keeper-help-chat";
const suggestions = [
  "What is Bitcoin Keeper?",
  "How does multisig work?",
  "How do I back up Keeper?",
  "I have an idea for Keeper",
];

export default function AskKeeper() {
  const [appId, setAppId] = useState<string>();
  const [conversationId, setConversationId] = useState<string>();
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [draftState, setDraftState] = useState<DraftState>();
  const [reviewing, setReviewing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionUncertain, setSubmissionUncertain] = useState(false);
  const [escalation, setEscalation] = useState<ChatReply["escalation"]>();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pending = useRef(false);

  useEffect(() => {
    // A legacy /learn redirect can render the guide after the browser's initial
    // fragment scroll. Restore that section once the combined page is mounted.
    if (!window.location.hash) return;
    try {
      document
        .getElementById(decodeURIComponent(window.location.hash.slice(1)))
        ?.scrollIntoView();
    } catch {
      /* An invalid fragment should not prevent chat from loading. */
    }
  }, []);

  useEffect(() => {
    setAppId(browserAppId());
    try {
      const saved = JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? "null");
      if (
        saved &&
        /^web_conv_[a-f0-9-]{36}$/.test(saved.conversationId) &&
        Array.isArray(saved.messages)
      ) {
        const safe = saved.messages
          .slice(-40)
          .filter(
            (message: DisplayMessage) =>
              (message.role === "user" || message.role === "ai") &&
              typeof message.text === "string" &&
              !detectSensitiveInput(message.text)
          )
          .map((message: DisplayMessage) => ({
            role: message.role,
            text: message.text,
            sources: sanitizeHelpAiSources(message.sources),
          }));
        setMessages(safe);
        setConversationId(saved.conversationId);
        return;
      }
    } catch {
      /* A fresh chat is available when storage is disabled. */
    }
    setConversationId(`web_conv_${crypto.randomUUID()}`);
  }, []);

  useEffect(() => {
    if (!conversationId) return;
    try {
      sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ conversationId, messages })
      );
    } catch {
      /* No storage is required to chat. */
    }
  }, [conversationId, messages]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || pending.current || !appId || !conversationId) return;
    const sensitive = detectSensitiveInput(text);
    if (sensitive) {
      setError(sensitive.message);
      return;
    }
    pending.current = true;
    setSending(true);
    setError("");
    // A new turn may revise a report. Do not leave an older draft submit-able.
    if (!draftState?.issueUrl) setDraftState(undefined);
    setReviewing(false);
    const previous = messages;
    const userMessage: DisplayMessage = {
      role: "user",
      text,
      time: new Date().toISOString(),
    };
    setMessages([...previous, userMessage].slice(-40));
    setInput("");
    try {
      const response = await askKeeper({
        appId,
        conversationId,
        history: previous,
        text,
      });
      setMessages(
        [
          ...previous,
          userMessage,
          {
            role: "ai",
            text: response.reply,
            sources: response.sources,
            time: new Date().toISOString(),
          },
        ].slice(-40) as DisplayMessage[]
      );
      setEscalation(response.escalation);
      if (response.draft) {
        setDraftState({
          draft: response.draft,
          idempotencyKey: `web_issue_${crypto.randomUUID()}`,
        });
        setSubmissionUncertain(false);
      }
      setReviewing(false);
    } catch (failure) {
      setMessages(previous);
      setInput(text);
      setError(
        failure instanceof Error
          ? failure.message
          : "Unable to reach Ask Keeper. Please try again."
      );
    } finally {
      pending.current = false;
      setSending(false);
    }
  }

  async function confirmReport() {
    if (
      !draftState ||
      !appId ||
      !conversationId ||
      pending.current ||
      submissionUncertain
    )
      return;
    pending.current = true;
    setSubmitting(true);
    setError("");
    try {
      const issueUrl = await submitKeeperDraft({
        appId,
        conversationId,
        draft: draftState.draft,
        idempotencyKey: draftState.idempotencyKey,
      });
      setDraftState({ ...draftState, issueUrl });
      setReviewing(false);
    } catch (failure) {
      if (failure instanceof ReportSubmissionUncertainError) {
        setSubmissionUncertain(true);
        setReviewing(false);
      }
      setError(
        failure instanceof Error
          ? failure.message
          : "Unable to submit the report. Please try again."
      );
    } finally {
      pending.current = false;
      setSubmitting(false);
    }
  }

  function newChat() {
    if (pending.current) return;
    setConversationId(`web_conv_${crypto.randomUUID()}`);
    setMessages([]);
    setDraftState(undefined);
    setReviewing(false);
    setInput("");
    setError("");
    setSubmissionUncertain(false);
    setEscalation(undefined);
    inputRef.current?.focus();
  }

  return (
    <section className="bg-background py-12 md:py-20">
      <div className="container max-w-4xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl font-semibold text-primary md:text-5xl">
              Ask Keeper
            </h1>
            <p className="mt-3 text-lg text-secondary-foreground/80">
              Ask a question, report a problem, share an idea, or read the
              basics.
            </p>
            <p className="mt-2 max-w-2xl text-base text-muted-foreground">
              Your messages are sent to Keeper’s AI help service. Never include
              wallet secrets or sensitive personal information.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={newChat}
            disabled={sending || submitting || !conversationId}
          >
            New chat
          </Button>
        </div>

        <nav
          aria-label="Help options"
          className="mb-6 flex flex-wrap gap-x-6 gap-y-3 text-base font-semibold text-primary"
        >
          <a href="#ask-question" className="underline underline-offset-4">
            Ask a Question
          </a>
          <a href="#guide" className="underline underline-offset-4">
            Read the Basics
          </a>
        </nav>

        <details className="mb-6 rounded-lg border border-primary/10 bg-card p-5">
          <summary className="cursor-pointer font-semibold text-primary">
            Before you use Ask Keeper
          </summary>
          <div className="mt-4 space-y-3 text-base leading-relaxed text-secondary-foreground/80">
            <p>
              Ask Keeper uses the same AI-assisted help service as the Keeper
              app. It can answer questions and draft bug reports or feature
              requests. It cannot access your wallet, view your keys or sign
              transactions.
            </p>
            <p>
              Ask Keeper may be incorrect or incomplete. Verify important wallet
              and recovery actions carefully.
            </p>
            <p>
              Your messages and limited browser context are sent to Keeper
              services and may be processed by AI providers. Chat history is
              saved in this browser tab.
            </p>
            <p>
              Reports are posted publicly on GitHub only after you review and
              confirm them. Never include wallet secrets or sensitive personal
              information.
            </p>
          </div>
        </details>

        <div className="rounded-xl border border-primary/10 bg-card p-5 md:p-8">
          {messages.length === 0 && (
            <div className="py-8 text-center">
              <MessageSquare
                className="mx-auto mb-4 h-10 w-10 text-primary"
                aria-hidden="true"
              />
              <h2 className="font-serif text-2xl font-semibold text-primary">
                Ask Keeper anything
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Try asking about
              </p>
              <div className="mt-5 grid gap-3 text-left sm:grid-cols-2">
                {suggestions.map(suggestion => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setInput(suggestion);
                      inputRef.current?.focus();
                    }}
                    className="rounded-lg border border-primary/10 px-4 py-3 text-base text-primary hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div
            role="log"
            aria-label="Ask Keeper conversation"
            aria-live="polite"
            aria-relevant="additions"
            className="space-y-5"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[94%] rounded-xl px-5 py-4 text-base leading-relaxed sm:max-w-[88%] ${message.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "border border-primary/10 bg-background text-foreground"}`}
              >
                <p className="mb-2 text-sm font-semibold">
                  {message.role === "user" ? "You" : "Ask Keeper"}
                </p>
                <p className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
                  {message.text}
                </p>
                {!!message.sources?.length && (
                  <ul className="mt-4 space-y-2 border-t border-primary/10 pt-3">
                    {message.sources.map(source => (
                      <li key={source.url}>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="break-words text-primary underline underline-offset-4"
                        >
                          {source.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          {sending && (
            <p role="status" className="mt-5 text-base text-muted-foreground">
              Ask Keeper is responding…
            </p>
          )}
          {escalation && (
            <aside className="mt-6 space-y-3 rounded-lg border border-primary/15 bg-primary/5 p-5">
              <h2 className="font-serif text-xl font-semibold text-primary">
                Get more help
              </h2>
              {escalation === "advisor" ? (
                <p>
                  Find advisors in the Keeper app.{" "}
                  <Link href="/" className="text-primary underline">
                    Get Keeper
                  </Link>
                </p>
              ) : escalation === "developer_email" ? (
                <a
                  href="mailto:hello@bithyve.com"
                  className="text-primary underline"
                >
                  Email the Keeper team
                </a>
              ) : (
                <a
                  href="https://t.me/bitcoinkeeper"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Ask the community on Telegram
                </a>
              )}
            </aside>
          )}

          {draftState && (
            <div className="mt-6 space-y-4 rounded-lg border border-primary/20 bg-background p-5">
              <h2 className="font-serif text-xl font-semibold text-primary">
                {draftState.issueUrl ? "Report submitted" : "Draft report"}
              </h2>
              <p className="font-semibold">{draftState.draft.title}</p>
              {draftState.draft.steps?.length && (
                <ol className="list-decimal space-y-1 pl-5">
                  {draftState.draft.steps.map((step, index) => (
                    <li key={index} className="whitespace-pre-wrap break-words">
                      {step}
                    </li>
                  ))}
                </ol>
              )}
              {(["expected", "actual", "problem", "proposed"] as const).map(
                key =>
                  draftState.draft[key] && (
                    <p key={key} className="whitespace-pre-wrap break-words">
                      <strong className="capitalize">{key}: </strong>
                      {draftState.draft[key]}
                    </p>
                  )
              )}
              {draftState.issueUrl ? (
                <a
                  href={draftState.issueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary underline"
                >
                  View report <ArrowRight className="h-4 w-4" />
                </a>
              ) : submissionUncertain ? (
                <p>
                  The report may have reached GitHub.{" "}
                  <a
                    href="https://github.com/KeeperCommunity/bitcoin-keeper/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    Check the reports
                  </a>{" "}
                  before submitting it again.
                </p>
              ) : reviewing ? (
                <>
                  <p className="rounded-lg border border-primary/15 bg-primary/5 p-4 text-base">
                    This report will be publicly visible on GitHub. Do not
                    confirm if it contains sensitive information; ask Ask Keeper
                    to revise it first.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      onClick={confirmReport}
                      disabled={sending || submitting}
                    >
                      {submitting ? "Submitting…" : "Confirm"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setReviewing(false)}
                      disabled={submitting}
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <Button onClick={() => setReviewing(true)} disabled={sending}>
                  Review report
                </Button>
              )}
            </div>
          )}

          <form
            id="ask-question"
            className="mt-8 scroll-mt-28 space-y-4 border-t border-primary/10 pt-6"
            onSubmit={event => {
              event.preventDefault();
              void sendMessage();
            }}
          >
            <p className="flex items-start gap-2 text-base font-semibold text-primary">
              <ShieldCheck
                className="mt-0.5 h-5 w-5 shrink-0"
                aria-hidden="true"
              />
              Never share seed words, private keys, passphrases or wallet
              backups.
            </p>
            <label
              htmlFor="keeper-question"
              className="block text-base font-semibold"
            >
              Your message
            </label>
            <textarea
              id="keeper-question"
              ref={inputRef}
              value={input}
              onChange={event => setInput(event.target.value)}
              maxLength={4000}
              rows={3}
              placeholder="Type your message"
              disabled={sending || submitting}
              className="w-full resize-y rounded-lg border border-primary/20 bg-background px-4 py-3 text-base leading-relaxed focus:outline-2 focus:outline-primary"
            />
            {error && (
              <p role="alert" className="text-base text-destructive">
                {error}
              </p>
            )}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <a
                href="https://t.me/bitcoinkeeper"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-primary underline underline-offset-4"
              >
                Ask the community on Telegram
              </a>
              <Button
                type="submit"
                disabled={
                  sending ||
                  submitting ||
                  !input.trim() ||
                  !appId ||
                  !conversationId
                }
                className="h-auto px-6 py-3 text-base"
              >
                <Send className="h-4 w-4" />
                {sending ? "Sending…" : "Send"}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <KeeperGuide />
    </section>
  );
}
