# Quantitative "Hard Science" Plan

## Overview
LLMs are excellent at reasoning and qualitative analysis but poor at precise mathematical calculations. To build a robust hedge fund, we need to integrate deterministic quantitative methods that provide "ground truth" to the LLM agents.

**Inspiration**: [quant-science/sunday-quant-scientist](https://github.com/quant-science/sunday-quant-scientist) - A resource for quantitative trading and algorithmic analysis.

## 1. The Quant Math Toolkit
We will create a library of Python functions that perform statistical analysis on price data. These tools will be exposed to the `QuantAgent` (and potentially the `Director`).

### Key Metrics to Implement
*   **Volatility**: Standard Deviation, ATR (Average True Range).
*   **Trend**: Linear Regression Slope, ADX (Average Directional Index).
*   **Mean Reversion**: Z-Score (distance from moving average), Bollinger Band %B.
*   **Correlation**: Pearson correlation coefficient between assets (for hedging).
*   **Cointegration**: Augmented Dickey-Fuller test (for pairs trading).

## 2. The "Math Agent" (Non-LLM)
While we can have an LLM *interpret* the data, the calculation should be done by code.

*   **Role**: A background worker that constantly updates a `MarketState` object with fresh math metrics.
*   **Output**: A JSON object fed to the Director.
    ```json
    {
      "NVDA": {
        "z_score_20d": 2.5,  // Statistically overbought
        "rsi_14": 82,        // Overbought
        "trend_slope": 0.05  // Strong Up
      }
    }
    ```

## 3. Jupyter Research Layer
To validate these metrics before deploying them, we will add a research environment.

*   **Directory**: `research/notebooks/`
*   **Tasks**:
    - [ ] Plot Z-Scores vs. Price to find optimal entry/exit thresholds.
    - [ ] Analyze correlation matrices to find best hedging pairs (e.g., Long NVDA / Short INTC).

## 4. Implementation Steps
- [ ] **Install Libraries**: Ensure `numpy`, `pandas`, `scipy`, `statsmodels` are in `requirements.txt`.
- [ ] **Create Tool Library**: `autohedge/math_tools.py`.
- [ ] **Integrate with OpenBB**: Use OpenBB's dataframes as input for these math functions.
