import yfinance as yf
from typing import Dict, List
from datetime import datetime, timedelta


def get_stock_prices(tickers: List[str] = None) -> Dict[str, List[float]]:
    """
    Fetch last 5 days stock prices using yfinance
    Returns JSON: {ticker: prices}
    """
    if tickers is None:
        tickers = ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN"]
    
    end_date = datetime.now()
    start_date = end_date - timedelta(days=7)  # Get a bit more data to ensure we have 5 days
    
    stock_data = {}
    
    for ticker in tickers:
        try:
            stock = yf.Ticker(ticker)
            hist = stock.history(start=start_date, end=end_date)
            
            if not hist.empty:
                # Get the last 5 days of closing prices
                prices = hist['Close'].tail(5).tolist()
                stock_data[ticker] = [round(price, 2) for price in prices]
            else:
                stock_data[ticker] = []
        except Exception as e:
            print(f"Error fetching data for {ticker}: {e}")
            stock_data[ticker] = []
    
    return stock_data
