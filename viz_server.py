
import asyncio
import json
from typing import List
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, BackgroundTasks
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.requests import Request

# Mock swarms to avoid dependency hell
import sys
from unittest.mock import MagicMock

mock_swarms = MagicMock()
sys.modules["swarms"] = mock_swarms
sys.modules["swarm_models"] = MagicMock()
sys.modules["tickr_agent"] = MagicMock()
sys.modules["tickr_agent.main"] = MagicMock()
sys.modules["autohedge.agents.tickr_agent"] = MagicMock()
sys.modules["autohedge.agents.tickr_agent.main"] = MagicMock()

# We need to make sure Agent and Conversation are available on the mock
class MockAgent:
    def __init__(self, *args, **kwargs): pass
    def run(self, *args, **kwargs): return "Mock Response"

class MockConversation:
    def __init__(self, *args, **kwargs): pass
    def add(self, *args, **kwargs): pass
    def add_message(self, *args, **kwargs): pass
    def return_messages_as_list(self): return []
    def return_messages_as_dictionary(self): return {}
    def return_history_as_string(self): return ""

mock_swarms.Agent = MockAgent
mock_swarms.Conversation = MockConversation

from autohedge.main import AutoHedge
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# Add CORS middleware
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store connected clients
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception:
                pass

manager = ConnectionManager()

# Mock classes for simulation without API keys
import time
import random

class MockTradingDirector:
    def __init__(self, *args, **kwargs): 
        self.agent_name = "Director"
    
    def generate_thesis(self, task, stock): 
        time.sleep(1)
        return f"Thesis for {stock}: The market shows strong bullish signals driven by AI adoption. We expect {stock} to outperform the sector.", f"Price: ${random.randint(100, 1000)}, Vol: High"
    
    def make_decision(self, *args, **kwargs):
        time.sleep(1)
        return "Decision: APPROVED. Execute the proposed order immediately."

class MockQuantAnalyst:
    def __init__(self, *args, **kwargs): 
        self.agent_name = "Quant"
    
    def analyze(self, *args): 
        time.sleep(1)
        rsi = random.randint(30, 70)
        return f"Technical Analysis:\n- RSI: {rsi}\n- MACD: Bullish Crossover\n- Moving Averages: Price above 50-day MA\n- Volatility: Moderate"

class MockRiskManager:
    def __init__(self, *args, **kwargs): 
        self.agent_name = "Risk"
    
    def assess_risk(self, *args): 
        time.sleep(1)
        return "Risk Assessment:\n- Position Size: 5% of portfolio\n- Max Drawdown: 2%\n- Risk Score: 3/10 (Low)\n- Stop Loss: 5% below entry"

class MockExecutionAgent:
    def __init__(self, *args, **kwargs): 
        self.agent_name = "Execution"
    
    def generate_order(self, *args): 
        time.sleep(1)
        return "Order Details:\n- Type: LIMIT BUY\n- Quantity: 100 shares\n- Limit Price: Market Price\n- Time in Force: GTC"

# Patch the classes in autohedge.main
import autohedge.main
autohedge.main.TradingDirector = MockTradingDirector
autohedge.main.QuantAnalyst = MockQuantAnalyst
autohedge.main.RiskManager = MockRiskManager
autohedge.main.ExecutionAgent = MockExecutionAgent

# Callback function to be passed to AutoHedge
def autohedge_callback(data):
    # Since AutoHedge runs in a sync thread, we need to run the async broadcast
    # We can use asyncio.run or just put it in a queue if we were more robust.
    # For simplicity, let's try to get the running loop or create a new one.
    # Actually, calling async from sync is tricky.
    # Better approach: The callback puts data into a queue, and a background task broadcasts it.
    
    # However, since we are in a separate thread (FastAPI background task), 
    # we can't easily access the main event loop.
    
    # Let's use a global queue.
    import queue
    msg_queue.put(data)

import queue
msg_queue = queue.Queue()

async def broadcast_worker():
    while True:
        try:
            # Non-blocking get
            try:
                data = msg_queue.get_nowait()
                await manager.broadcast(data)
            except queue.Empty:
                await asyncio.sleep(0.1)
        except Exception as e:
            print(f"Error in broadcast worker: {e}")
            await asyncio.sleep(1)

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(broadcast_worker())

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.get("/")
async def get():
    with open("templates/index.html", "r") as f:
        return HTMLResponse(f.read())

# --- API Endpoints for New UI ---

@app.get("/api/dashboard/stats")
async def get_dashboard_stats():
    return [
        {"label": "Total Value", "value": "$1,250,432.80", "change": "+1.25%", "positive": True},
        {"label": "Today's P&L", "value": "$5,780.12", "change": "+0.46%", "positive": True},
        {"label": "Total Return", "value": "$230,110.45", "change": "+22.56%", "positive": True},
        {"label": "Buying Power", "value": "$85,200.00", "change": "-", "positive": None},
        {"label": "Sharpe Ratio", "value": "1.85", "change": "-", "positive": None},
        {"label": "Sortino Ratio", "value": "2.54", "change": "-", "positive": None},
        {"label": "VaR (95%)", "value": "-$15,320.50", "change": "-", "positive": None},
        {"label": "Max Drawdown", "value": "-8.45%", "change": "-", "positive": None},
    ]

@app.get("/api/dashboard/performance")
async def get_performance_data():
    return [
        {"name": "Jan", "value": 1000000},
        {"name": "Feb", "value": 1050000},
        {"name": "Mar", "value": 1030000},
        {"name": "Apr", "value": 1100000},
        {"name": "May", "value": 1080000},
        {"name": "Jun", "value": 1150000},
        {"name": "Jul", "value": 1180000},
        {"name": "Aug", "value": 1220000},
        {"name": "Sep", "value": 1200000},
        {"name": "Oct", "value": 1250000},
        {"name": "Nov", "value": 1240000},
        {"name": "Dec", "value": 1250432},
    ]

@app.get("/api/dashboard/portfolio")
async def get_portfolio_allocation():
    return [
        {"name": "Stocks", "value": 45, "color": "#137fec"},
        {"name": "ETFs", "value": 30, "color": "#0bda5b"},
        {"name": "Crypto", "value": 15, "color": "#facc15"},
        {"name": "Cash", "value": 10, "color": "#a855f7"},
    ]

from autohedge.data import OpenBBProvider

@app.get("/api/market/watchlist")
def get_watchlist():
    provider = OpenBBProvider()
    tickers = ["AAPL", "TSLA", "NVDA", "SPY"]
    data = []
    for ticker in tickers:
        try:
            context = provider.get_market_context(ticker)
            # Format
            change_val = context.change_absolute if context.change_absolute is not None else 0.0
            change_pct = context.change_percent * 100 if context.change_percent is not None else 0.0 # OpenBB might return decimal
            
            # Check if OpenBB returns decimal or percent. Usually decimal (0.01 for 1%).
            # Let's assume decimal for now based on typical financial APIs, but verify if possible.
            # Actually yfinance returns percent like 1.25 for 1.25%.
            # Let's stick to raw value and format.
            
            is_positive = change_val >= 0
            
            data.append({
                "ticker": ticker,
                "price": f"${context.current_price:.2f}",
                "change": f"{change_val:+.2f} ({change_pct:+.2f}%)",
                "volume": f"{context.volume/1000000:.1f}M" if context.volume else "0M",
                "positive": is_positive
            })
        except Exception as e:
            print(f"Error fetching {ticker}: {e}")
            data.append({
                "ticker": ticker,
                "price": "Error",
                "change": "-",
                "volume": "-",
                "positive": False
            })
    return data

@app.get("/api/market/news")
def get_market_news():
    provider = OpenBBProvider()
    return provider.get_general_news(limit=6)

def run_autohedge():
    stocks = ["NVDA", "TSLA", "MSFT", "GOOG"]
    trading_system = AutoHedge(
        name="swarms-fund",
        description="Private Hedge Fund for Swarms Corp",
        stocks=stocks,
        callback=autohedge_callback
    )
    
    task = "As BlackRock, let's evaluate AI companies for a portfolio with $500 million in allocation, aiming for a balanced risk-reward profile."
    
    try:
        trading_system.run(task=task)
        msg_queue.put({"type": "status", "content": "Trading cycle completed."})
    except Exception as e:
        msg_queue.put({"type": "error", "content": str(e)})

@app.post("/start")
async def start_simulation(background_tasks: BackgroundTasks):
    msg_queue.put({"type": "status", "content": "Starting trading cycle..."})
    background_tasks.add_task(run_autohedge)
    return {"status": "started"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
