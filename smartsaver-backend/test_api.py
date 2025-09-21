import requests
import json

def test_api():
    base_url = "http://localhost:8000"
    
    try:
        # Test root endpoint
        response = requests.get(f"{base_url}/")
        print(f"Root endpoint: {response.status_code} - {response.json()}")
        
        # Test expenses endpoint
        response = requests.get(f"{base_url}/expenses/")
        print(f"Expenses endpoint: {response.status_code} - {response.json()}")
        
        # Test budgets endpoint
        response = requests.get(f"{base_url}/budget/")
        print(f"Budgets endpoint: {response.status_code} - {response.json()}")
        
        # Test forecast endpoint
        response = requests.get(f"{base_url}/forecast/")
        print(f"Forecast endpoint: {response.status_code} - {response.json()}")
        
        # Test adding an expense
        expense_data = {"category": "Test", "amount": 50.0}
        response = requests.post(f"{base_url}/expenses/", json=expense_data)
        print(f"Add expense: {response.status_code} - {response.json()}")
        
        # Test what-if analysis
        whatif_data = {"adjustments": {"Food": 100.0, "Entertainment": -50.0}}
        response = requests.post(f"{base_url}/whatif/", json=whatif_data)
        print(f"What-if analysis: {response.status_code} - {response.json()}")
        
    except Exception as e:
        print(f"Error testing API: {e}")

if __name__ == "__main__":
    test_api()
