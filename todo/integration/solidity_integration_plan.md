# Solidity Integration Plan

This plan outlines the steps to integrate Solidity support into the AutoHedge project, leveraging the [Argot Collective's Solidity repository](https://github.com/argotorg/solidity). This will enable AutoHedge to interact with Ethereum-based smart contracts, potentially for DeFi trading strategies or on-chain execution.

## 1. Environment Setup

To work with Solidity, we need the compiler (`solc`) and Python bindings.

- [ ] **Install Solidity Compiler (`solc`)**
    - Can be installed via Homebrew on macOS: `brew install solidity`
    - Or via pip using `solc-select` for version management: `pip install solc-select`
- [ ] **Install Python Dependencies**
    - `web3.py`: For interacting with Ethereum nodes and smart contracts.
    - `py-solc-x`: For compiling Solidity contracts from within Python.
    - `eth-tester`: For local testing.
    - Command: `pip install web3 py-solc-x eth-tester`

## 2. Project Structure

We need a dedicated place for smart contracts and their artifacts.

- [ ] **Create Directories**
    - `contracts/`: Source `.sol` files.
    - `contracts/build/`: Compiled JSON artifacts (ABI, bytecode).
    - `contracts/tests/`: Solidity-specific tests.

## 3. Compilation Pipeline

Create a utility module to handle the compilation of Solidity contracts.

- [ ] **Create `utils/solidity_compiler.py`**
    - Function to read `.sol` files from `contracts/`.
    - Use `solcx.compile_standard` or `compile_source` to compile.
    - Save the output (ABI and Bytecode) to `contracts/build/`.

## 4. Integration with AutoHedge

Integrate smart contract capabilities into the existing agent or trading framework.

- [ ] **Create `agents/defi_agent.py` (or similar)**
    - Initialize `Web3` connection (e.g., to Infura, Alchemy, or local node).
    - Load compiled contract ABI and Bytecode.
    - Implement methods to:
        - Deploy contracts.
        - Call read-only functions (e.g., `getReserves`).
        - Send transactions (e.g., `swap`, `approve`).
- [ ] **Wallet Management**
    - Securely load private keys (from env vars, NEVER hardcoded).
    - Implement transaction signing.

## 5. Testing & Validation

Ensure contracts and interactions work as expected.

- [ ] **Local Blockchain**
    - Use `eth-tester` or run a local node like `Anvil` (Foundry) or `Ganache`.
- [ ] **Unit Tests**
    - Write Python tests to deploy a mock contract and verify interaction logic.

## 6. Advanced Integration (Optional)

- [ ] **Formal Verification**: Explore Argot's tools like `Act` or `Hevm` for verifying critical contract logic.
- [ ] **DeFi Protocols**: Create interfaces for common protocols (Uniswap, Aave) using their standard ABIs.
