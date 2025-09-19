from typing import List, Dict
import numpy as np
from sklearn.linear_model import LinearRegression
from models import Expense, Budget


def predict_savings(historical_expenses: List[Expense], budgets: List[Budget]) -> Dict[str, float]:
    """
    Predict next month's expenses per category using Linear Regression
    and calculate predicted savings: budget - predicted_expenses
    """
    # Group expenses by category
    category_expenses = {}
    for expense in historical_expenses:
        if expense.category not in category_expenses:
            category_expenses[expense.category] = []
        category_expenses[expense.category].append(expense.amount)
    
    # Create budget lookup
    budget_lookup = {budget.category: budget.total_budget for budget in budgets}
    
    predictions = {}
    
    for category, amounts in category_expenses.items():
        if len(amounts) < 2:
            # If not enough data, use average
            predicted_expense = np.mean(amounts) if amounts else 0
        else:
            # Use Linear Regression for prediction
            X = np.array(range(len(amounts))).reshape(-1, 1)
            y = np.array(amounts)
            
            model = LinearRegression()
            model.fit(X, y)
            
            # Predict next month (next data point)
            next_month = len(amounts)
            predicted_expense = model.predict([[next_month]])[0]
        
        # Calculate predicted savings
        budget = budget_lookup.get(category, 0)
        predicted_savings = budget - predicted_expense
        
        predictions[category] = predicted_savings
    
    return predictions
