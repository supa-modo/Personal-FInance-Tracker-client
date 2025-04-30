import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { formatCurrency, formatDate } from '../../../utils/formatters';

const BalanceChartEnhanced = ({ balanceData, sourceColor }) => {
  const [chartData, setChartData] = useState([]);
  const [timeRange, setTimeRange] = useState('all');
  const [showAverage, setShowAverage] = useState(false);
  
  useEffect(() => {
    if (!balanceData || balanceData.length === 0) {
      setChartData([]);
      return;
    }
    
    // Sort data by date
    const sortedData = [...balanceData].sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
    
    // Filter data based on time range
    let filteredData = sortedData;
    
    if (timeRange !== 'all') {
      const now = new Date();
      let cutoffDate = new Date();
      
      switch (timeRange) {
        case '7d':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case '30d':
          cutoffDate.setDate(now.getDate() - 30);
          break;
        case '90d':
          cutoffDate.setDate(now.getDate() - 90);
          break;
        case '1y':
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          break;
      }
      
      filteredData = sortedData.filter(item => 
        new Date(item.date) >= cutoffDate
      );
    }
    
    // Format data for chart
    const formattedData = filteredData.map(item => ({
      date: item.date,
      balance: item.balance,
      formattedDate: formatDate(item.date, { dateStyle: 'medium' })
    }));
    
    setChartData(formattedData);
  }, [balanceData, timeRange]);
  
  // Calculate average balance
  const averageBalance = chartData.length > 0 
    ? chartData.reduce((sum, item) => sum + item.balance, 0) / chartData.length 
    : 0;
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-700 shadow-lg rounded-lg p-3">
          <p className="text-slate-300 text-sm mb-1">
            {payload[0].payload.formattedDate}
          </p>
          <p className="text-white font-semibold">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };
  
  const timeRangeOptions = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' },
    { value: 'all', label: 'All Time' }
  ];
  
  return (
    <div className="mb-0 md:mb-8 bg-slate-800/60 shadow-xl md:rounded-xl overflow-hidden border border-slate-700/50 backdrop-blur-sm hover:shadow-primary-900/20 hover:border-slate-600/50 transition-all duration-300">
      <div className="px-6 py-5 border-b border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between">
        <h2 className="text-lg font-semibold text-primary-600 mb-3 sm:mb-0">Balance History</h2>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center">
            <label htmlFor="time-range" className="mr-2 text-sm text-slate-400">
              Time Range:
            </label>
            <select
              id="time-range"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-slate-700/50 border border-slate-600 text-white text-sm rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-primary-500 px-2 py-1"
            >
              {timeRangeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={showAverage}
                onChange={() => setShowAverage(!showAverage)}
              />
              <div className="relative w-9 h-5 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
              <span className="ms-2 text-sm text-slate-400">Show Average</span>
            </label>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {chartData.length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }}
                  stroke="#94a3b8"
                  tick={{ fill: '#94a3b8' }}
                />
                <YAxis 
                  tickFormatter={(value) => formatCurrency(value, { notation: 'compact' })}
                  stroke="#94a3b8"
                  tick={{ fill: '#94a3b8' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="balance" 
                  stroke={sourceColor || '#4F46E5'} 
                  strokeWidth={3}
                  dot={{ r: 4, fill: sourceColor || '#4F46E5', strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: sourceColor || '#4F46E5', stroke: '#fff', strokeWidth: 2 }}
                />
                {showAverage && (
                  <ReferenceLine 
                    y={averageBalance} 
                    stroke="#f43f5e" 
                    strokeDasharray="5 5"
                    label={{ 
                      value: `Avg: ${formatCurrency(averageBalance, { notation: 'compact' })}`,
                      fill: '#f43f5e',
                      position: 'insideBottomRight'
                    }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-60 text-center">
            <div className="text-slate-400 mb-2">No balance history available</div>
            <p className="text-sm text-slate-500">
              Update the balance to start tracking history
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BalanceChartEnhanced;
