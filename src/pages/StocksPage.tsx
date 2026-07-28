import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { watchlist } from '../data/watchlist';
import { fetchAllQuotes, StockQuote } from '../services/stockService';

/* ── Animations ── */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

/* ── Styled Components ── */
const PageWrapper = styled.main`
  min-height: 100vh;
  padding: 120px 48px 80px;
  background:
    radial-gradient(ellipse at 50% 20%, rgba(29, 78, 137, 0.15) 0%, transparent 50%),
    linear-gradient(180deg, #0a0a0a 0%, #111118 100%);
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const TitleBar = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -1px;
  color: #ffffff;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
`;

const LastUpdated = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.3);
  text-align: center;
  margin-bottom: 24px;
`;

const RefreshBtn = styled.button`
  display: block;
  margin: 0 auto 32px;
  padding: 8px 20px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 20px;
  animation: ${fadeIn} 0.3s ease;
  transition: border-color 0.2s;
  cursor: pointer;

  &:hover {
    border-color: rgba(167, 139, 250, 0.4);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const SymbolLabel = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
`;

const CompanyName = styled.div`
  font-size: 13px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.45);
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  text-align: right;
`;

const Change = styled.div<{ $positive: boolean }>`
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  color: ${(p) => (p.$positive ? '#4ade80' : '#f87171')};
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

const Stat = styled.div`
  text-align: center;
`;

const StatLabel = styled.div`
  font-size: 11px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`;

const StatValue = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.75);
`;

const SkeletonCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 20px;
  height: 150px;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.04) 50%,
      transparent 100%
    );
    background-size: 400px 100%;
    animation: ${shimmer} 1.5s infinite;
  }
`;

const NoKeyMsg = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  line-height: 1.7;

  a {
    color: #a78bfa;
    text-decoration: underline;
  }
`;

const ExchangeRateCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 20px 28px;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const ExchangeLabel = styled.span`
  font-size: 15px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
`;

const ExchangeValue = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
`;

const ExchangeChange = styled.span<{ $positive: boolean }>`
  font-size: 15px;
  font-weight: 500;
  color: ${(p) => (p.$positive ? '#4ade80' : '#f87171')};
`;

/* ── Modal Styled Components ── */
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.2s ease;
`;

const Modal = styled.div`
  width: 90vw;
  max-width: 1000px;
  height: 70vh;
  background: #1a1a2e;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
`;

const ModalCloseBtn = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 20px;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #ffffff;
  }
`;

const ChartContainer = styled.div`
  flex: 1;
`;

/* ── TradingView Chart ── */
const TradingViewChart: React.FC<{ symbol: string }> = ({ symbol }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [[symbol]],
      chartOnly: false,
      width: '100%',
      height: '100%',
      locale: 'en',
      colorTheme: 'dark',
      autosize: true,
      showVolume: true,
      showMA: false,
      hideDateRanges: false,
      hideMarketStatus: false,
      hideSymbolLogo: false,
      scalePosition: 'right',
      scaleMode: 'Normal',
      fontFamily: 'Inter, sans-serif',
      fontSize: '10',
      noTimeScale: false,
      valuesTracking: '1',
      changeMode: 'price-and-percent',
      chartType: 'area',
      lineWidth: 2,
      lineType: 0,
      dateRanges: ['1d|1', '1w|15', '1m|30', '3m|60', '12m|1D', '60m|1W', 'all|1M'],
    });

    containerRef.current.appendChild(script);
  }, [symbol]);

  return (
    <ChartContainer>
      <div
        className="tradingview-widget-container"
        ref={containerRef}
        style={{ height: '100%', width: '100%' }}
      />
    </ChartContainer>
  );
};

/* ── Component ── */
export const StocksPage: React.FC = () => {
  const [quotes, setQuotes] = useState<StockQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [fxRate, setFxRate] = useState<{ rate: number; change: number; changePercent: number } | null>(null);
  const hasKey = !!process.env.FINNHUB_API_KEY;

  const loadQuotes = async () => {
    setLoading(true);
    const data = await fetchAllQuotes(watchlist);
    setQuotes(data);
    setLastUpdated(new Date().toLocaleTimeString());
    setLoading(false);
  };

  const loadFxRate = async () => {
    const apiKey = process.env.FINNHUB_API_KEY;
    if (!apiKey) return;
    try {
      const res = await fetch(`https://finnhub.io/api/v1/forex/rates?base=USD&token=${apiKey}`);
      if (!res.ok) return;
      const data = await res.json();
      const cadRate = data?.quote?.CAD;
      if (cadRate) {
        setFxRate({ rate: cadRate, change: 0, changePercent: 0 });
      }
    } catch (e) {
      console.error('FX rate error:', e);
    }
  };

  useEffect(() => {
    if (hasKey) {
      loadQuotes();
      loadFxRate();
    } else {
      setLoading(false);
    }
  }, []);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setSelectedSymbol(null);
  }, []);

  return (
    <PageWrapper>
      <Container>
        <TitleBar>
          <Title>Stock Watchlist</Title>
          <Subtitle>My favourite stocks — live prices from Finnhub</Subtitle>
        </TitleBar>

        {!hasKey ? (
          <NoKeyMsg>
            Add your free <a href="https://finnhub.io/" target="_blank" rel="noreferrer">Finnhub</a> API key to <code>.env</code> as <code>FINNHUB_API_KEY</code> to see live prices.
          </NoKeyMsg>
        ) : (
          <>
            {fxRate && (
              <ExchangeRateCard>
                <ExchangeLabel>USD → CAD</ExchangeLabel>
                <ExchangeValue>{fxRate.rate.toFixed(4)}</ExchangeValue>
                <ExchangeChange $positive={fxRate.change >= 0}>
                  {fxRate.change >= 0 ? '+' : ''}{fxRate.change.toFixed(4)} ({fxRate.changePercent.toFixed(2)}%)
                </ExchangeChange>
              </ExchangeRateCard>
            )}
            {lastUpdated && (
              <LastUpdated>Last updated: {lastUpdated}</LastUpdated>
            )}
            <RefreshBtn onClick={loadQuotes} disabled={loading}>
              {loading ? 'Loading...' : '↻ Refresh prices'}
            </RefreshBtn>
            <Grid>
              {loading
                ? watchlist.map((s) => <SkeletonCard key={s.symbol} />)
                : quotes.map((q) => (
                    <Card key={q.symbol} onClick={() => setSelectedSymbol(q.symbol)}>
                      <CardHeader>
                        <div>
                          <SymbolLabel>{q.symbol}</SymbolLabel>
                          <CompanyName>{q.name}</CompanyName>
                        </div>
                        <div>
                          <Price>${q.currentPrice.toFixed(2)}</Price>
                          <Change $positive={q.change >= 0}>
                            {q.change >= 0 ? '+' : ''}
                            {q.change.toFixed(2)} ({q.changePercent.toFixed(2)}%)
                          </Change>
                        </div>
                      </CardHeader>
                      <StatsRow>
                        <Stat>
                          <StatLabel>Open</StatLabel>
                          <StatValue>${q.openPrice.toFixed(2)}</StatValue>
                        </Stat>
                        <Stat>
                          <StatLabel>High</StatLabel>
                          <StatValue>${q.highPrice.toFixed(2)}</StatValue>
                        </Stat>
                        <Stat>
                          <StatLabel>Low</StatLabel>
                          <StatValue>${q.lowPrice.toFixed(2)}</StatValue>
                        </Stat>
                        <Stat>
                          <StatLabel>Prev Close</StatLabel>
                          <StatValue>${q.prevClose.toFixed(2)}</StatValue>
                        </Stat>
                      </StatsRow>
                    </Card>
                  ))}
            </Grid>
          </>
        )}

        {selectedSymbol && (
          <Overlay onClick={handleOverlayClick}>
            <Modal>
              <ModalHeader>
                <ModalTitle>{selectedSymbol} — Chart</ModalTitle>
                <ModalCloseBtn onClick={() => setSelectedSymbol(null)}>✕</ModalCloseBtn>
              </ModalHeader>
              <TradingViewChart symbol={selectedSymbol} />
            </Modal>
          </Overlay>
        )}
      </Container>
    </PageWrapper>
  );
};
