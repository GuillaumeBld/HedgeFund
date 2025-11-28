# Integration Plan: Docker cagent into AutoHedge

This document outlines the plan to integrate [docker/cagent](https://github.com/docker/cagent), a multi-agent runtime by Docker Engineering, into the AutoHedge project.

## 1. Overview
`cagent` is a tool for building, running, and orchestrating AI agents. It supports:
- **Multi-agent architecture**: Orchestrating teams of agents.
- **MCP (Model Context Protocol)**: Standardized interface for tools.
- **YAML Configuration**: Declarative definition of agents.
- **Docker Integration**: Pushing/pulling agents as OCI artifacts.

Integrating `cagent` can standardize how our trading agents (`tickr_agent`, etc.) are defined, run, and how they access tools (like market data, execution APIs).

## 2. Installation

First, we need to install the `cagent` CLI.

### MacOS (Homebrew)
```bash
brew install cagent
```

### Manual Binary
Download from [GitHub Releases](https://github.com/docker/cagent/releases) and add to PATH.

## 3. Integration Steps

### Phase 1: Define Existing Agents in YAML
We should translate our current Python-based agent definitions into `cagent` YAML configuration.

**Example Structure (`autohedge_agents.yaml`):**
```yaml
agents:
  root:
    model: openai/gpt-4o # or anthropic/claude-3-5-sonnet
    description: "Master orchestrator for AutoHedge trading strategies."
    instruction: |
      You are the lead trading manager. Your goal is to oversee market analysis and execution.
      Delegate specific analysis tasks to the 'analyst' agent and execution tasks to the 'executor' agent.
    sub_agents: ["analyst", "executor"]

  analyst:
    model: openai/gpt-4o
    description: "Market data analyst."
    instruction: |
      Analyze market trends using provided tools. Look for arbitrage opportunities and trend reversals.
    toolsets:
      - type: mcp
        command: python
        args: ["-m", "autohedge.mcp_server"] # We need to expose our tools via MCP

  executor:
    model: openai/gpt-4o
    description: "Trade executor."
    instruction: |
      Execute trades based on signals. Ensure risk limits are respected.
```

### Phase 2: Expose AutoHedge Tools via MCP
`cagent` relies on MCP for tool access. We need to wrap our existing Python functions (market data fetchers, order execution) into an MCP server.

1.  **Create an MCP Server**: Use the `mcp` Python SDK to create a server that exposes our core functions.
    *   `get_market_data(symbol)`
    *   `execute_order(symbol, side, quantity)`
    *   `get_portfolio_status()`
2.  **Configure `cagent` to use this server**:
    *   Point the `toolsets` configuration in the YAML to our local MCP server script.

### Phase 3: Containerization (Optional but Recommended)
Since `cagent` is built by Docker, we can package our agents and their environment.

1.  **Dockerfile**: Create a Dockerfile that installs `AutoHedge` dependencies and the MCP server.
2.  **Push Agents**: Use `cagent push` to store our agent configurations and environments in a registry.

### Phase 4: Workflow Integration
Replace the current `main.py` or entry point with a `cagent run` command.

```bash
cagent run autohedge_agents.yaml
```

## 4. Immediate To-Dos

- [ ] **Install cagent** locally to test.
- [ ] **Prototype MCP Server**: Create a simple MCP server exposing one `AutoHedge` function (e.g., `get_price`).
- [ ] **Create YAML Config**: Draft a basic `cagent` YAML file for a single agent using the prototype MCP server.
- [ ] **Test Run**: Execute the agent using `cagent run` and verify it can call the tool.
- [ ] **Expand**: Port remaining agents and tools.

## 5. Benefits
- **Standardization**: Clear separation of agent logic (YAML) and tool implementation (MCP).
- **Scalability**: Easier to add new specialized agents.
- **Interoperability**: Can use third-party MCP servers (e.g., for web search, file system access) alongside our custom tools.
