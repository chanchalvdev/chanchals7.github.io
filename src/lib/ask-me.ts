/**
 * Wiring for the "Ask about me" chat. The Gemini key lives only in the
 * ask-me Supabase Edge Function; the browser talks to that function, never
 * to Gemini directly.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

export const ASK_ME_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// The chat only appears once the ask-me function is deployed and the build
// opts in (NEXT_PUBLIC_ASK_ME_ENABLED=true), so visitors never meet a chat
// that can't answer.
const enabled = process.env.NEXT_PUBLIC_ASK_ME_ENABLED === "true";

/** Null when the chat is disabled or Supabase isn't configured — the chat then stays hidden. */
export const ASK_ME_ENDPOINT =
  enabled && supabaseUrl ? `${supabaseUrl}/functions/v1/ask-me` : null;

const OPEN_EVENT = "ask-me:open";

/** Opens the chat panel from anywhere on the page, optionally asking `question`. */
export function openAskMe(question?: string) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { question } }));
}

export function onAskMeOpen(handler: (question?: string) => void) {
  const listener = (event: Event) =>
    handler((event as CustomEvent<{ question?: string }>).detail?.question);
  window.addEventListener(OPEN_EVENT, listener);
  return () => window.removeEventListener(OPEN_EVENT, listener);
}
