# Backtesting & Simulation Framework Plan

## Overview
Currently, AutoHedge runs in a "live" forward-looking mode. To ensure robustness and profitability, we need a rigorous backtesting engine that can replay historical data and a "Dry-Run" simulator for forward testing without capital risk.

**Inspiration**: [freqtrade/freqtrade](https://github.com/freqtrade/freqtrade) - A leading open-source crypto trading bot with robust backtesting and dry-run capabilities.

## 1. The Virtual Exchange (Dry-Run)
A class that mimics a real brokerage API but operates on local state.

### Features
*   **Paper Money**: Start with $100,000 virtual capital.
*   **Order Book**: Accept `buy` and `sell` orders.
*   **Execution**: Fill orders at the current "live" price (or last known price).
*   **Fees**: Simulate commission and slippage (e.g., 0.1% per trade).
*   **Portfolio Tracking**: Real-time calculation of Holdings, Cash, and Total Equity.

### Implementation
- [ ] Create `simulation/virtual_exchange.py`.
- [ ] Implement `execute_order(symbol, side, quantity, price)`.
- [ ] Implement `get_portfolio_state()`.

## 2. Historical Backtester
A system to "time travel" and test how agents would have performed in the past.

### Architecture
*   **Data Loader**: Fetch 1 year of hourly/daily data for a basket of stocks (using OpenBB/yfinance).
*   **Time Loop**: Iterate through the data bar-by-bar.
    *   At time `t`, feed data `t-n` to `t` to the agents.
    *   Agents generate a decision.
    *   Virtual Exchange executes the decision at price `t+1`.
*   **Performance Reporting**: Calculate CAGR, Sharpe Ratio, Max Drawdown.

### Challenges & Solutions
*   **LLM Cost/Latency**: Running a full LLM team on every historical hour is expensive and slow.
    *   *Solution*: Use "lighter" models for backtesting or test on key pivot points only.
    *   *Solution*: Cache agent decisions if re-running the same timeframe.

## 3. Integration Steps
- [ ] **Build Data Cache**: Create a script to download and save historical CSVs.
- [ ] **Refactor Main Loop**: Decouple the "Time" provider so it can be real-time (clock) or simulated (iterator).
- [ ] **Dashboard Update**: Update `viz_server.py` to display backtest results vs. live results.
