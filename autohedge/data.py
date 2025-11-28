from openbb import obb
from autohedge.structures import MarketContext
import pandas as pd
import yfinance as yf
from datetime import datetime, timedelta

class OpenBBProvider:
    def __init__(self):
        """Initialize OpenBB Provider"""
        # Login is handled via environment variables or ~/.openbb_sdk/config
        pass

    def get_market_context(self, symbol: str) -> MarketContext:
        """
        Fetch real-time market data for a symbol and populate MarketContext.
        """
        try:
            # 1. Get Price Data
            try:
                # Try OpenBB first
                quote_df = obb.equity.price.quote(symbol=symbol, provider="yfinance").to_dataframe()
                current_price = float(quote_df['last_price'].iloc[0]) if not quote_df.empty else 0.0
                volume = int(quote_df['volume'].iloc[0]) if not quote_df.empty else 0
                change_percent = float(quote_df['percent_change'].iloc[0]) if 'percent_change' in quote_df else 0.0
                change_absolute = float(quote_df['change'].iloc[0]) if 'change' in quote_df else 0.0
            except Exception as e:
                print(f"OpenBB quote failed for {symbol}, falling back to yfinance direct: {e}")
                # Fallback to direct yfinance
                ticker = yf.Ticker(symbol)
                info = ticker.info
                # fast_info is often faster and more reliable for price
                fast_info = ticker.fast_info
                current_price = fast_info.last_price
                volume = fast_info.last_volume
                prev_close = fast_info.previous_close
                change_absolute = current_price - prev_close
                change_percent = (change_absolute / prev_close) if prev_close else 0.0
                
                # Mock dataframe for subsequent steps if needed, or just skip
                quote_df = pd.DataFrame() # Empty placeholder

            # 2. Get Historical Data for Technicals
            try:
                hist_df = obb.equity.price.historical(symbol=symbol, provider="yfinance").to_dataframe()
            except Exception:
                # Fallback
                ticker = yf.Ticker(symbol)
                hist_df = ticker.history(period="1mo")
                # Rename columns to match OpenBB/standard expectation if needed
                hist_df.columns = [c.lower() for c in hist_df.columns]

            # Calculate RSI
            try:
                rsi_df = obb.technical.rsi(data=hist_df['close'], length=14).to_dataframe()
                rsi = float(rsi_df['rsi'].iloc[-1]) if not rsi_df.empty else 50.0
            except Exception:
                # Simple RSI calculation fallback
                delta = hist_df['close'].diff()
                gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
                loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
                rs = gain / loss
                rsi = 100 - (100 / (1 + rs)).iloc[-1]
                if pd.isna(rsi): rsi = 50.0

            # Calculate MACD
            try:
                macd_df = obb.technical.macd(data=hist_df['close']).to_dataframe()
                if not macd_df.empty:
                    macd_val = float(macd_df['macd'].iloc[-1])
                    signal_val = float(macd_df['signal'].iloc[-1])
                    hist_val = float(macd_df['hist'].iloc[-1])
                    macd_dict = {"macd": macd_val, "signal": signal_val, "hist": hist_val}
                else:
                    macd_dict = {}
            except Exception:
                # Simple MACD fallback
                exp1 = hist_df['close'].ewm(span=12, adjust=False).mean()
                exp2 = hist_df['close'].ewm(span=26, adjust=False).mean()
                macd = exp1 - exp2
                signal = macd.ewm(span=9, adjust=False).mean()
                hist = macd - signal
                macd_dict = {
                    "macd": float(macd.iloc[-1]), 
                    "signal": float(signal.iloc[-1]), 
                    "hist": float(hist.iloc[-1])
                }

            # 3. Get Fundamental Data
            pe_ratio = 0.0
            market_cap = 0.0
            try:
                # Try OpenBB first
                ratios = obb.equity.fundamental.ratios(symbol=symbol, provider="yfinance").to_dataframe()
                pe_ratio = float(ratios['pe_ratio'].iloc[0]) if 'pe_ratio' in ratios else 0.0
                market_cap = float(ratios['market_cap'].iloc[0]) if 'market_cap' in ratios else 0.0
            except Exception:
                # Fallback to yfinance
                try:
                    ticker = yf.Ticker(symbol)
                    info = ticker.info
                    pe_ratio = info.get('trailingPE', 0.0)
                    market_cap = info.get('marketCap', 0.0)
                except Exception:
                    pass

            # 4. Get News/Sentiment
            news_items = []
            try:
                # Try OpenBB first
                news_df = obb.news.company(symbol=symbol, provider="yfinance", limit=3).to_dataframe()
                for _, row in news_df.iterrows():
                    news_items.append(f"{row['title']} ({row['publisher']})")
            except Exception:
                # Fallback to yfinance
                try:
                    ticker = yf.Ticker(symbol)
                    news = ticker.news
                    for item in news[:3]:
                        # Handle different yfinance news structures
                        title = item.get('title')
                        publisher = item.get('publisher')
                        
                        # Check for nested content structure (common in newer yfinance versions)
                        if not title and 'content' in item:
                            content = item['content']
                            title = content.get('title')
                            if 'provider' in content:
                                publisher = content['provider'].get('displayName')
                        
                        if title:
                            pub_str = f" ({publisher})" if publisher else ""
                            news_items.append(f"{title}{pub_str}")
                except Exception:
                    pass
            
            if not news_items:
                news_items = ["No recent news found."]

            return MarketContext(
                symbol=symbol,
                current_price=current_price,
                change_percent=change_percent,
                change_absolute=change_absolute,
                volume=volume,
                rsi=rsi,
                macd=macd_dict,
                pe_ratio=pe_ratio,
                market_cap=market_cap,
                recent_news=news_items,
                sentiment_score=0.0 # Placeholder
            )

        except Exception as e:
            print(f"Error fetching data for {symbol}: {e}")
            import traceback
            traceback.print_exc()
            # Return empty/default context on error
            return MarketContext(
                symbol=symbol,
                current_price=0.0,
                volume=0,
                rsi=50.0,
                macd={},
                pe_ratio=0.0,
                market_cap=0.0,
                recent_news=[f"Error fetching data: {str(e)}"],
                sentiment_score=0.0
            )

    def get_general_news(self, limit: int = 5) -> list:
        """Fetch general market news."""
        news_items = []
        try:
            # Try OpenBB World News
            # Note: provider might need to be specified depending on installed extensions.
            # 'benzinga' or 'tiingo' or 'yfinance' (if supported for world)
            # obb.news.world(provider="yfinance") might not exist, usually it's specific providers.
            # Let's try fetching news for a major index like SPY as a proxy for "general" if world fails
            # or use obb.news.world if available.
            
            # For now, let's use SPY and QQQ news as "general" market news via yfinance fallback
            # since we know that works reliably.
            tickers = ["SPY", "QQQ", "NVDA"]
            for ticker_sym in tickers:
                try:
                    ticker = yf.Ticker(ticker_sym)
                    news = ticker.news
                    for item in news[:2]:
                        title = item.get('title')
                        publisher = item.get('publisher')
                        # Handle nested content
                        if not title and 'content' in item:
                            content = item['content']
                            title = content.get('title')
                            if 'provider' in content:
                                publisher = content['provider'].get('displayName')
                        
                        if title:
                            # Simple deduplication check
                            if not any(n['title'] == title for n in news_items):
                                news_items.append({
                                    "title": title,
                                    "source": publisher if publisher else "Unknown",
                                    "time": "Today" # yfinance doesn't always give easy relative time, simplified
                                })
                except:
                    continue
                if len(news_items) >= limit:
                    break
        except Exception as e:
            print(f"Error fetching general news: {e}")
            news_items.append({"title": "Failed to load news", "source": "System", "time": "Now"})
        
        return news_items[:limit]
