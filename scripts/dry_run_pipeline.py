import sys
from unittest.mock import MagicMock

# Mock swarms to avoid dependency hell
sys.modules["swarms"] = MagicMock()
sys.modules["swarm_models"] = MagicMock()

import asyncio
from autohedge.structures import MarketContext
from autohedge.pipeline import DecisionPipeline
from autohedge.agents.mock import MockAnalyst, MockRiskManager, MockDirector

async def main():
    # 1. Setup Agents
    agents = [
        MockAnalyst("Value Agent (Buffett)"),
        MockAnalyst("Growth Agent (Wood)"),
        MockAnalyst("Quant Agent (Simons)"),
        MockAnalyst("Macro Agent (Dalio)")
    ]
    risk_manager = MockRiskManager()
    director = MockDirector()

    # 2. Setup Pipeline
    pipeline = DecisionPipeline(agents, risk_manager, director)

    # 3. Create Mock Market Context
    context = MarketContext(
        symbol="NVDA",
        current_price=135.50,
        volume=5000000,
        rsi=65.0,
        pe_ratio=45.0,
        recent_news=["NVDA announces new AI chip", "Market rally continues"]
    )

    # 4. Run Pipeline
    instruction = await pipeline.run(context)
    
    print("\n--- Result ---")
    print(instruction.model_dump_json(indent=2))

if __name__ == "__main__":
    asyncio.run(main())
