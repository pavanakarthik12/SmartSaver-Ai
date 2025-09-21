import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { apiService } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Forecast: React.FC = () => {
  const [forecast, setForecast] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchForecast();
  }, []);

  const fetchForecast = async () => {
    try {
      const data = await apiService.getForecast();
      setForecast(data);
    } catch (error) {
      console.error('Error fetching forecast:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = Object.entries(forecast).map(([category, savings]) => ({
    category,
    savings: Math.round(savings * 100) / 100
  }));

  const totalSavings = Object.values(forecast).reduce((sum, savings) => sum + savings, 0);

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
      <h1 className="text-3xl font-bold text-gray-900 mb-6">AI Predictions & Forecasts</h1>
      
      {/* Summary Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-sm p-6 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Total Predicted Savings</h2>
            <p className="text-4xl font-bold">${totalSavings.toFixed(2)}</p>
            <p className="text-blue-100 mt-2">Based on AI analysis of your spending patterns</p>
          </div>
          <TrendingUp className="h-16 w-16 text-blue-200" />
        </div>
      </div>

      {/* Forecast Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Predicted Savings by Category</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Predicted Savings']}
              labelFormatter={(label) => `Category: ${label}`}
            />
            <Bar dataKey="savings" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Forecast Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(forecast).map(([category, savings]) => {
          const isPositive = savings > 0;
          const isNegative = savings < 0;
          
          return (
            <div key={category} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">{category}</h4>
                {isPositive ? (
                  <TrendingUp className="h-6 w-6 text-green-600" />
                ) : isNegative ? (
                  <TrendingDown className="h-6 w-6 text-red-600" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Predicted Savings</span>
                  <span className={`text-2xl font-bold ${
                    isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    ${savings.toFixed(2)}
                  </span>
                </div>
                
                <div className="mt-4">
                  {isPositive ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-800">
                        💚 You're on track to save ${savings.toFixed(2)} in this category
                      </p>
                    </div>
                  ) : isNegative ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-800">
                        ⚠️ You may overspend by ${Math.abs(savings).toFixed(2)} in this category
                      </p>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm text-yellow-800">
                        📊 Spending is expected to match your budget in this category
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Insights</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">🤖 How AI Predictions Work</h4>
            <p className="text-sm text-blue-800">
              Our AI analyzes your historical spending patterns using machine learning algorithms 
              to predict future expenses and calculate potential savings for each category.
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">💡 Recommendations</h4>
            <p className="text-sm text-green-800">
              Focus on categories with positive predicted savings to maximize your financial goals. 
              Consider adjusting budgets for categories showing negative predictions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
