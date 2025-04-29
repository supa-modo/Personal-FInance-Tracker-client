import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TbPlus, 
  TbArrowUpRight, 
  TbArrowDownRight, 
  TbCurrencyDollar,
  TbChartLine,
  TbWallet,
  TbRefresh,
  TbChevronRight,
  TbCreditCard,
  TbPigMoney,
  TbBuildingBank,
  TbChartBar,
  TbCalendarStats,
  TbTrendingUp,
  TbAlertCircle,
  TbEye,
  TbSettings
} from 'react-icons/tb';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, BarChart, Bar } from 'recharts';
import MainLayout from '../../components/layout/MainLayout';
import useFinancial from '../../hooks/useFinancial';
import { formatCurrency, formatDate, getRelativeTimeString } from '../../utils/formatters';

const Dashboard = () => {
  const { 
    financialSources, 
    loading, 
    error, 
    getNetWorth,
    getHistoricalNetWorth
  } = useFinancial();
  
  const [netWorth, setNetWorth] = useState(0);
  const [historicalData, setHistoricalData] = useState([]);
  const [timePeriod, setTimePeriod] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');
  const [showWelcomeCard, setShowWelcomeCard] = useState(true);
  
  useEffect(() => {
    if (!loading) {
      // Calculate net worth
      const worth = getNetWorth();
      setNetWorth(worth);
      
      // Get historical data
      const history = getHistoricalNetWorth(timePeriod);
      setHistoricalData(history);
    }
  }, [loading, financialSources, timePeriod, getNetWorth, getHistoricalNetWorth]);
  
  // Get active financial sources
  const activeSources = financialSources.filter(source => source.isActive);
  
  // Get the latest balance for each source
  const sourceData = activeSources.map(source => {
    const updates = source.updates || [];
    const latestUpdate = updates.length > 0 
      ? updates.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] 
      : null;
    
    // Get previous update for comparison
    const previousUpdate = updates.length > 1
      ? updates.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[1]
      : null;
    
    // Calculate change
    const currentBalance = latestUpdate ? parseFloat(latestUpdate.balance) : 0;
    const previousBalance = previousUpdate ? parseFloat(previousUpdate.balance) : 0;
    const change = currentBalance - previousBalance;
    const changePercentage = previousBalance !== 0 ? (change / previousBalance) * 100 : 0;
    
    return {
      id: source.id,
      name: source.name,
      type: source.type,
      colorCode: source.colorCode,
      balance: currentBalance,
      lastUpdated: latestUpdate ? latestUpdate.createdAt : null,
      change,
      changePercentage,
      isPositive: change >= 0,
    };
  });
  
  // Calculate total assets
  const totalAssets = sourceData.reduce((sum, source) => sum + source.balance, 0);
  
  // Prepare data for pie chart
  const pieChartData = sourceData.map(source => ({
    name: source.name,
    value: source.balance,
    color: source.colorCode,
  }));
  
  // Prepare data for line chart
  const lineChartData = historicalData.map(item => ({
    date: formatDate(item.date, { month: 'short', day: 'numeric' }),
    total: item.total,
  }));
  
  // Generate monthly data for area chart
  const generateMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    
    return months.slice(0, currentMonth + 1).map((month, index) => {
      // Use actual data if available, otherwise generate sample data
      const monthData = historicalData.find(item => {
        const itemDate = new Date(item.date);
        return itemDate.getMonth() === index;
      });
      
      return {
        name: month,
        value: monthData ? monthData.total : Math.random() * 5000 + 5000,
      };
    });
  };
  
  const monthlyData = generateMonthlyData();
  
  // Calculate change from previous period
  const calculateChange = () => {
    if (historicalData.length < 2) return { amount: 0, percentage: 0, isPositive: true };
    
    const currentTotal = historicalData[historicalData.length - 1]?.total || 0;
    const previousTotal = historicalData[0]?.total || 0;
    
    const change = currentTotal - previousTotal;
    const percentage = previousTotal !== 0 ? (change / previousTotal) * 100 : 0;
    
    return {
      amount: change,
      percentage,
      isPositive: change >= 0,
    };
  };
  
  const change = calculateChange();
  
  // Get financial source types for distribution chart
  const typeDistribution = activeSources.reduce((acc, source) => {
    const type = source.type;
    const updates = source.updates || [];
    const latestUpdate = updates.length > 0 
      ? updates.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] 
      : null;
    const balance = latestUpdate ? parseFloat(latestUpdate.balance) : 0;
    
    if (!acc[type]) {
      acc[type] = {
        type: getTypeLabel(source.type),
        value: 0,
        color: getTypeColor(source.type),
      };
    }
    
    acc[type].value += balance;
    return acc;
  }, {});
  
  const typeDistributionData = Object.values(typeDistribution);
  
  // Helper function to get type label
  function getTypeLabel(type) {
    switch (type) {
      case 'BANK_ACCOUNT': return 'Bank Account';
      case 'MONEY_MARKET': return 'Money Market';
      case 'STOCKS': return 'Stocks';
      case 'MPESA': return 'M-Pesa';
      case 'SACCO': return 'SACCO';
      case 'OTHER': return 'Other';
      default: return type;
    }
  }
  
  // Helper function to get type color
  function getTypeColor(type) {
    switch (type) {
      case 'BANK_ACCOUNT': return '#4CAF50';
      case 'MONEY_MARKET': return '#2196F3';
      case 'STOCKS': return '#FF5722';
      case 'MPESA': return '#9C27B0';
      case 'SACCO': return '#FFC107';
      case 'OTHER': return '#607D8B';
      default: return '#9E9E9E';
    }
  }
  
  // Helper function to get type icon
  function getTypeIcon(type) {
    switch (type) {
      case 'BANK_ACCOUNT': return <TbBuildingBank className="h-5 w-5 text-white" />;
      case 'MONEY_MARKET': return <TbPigMoney className="h-5 w-5 text-white" />;
      case 'STOCKS': return <TbTrendingUp className="h-5 w-5 text-white" />;
      case 'MPESA': return <TbCreditCard className="h-5 w-5 text-white" />;
      case 'SACCO': return <TbWallet className="h-5 w-5 text-white" />;
      case 'OTHER': return <TbCurrencyDollar className="h-5 w-5 text-white" />;
      default: return <TbCurrencyDollar className="h-5 w-5 text-white" />;
    }
  }
  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-6 text-gray-600 font-medium">Loading your financial dashboard...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TbAlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-red-800">Error Loading Dashboard</h3>
              <p className="mt-1 text-sm text-red-700">
                {error}
              </p>
              <button 
                className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => window.location.reload()}
              >
                <TbRefresh className="-ml-1 mr-2 h-4 w-4" />
                Retry
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      {/* Welcome card - can be dismissed */}
      {showWelcomeCard && (
        <div className="mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-8 md:flex md:items-center md:justify-between">
            <div className="md:flex-1">
              <h2 className="text-2xl font-bold text-white">Welcome to your Financial Dashboard</h2>
              <p className="mt-2 text-blue-100">
                Track your assets, monitor growth, and visualize your financial journey all in one place.
              </p>
              <div className="mt-4 flex space-x-3">
                <Link
                  to="/financial-sources/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-indigo-600"
                >
                  <TbPlus className="-ml-1 mr-2 h-5 w-5" />
                  Add Source
                </Link>
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-800 bg-opacity-50 hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <TbChartLine className="-ml-1 mr-2 h-5 w-5" />
                  View Tutorial
                </button>
              </div>
            </div>
            <div className="mt-6 md:mt-0 md:ml-8 flex-shrink-0">
              <button 
                onClick={() => setShowWelcomeCard(false)}
                className="text-blue-100 hover:text-white absolute top-4 right-4"
              >
                <span className="sr-only">Dismiss</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Dashboard tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`${activeTab === 'overview' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('assets')}
            className={`${activeTab === 'assets' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Assets
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={`${activeTab === 'trends' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Trends
          </button>
        </nav>
      </div>
      
      {/* Page header */}
      <div className="pb-5 mb-6 sm:flex sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Financial Dashboard</h1>
        <div className="mt-3 sm:mt-0 sm:ml-4 flex space-x-3">
          <div className="relative inline-block text-left">
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          <Link
            to="/financial-sources/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <TbPlus className="-ml-1 mr-2 h-5 w-5" />
            Add Financial Source
          </Link>
        </div>
      </div>
      {activeTab === 'overview' && (
        <>
          {/* Stats cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Net worth card */}
            <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100">
              <div className="px-6 py-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-3">
                    <TbCurrencyDollar className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Net Worth
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-3xl font-bold text-gray-900">
                          {formatCurrency(netWorth)}
                        </div>
                        {change.amount !== 0 && (
                          <div className={`ml-3 flex items-baseline text-sm font-semibold ${
                            change.isPositive ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {change.isPositive ? (
                              <TbArrowUpRight className="self-center flex-shrink-0 h-5 w-5" />
                            ) : (
                              <TbArrowDownRight className="self-center flex-shrink-0 h-5 w-5" />
                            )}
                            <span className="ml-1">
                              {change.isPositive ? '+' : ''}
                              {formatCurrency(change.amount)} ({change.isPositive ? '+' : ''}
                              {change.percentage.toFixed(1)}%)
                            </span>
                          </div>
                        )}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-3">
                <div className="text-sm">
                  <Link to="/financial-sources" className="font-medium text-primary-600 hover:text-primary-500 flex items-center">
                    View all sources
                    <TbChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Total Assets card */}
            <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100">
              <div className="px-6 py-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-gradient-to-r from-green-400 to-green-600 rounded-xl p-3">
                    <TbWallet className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Assets
                      </dt>
                      <dd>
                        <div className="text-3xl font-bold text-gray-900">
                          {formatCurrency(totalAssets)}
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          Across {activeSources.length} financial sources
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-3">
                <div className="text-sm">
                  <button className="font-medium text-primary-600 hover:text-primary-500 flex items-center">
                    View breakdown
                    <TbChevronRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Last Updated card */}
            <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100">
              <div className="px-6 py-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl p-3">
                    <TbCalendarStats className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Last Updated
                      </dt>
                      <dd>
                        <div className="text-xl font-semibold text-gray-900">
                          {sourceData.length > 0 && sourceData.some(s => s.lastUpdated) ? 
                            formatDate(sourceData.sort((a, b) => 
                              new Date(b.lastUpdated || 0) - new Date(a.lastUpdated || 0)
                            )[0].lastUpdated, { dateStyle: 'medium' }) : 
                            'No updates yet'
                          }
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          {sourceData.length > 0 && sourceData.some(s => s.lastUpdated) ? 
                            getRelativeTimeString(sourceData.sort((a, b) => 
                              new Date(b.lastUpdated || 0) - new Date(a.lastUpdated || 0)
                            )[0].lastUpdated) : 
                            'Add your first update'
                          }
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-3">
                <div className="text-sm">
                  <button className="font-medium text-primary-600 hover:text-primary-500 flex items-center">
                    Update balances
                    <TbChevronRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Charts grid */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Net Worth Trend Chart */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
              <div className="px-6 py-5 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Net Worth Trend</h2>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 rounded-md hover:bg-gray-100">
                      <TbEye className="h-5 w-5 text-gray-500" />
                    </button>
                    <button className="p-1 rounded-md hover:bg-gray-100">
                      <TbSettings className="h-5 w-5 text-gray-500" />
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
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis 
                        dataKey="date" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        tickFormatter={(value) => formatCurrency(value, 'KES', 0)}
                      />
                      <Tooltip 
                        formatter={(value) => formatCurrency(value)}
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                          border: 'none'
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
            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
              <div className="px-6 py-5 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Asset Distribution</h2>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 rounded-md hover:bg-gray-100">
                      <TbEye className="h-5 w-5 text-gray-500" />
                    </button>
                    <button className="p-1 rounded-md hover:bg-gray-100">
                      <TbSettings className="h-5 w-5 text-gray-500" />
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
                            stroke="#fff"
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => formatCurrency(value)}
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                          border: 'none'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Quick actions */}
      <div className="mt-8 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/financial-sources"
              className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition duration-150 ease-in-out shadow-sm"
            >
              <div className="flex-shrink-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg p-3">
                <TbWallet className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-medium text-gray-900">Manage Sources</h4>
                <p className="mt-1 text-xs text-gray-500">Add, edit, or remove financial sources</p>
              </div>
            </Link>
            <Link
              to="/"
              className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition duration-150 ease-in-out shadow-sm"
            >
              <div className="flex-shrink-0 bg-gradient-to-r from-green-400 to-green-600 rounded-lg p-3">
                <TbRefresh className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-medium text-gray-900">Update Balances</h4>
                <p className="mt-1 text-xs text-gray-500">Record new balances for your accounts</p>
              </div>
            </Link>
            <Link
              to="/"
              className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition duration-150 ease-in-out shadow-sm"
            >
              <div className="flex-shrink-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg p-3">
                <TbChartLine className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-medium text-gray-900">View Analytics</h4>
                <p className="mt-1 text-xs text-gray-500">See detailed financial analytics</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {activeTab === 'overview' && (
        <>
          {/* Financial sources list */}
          <div className="mt-8 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Financial Sources</h2>
                <Link
                  to="/financial-sources/new"
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <TbPlus className="-ml-1 mr-1 h-4 w-4" />
                  Add New
                </Link>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="flow-root">
                <ul className="divide-y divide-gray-200">
                  {sourceData.map((source) => (
                    <li key={source.id} className="px-6 py-5 hover:bg-gray-50 transition duration-150 ease-in-out">
                      <Link to={`/financial-sources/${source.id}`} className="block">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div
                              className="inline-flex items-center justify-center h-12 w-12 rounded-lg"
                              style={{ backgroundColor: source.colorCode }}
                            >
                              {getTypeIcon(source.type)}
                            </div>
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-base font-medium text-gray-900 truncate">
                                {source.name}
                              </p>
                              <div className="ml-2 flex-shrink-0 flex">
                                <p className="text-base font-semibold text-gray-900">
                                  {formatCurrency(source.balance)}
                                </p>
                              </div>
                            </div>
                            <div className="mt-1 flex items-center justify-between">
                              <p className="text-sm text-gray-500 truncate">
                                {getTypeLabel(source.type)}
                              </p>
                              <div className="ml-2 flex items-center">
                                {source.change !== 0 && (
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${source.isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {source.isPositive ? '+' : ''}{source.changePercentage.toFixed(1)}%
                                  </span>
                                )}
                                {source.lastUpdated && (
                                  <span className="ml-2 text-xs text-gray-500">
                                    Updated {getRelativeTimeString(source.lastUpdated)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="ml-2">
                            <TbChevronRight className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {sourceData.length === 0 && (
                <div className="px-6 py-10 text-center">
                  <TbWallet className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-base font-medium text-gray-900">No financial sources</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by adding your first financial source.</p>
                  <div className="mt-6">
                    <Link
                      to="/financial-sources/new"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <TbPlus className="-ml-1 mr-2 h-5 w-5" />
                      Add Financial Source
                    </Link>
                  </div>
                </div>
              )}
              {sourceData.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <Link
                    to="/financial-sources"
                    className="text-sm font-medium text-primary-600 hover:text-primary-500 flex items-center justify-center"
                  >
                    View all financial sources
                    <TbChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      
      
    </MainLayout>
  );
};

export default Dashboard;
