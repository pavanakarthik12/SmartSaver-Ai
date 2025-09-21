import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Expense {
  category: string;
  amount: number;
}

export interface Budget {
  category: string;
  total_budget: number;
  spent: number;
}

export interface WhatIfRequest {
  adjustments: Record<string, number>;
}

export interface ChatRequest {
  message: string;
  user_id?: string;
}

export interface ChatResponse {
  reply: string;
}

export interface StockData {
  [ticker: string]: number[];
}

export const apiService = {
  // Get expenses
  getExpenses: async (): Promise<Expense[]> => {
    try {
      const response = await api.get('/expenses/');
      return response.data;
    } catch (error) {
      console.error('Error fetching expenses:', error);
      // Return mock data if API fails
      return [
        { category: "Food", amount: 250 },
        { category: "Entertainment", amount: 100 },
        { category: "Bills", amount: 300 },
        { category: "Savings", amount: 200 }
      ];
    }
  },

  // Add expense
  addExpense: async (expense: Expense): Promise<void> => {
    try {
      await api.post('/expenses/', expense);
    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
  },

  // Get budgets
  getBudgets: async (): Promise<Budget[]> => {
    try {
      const response = await api.get('/budget/');
      return response.data;
    } catch (error) {
      console.error('Error fetching budgets:', error);
      // Return mock data if API fails
      return [
        { category: "Food", total_budget: 500, spent: 250 },
        { category: "Entertainment", total_budget: 200, spent: 100 },
        { category: "Bills", total_budget: 350, spent: 300 },
        { category: "Savings", total_budget: 400, spent: 200 }
      ];
    }
  },

  // Update budget
  updateBudget: async (category: string, budget: Budget): Promise<void> => {
    try {
      await api.put(`/budget/${category}`, budget);
    } catch (error) {
      console.error('Error updating budget:', error);
      throw error;
    }
  },

  // Get forecast predictions
  getForecast: async (): Promise<Record<string, number>> => {
    try {
      const response = await api.get('/forecast/');
      return response.data;
    } catch (error) {
      console.error('Error fetching forecast:', error);
      // Return mock data if API fails
      return {
        "Food": 250.0,
        "Entertainment": 100.0,
        "Bills": 50.0,
        "Savings": 200.0
      };
    }
  },

  // Run what-if analysis
  runWhatIf: async (adjustments: Record<string, number>): Promise<Budget[]> => {
    try {
      const response = await api.post('/whatif/', { adjustments });
      return response.data;
    } catch (error) {
      console.error('Error running what-if analysis:', error);
      // Return mock data if API fails
      const mockBudgets = [
        { category: "Food", total_budget: 500, spent: 250 },
        { category: "Entertainment", total_budget: 200, spent: 100 },
        { category: "Bills", total_budget: 350, spent: 300 },
        { category: "Savings", total_budget: 400, spent: 200 }
      ];
      
      return mockBudgets.map(budget => ({
        ...budget,
        total_budget: budget.total_budget + (adjustments[budget.category] || 0)
      }));
    }
  },

  // Chat with AI
  chat: async (message: string, userId?: string): Promise<string> => {
    try {
      const response = await api.post('/chat/', { message, user_id: userId });
      return response.data.reply;
    } catch (error) {
      console.error('Error with AI chat:', error);
      // Return mock response if API fails
      return "I'm sorry, I'm having trouble connecting to the AI service. Please make sure the backend is running and try again.";
    }
  },

  // Get stock data
  getStocks: async (): Promise<StockData> => {
    try {
      const response = await api.get('/stocks/');
      return response.data;
    } catch (error) {
      console.error('Error fetching stock data:', error);
      // Return mock data if API fails
      return {
        "AAPL": [150.25, 151.30, 149.80, 152.10, 151.75],
        "GOOGL": [2800.50, 2815.20, 2795.80, 2820.10, 2810.25],
        "MSFT": [300.15, 302.40, 298.90, 305.20, 303.85],
        "TSLA": [200.50, 205.30, 198.75, 208.90, 206.45],
        "AMZN": [3200.25, 3220.50, 3195.80, 3235.10, 3215.75]
      };
    }
  },
};
