# SmartSaver AI Backend

A complete FastAPI backend for SmartSaver AI with expense tracking, budget management, ML predictions, AI chat, and stock data.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure Environment
Edit `.env` file and add your DeepSeek API key:
```
DEEPSEEK_API_KEY=your_actual_deepseek_api_key_here
```

### 3. Run the Server
```bash
uvicorn main:app --reload
```

The server will start at `http://localhost:8000`

### 4. Test Endpoints
```bash
python test_endpoints.py
```

## 📁 Project Structure

```
smartsaver-backend/
├── main.py                 # FastAPI app with all routers
├── models.py               # Pydantic models
├── requirements.txt        # Python dependencies
├── .env                   # Environment variables
├── test_endpoints.py      # Test script
├── routes/                # API route modules
│   ├── __init__.py
│   ├── expenses.py        # Expense tracking
│   ├── budget.py          # Budget management
│   ├── whatif.py          # What-if analysis
│   ├── forecast.py        # ML predictions
│   ├── chat.py            # AI chat integration
│   └── stocks.py          # Stock data
└── services/              # Business logic services
    ├── __init__.py
    ├── ml_service.py      # Machine learning predictions
    └── yfinance_service.py # Stock data fetching
```

## 🔗 API Endpoints

### Root
- `GET /` - Returns `{"message": "SmartSaver AI Backend Running"}`

### Expenses
- `GET /expenses/` - Returns mock expense data

### Budget
- `GET /budget/` - Returns mock budget data

### What-If Analysis
- `POST /whatif/` - Recalculates budgets with adjustments
  ```json
  {
    "adjustments": {
      "Food": 50,
      "Entertainment": -20
    }
  }
  ```

### Forecast
- `GET /forecast/` - Returns ML-predicted savings per category

### Chat
- `POST /chat/` - AI chat using DeepSeek API
  ```json
  {
    "message": "How can I save money?",
    "user_id": "optional_user_id"
  }
  ```

### Stocks
- `GET /stocks/` - Returns last 5 days of stock prices

## 🤖 Features

### Machine Learning Predictions
- Uses Linear Regression to predict next month's expenses
- Calculates predicted savings: `budget - predicted_expenses`
- Handles categories with insufficient data gracefully

### AI Chat Integration
- Integrates with DeepSeek API for intelligent responses
- Handles API errors gracefully
- Configurable via environment variables

### Stock Data
- Fetches real-time stock prices using yfinance
- Returns last 5 days of closing prices
- Supports multiple tickers (AAPL, GOOGL, MSFT, TSLA, AMZN)

### What-If Analysis
- Dynamic budget recalculation
- Supports positive and negative adjustments
- Returns updated budget scenarios

## 🛠️ Dependencies

- **fastapi** - Web framework
- **uvicorn** - ASGI server
- **pydantic** - Data validation
- **python-dotenv** - Environment variables
- **requests** - HTTP client
- **yfinance** - Stock data
- **scikit-learn** - Machine learning
- **numpy** - Numerical computing
- **pandas** - Data manipulation

## 🧪 Testing

Run the test script to verify all endpoints:
```bash
python test_endpoints.py
```

Or test individual endpoints:
```bash
# Test root endpoint
curl http://localhost:8000/

# Test expenses
curl http://localhost:8000/expenses/

# Test what-if analysis
curl -X POST http://localhost:8000/whatif/ \
  -H "Content-Type: application/json" \
  -d '{"adjustments": {"Food": 50}}'
```

## 📊 Example Responses

### Expenses
```json
[
  {"category": "Food", "amount": 250},
  {"category": "Entertainment", "amount": 100},
  {"category": "Bills", "amount": 300},
  {"category": "Savings", "amount": 200}
]
```

### Forecast
```json
{
  "Food": 250.0,
  "Entertainment": 100.0,
  "Bills": 50.0,
  "Savings": 200.0
}
```

### Stocks
```json
{
  "AAPL": [150.25, 151.30, 149.80, 152.10, 151.75],
  "GOOGL": [2800.50, 2815.20, 2795.80, 2820.10, 2810.25]
}
```

## 🔧 Configuration

### Environment Variables
- `DEEPSEEK_API_KEY` - Required for chat functionality

### Mock Data
All endpoints currently return mock data. Replace with real database integration as needed.

## 🚀 Production Deployment

For production deployment:
1. Set up a proper database (PostgreSQL, MongoDB, etc.)
2. Replace mock data with real database queries
3. Add authentication and authorization
4. Configure CORS for frontend integration
5. Set up proper logging and monitoring
6. Use environment-specific configuration

## 📝 Notes

- All endpoints return JSON responses
- ML predictions use Linear Regression for expense forecasting
- What-If analysis dynamically recalculates budgets
- Chat integration requires valid DeepSeek API key
- Stock data is fetched in real-time from Yahoo Finance
- Backend is modular and easily extensible
