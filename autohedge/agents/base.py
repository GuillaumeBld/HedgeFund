from typing import List
from autohedge.structures import MarketContext, StrategyMemo, RiskReport, TradeInstruction, ActionType

class BaseAnalyst:
    def __init__(self, name: str):
        self.name = name

    async def analyze(self, context: MarketContext) -> StrategyMemo:
        raise NotImplementedError

class BaseRiskManager:
    async def assess(self, context: MarketContext, memos: List[StrategyMemo]) -> RiskReport:
        raise NotImplementedError

class BaseDirector:
    async def decide(self, context: MarketContext, memos: List[StrategyMemo], risk_report: RiskReport) -> TradeInstruction:
        raise NotImplementedError
