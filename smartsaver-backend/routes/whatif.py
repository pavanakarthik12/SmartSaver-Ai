from fastapi import APIRouter
from models import WhatIfRequest

router = APIRouter()


@router.post("/")
async def what_if_analysis(request: WhatIfRequest):
    """
    Recalculates budget with adjustments and returns updated budgets
    """
    # Mock current budgets
    current_budgets = [
        {"category": "Food", "total_budget": 500, "spent": 250},
        {"category": "Entertainment", "total_budget": 200, "spent": 100},
        {"category": "Bills", "total_budget": 350, "spent": 300},
        {"category": "Savings", "total_budget": 400, "spent": 200}
    ]
    
    # Apply adjustments
    updated_budgets = []
    for budget in current_budgets:
        category = budget["category"]
        adjustment = request.adjustments.get(category, 0)
        
        updated_budget = {
            "category": category,
            "total_budget": budget["total_budget"] + adjustment,
            "spent": budget["spent"]
        }
        updated_budgets.append(updated_budget)
    
    return updated_budgets
