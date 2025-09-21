import React, { useState, useEffect } from 'react';
import { Edit3, Save, X } from 'lucide-react';
import { apiService, Budget as BudgetType } from '../services/api';

const Budget: React.FC = () => {
  const [budgets, setBudgets] = useState<BudgetType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBudget, setEditingBudget] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const data = await apiService.getBudgets();
      setBudgets(data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (budget: BudgetType) => {
    setEditingBudget(budget.category);
    setEditValues({
      total_budget: budget.total_budget,
      spent: budget.spent
    });
  };

  const handleSave = async (category: string) => {
    const updatedBudgets = budgets.map(budget => 
      budget.category === category 
        ? { 
            ...budget, 
            total_budget: editValues.total_budget || budget.total_budget,
            spent: editValues.spent || budget.spent
          }
        : budget
    );
    setBudgets(updatedBudgets);
    setEditingBudget(null);
    setEditValues({});
    
    // Here you would typically send to backend
    // await apiService.updateBudget(category, editValues);
  };

  const handleCancel = () => {
    setEditingBudget(null);
    setEditValues({});
  };

  const handleInputChange = (field: 'total_budget' | 'spent', value: string) => {
    setEditValues(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-24"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Budget Management</h1>
      
      <div className="space-y-6">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.total_budget) * 100;
          const isOverBudget = budget.spent > budget.total_budget;
          const remaining = budget.total_budget - budget.spent;
          
          return (
            <div key={budget.category} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{budget.category}</h3>
                  <p className="text-sm text-gray-600">
                    {editingBudget === budget.category ? 'Edit budget' : 'Budget overview'}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {editingBudget === budget.category ? (
                    <>
                      <button
                        onClick={() => handleSave(budget.category)}
                        className="text-green-600 hover:text-green-800 p-1"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEdit(budget)}
                      className="text-blue-600 hover:text-blue-800 p-1"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {editingBudget === budget.category ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Budget</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editValues.total_budget || ''}
                      onChange={(e) => handleInputChange('total_budget', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount Spent</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editValues.spent || ''}
                      onChange={(e) => handleInputChange('spent', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Spent</span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${budget.spent.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Budget</span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${budget.total_budget.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Remaining</span>
                    <span className={`text-lg font-semibold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${remaining.toFixed(2)}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-gray-900">{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-300 ${
                          isOverBudget ? 'bg-red-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>

                  {isOverBudget && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-800">
                        ⚠️ You've exceeded your budget by ${Math.abs(remaining).toFixed(2)}
                      </p>
                    </div>
                  )}

                  {percentage > 80 && !isOverBudget && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm text-yellow-800">
                        ⚠️ You're close to your budget limit ({percentage.toFixed(1)}% used)
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Budget;
