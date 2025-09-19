from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_expenses():
    """
    Returns mock expenses JSON
    """
    return [
        {"category": "Food", "amount": 250},
        {"category": "Entertainment", "amount": 100},
        {"category": "Bills", "amount": 300},
        {"category": "Savings", "amount": 200}
    ]
