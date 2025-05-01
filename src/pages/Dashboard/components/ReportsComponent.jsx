import React, { useState } from 'react';
import { 
  TbChartBar, 
  TbChartPie, 
  TbChartLine, 
  TbArrowUpRight, 
  TbArrowDownRight,
  TbCalendarStats,
  TbChevronRight,
  TbDownload,
  TbFilter
} from 'react-icons/tb';
import { formatCurrency, formatPercentage } from '../../../utils/formatters';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';

const ReportsComponent = ({ financialSources, historicalData }) => {
  const [reportPeriod, setReportPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');

  // Calculate monthly spending by category
  const getSpendingByCategory = () => {
    // This would normally come from transaction data
    // For now, we'll use mock data
    return [
      { name: 'Housing', value: 1500, color: '#4F46E5' },
      { name: 'Food', value: 600, color: '#10B981' },
      { name: 'Transportation', value: 400, color: '#F59E0B' },
      { name: 'Utilities', value: 300, color: '#6366F1' },
      { name: 'Entertainment', value: 200, color: '#EC4899' },
      { name: 'Other', value: 350, color: '#8B5CF6' }
    ];
  };

  // Calculate income vs expenses
  const getIncomeVsExpenses = () => {
    // This would normally come from transaction data
    // For now, we'll use mock data
    return [
      { month: 'Jan', income: 5000, expenses: 3200 },
      { month: 'Feb', income: 5200, expenses: 3300 },
      { month: 'Mar', income: 5100, expenses: 3400 },
      { month: 'Apr', income: 5300, expenses: 3100 },
      { month: 'May', income: 5400, expenses: 3200 },
      { month: 'Jun', income: 5600, expenses: 3300 }
    ];
  };

  // Calculate savings rate
  const getSavingsRate = () => {
    const incomeVsExpenses = getIncomeVsExpenses();
    return incomeVsExpenses.map(month => ({
      month: month.month,
      rate: ((month.income - month.expenses) / month.income) * 100
    }));
  };

  // Calculate asset allocation
  const getAssetAllocation = () => {
    if (!financialSources || financialSources.length === 0) {
      return [];
    }

    const typeMap = {
      'BANK_ACCOUNT': 'Cash',
      'MONEY_MARKET': 'Money Market',
      'STOCKS': 'Stocks',
      'MPESA': 'Mobile Money',
      'SACCO': 'SACCO',
      'CASH': 'Cash',
      'OTHER': 'Other'
    };

    // Group by type
    const allocation = {};
    let total = 0;

    financialSources.forEach(source => {
      const type = typeMap[source.type] || source.type;
      const balance = source.balance || 0;
      
      total += balance;
      
      if (!allocation[type]) {
        allocation[type] = {
          name: type,
          value: 0,
          color: source.colorCode || '#4F46E5'
        };
      }
      
      allocation[type].value += balance;
    });

    // Convert to array and calculate percentages
    return Object.values(allocation).map(item => ({
      ...item,
      percentage: (item.value / total) * 100
    }));
  };

  // Get spending by category data
  const spendingByCategory = getSpendingByCategory();
  
  // Get income vs expenses data
  const incomeVsExpenses = getIncomeVsExpenses();
  
  // Get savings rate data
  const savingsRate = getSavingsRate();
  
  // Get asset allocation data
  const assetAllocation = getAssetAllocation();

  // Calculate total income, expenses and savings
  const totalIncome = incomeVsExpenses.reduce((sum, month) => sum + month.income, 0);
  const totalExpenses = incomeVsExpenses.reduce((sum, month) => sum + month.expenses, 0);
  const totalSavings = totalIncome - totalExpenses;
  const overallSavingsRate = (totalSavings / totalIncome) * 100;

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 p-3 border border-slate-700 rounded-lg shadow-lg">
          <p className="text-slate-300 font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color || entry.stroke }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Financial Reports</h2>
          <p className="text-slate-400 text-sm">Analyze your financial performance</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={reportPeriod}
              onChange={(e) => setReportPeriod(e.target.value)}
              className="bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <TbChevronRight className="h-4 w-4 text-slate-400 transform rotate-90" />
            </div>
          </div>
          
          <button className="bg-slate-700 hover:bg-slate-600 text-white rounded-lg px-4 py-2 flex items-center transition-colors">
            <TbDownload className="mr-2 h-4 w-4" />
            Export
          </button>
          
          <button className="bg-slate-700 hover:bg-slate-600 text-white rounded-lg px-4 py-2 flex items-center transition-colors">
            <TbFilter className="mr-2 h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Report Navigation */}
      <div className="bg-slate-800/60 rounded-xl overflow-hidden border border-slate-700/50 backdrop-blur-sm">
        <div className="flex overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setSelectedReport('overview')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              selectedReport === 'overview' 
                ? 'text-primary-400 border-b-2 border-primary-500' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setSelectedReport('income')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              selectedReport === 'income' 
                ? 'text-primary-400 border-b-2 border-primary-500' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Income vs Expenses
          </button>
          <button
            onClick={() => setSelectedReport('spending')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              selectedReport === 'spending' 
                ? 'text-primary-400 border-b-2 border-primary-500' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Spending Analysis
          </button>
          <button
            onClick={() => setSelectedReport('assets')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              selectedReport === 'assets' 
                ? 'text-primary-400 border-b-2 border-primary-500' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Asset Allocation
          </button>
        </div>
      </div>

      {/* Report Content */}
      <div className="space-y-6">
        {selectedReport === 'overview' && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Income Card */}
              <div className="bg-slate-800/60 rounded-xl overflow-hidden border border-slate-700/50 backdrop-blur-sm p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-slate-400 text-sm font-medium">Total Income</h3>
                  <div className="bg-green-500/20 rounded-full p-2">
                    <TbArrowUpRight className="h-5 w-5 text-green-500" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold text-white">{formatCurrency(totalIncome)}</div>
                  <div className="text-sm text-green-400 mt-1">+12% from previous period</div>
                </div>
              </div>
              
              {/* Expenses Card */}
              <div className="bg-slate-800/60 rounded-xl overflow-hidden border border-slate-700/50 backdrop-blur-sm p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-slate-400 text-sm font-medium">Total Expenses</h3>
                  <div className="bg-red-500/20 rounded-full p-2">
                    <TbArrowDownRight className="h-5 w-5 text-red-500" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold text-white">{formatCurrency(totalExpenses)}</div>
                  <div className="text-sm text-red-400 mt-1">+5% from previous period</div>
                </div>
              </div>
              
              {/* Savings Card */}
              <div className="bg-slate-800/60 rounded-xl overflow-hidden border border-slate-700/50 backdrop-blur-sm p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-slate-400 text-sm font-medium">Savings Rate</h3>
                  <div className="bg-blue-500/20 rounded-full p-2">
                    <TbCalendarStats className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold text-white">{formatPercentage(overallSavingsRate)}</div>
                  <div className="text-sm text-blue-400 mt-1">{formatCurrency(totalSavings)} saved</div>
                </div>
              </div>
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Income vs Expenses Chart */}
              <div className="bg-slate-800/60 rounded-xl overflow-hidden border border-slate-700/50 backdrop-blur-sm p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Income vs Expenses</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={incomeVsExpenses}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                      <XAxis dataKey="month" tick={{ fill: '#94a3b8' }} />
                      <YAxis tick={{ fill: '#94a3b8' }} tickFormatter={(value) => formatCurrency(value, 'KES', 0)} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="income" name="Income" fill="#10B981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expenses" name="Expenses" fill="#EF4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Asset Allocation Chart */}
              <div className="bg-slate-800/60 rounded-xl overflow-hidden border border-slate-700/50 backdrop-blur-sm p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Asset Allocation</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={assetAllocation}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {assetAllocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        )}
        
        {selectedReport === 'income' && (
          <div className="bg-slate-800/60 rounded-xl overflow-hidden border border-slate-700/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Income vs Expenses Trend</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={incomeVsExpenses}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                  <XAxis dataKey="month" tick={{ fill: '#94a3b8' }} />
                  <YAxis tick={{ fill: '#94a3b8' }} tickFormatter={(value) => formatCurrency(value, 'KES', 0)} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="income" name="Income" stroke="#10B981" fillOpacity={1} fill="url(#colorIncome)" />
                  <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#EF4444" fillOpacity={1} fill="url(#colorExpenses)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="text-slate-300 text-sm font-medium">Average Monthly Income</h4>
                <div className="text-xl font-bold text-white mt-2">
                  {formatCurrency(totalIncome / incomeVsExpenses.length)}
                </div>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="text-slate-300 text-sm font-medium">Average Monthly Expenses</h4>
                <div className="text-xl font-bold text-white mt-2">
                  {formatCurrency(totalExpenses / incomeVsExpenses.length)}
                </div>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="text-slate-300 text-sm font-medium">Average Monthly Savings</h4>
                <div className="text-xl font-bold text-white mt-2">
                  {formatCurrency((totalIncome - totalExpenses) / incomeVsExpenses.length)}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {selectedReport === 'spending' && (
          <div className="bg-slate-800/60 rounded-xl overflow-hidden border border-slate-700/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Spending by Category</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={spendingByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {spendingByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <div className="space-y-4">
                  {spendingByCategory.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: category.color }}></div>
                        <span className="text-slate-300">{category.name}</span>
                      </div>
                      <div className="text-white font-medium">{formatCurrency(category.value)}</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-700">
                  <div className="flex items-center justify-between text-lg">
                    <span className="text-slate-300 font-medium">Total Spending</span>
                    <span className="text-white font-bold">
                      {formatCurrency(spendingByCategory.reduce((sum, cat) => sum + cat.value, 0))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {selectedReport === 'assets' && (
          <div className="bg-slate-800/60 rounded-xl overflow-hidden border border-slate-700/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Asset Allocation</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetAllocation}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {assetAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <div className="space-y-4">
                  {assetAllocation.map((asset, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: asset.color }}></div>
                        <span className="text-slate-300">{asset.name}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="text-white font-medium mr-4">{formatCurrency(asset.value)}</div>
                        <div className="text-slate-400 text-sm">{formatPercentage(asset.percentage)}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-700">
                  <div className="flex items-center justify-between text-lg">
                    <span className="text-slate-300 font-medium">Total Assets</span>
                    <span className="text-white font-bold">
                      {formatCurrency(assetAllocation.reduce((sum, asset) => sum + asset.value, 0))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsComponent;
