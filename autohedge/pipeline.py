from typing import List
from autohedge.structures import MarketContext, StrategyMemo, RiskReport, TradeInstruction, ActionType

class DecisionPipeline:
    def __init__(self, agents: List[any], risk_manager: any, director: any):
        self.agents = agents
        self.risk_manager = risk_manager
        self.director = director

    async def run(self, context: MarketContext) -> TradeInstruction:
        """
        Executes the full investment committee process for a single ticker.
        """
        print(f"\n--- Starting Investment Committee for {context.symbol} ---")
        
        # 1. Gather Memos from all analysts
        memos: List[StrategyMemo] = []
        for agent in self.agents:
            # In a real system, these would run in parallel (asyncio.gather)
            memo = await agent.analyze(context)
            memos.append(memo)
            print(f"[{memo.agent_name}] {memo.action.value} (Conviction: {memo.conviction}/10): {memo.reasoning[:50]}...")

        # 2. Risk Assessment
        risk_report = await self.risk_manager.assess(context, memos)
        print(f"[Risk Manager] Approved: {risk_report.approved}, Max Size: ${risk_report.max_position_size}")

        # 3. Final Decision
        instruction = await self.director.decide(context, memos, risk_report)
        print(f"[Director] Final Decision: {instruction.action.value} {instruction.quantity} {instruction.symbol}")
        
        return instruction
