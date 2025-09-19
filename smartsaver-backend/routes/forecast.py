from fastapi import APIRouter
from services.ml_service import predict_savings
from models import Expense, Budget

router = APIRouter()


@router.get("/")
async def get_forecast():
    """
    Calls ml_service.predict_savings() with mock data
    Returns predicted savings per category
    """
    # Mock historical expenses
    historical_expenses = [
        Expense(category="Food", amount=250),
        Expense(category="Food", amount=280),
        Expense(category="Food", amount=220),
        Expense(category="Entertainment", amount=100),
        Expense(category="Entertainment", amount=120),
        Expense(category="Entertainment", amount=80),
        Expense(category="Bills", amount=300),
        Expense(category="Bills", amount=320),
        Expense(category="Bills", amount=280),
        Expense(category="Savings", amount=200),
        Expense(category="Savings", amount=180),
        Expense(category="Savings", amount=220)
    ]
    
    # Mock budgets
    budgets = [
        Budget(category="Food", total_budget=500, spent=250),
        Budget(category="Entertainment", total_budget=200, spent=100),
        Budget(category="Bills", total_budget=350, spent=300),
        Budget(category="Savings", total_budget=400, spent=200)
    ]
    
    # Get predictions
    predictions = predict_savings(historical_expenses, budgets)
    
    return predictions
