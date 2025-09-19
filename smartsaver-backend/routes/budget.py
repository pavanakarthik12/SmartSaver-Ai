from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_budgets():
    """
    Returns mock budgets JSON
    """
    return [
        {"category": "Food", "total_budget": 500, "spent": 250},
        {"category": "Entertainment", "total_budget": 200, "spent": 100},
        {"category": "Bills", "total_budget": 350, "spent": 300},
        {"category": "Savings", "total_budget": 400, "spent": 200}
    ]
