from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import expenses, budget, whatif, forecast, chat, stocks

app = FastAPI(title="SmartSaver AI Backend", version="1.0.0")

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:3000", 
        "http://localhost:3000",
        "http://127.0.0.1:5173", 
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include all routers
app.include_router(expenses.router, prefix="/expenses", tags=["expenses"])
app.include_router(budget.router, prefix="/budget", tags=["budget"])
app.include_router(whatif.router, prefix="/whatif", tags=["whatif"])
app.include_router(forecast.router, prefix="/forecast", tags=["forecast"])
app.include_router(chat.router, prefix="/chat", tags=["chat"])
app.include_router(stocks.router, prefix="/stocks", tags=["stocks"])


@app.get("/")
async def root():
    """
    Root endpoint returns JSON: {"message": "SmartSaver AI Backend Running"}
    """
    return {"message": "SmartSaver AI Backend Running"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
