import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { apiService, StockData } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Stocks: React.FC = () => {
  const [stockData, setStockData] = useState<StockData>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    try {
      const data = await apiService.getStocks();
      setStockData(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching stock data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  const calculateChange = (prices: number[]) => {
    if (prices.length < 2) return 0;
    const first = prices[0];
    const last = prices[prices.length - 1];
    return ((last - first) / first) * 100;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4" />;
    if (change < 0) return <TrendingDown className="h-4 w-4" />;
    return null;
  };

  // Prepare data for charts
  const chartData = Object.entries(stockData).map(([ticker, prices]) => {
    const change = calculateChange(prices);
    return {
      ticker,
      prices: prices.map((price, index) => ({
        day: `Day ${index + 1}`,
        price: price
      })),
      currentPrice: prices[prices.length - 1],
      change: change
    };
  });

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Stock Market</h1>
        <button
          onClick={fetchStockData}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Refresh</span>
        </button>
      </div>

      {lastUpdated && (
        <p className="text-sm text-gray-600 mb-6">
          Last updated: {lastUpdated.toLocaleString()}
        </p>
      )}

      {/* Stock Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {Object.entries(stockData).map(([ticker, prices]) => {
          const currentPrice = prices[prices.length - 1];
          const change = calculateChange(prices);
          
          return (
            <div key={ticker} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{ticker}</h3>
                  <p className="text-sm text-gray-600">Last 5 Days</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">${formatPrice(currentPrice)}</p>
                  <div className={`flex items-center space-x-1 ${getChangeColor(change)}`}>
                    {getChangeIcon(change)}
                    <span className="text-sm font-medium">
                      {change >= 0 ? '+' : ''}{change.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">5-Day High</span>
                  <span className="font-medium">${formatPrice(Math.max(...prices))}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">5-Day Low</span>
                  <span className="font-medium">${formatPrice(Math.min(...prices))}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Average</span>
                  <span className="font-medium">
                    ${formatPrice(prices.reduce((sum, price) => sum + price, 0) / prices.length)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Price Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {chartData.map(({ ticker, prices, currentPrice, change }) => (
          <div key={ticker} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{ticker} Price Trend</h3>
              <div className={`flex items-center space-x-1 ${getChangeColor(change)}`}>
                {getChangeIcon(change)}
                <span className="text-sm font-medium">
                  {change >= 0 ? '+' : ''}{change.toFixed(2)}%
                </span>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={prices}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                  labelFormatter={(label) => `${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke={change >= 0 ? "#10B981" : "#EF4444"} 
                  strokeWidth={2}
                  dot={{ fill: change >= 0 ? "#10B981" : "#EF4444", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>

      {/* Market Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Total Stocks Tracked</p>
            <p className="text-2xl font-bold text-gray-900">{Object.keys(stockData).length}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Average Change</p>
            <p className={`text-2xl font-bold ${
              chartData.length > 0 
                ? getChangeColor(chartData.reduce((sum, stock) => sum + stock.change, 0) / chartData.length)
                : 'text-gray-900'
            }`}>
              {chartData.length > 0 
                ? `${(chartData.reduce((sum, stock) => sum + stock.change, 0) / chartData.length).toFixed(2)}%`
                : '0.00%'
              }
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Best Performer</p>
            <p className="text-2xl font-bold text-green-600">
              {chartData.length > 0 
                ? chartData.reduce((best, stock) => stock.change > best.change ? stock : best).ticker
                : 'N/A'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stocks;
