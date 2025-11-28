# FinanceDatabase Integration Plan

## Overview
**Repository:** [JerBouma/FinanceDatabase](https://github.com/JerBouma/FinanceDatabase)

Integrate `FinanceDatabase` to provide comprehensive symbol discovery, categorization, and metadata for the AutoHedge platform. This will enable agents and users to filter assets by sector, industry, country, and market cap.

## 1. Dependencies
- [ ] Add `financedatabase` to `requirements.txt`.
- [ ] Install the package: `pip install financedatabase`.

## 2. Core Integration (Backend)
- [ ] Create a wrapper/utility module `autohedge/data/finance_db.py` to interface with the library.
- [ ] Implement functions to:
    - Fetch all symbols for a given asset class (Equities, ETFs, Crypto, etc.).
    - Filter symbols by Sector, Industry, Country, Currency.
    - Search for symbols by name or description.
    - Retrieve metadata for a specific list of symbols.

## 3. Agent Integration
- [ ] **Tickr Agent**: Enhance the `tickr_agent` to use `FinanceDatabase` for validating symbols and discovering related assets.
    - Example: "Find all Tech stocks in the US" -> uses `FinanceDatabase` to get the list.
- [ ] **Universe Selection**: Create a "Universe Generator" tool for agents to define a trading universe based on fundamental criteria (Sector, Industry).

## 4. API & Frontend
- [ ] **API Endpoint**: Add endpoints in `viz_server.py` (or `api/`) to expose search and filter capabilities.
    - `GET /api/symbols/search?query=...`
    - `GET /api/symbols/filter?sector=...&industry=...&country=...`
    - `GET /api/sectors` (list all available sectors)
- [ ] **UI Component**: Add a "Symbol Selector" or "Market Scanner" in the frontend.
    - Dropdowns for Sector/Industry.
    - Search bar for symbol/name.
    - Display results in a table with metadata.

## 5. Example Usage Script
- [ ] Create `examples/finance_db_demo.py` to demonstrate how to query the database and feed it into the AutoHedge pipeline.

## 6. Synergies
- [ ] **OpenBB**: Use `FinanceDatabase` for symbol discovery and then `OpenBB` for retrieving price/fundamental data for those symbols.
- [ ] **FinanceToolkit**: Consider integrating `FinanceToolkit` if deeper fundamental analysis is needed on these symbols.
