import React, { useState, useEffect } from 'react';
import { Calculator, RotateCcw, TrendingUp, TrendingDown } from 'lucide-react';
import { apiService, Budget } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WhatIfAnalysis: React.FC = () => {
  const [originalBudgets, setOriginalBudgets] = useState<Budget[]>([]);
  const [adjustedBudgets, setAdjustedBudgets] = useState<Budget[]>([]);
  const [adjustments, setAdjustments] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const data = await apiService.getBudgets();
      setOriginalBudgets(data);
      setAdjustedBudgets(data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdjustmentChange = (category: string, value: string) => {
    const adjustment = parseFloat(value) || 0;
    const newAdjustments = { ...adjustments, [category]: adjustment };
    setAdjustments(newAdjustments);
    setHasChanges(true);
  };

  const runAnalysis = async () => {
    try {
      const data = await apiService.runWhatIf(adjustments);
      setAdjustedBudgets(data);
      setHasChanges(false);
    } catch (error) {
      console.error('Error running what-if analysis:', error);
      // Show error message to user
      alert('Error running analysis. Please try again.');
    }
  };

  const resetAnalysis = () => {
    setAdjustments({});
    setAdjustedBudgets(originalBudgets);
    setHasChanges(false);
  };

  const calculateTotalChange = () => {
    return Object.values(adjustments).reduce((sum, adjustment) => sum + adjustment, 0);
  };

  const calculateTotalBudget = (budgets: Budget[]) => {
    return budgets.reduce((sum, budget) => sum + budget.total_budget, 0);
  };

  const calculateTotalSpent = (budgets: Budget[]) => {
    return budgets.reduce((sum, budget) => sum + budget.spent, 0);
  };

  const calculateTotalRemaining = (budgets: Budget[]) => {
    return calculateTotalBudget(budgets) - calculateTotalSpent(budgets);
  };

  // Prepare data for comparison chart
  const comparisonData = originalBudgets.map((original, index) => {
    const adjusted = adjustedBudgets[index];
    return {
      category: original.category,
      original: original.total_budget,
      adjusted: adjusted?.total_budget || original.total_budget,
      spent: original.spent
    };
  });

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="bg-gray-200 rounded-lg h-64"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">What-If Analysis</h1>
      
      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Adjust Budget Scenarios</h2>
          <div className="flex space-x-3">
            <button
              onClick={runAnalysis}
              disabled={!hasChanges}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Calculator className="h-4 w-4" />
              <span>Run Analysis</span>
            </button>
            <button
              onClick={resetAnalysis}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 flex items-center space-x-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {originalBudgets.map((budget) => (
            <div key={budget.category} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {budget.category} Adjustment
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  step="0.01"
                  value={adjustments[budget.category] || ''}
                  onChange={(e) => handleAdjustmentChange(budget.category, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
                <span className="text-sm text-gray-500">$</span>
              </div>
              <p className="text-xs text-gray-500">
                Current: ${budget.total_budget.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Budget Change</p>
              <p className={`text-2xl font-bold ${calculateTotalChange() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${calculateTotalChange().toFixed(2)}
              </p>
            </div>
            {calculateTotalChange() >= 0 ? (
              <TrendingUp className="h-8 w-8 text-green-600" />
            ) : (
              <TrendingDown className="h-8 w-8 text-red-600" />
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New Total Budget</p>
              <p className="text-2xl font-bold text-gray-900">
                ${calculateTotalBudget(adjustedBudgets).toFixed(2)}
              </p>
            </div>
            <Calculator className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Remaining Budget</p>
              <p className="text-2xl font-bold text-blue-600">
                ${calculateTotalRemaining(adjustedBudgets).toFixed(2)}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Comparison Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Comparison</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip 
              formatter={(value: number, name: string) => [
                `$${value.toFixed(2)}`, 
                name === 'original' ? 'Original Budget' : 
                name === 'adjusted' ? 'Adjusted Budget' : 'Amount Spent'
              ]}
            />
            <Bar dataKey="original" fill="#94A3B8" name="original" />
            <Bar dataKey="adjusted" fill="#3B82F6" name="adjusted" />
            <Bar dataKey="spent" fill="#EF4444" name="spent" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Comparison */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Detailed Comparison</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {originalBudgets.map((original, index) => {
            const adjusted = adjustedBudgets[index];
            const change = (adjusted?.total_budget || original.total_budget) - original.total_budget;
            const remaining = (adjusted?.total_budget || original.total_budget) - original.spent;
            
            return (
              <div key={original.category} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-medium text-gray-900">{original.category}</h4>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {change >= 0 ? '+' : ''}${change.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">Change</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Original Budget</p>
                    <p className="text-lg font-semibold text-gray-900">${original.total_budget.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Adjusted Budget</p>
                    <p className="text-lg font-semibold text-blue-600">
                      ${(adjusted?.total_budget || original.total_budget).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Amount Spent</p>
                    <p className="text-lg font-semibold text-gray-900">${original.spent.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Remaining</p>
                    <p className={`text-lg font-semibold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${remaining.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhatIfAnalysis;
