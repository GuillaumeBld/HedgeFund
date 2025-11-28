import random
from typing import List
from autohedge.structures import MarketContext, StrategyMemo, RiskReport, TradeInstruction, ActionType
from autohedge.agents.base import BaseAnalyst, BaseRiskManager, BaseDirector

class MockAnalyst(BaseAnalyst):
    async def analyze(self, context: MarketContext) -> StrategyMemo:
        # Simulate diverse opinions
        actions = [ActionType.BUY, ActionType.SELL, ActionType.HOLD]
        action = random.choice(actions)
        conviction = random.randint(1, 10)
        
        return StrategyMemo(
            agent_name=self.name,
            action=action,
            conviction=conviction,
            reasoning=f"Mock reasoning for {context.symbol} based on random logic. Price is {context.current_price}.",
            target_price=context.current_price * 1.1 if action == ActionType.BUY else context.current_price * 0.9,
            stop_loss=context.current_price * 0.95 if action == ActionType.BUY else context.current_price * 1.05
        )

class MockRiskManager(BaseRiskManager):
    async def assess(self, context: MarketContext, memos: List[StrategyMemo]) -> RiskReport:
        # Simple mock risk logic
        return RiskReport(
            approved=True,
            max_position_size=10000.0,
            risk_score=3,
            notes="Risk is within acceptable limits."
        )

class MockDirector(BaseDirector):
    async def decide(self, context: MarketContext, memos: List[StrategyMemo], risk_report: RiskReport) -> TradeInstruction:
        # Simple majority vote logic for mock
        buy_votes = sum(1 for m in memos if m.action == ActionType.BUY)
        sell_votes = sum(1 for m in memos if m.action == ActionType.SELL)
        
        if buy_votes > sell_votes:
            action = ActionType.BUY
        elif sell_votes > buy_votes:
            action = ActionType.SELL
        else:
            action = ActionType.HOLD
            
        return TradeInstruction(
            symbol=context.symbol,
            action=action,
            quantity=10,
            limit_price=context.current_price,
            reasoning=f"Director decided {action} based on {buy_votes} BUYs and {sell_votes} SELLs."
        )
