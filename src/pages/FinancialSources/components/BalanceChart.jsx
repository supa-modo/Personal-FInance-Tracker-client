import React from 'react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency, formatDate } from '../../../utils/formatters';

const BalanceChart = ({ chartData }) => {
  // Custom tooltip component for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
          <p className="text-sm font-medium text-gray-900">{formatDate(label, { dateStyle: 'medium' })}</p>
          <p className="text-sm font-semibold text-primary-600">
            Balance: {formatCurrency(payload[0].value)}
          </p>
          {payload[0].payload.notes && (
            <p className="text-xs text-gray-500 mt-1">
              Note: {payload[0].payload.notes}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Balance History</h3>
        <p className="mt-1 text-sm text-gray-500">Historical trend of balance changes over time</p>
      </div>
      <div className="p-6">
        <div className="h-80">
          {chartData.length > 1 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => formatDate(date, { month: 'short', day: 'numeric' })}
                  stroke="#9ca3af"
                  fontSize={12}
                />
                <YAxis 
                  tickFormatter={(value) => formatCurrency(value, { notation: 'compact' })}
                  stroke="#9ca3af"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#4f46e5" 
                  strokeWidth={2}
                  fill="url(#colorBalance)" 
                  activeDot={{ r: 6 }} 
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500 text-sm">Not enough data to display chart. Add more balance updates.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BalanceChart;
