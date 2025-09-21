from fastapi import APIRouter
from models import WhatIfRequest
from routes.budget import budgets_data

router = APIRouter()


@router.post("/")
async def what_if_analysis(request: WhatIfRequest):
    """
    Recalculates budget with adjustments and returns updated budgets
    """
    # Use current budgets data
    current_budgets = budgets_data.copy()
    
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
