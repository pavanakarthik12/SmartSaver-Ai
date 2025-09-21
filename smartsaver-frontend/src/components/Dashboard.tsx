import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, AlertCircle, Target } from 'lucide-react';
import { apiService, Budget } from '../services/api';

const Dashboard: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  // const [expenses, setExpenses] = useState<Expense[]>([]);
  const [forecast, setForecast] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [budgetsData, forecastData] = await Promise.all([
          apiService.getBudgets(),
          apiService.getForecast(),
        ]);
        setBudgets(budgetsData);
        setForecast(forecastData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.total_budget, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalPredictedSavings = Object.values(forecast).reduce((sum, savings) => sum + savings, 0);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-skeleton">
          <div className="loading-title"></div>
          <div className="loading-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="loading-card"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      
      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <div>
              <p className="metric-label">Total Budget</p>
              <p className="metric-value">${totalBudget.toFixed(2)}</p>
            </div>
            <DollarSign className="metric-icon" color="#2563eb" />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div>
              <p className="metric-label">Total Spent</p>
              <p className="metric-value">${totalSpent.toFixed(2)}</p>
            </div>
            <AlertCircle className="metric-icon" color="#ea580c" />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div>
              <p className="metric-label">Predicted Savings</p>
              <p className="metric-value" style={{ color: '#059669' }}>${totalPredictedSavings.toFixed(2)}</p>
            </div>
            <TrendingUp className="metric-icon" color="#059669" />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <div>
              <p className="metric-label">Remaining Budget</p>
              <p className="metric-value" style={{ color: '#2563eb' }}>${(totalBudget - totalSpent).toFixed(2)}</p>
            </div>
            <Target className="metric-icon" color="#2563eb" />
          </div>
        </div>
      </div>

      {/* Budget Overview */}
      <div className="budget-overview">
        <h2 className="budget-title">Budget Overview</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {budgets.map((budget) => {
            const percentage = (budget.spent / budget.total_budget) * 100;
            const isOverBudget = budget.spent > budget.total_budget;
            
            return (
              <div key={budget.category} className="budget-item">
                <div className="budget-header">
                  <span style={{ fontWeight: '500', color: '#374151' }}>{budget.category}</span>
                  <span className="budget-amounts">
                    ${budget.spent.toFixed(2)} / ${budget.total_budget.toFixed(2)}
                  </span>
                </div>
                <div className="budget-progress">
                  <div
                    className={`budget-progress-bar ${
                      isOverBudget ? 'red' : percentage > 80 ? 'yellow' : 'green'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
                {isOverBudget && (
                  <p className="budget-warning">Over budget by ${(budget.spent - budget.total_budget).toFixed(2)}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
