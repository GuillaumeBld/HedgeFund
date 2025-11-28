# Agent Personas & Specialization Plan

## Overview
To improve the quality and diversity of trading signals, we will move away from generic "Analyst" agents and adopt specialized personas inspired by legendary investors and distinct trading philosophies. This approach mimics a real multi-strategy hedge fund and prevents "groupthink" among LLM agents.

**Inspiration**: [virattt/ai-hedge-fund](https://github.com/virattt/ai-hedge-fund) - A proof-of-concept AI hedge fund with diverse investor personalities.

## 1. The "Legendary" Personas
We will create specific system prompts and configurations for the following agent archetypes:

### A. The Value Investor (Warren Buffett Style)
*   **Focus**: Long-term intrinsic value, moats, consistent earnings, low P/E.
*   **Key Metrics**: ROE, Debt-to-Equity, Free Cash Flow.
*   **Prompt Strategy**: "You are a conservative value investor. You ignore short-term market noise. You only care about the business fundamentals and buying dollars for 50 cents."
*   **Tools**: `openbb.equity.fundamental` (Balance Sheet, Income Statement).

### B. The Growth Investor (Cathie Wood Style)
*   **Focus**: Disruptive innovation, TAM (Total Addressable Market), revenue growth, future potential.
*   **Key Metrics**: Revenue Growth Rate, R&D Spending, Market Penetration.
*   **Prompt Strategy**: "You are an aggressive growth investor. You look for exponential technologies and are willing to tolerate high volatility for 10x returns."
*   **Tools**: `openbb.news`, `openbb.economy` (Sector trends).

### C. The Quant (Jim Simons Style)
*   **Focus**: Mathematical anomalies, price action, volume, mean reversion.
*   **Key Metrics**: Standard Deviation, Z-Scores, RSI, MACD.
*   **Prompt Strategy**: "You are a quantitative trader. You do not care about the company's story. You only care about the numbers, patterns, and statistical probabilities."
*   **Tools**: `openbb.technical`, Custom Math Tools (see `quantitative_math_plan.md`).

### D. The Macro Strategist (Ray Dalio Style)
*   **Focus**: Global economic cycles, interest rates, geopolitical events.
*   **Key Metrics**: CPI, GDP, Fed Funds Rate, Yield Curve.
*   **Prompt Strategy**: "You are a global macro strategist. You analyze the 'Big Machine' of the economy. You determine if we are in a deleveraging or inflationary cycle."
*   **Tools**: `openbb.economy`.

## 2. Implementation Steps

- [ ] **Define System Prompts**: Create a `prompts/` directory with text files for each persona.
- [ ] **Update Agent Initialization**: Modify `AutoHedge` class to accept a list of specific agent types rather than just a count.
- [ ] **Conflict Resolution**: Update the `Director` agent to weigh these diverse opinions. For example, if Value says "Buy" but Macro says "Sell", the Director must decide based on the current risk regime.

## 3. Integration with Swarms
- Subclass `Agent` for each persona to pre-load their specific tools and prompts.
- Example: `class ValueAgent(Agent): ...`
