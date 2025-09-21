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
    try {
      const updatedBudget = {
        category: category,
        total_budget: editValues.total_budget || budgets.find(b => b.category === category)?.total_budget || 0,
        spent: editValues.spent || budgets.find(b => b.category === category)?.spent || 0
      };
      
      // Send to backend
      await apiService.updateBudget(category, updatedBudget);
      
      // Update local state
      const updatedBudgets = budgets.map(budget => 
        budget.category === category 
          ? updatedBudget
          : budget
      );
      setBudgets(updatedBudgets);
      setEditingBudget(null);
      setEditValues({});
    } catch (error) {
      console.error('Error updating budget:', error);
      // You could add error handling here
    }
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
      <div className="p-6 bg-primary min-h-screen">
        <div className="animate-pulse">
          <div className="h-8 bg-tertiary rounded w-1/4 mb-6 loading-skeleton"></div>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-tertiary rounded-lg h-32 loading-skeleton"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-primary min-h-screen">
      <h1 className="text-4xl font-bold text-primary mb-8 font-heading">Budget Management</h1>
      
      <div className="space-y-6">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.total_budget) * 100;
          const isOverBudget = budget.spent > budget.total_budget;
          const remaining = budget.total_budget - budget.spent;
          
          return (
            <div key={budget.category} className="card-elevated p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-primary font-heading">{budget.category}</h3>
                  <p className="text-sm text-secondary font-body">
                    {editingBudget === budget.category ? 'Edit budget' : 'Budget overview'}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {editingBudget === budget.category ? (
                    <>
                      <button
                        onClick={() => handleSave(budget.category)}
                        className="text-green-400 hover:text-green-300 p-2 rounded-lg hover:bg-green-900/20 transition-colors"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-900/20 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEdit(budget)}
                      className="text-accent-red hover:text-red-300 p-2 rounded-lg hover:bg-red-900/20 transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {editingBudget === budget.category ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2 font-body">Total Budget</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editValues.total_budget || ''}
                      onChange={(e) => handleInputChange('total_budget', e.target.value)}
                      className="w-full p-3 border border-border-color bg-secondary text-primary rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2 font-body">Amount Spent</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editValues.spent || ''}
                      onChange={(e) => handleInputChange('spent', e.target.value)}
                      className="w-full p-3 border border-border-color bg-secondary text-primary rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-tertiary/50 rounded-lg">
                      <span className="text-sm font-medium text-secondary font-body">Spent</span>
                      <p className="text-xl font-bold text-primary font-heading">
                        ${budget.spent.toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="text-center p-4 bg-tertiary/50 rounded-lg">
                      <span className="text-sm font-medium text-secondary font-body">Budget</span>
                      <p className="text-xl font-bold text-primary font-heading">
                        ${budget.total_budget.toFixed(2)}
                      </p>
                    </div>

                    <div className="text-center p-4 bg-tertiary/50 rounded-lg">
                      <span className="text-sm font-medium text-secondary font-body">Remaining</span>
                      <p className={`text-xl font-bold font-heading ${remaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ${remaining.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary font-body">Progress</span>
                      <span className="text-primary font-body font-semibold">{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-tertiary rounded-full h-4 overflow-hidden">
                      <div
                        className={`h-4 rounded-full transition-all duration-500 ${
                          isOverBudget ? 'bg-gradient-to-r from-red-500 to-red-600' : 
                          percentage > 80 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 
                          'bg-gradient-to-r from-green-500 to-green-600'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>

                  {isOverBudget && (
                    <div className="bg-red-900 border border-red-700 rounded-lg p-4">
                      <p className="text-sm text-red-200 font-body">
                        ⚠️ You've exceeded your budget by ${Math.abs(remaining).toFixed(2)}
                      </p>
                    </div>
                  )}

                  {percentage > 80 && !isOverBudget && (
                    <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-4">
                      <p className="text-sm text-yellow-200 font-body">
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