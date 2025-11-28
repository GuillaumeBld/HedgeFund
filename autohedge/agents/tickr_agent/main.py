from autohedge.data import OpenBBProvider

class TickrAgent:
    def __init__(self, stocks=None, max_loops=1, workers=10, retry_attempts=1, context_length=16000):
        self.stocks = stocks
        self.agent_name = "Tickr-Agent"
        self.provider = OpenBBProvider()

    def run(self, task: str = None):
        """
        Fetches real market data for the assigned stocks using OpenBBProvider.
        """
        if not self.stocks:
            return "No stocks assigned to TickrAgent."

        results = []
        
        # Handle both list of stocks and single stock string
        stock_list = self.stocks if isinstance(self.stocks, list) else [self.stocks]

        for symbol in stock_list:
            try:
                context = self.provider.get_market_context(symbol)
                
                # Format MarketContext into a readable string for the LLM
                macd_str = ", ".join([f"{k}: {v:.2f}" for k, v in context.macd.items()]) if context.macd else "N/A"
                news_str = "\n- ".join(context.recent_news[:3]) if context.recent_news else "No recent news"
                
                data_str = (
                    f"Stock: {symbol}\n"
                    f"Current Price: ${context.current_price:.2f}\n"
                    f"Change: {context.change_absolute:+.2f} ({context.change_percent*100:+.2f}%)\n"
                    f"Volume: {context.volume}\n"
                    f"Market Cap: ${context.market_cap:,.0f}\n"
                    f"P/E Ratio: {context.pe_ratio:.2f}\n"
                    f"RSI: {context.rsi:.2f}\n"
                    f"MACD: {macd_str}\n"
                    f"Recent News:\n- {news_str}\n"
                )
                results.append(data_str)
            
            except Exception as e:
                results.append(f"Error fetching data for {symbol}: {str(e)}")

        return "\n---\n".join(results)
