import React from 'react';
import { 
  TbEye, 
  TbSettings 
} from 'react-icons/tb';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { formatCurrency } from '../../../utils/formatters';

const DashboardCharts = ({ lineChartData, pieChartData }) => {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Net Worth Trend Chart */}
      <div className="bg-slate-800/60 shadow-xl rounded-xl overflow-hidden border border-slate-700/50 backdrop-blur-sm hover:shadow-primary-900/20 hover:border-slate-600/50 transition-all duration-300">
        <div className="px-6 py-5 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Net Worth Trend</h2>
            <div className="flex items-center space-x-2">
              <button className="p-1.5 rounded-md hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors">
                <TbEye className="h-5 w-5" />
              </button>
              <button className="p-1.5 rounded-md hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors">
                <TbSettings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="px-6 py-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={lineChartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  tickFormatter={(value) => formatCurrency(value, 'KES', 0)}
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.2)',
                    color: '#e2e8f0'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#4F46E5" 
                  strokeWidth={3}
                  fill="url(#colorTotal)" 
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#4F46E5' }} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Asset Distribution Chart */}
      <div className="bg-slate-800/60 shadow-xl rounded-xl overflow-hidden border border-slate-700/50 backdrop-blur-sm hover:shadow-primary-900/20 hover:border-slate-600/50 transition-all duration-300">
        <div className="px-6 py-5 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Asset Distribution</h2>
            <div className="flex items-center space-x-2">
              <button className="p-1.5 rounded-md hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors">
                <TbEye className="h-5 w-5" />
              </button>
              <button className="p-1.5 rounded-md hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors">
                <TbSettings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="px-6 py-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={130}
                  innerRadius={70}
                  paddingAngle={2}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color || `#${Math.floor(Math.random()*16777215).toString(16)}`} 
                      stroke="#0f172a"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.2)',
                    color: '#e2e8f0'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
