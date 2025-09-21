import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { apiService, Expense } from '../services/api';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Expenses: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExpense, setNewExpense] = useState({ category: '', amount: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  const categories = ['Food', 'Entertainment', 'Bills', 'Savings'];

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await apiService.getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!newExpense.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!newExpense.amount) {
      newErrors.amount = 'Please enter an amount';
    } else if (isNaN(parseFloat(newExpense.amount)) || parseFloat(newExpense.amount) <= 0) {
      newErrors.amount = 'Please enter a valid positive amount';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const expense: Expense = {
      category: newExpense.category,
      amount: parseFloat(newExpense.amount)
    };
    
    try {
      // Send to backend
      await apiService.addExpense(expense);
      
      // Add to local state for immediate UI update
      setExpenses([...expenses, expense]);
      setNewExpense({ category: '', amount: '' });
      setShowAddForm(false);
      setSuccessMessage('Expense added successfully!');
      setErrors({});
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error adding expense:', error);
      setErrors({ general: 'Failed to add expense. Please try again.' });
    }
  };

  const handleDeleteExpense = (index: number) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  // Prepare data for charts
  const pieData = categories.map(category => {
    const total = expenses
      .filter(expense => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);
    return { name: category, value: total };
  }).filter(item => item.value > 0);

  const barData = categories.map(category => {
    const total = expenses
      .filter(expense => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);
    return { category, amount: total };
  });

  const COLORS = ['#dc2626', '#b91c1c', '#991b1b', '#7f1d1d'];

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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-primary font-heading">Expenses</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-900 border border-green-700 text-green-200 p-4 rounded-lg mb-6">
          {successMessage}
        </div>
      )}

      {/* Add Expense Form */}
      {showAddForm && (
        <div className="card-elevated p-6 mb-8">
          <h2 className="text-xl font-bold text-primary mb-6 font-heading">Add New Expense</h2>
          <form onSubmit={handleAddExpense} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-secondary mb-2 font-body">Category</label>
              <select
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                className={`w-full ${errors.category ? 'border-red-500' : ''}`}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-400 text-sm mt-2 font-body">{errors.category}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-2 font-body">Amount</label>
              <input
                type="number"
                step="0.01"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                className={`w-full ${errors.amount ? 'border-red-500' : ''}`}
                placeholder="0.00"
              />
              {errors.amount && (
                <p className="text-red-400 text-sm mt-2 font-body">{errors.amount}</p>
              )}
            </div>
            {errors.general && (
              <div className="bg-red-900 border border-red-700 text-red-200 p-4 rounded-lg">
                {errors.general}
              </div>
            )}
            <div className="flex gap-4">
              <button
                type="submit"
                className="btn-primary"
              >
                Add Expense
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setErrors({});
                  setNewExpense({ category: '', amount: '' });
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="chart-container">
          <h3 className="text-xl font-bold text-primary mb-6 font-heading">Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(props: any) => `${props.name} ${(props.percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--secondary-bg)',
                  border: '1px solid var(--accent-red)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3 className="text-xl font-bold text-primary mb-6 font-heading">Expense Amounts</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.3} />
              <XAxis dataKey="category" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--secondary-bg)',
                  border: '1px solid var(--accent-red)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)'
                }}
              />
              <Bar dataKey="amount" fill="var(--accent-red)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expenses List */}
      <div className="card-elevated">
        <div className="p-6 border-b border-border-color">
          <h3 className="text-xl font-bold text-primary font-heading">Recent Expenses</h3>
        </div>
        <div className="divide-y divide-border-color">
          {expenses.length === 0 ? (
            <div className="p-8 text-center text-muted">
              <p className="text-lg font-body">No expenses recorded yet. Add your first expense above.</p>
            </div>
          ) : (
            expenses.map((expense, index) => (
              <div key={index} className="p-6 flex justify-between items-center hover:bg-tertiary/50 transition-colors">
                <div>
                  <p className="font-semibold text-primary font-body">{expense.category}</p>
                  <p className="text-sm text-secondary font-body">${expense.amount.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => handleDeleteExpense(index)}
                  className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-900/20 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Expenses;