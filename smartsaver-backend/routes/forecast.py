from fastapi import APIRouter
from services.ml_service import predict_savings
from models import Expense, Budget
from routes.expenses import expenses_data
from routes.budget import budgets_data

router = APIRouter()


@router.get("/")
async def get_forecast():
    """
    Calls ml_service.predict_savings() with real data
    Returns predicted savings per category
    """
    # Convert expenses data to Expense objects
    historical_expenses = []
    for expense in expenses_data:
        historical_expenses.append(Expense(category=expense["category"], amount=expense["amount"]))
    
    # Convert budgets data to Budget objects
    budgets = []
    for budget in budgets_data:
        budgets.append(Budget(category=budget["category"], total_budget=budget["total_budget"], spent=budget["spent"]))
    
    # Get predictions
    predictions = predict_savings(historical_expenses, budgets)
    
    return predictions
