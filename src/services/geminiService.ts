import { SYSTEM_PROMPT } from '../data/systemPrompt';

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

const GEMINI_MODEL = 'gemini-2.0-flash';

export async function sendMessage(
  history: ChatMessage[],
  userMessage: string
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return 'API key not configured. Add GEMINI_API_KEY to your .env file to enable the assistant.';
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  // Build conversation contents for Gemini API
  const contents = [
    // History
    ...history.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.text }],
    })),
    // New user message
    { role: 'user', parts: [{ text: userMessage }] },
  ];

  const body = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 300,
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Gemini API error:', error);
    return 'Oops, something went wrong. Please try again!';
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  return text || 'Hmm, I didn\'t get a response. Try asking again!';
}
