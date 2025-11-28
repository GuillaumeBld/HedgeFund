# AutoHedge

![AutoHedge Banner](assets/banner.png)

> **UNDER CONSTRUCTION**: This project is currently under active development. Features and architectures are subject to change.

**AutoHedge** is an advanced AI-powered hedge fund simulation and automation platform developed by The Swarm Corporation (TGSC). It leverages a multi-agent system to orchestrate complex trading strategies, conduct market analysis, and execute trades with precision.

## Overview

AutoHedge simulates a professional hedge fund environment where specialized AI agents collaborate to manage a portfolio. The system is designed to be autonomous, data-driven, and capable of adapting to real-time market conditions.

## Key Features

-   **Multi-Agent Collaboration**: Orchestrates a team of specialized agents including:
    -   **Director Agent**: Manages the overall strategy, conducts market analysis, and makes final trading decisions.
    -   **Execution Agent**: Handles order generation and risk assessment.
    -   **Tickr Agent**: Provides real-time market data and specific ticker analysis.
-   **Real-Time Market Analysis**: continuously monitors market trends and news to identify opportunities.
-   **Risk Management**: Integrated risk assessment protocols to ensure balanced portfolio growth.
-   **Visualization Dashboard**: A FastAPI-based web interface to visualize agent interactions and trading cycles in real-time.

## Architecture

The core of AutoHedge is built on the `swarms` framework, enabling seamless communication and task delegation between agents.

1.  **Market Data Ingestion**: Real-time data is fetched for tracked stocks (e.g., NVDA, TSLA, MSFT, GOOG).
2.  **Analysis & Thesis**: The Director Agent formulates a trading thesis based on technical and fundamental analysis.
3.  **Order Generation**: The Execution Agent proposes orders based on the thesis and risk parameters.
4.  **Decision Making**: The Director reviews and approves the final execution.

## Installation

Prerequisites: Python 3.10+

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/The-Swarm-Corporation/AutoHedge.git
    cd AutoHedge
    ```

2.  **Install dependencies:**
    Using Poetry:
    ```bash
    poetry install
    ```
    Or using pip:
    ```bash
    pip install -r requirements.txt
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file and add your API keys (e.g., OpenRouter, OpenAI).

## Usage

### Run the Visualization Server

To see the agents in action via a web dashboard:

```bash
python viz_server.py
```

Then open your browser and navigate to `http://localhost:8000`.

### Run a Simulation

You can trigger a simulation directly from the dashboard or by using the API endpoint:

```bash
curl -X POST http://localhost:8000/start
```

## Todo & Roadmap

The following tasks are planned for the development of AutoHedge:

### Agents
- [ ] **Agent Personas**: Implement specialized agent personas (e.g., Warren Buffett, Cathie Wood styles).
- [ ] **Interactions**: Define and refine complex agent interaction patterns.

### Data
- [ ] **Integration**: Integrate robust data sources.
- [ ] **Pipeline**: Build data cleaning and normalization pipelines.

### Strategies
- [ ] **Backtesting**: Develop a "Virtual Exchange" and historical backtesting framework.
- [ ] **Strategy Definition**: Define and implement an initial set of diverse trading strategies.

### Integration
- [ ] **OpenBB**: Integrate OpenBB SDK for comprehensive market data.
- [ ] **Finance Database**: Incorporate JerBouma's FinanceDatabase.
- [ ] **TinyTroupe**: Integrate Microsoft's TinyTroupe for multi-agent simulation.
- [ ] **Solidity**: Explore smart contract integration for DeFi capabilities.
- [ ] **X402**: Integrate Coinbase's X402 protocol.
- [ ] **C-Agent**: Integrate Docker cagent capabilities.

### Research
- [ ] **Quantitative Math**: Integrate deterministic math tools (Z-Score, Cointegration).
- [ ] **Methods**: Research and implement new quantitative analysis methods.

### Fixes & Robustness
- [ ] **Robustness**: Conduct deep robustness analysis and fix identified weaknesses.
- [ ] **Bugs**: Address critical bugs and track technical debt.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
