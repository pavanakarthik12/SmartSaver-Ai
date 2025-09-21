from fastapi import APIRouter
from models import Budget

router = APIRouter()

# In-memory storage for budgets (in production, this would be a database)
budgets_data = [
    {"category": "Food", "total_budget": 500, "spent": 250},
    {"category": "Entertainment", "total_budget": 200, "spent": 100},
    {"category": "Bills", "total_budget": 350, "spent": 300},
    {"category": "Savings", "total_budget": 400, "spent": 200}
]

@router.get("/")
async def get_budgets():
    """
    Returns current budgets
    """
    return budgets_data

@router.put("/{category}")
async def update_budget(category: str, budget: Budget):
    """
    Updates a budget for a specific category
    """
    for i, b in enumerate(budgets_data):
        if b["category"] == category:
            budgets_data[i] = {"category": budget.category, "total_budget": budget.total_budget, "spent": budget.spent}
            return {"message": "Budget updated successfully", "budget": budget}
    return {"error": "Budget not found"}
