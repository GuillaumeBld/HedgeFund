# Coinbase x402 Integration Plan

**Repository:** [https://github.com/coinbase/x402](https://github.com/coinbase/x402)

## Overview
The x402 protocol is an open standard for internet-native payments, leveraging the HTTP 402 "Payment Required" status code. It allows for instant, low-friction micropayments, making it ideal for monetizing API access and AI agent services.

## Integration Goals
Integrate x402 into the AutoHedge `viz_server.py` (FastAPI) to enable pay-per-use monetization for:
-   Triggering specific trading agents.
-   Accessing premium analysis reports.
-   Running full backtesting simulations.

## Implementation Steps

### 1. Dependencies
Install the necessary Python packages for the middleware and Coinbase Developer Platform integration.
```bash
pip install x402 cdp-sdk
```
*Note: Check for specific FastAPI middleware packages like `fast_x402` if available or implement the middleware using the core `x402` library.*

### 2. Server-Side Configuration (`viz_server.py`)
-   **Import Middleware**: Import the x402 middleware for FastAPI.
-   **Configure Middleware**: Initialize the middleware with necessary configuration (e.g., wallet setup, pricing rules).
-   **Protect Endpoints**: Decorate specific endpoints (e.g., `/start`, `/analysis`) to require payment.

```python
# Conceptual Example
from fastapi import FastAPI
from x402.fastapi import X402Middleware

app = FastAPI()

# Add middleware with configuration
app.add_middleware(X402Middleware, ...)

@app.post("/start_premium_simulation")
# This endpoint would now return 402 if payment headers are missing
async def start_premium_simulation():
    ...
```

### 3. Pricing Strategy
Define the cost for different resources:
-   **Basic Analysis**: Free or low cost (e.g., $0.01 USDC).
-   **Full Trading Cycle**: Higher cost (e.g., $0.10 - $1.00 USDC).
-   **Premium Data Access**: Subscription or per-request fee.

### 4. Client-Side Handling (Frontend)
-   **Detect 402**: Update the frontend API client to intercept `402 Payment Required` responses.
-   **Payment Flow**:
    -   Extract payment details from the 402 response.
    -   Prompt the user to sign the payment (using a connected wallet like Coinbase Wallet or MetaMask).
    -   Resend the request with the `X-Payment` header containing the proof of payment.

### 5. Testing
-   **Testnet**: Initially deploy and test on a testnet (e.g., Base Sepolia) to avoid real funds.
-   **Verification**: Ensure the server correctly verifies the payment signature before executing the protected logic.

## Resources
-   **GitHub Repo**: [https://github.com/coinbase/x402](https://github.com/coinbase/x402)
-   **Documentation**: Check the repo `README.md` and any linked docs for specific SDK usage.
