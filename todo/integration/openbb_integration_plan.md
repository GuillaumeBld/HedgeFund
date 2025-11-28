# OpenBB Integration Plan

This document outlines the strategy for integrating the OpenBB Platform (https://github.com/OpenBB-finance/OpenBB) into AutoHedge to replace mock data with real-world financial intelligence.

## Integration Roadmap

### Phase 1: The Data Backbone (Critical)
**Objective**: Replace random numbers with real-time market data.
- [ ] **Install OpenBB**: Add `openbb` to `requirements.txt`.
- [ ] **Refactor TickrAgent**:
    - Replace `TickrAgent` mock logic with `openbb.equity.price.historical(symbol)` or `openbb.equity.price.quote(symbol)`.
    - Ensure it returns a structured summary of the current price, volume, and daily change.

### Phase 2: The Quant Analyst Upgrade (High Impact)
**Objective**: Enable real technical analysis.
- [ ] **Update QuantAnalyst**:
    - Integrate `openbb.technical.rsi(data)` for Relative Strength Index.
    - Integrate `openbb.technical.macd(data)` for trend following.
    - Integrate `openbb.technical.bbands(data)` for volatility analysis.
    - Agent should output a technical score based on these real metrics.

### Phase 3: The Fundamentalist Upgrade (High Impact)
**Objective**: Enable value investing strategies.
- [ ] **Update TradingDirector**:
    - Give the Director access to `openbb.equity.fundamental.ratios` (P/E, P/B).
    - Fetch income and balance sheet data using `openbb.equity.fundamental.income` and `openbb.equity.fundamental.balance`.
    - Allow Director to filter stocks based on fundamental health.

### Phase 4: News & Sentiment (Strategic)
**Objective**: React to market narratives.
- [ ] **Integrate News Feed**:
    - Use `openbb.news.company(symbol)` to fetch recent headlines.
    - Use `openbb.news.world` for global context.
    - Feed this text into the Director's context window for sentiment analysis.

### Phase 5: Risk Management (Advanced)
**Objective**: Mathematical risk assessment.
- [ ] **Update RiskManager**:
    - Use `openbb.portfolio` tools to calculate VaR (Value at Risk).
    - Calculate Sharpe Ratio and Maximum Drawdown based on historical data.
    - Replace "gut check" risk scores with calculated metrics.

### Phase 6: Macro Economics (Contextual)
**Objective**: Market awareness.
- [ ] **Create Economist Agent**:
    - Fetch Fed Funds Rate, CPI, and GDP using `openbb.economy`.
    - Provide a "Market Regime" report (e.g., "High Inflation / Low Growth") to the Trading Director.
