from autohedge.data import OpenBBProvider
from autohedge.agents.tickr_agent.main import TickrAgent
import json

def test_provider():
    print("Initializing OpenBB Provider...")
    provider = OpenBBProvider()
    symbol = "AAPL"
    
    print(f"Fetching data for {symbol}...")
    try:
        context = provider.get_market_context(symbol)
        print("Data fetched successfully:")
        print(context.model_dump_json(indent=2))
    except Exception as e:
        print(f"Error fetching data for {symbol}: {e}")

def test_tickr_agent():
    print("\nTesting TickrAgent...")
    agent = TickrAgent(stocks=["AAPL"])
    result = agent.run()
    print("TickrAgent Result:")
    print(result)

if __name__ == "__main__":
    test_provider()
    test_tickr_agent()
