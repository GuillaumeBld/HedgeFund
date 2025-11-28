import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from autohedge.agents.tickr_agent.main import TickrAgent

def test_tickr():
    print("Testing TickrAgent with AAPL...")
    agent = TickrAgent(stocks=['AAPL'])
    result = agent.run()
    print("Result:")
    print(result)
    
    if "Current Price" in result and "AAPL" in result:
        print("\nSUCCESS: Real data fetched.")
    else:
        print("\nFAILURE: Could not verify real data.")

if __name__ == "__main__":
    test_tickr()
