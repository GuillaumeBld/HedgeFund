# AutoHedge Frontend

New React-based dashboard for AutoHedge.

## Setup

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Run development server:
    ```bash
    npm run dev
    ```

## Integration

This frontend connects to the FastAPI backend running on `http://localhost:8000`.
Ensure the backend is running:
```bash
# In the root directory
./venv/bin/uvicorn viz_server:app --host 0.0.0.0 --port 8000 --reload
```
