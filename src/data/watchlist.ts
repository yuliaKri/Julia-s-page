export interface Stock {
  symbol: string;
  name: string;
}

/**
 * Your stock watchlist.
 * Add/remove symbols here. Use official ticker symbols (e.g. AAPL, TSLA).
 * Find symbols at https://finnhub.io/docs/api/symbol-search
 */
export const watchlist: Stock[] = [
  { symbol: 'NVDA', name: 'NVIDIA' },
  { symbol: 'SNDK', name: 'SanDisk' },
  { symbol: 'AXTI', name: 'AXT Inc' },
  { symbol: 'CVX', name: 'Chevron' },
  { symbol: 'MSFT', name: 'Microsoft' },
  { symbol: 'AMZN', name: 'Amazon' },
  { symbol: 'NFLX', name: 'Netflix' },
  { symbol: 'LMT', name: 'Lockheed Martin' },
  { symbol: 'AEM', name: 'Agnico Eagle Mines' },
  { symbol: 'CCJ', name: 'Cameco Corp' },
];
