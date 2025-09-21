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
      <h1 className="text-4xl font-bold text-primary mb-8 font-heading">AI Predictions & Forecasts</h1>
      
      {/* Summary Card */}
      <div className="card-elevated p-8 mb-8 bg-gradient-accent text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-3 font-heading">Total Predicted Savings</h2>
            <p className="text-5xl font-bold mb-3 font-heading">${totalSavings.toFixed(2)}</p>
            <p className="text-red-100 text-lg font-body">Based on AI analysis of your spending patterns</p>
          </div>
          <TrendingUp className="h-20 w-20 text-red-200" />
        </div>
      </div>

      {/* Forecast Chart */}
      <div className="chart-container mb-8">
        <h3 className="text-xl font-bold text-primary mb-6 font-heading">Predicted Savings by Category</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.3} />
            <XAxis dataKey="category" stroke="var(--text-secondary)" />
            <YAxis stroke="var(--text-secondary)" />
            <Tooltip 
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Predicted Savings']}
              labelFormatter={(label) => `Category: ${label}`}
              contentStyle={{
                backgroundColor: 'var(--secondary-bg)',
                border: '1px solid var(--accent-red)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-primary)'
              }}
            />
            <Bar dataKey="savings" fill="var(--accent-red)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Forecast Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {Object.entries(forecast).map(([category, savings]) => {
          const isPositive = savings > 0;
          const isNegative = savings < 0;
          
          return (
            <div key={category} className="card-elevated p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold text-primary font-heading">{category}</h4>
                {isPositive ? (
                  <TrendingUp className="h-6 w-6 text-green-400" />
                ) : isNegative ? (
                  <TrendingDown className="h-6 w-6 text-red-400" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-yellow-400" />
                )}
              </div>
              
              <div className="space-y-4">
                <div className="text-center p-4 bg-tertiary/50 rounded-lg">
                  <span className="text-sm font-medium text-secondary font-body">Predicted Savings</span>
                  <p className={`text-3xl font-bold font-heading ${
                    isPositive ? 'text-green-400' : isNegative ? 'text-red-400' : 'text-muted'
                  }`}>
                    ${savings.toFixed(2)}
                  </p>
                </div>
                
                <div className="mt-4">
                  {isPositive ? (
                    <div className="bg-green-900 border border-green-700 rounded-lg p-4">
                      <p className="text-sm text-green-200 font-body">
                        💚 You're on track to save ${savings.toFixed(2)} in this category
                      </p>
                    </div>
                  ) : isNegative ? (
                    <div className="bg-red-900 border border-red-700 rounded-lg p-4">
                      <p className="text-sm text-red-200 font-body">
                        ⚠️ You may overspend by ${Math.abs(savings).toFixed(2)} in this category
                      </p>
                    </div>
                  ) : (
                    <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-4">
                      <p className="text-sm text-yellow-200 font-body">
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
      <div className="card-elevated p-8">
        <h3 className="text-2xl font-bold text-primary mb-6 font-heading">AI Insights</h3>
        <div className="space-y-6">
          <div className="bg-red-900 border border-red-700 rounded-lg p-6">
            <h4 className="font-bold text-red-100 mb-3 text-lg font-heading">🤖 How AI Predictions Work</h4>
            <p className="text-sm text-red-200 font-body">
              Our AI analyzes your historical spending patterns using machine learning algorithms 
              to predict future expenses and calculate potential savings for each category.
            </p>
          </div>
          
          <div className="bg-green-900 border border-green-700 rounded-lg p-6">
            <h4 className="font-bold text-green-100 mb-3 text-lg font-heading">💡 Recommendations</h4>
            <p className="text-sm text-green-200 font-body">
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