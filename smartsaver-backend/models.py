from pydantic import BaseModel
from typing import Dict, Optional


class Expense(BaseModel):
    category: str
    amount: float


class Budget(BaseModel):
    category: str
    total_budget: float
    spent: float


class WhatIfRequest(BaseModel):
    adjustments: Dict[str, float]


class ChatRequest(BaseModel):
    message: str
    user_id: Optional[str] = None


class ChatResponse(BaseModel):
    reply: str
