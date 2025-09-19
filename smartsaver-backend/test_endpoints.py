#!/usr/bin/env python3
"""
Test script for SmartSaver AI Backend
Run this after starting the server with: uvicorn main:app --reload
"""

import requests
import json

BASE_URL = "http://localhost:8000"

def test_endpoint(endpoint, method="GET", data=None):
    """Test an endpoint and print the result"""
    url = f"{BASE_URL}{endpoint}"
    print(f"\n{'='*50}")
    print(f"Testing {method} {endpoint}")
    print(f"{'='*50}")
    
    try:
        if method == "GET":
            response = requests.get(url)
        elif method == "POST":
            response = requests.post(url, json=data)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
    except Exception as e:
        print(f"Error: {e}")

def main():
    print("SmartSaver AI Backend - Endpoint Tests")
    print("Make sure the server is running: uvicorn main:app --reload")
    
    # Test all endpoints
    test_endpoint("/")
    test_endpoint("/expenses/")
    test_endpoint("/budget/")
    test_endpoint("/forecast/")
    test_endpoint("/stocks/")
    
    # Test POST endpoints
    test_endpoint("/whatif/", "POST", {"adjustments": {"Food": 50, "Entertainment": -20}})
    test_endpoint("/chat/", "POST", {"message": "Hello, how can I save money?"})

if __name__ == "__main__":
    main()
