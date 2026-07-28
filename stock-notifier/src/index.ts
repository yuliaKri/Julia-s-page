/**
 * Stock Notifier — Cloudflare Worker
 *
 * Runs on a cron schedule during market hours.
 * Fetches stock prices from Finnhub and sends a Telegram message.
 */

export interface Env {
  FINNHUB_API_KEY: string;
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
}

// ── Your watchlist (same as the UI) ──
const WATCHLIST = [
  { symbol: 'NVDA', name: 'NVIDIA' },
  { symbol: 'SNDK', name: 'SanDisk' },
  { symbol: 'CVX', name: 'Chevron' },
  { symbol: 'MSFT', name: 'Microsoft' },
  { symbol: 'AMZN', name: 'Amazon' },
  { symbol: 'NFLX', name: 'Netflix' },
  { symbol: 'LMT', name: 'Lockheed Martin' },
  { symbol: 'AEM', name: 'Agnico Eagle' },
  { symbol: 'CCJ', name: 'Cameco' },
];

// ── Fetch a single stock quote from Finnhub ──
async function fetchQuote(symbol: string, apiKey: string) {
  const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data: any = await res.json();
  if (!data || data.c === 0) return null;
  return {
    price: data.c as number,
    change: data.d as number,
    changePercent: data.dp as number,
  };
}

// ── Format the Telegram message ──
function formatMessage(
  quotes: { symbol: string; name: string; price: number; change: number; changePercent: number }[]
): string {
  const now = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  let msg = `📊 *Stock Update — ${now} ET*\n\n`;

  for (const q of quotes) {
    const arrow = q.change >= 0 ? '🟢' : '🔴';
    const sign = q.change >= 0 ? '+' : '';
    msg += `${arrow} *${q.symbol}* — $${q.price.toFixed(2)}  ${sign}${q.change.toFixed(2)} (${sign}${q.changePercent.toFixed(2)}%)\n`;
    msg += `    _${q.name}_\n\n`;
  }

  return msg;
}

// ── Send message via Telegram Bot API ──
async function sendTelegram(message: string, botToken: string, chatId: string) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown',
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Telegram error:', err);
  }
}

// ── Worker entry point ──
export default {
  // Cron trigger handler
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    const quotes = [];

    for (const stock of WATCHLIST) {
      const quote = await fetchQuote(stock.symbol, env.FINNHUB_API_KEY);
      if (quote) {
        quotes.push({ ...stock, ...quote });
      }
    }

    if (quotes.length === 0) {
      console.log('No quotes fetched, skipping notification.');
      return;
    }

    const message = formatMessage(quotes);
    await sendTelegram(message, env.TELEGRAM_BOT_TOKEN, env.TELEGRAM_CHAT_ID);
    console.log(`Sent stock update with ${quotes.length} quotes.`);
  },

  // HTTP handler (for testing — visit the worker URL to trigger manually)
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const quotes = [];

    for (const stock of WATCHLIST) {
      const quote = await fetchQuote(stock.symbol, env.FINNHUB_API_KEY);
      if (quote) {
        quotes.push({ ...stock, ...quote });
      }
    }

    if (quotes.length === 0) {
      return new Response('No quotes available.', { status: 503 });
    }

    const message = formatMessage(quotes);
    await sendTelegram(message, env.TELEGRAM_BOT_TOKEN, env.TELEGRAM_CHAT_ID);

    return new Response(`✅ Sent!\n\n${message}`, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  },
};
