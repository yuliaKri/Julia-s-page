export interface StockQuote {
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  highPrice: number;
  lowPrice: number;
  openPrice: number;
  prevClose: number;
}

export async function fetchQuote(symbol: string): Promise<StockQuote | null> {
  const apiKey = process.env.FINNHUB_API_KEY;

  if (!apiKey) {
    return null;
  }

  const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) return null;

  const data = await response.json();

  // Finnhub returns { c, d, dp, h, l, o, pc, t }
  if (!data || data.c === 0) return null;

  return {
    symbol,
    name: '',
    currentPrice: data.c,
    change: data.d,
    changePercent: data.dp,
    highPrice: data.h,
    lowPrice: data.l,
    openPrice: data.o,
    prevClose: data.pc,
  };
}

export async function fetchAllQuotes(
  stocks: { symbol: string; name: string }[]
): Promise<StockQuote[]> {
  const results = await Promise.all(
    stocks.map(async (stock) => {
      const quote = await fetchQuote(stock.symbol);
      if (quote) {
        quote.name = stock.name;
      }
      return quote;
    })
  );

  return results.filter((q): q is StockQuote => q !== null);
}
