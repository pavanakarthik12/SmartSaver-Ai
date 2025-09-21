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
      <div className="p-6 bg-primary min-h-screen">
        <div className="animate-pulse">
          <div className="h-8 bg-tertiary rounded w-1/4 mb-6 loading-skeleton"></div>
          <div className="bg-tertiary rounded-lg h-64 loading-skeleton"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-primary min-h-screen">
      <h1 className="text-4xl font-bold text-primary mb-8 font-heading">What-If Analysis</h1>
      
      {/* Controls */}
      <div className="card-elevated p-8 mb-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-primary font-heading">Adjust Budget Scenarios</h2>
          <div className="flex space-x-4">
            <button
              onClick={runAnalysis}
              disabled={!hasChanges}
              className="btn-primary flex items-center space-x-2 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              <Calculator className="h-4 w-4" />
              <span>Run Analysis</span>
            </button>
            <button
              onClick={resetAnalysis}
              className="btn-secondary flex items-center space-x-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {originalBudgets.map((budget) => (
            <div key={budget.category} className="space-y-3">
              <label className="block text-sm font-medium text-secondary font-body">
                {budget.category} Adjustment
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  step="0.01"
                  value={adjustments[budget.category] || ''}
                  onChange={(e) => handleAdjustmentChange(budget.category, e.target.value)}
                  className="flex-1 p-3 border border-border-color bg-secondary text-primary rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent"
                  placeholder="0.00"
                />
                <span className="text-sm text-secondary font-body">$</span>
              </div>
              <p className="text-xs text-muted font-body">
                Current: ${budget.total_budget.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary font-body">Total Budget Change</p>
              <p className={`text-3xl font-bold font-heading ${calculateTotalChange() >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${calculateTotalChange().toFixed(2)}
              </p>
            </div>
            {calculateTotalChange() >= 0 ? (
              <TrendingUp className="h-8 w-8 text-green-400" />
            ) : (
              <TrendingDown className="h-8 w-8 text-red-400" />
            )}
          </div>
        </div>

        <div className="card-elevated p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary font-body">New Total Budget</p>
              <p className="text-3xl font-bold text-primary font-heading">
                ${calculateTotalBudget(adjustedBudgets).toFixed(2)}
              </p>
            </div>
            <Calculator className="h-8 w-8 text-accent-red" />
          </div>
        </div>

        <div className="card-elevated p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary font-body">Remaining Budget</p>
              <p className="text-3xl font-bold text-accent-red font-heading">
                ${calculateTotalRemaining(adjustedBudgets).toFixed(2)}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-accent-red" />
          </div>
        </div>
      </div>

      {/* Comparison Chart */}
      <div className="chart-container mb-8">
        <h3 className="text-xl font-bold text-primary mb-6 font-heading">Budget Comparison</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.3} />
            <XAxis dataKey="category" stroke="var(--text-secondary)" />
            <YAxis stroke="var(--text-secondary)" />
            <Tooltip 
              formatter={(value: number, name: string) => [
                `$${value.toFixed(2)}`, 
                name === 'original' ? 'Original Budget' : 
                name === 'adjusted' ? 'Adjusted Budget' : 'Amount Spent'
              ]}
              contentStyle={{
                backgroundColor: 'var(--secondary-bg)',
                border: '1px solid var(--accent-red)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-primary)'
              }}
            />
            <Bar dataKey="original" fill="var(--text-muted)" name="original" />
            <Bar dataKey="adjusted" fill="var(--accent-red)" name="adjusted" />
            <Bar dataKey="spent" fill="#ef4444" name="spent" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Comparison */}
      <div className="card-elevated">
        <div className="p-6 border-b border-border-color">
          <h3 className="text-xl font-bold text-primary font-heading">Detailed Comparison</h3>
        </div>
        <div className="divide-y divide-border-color">
          {originalBudgets.map((original, index) => {
            const adjusted = adjustedBudgets[index];
            const change = (adjusted?.total_budget || original.total_budget) - original.total_budget;
            const remaining = (adjusted?.total_budget || original.total_budget) - original.spent;
            
            return (
              <div key={original.category} className="p-6 hover:bg-tertiary/30 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <h4 className="text-xl font-bold text-primary font-heading">{original.category}</h4>
                  <div className="text-right">
                    <p className={`text-lg font-bold font-heading ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {change >= 0 ? '+' : ''}${change.toFixed(2)}
                    </p>
                    <p className="text-sm text-secondary font-body">Change</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-tertiary/50 rounded-lg">
                    <p className="text-sm text-secondary font-body mb-2">Original Budget</p>
                    <p className="text-lg font-bold text-primary font-heading">${original.total_budget.toFixed(2)}</p>
                  </div>
                  <div className="text-center p-4 bg-tertiary/50 rounded-lg">
                    <p className="text-sm text-secondary font-body mb-2">Adjusted Budget</p>
                    <p className="text-lg font-bold text-accent-red font-heading">
                      ${(adjusted?.total_budget || original.total_budget).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-tertiary/50 rounded-lg">
                    <p className="text-sm text-secondary font-body mb-2">Amount Spent</p>
                    <p className="text-lg font-bold text-primary font-heading">${original.spent.toFixed(2)}</p>
                  </div>
                  <div className="text-center p-4 bg-tertiary/50 rounded-lg">
                    <p className="text-sm text-secondary font-body mb-2">Remaining</p>
                    <p className={`text-lg font-bold font-heading ${remaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
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