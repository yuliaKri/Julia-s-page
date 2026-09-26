export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

interface ChatResponse {
  message?: string;
  error?: string;
}

const DEFAULT_CHAT_API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://assistant.juliya-krivorotko.workers.dev/'
    : 'http://127.0.0.1:8787';
const CHAT_API_URL = process.env.CHAT_API_URL || DEFAULT_CHAT_API_URL;

export async function sendMessage(
  history: ChatMessage[],
  userMessage: string
): Promise<string> {
  try {
    const response = await fetch(CHAT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        history: history.slice(-12),
        message: userMessage,
      }),
    });

    const data = (await response.json()) as ChatResponse;

    if (!response.ok) {
      console.error('Chat API error:', data.error || response.statusText);
      return "I'm having trouble connecting right now. Please try again shortly.";
    }

    return data.message || "I didn't receive a response. Please try again.";
  } catch (error) {
    console.error('Chat API request failed:', error);
    return "I'm having trouble connecting right now. Please try again shortly.";
  }
}
