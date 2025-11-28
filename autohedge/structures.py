from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from enum import Enum

class ActionType(str, Enum):
    BUY = "BUY"
    SELL = "SELL"
    HOLD = "HOLD"

class MarketContext(BaseModel):
    """
    Standardized data object containing all necessary market information for a specific ticker.
    """
    symbol: str
    current_price: float
    change_percent: Optional[float] = None
    change_absolute: Optional[float] = None
    volume: Optional[float] = None
    
    # Technical Indicators
    rsi: Optional[float] = None
    macd: Optional[Dict[str, float]] = None
    
    # Fundamental Data
    pe_ratio: Optional[float] = None
    market_cap: Optional[float] = None
    
    # News/Sentiment
    recent_news: List[str] = Field(default_factory=list)
    sentiment_score: Optional[float] = Field(None, description="-1.0 to 1.0")

class StrategyMemo(BaseModel):
    """
    The output from a specialized agent (Value, Growth, Quant, Macro).
    """
    agent_name: str
    action: ActionType
    conviction: int = Field(..., ge=0, le=10, description="Confidence level 0-10")
    reasoning: str
    target_price: Optional[float] = None
    stop_loss: Optional[float] = None

class RiskReport(BaseModel):
    """
    Assessment from the Risk Manager.
    """
    approved: bool
    max_position_size: float = Field(..., description="Maximum allowed investment in USD")
    risk_score: int = Field(..., ge=0, le=10, description="Risk level 0-10")
    notes: str

class TradeInstruction(BaseModel):
    """
    Final executable instruction from the Director.
    """
    symbol: str
    action: ActionType
    quantity: int
    limit_price: Optional[float] = None
    order_type: str = "MARKET" # MARKET, LIMIT
    reasoning: str
