from fastapi import APIRouter
from services.yfinance_service import get_stock_prices

router = APIRouter()


@router.get("/")
async def get_stocks():
    """
    Fetch last 5 days stock prices using yfinance_service.py
    Return JSON: {ticker: prices}
    """
    stock_data = get_stock_prices()
    return stock_data
