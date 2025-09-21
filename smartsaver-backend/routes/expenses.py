from fastapi import APIRouter
from models import Expense

router = APIRouter()

# In-memory storage for expenses (in production, this would be a database)
expenses_data = [
    {"category": "Food", "amount": 250},
    {"category": "Entertainment", "amount": 100},
    {"category": "Bills", "amount": 300},
    {"category": "Savings", "amount": 200}
]

@router.get("/")
async def get_expenses():
    """
    Returns current expenses
    """
    return expenses_data

@router.post("/")
async def add_expense(expense: Expense):
    """
    Adds a new expense
    """
    expenses_data.append({"category": expense.category, "amount": expense.amount})
    return {"message": "Expense added successfully", "expense": expense}
