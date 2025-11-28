# Robustness Analysis of AutoHedge

## 1. Mock Data in TickrAgent

### Problem
The `TickrAgent` in `tickr_agent/main.py` currently returns a hardcoded string:
```python
return f"Mock market data for {self.stocks}: Price is stable, volume is high."
```
This causes downstream agents (Director, Quant, Risk, Execution) to hallucinate analysis based on this fake, static data. The analysis is meaningless because the input data is not real.

### Solution
- **Integrate Real Data Source**: Replace the hardcoded string with a real market data fetcher using OpenBB.
- **Library**: Use `openbb` (OpenBB Platform: https://github.com/OpenBB-finance/OpenBB) for comprehensive financial data.
- **Implementation**:
    - Install `openbb`.
    - Update `TickrAgent.run` to fetch price, volume, and other key metrics for the given stock using `openbb.equity.price.quote`.
    - Format the data into a structured string or JSON for the Director agent.

## 2. Unstructured Outputs

### Problem
Agents are configured to return `str` outputs:
```python
output_type="str"
```
While prompts ask for specific information, there is no technical enforcement of the output format.
- **Risk**: The LLM might return a conversational paragraph instead of a list or JSON.
- **Consequence**: Downstream agents receiving this unstructured text might fail to extract the necessary information, leading to "garbage in, garbage out" or parsing errors if we try to extract specific values later.

### Solution
- **Structured Outputs**: Enforce structured outputs using Pydantic models.
- **Implementation**:
    - Define Pydantic models for each agent's expected output (e.g., `QuantAnalysis`, `RiskAssessment`, `TradeOrder`).
    - Update agent configurations to use these models if the `swarms` library supports it, or strictly enforce JSON output in the system prompt and validate/parse it in the python code.
    - Update `AutoHedge.run` to handle these objects instead of raw strings.

## 3. Linear Dependency & Error Propagation

### Problem
The `AutoHedge.run` method executes a linear chain of dependent agents inside a loop over stocks:
```python
for stock in self.stocks:
    # Director -> Quant -> Risk -> Execution -> Decision
```
- **Fragility**: If any agent fails (throws an exception or returns invalid data) for a specific stock, the entire loop crashes because the `try...except` block wraps the *entire* loop, not just the iteration for one stock.
- **Data Passing**: Data is passed by concatenating strings (e.g., `stock + market_data`, `thesis + analysis`). This is error-prone and hard to debug.

### Solution
- **Fault Tolerance**: Wrap the logic *inside* the loop in a `try...except` block. If one stock fails, log the error and continue to the next stock.
- **Validation**: Validate the output of each agent before passing it to the next. If an agent returns invalid data, stop the chain for that stock early.
- **State Management**: Use a structured context object (e.g., a dictionary or a Pydantic model) to pass data between agents, rather than concatenating strings.

---

# To-Do List

- [ ] **Fix TickrAgent (See `../integration/openbb_integration_plan.md`)**
    - [ ] Add `openbb` to `requirements.txt`.
    - [ ] Modify `tickr_agent/main.py` to fetch real market data using OpenBB SDK.
    - [ ] Ensure `TickrAgent` returns a string representation of this real data.

- [ ] **Implement Structured Outputs**
    - [ ] Define Pydantic models for:
        - `QuantAnalysis` (technical_score, volume_score, etc.)
        - `RiskAssessment` (position_size, max_drawdown, etc.)
        - `ExecutionOrder` (action, quantity, price, etc.)
    - [ ] Update `QuantAnalyst`, `RiskManager`, and `ExecutionAgent` to return JSON strings matching these models.
    - [ ] Add parsing logic in `AutoHedge.run` to validate these outputs.

- [ ] **Improve Robustness**
    - [ ] Refactor `AutoHedge.run` to handle exceptions per stock.
    - [ ] Implement checks to ensure previous agent output is valid before calling the next agent.
    - [ ] (Optional) Implement a retry mechanism for agent calls.

- [ ] **Enhance Agent Architecture (See New Plans)**
    - [ ] **Personas**: Implement specialized agents (Buffett, Wood, etc.) - see `../agents/agent_personas_plan.md`.
    - [ ] **Backtesting**: Build the Virtual Exchange and Backtester - see `../strategies/backtesting_framework_plan.md`.
    - [ ] **Quant Math**: Integrate hard math tools (Z-Score, Cointegration) - see `../research/quantitative_math_plan.md`.

## References & Inspiration
- **Multi-Agent Personas**: [virattt/ai-hedge-fund](https://github.com/virattt/ai-hedge-fund)
- **Quantitative Analysis**: [quant-science/sunday-quant-scientist](https://github.com/quant-science/sunday-quant-scientist)
- **Backtesting Infrastructure**: [freqtrade/freqtrade](https://github.com/freqtrade/freqtrade)
