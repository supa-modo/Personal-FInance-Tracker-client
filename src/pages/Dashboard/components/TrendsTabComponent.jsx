import React, { useState, useMemo } from 'react';
import { 
  TbChartLine, 
  TbCalendarStats, 
  TbChevronRight,
  TbArrowUpRight,
  TbArrowDownRight,
  TbFilter
} from 'react-icons/tb';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart,
  Bar,
  BarChart
} from 'recharts';
import { formatCurrency, formatPercentage } from '../../../utils/formatters';

const TrendsTabComponent = ({ historicalData, financialSources }) => {
  const [timeRange, setTimeRange] = useState('6m'); // 1m, 3m, 6m, 1y, all
  const [comparisonMode, setComparisonMode] = useState('none'); // none, mom, yoy

  // Generate mock historical data if not provided
  const getHistoricalData = () => {
    if (historicalData && historicalData.length > 0) {
      return historicalData;
    }

    return [];
  };

  // Prepare data for charts
  const chartData = useMemo(() => {
    const data = getHistoricalData();
    
    // Filter data based on selected time range
    const filteredData = data.filter(item => {
      const itemDate = new Date(item.date);
      const today = new Date();
      const monthsAgo = new Date(today);
      
      if (timeRange === '1m') {
        monthsAgo.setMonth(today.getMonth() - 1);
      } else if (timeRange === '3m') {
        monthsAgo.setMonth(today.getMonth() - 3);
      } else if (timeRange === '6m') {
        monthsAgo.setMonth(today.getMonth() - 6);
      } else if (timeRange === '1y') {
        monthsAgo.setMonth(today.getMonth() - 12);
      } else {
        // 'all' - no filtering
        return true;
      }
      
      return itemDate >= monthsAgo;
    });
    
    // Calculate period-over-period changes if comparison mode is enabled
    if (comparisonMode !== 'none' && filteredData.length > 1) {
      const comparisonPeriod = comparisonMode === 'mom' ? 1 : 12; // 1 month or 12 months
      
      return filteredData.map((item, index) => {
        const comparisonIndex = index - comparisonPeriod;
        let change = 0;
        let changePercentage = 0;
        
        if (comparisonIndex >= 0) {
          const previousValue = filteredData[comparisonIndex].netWorth;
          change = item.netWorth - previousValue;
          changePercentage = (change / previousValue) * 100;
        }
        
        return {
          ...item,
          change,
          changePercentage
        };
      });
    }
    
    return filteredData;
  }, [historicalData, timeRange, comparisonMode]);

  // Calculate key metrics
  const metrics = useMemo(() => {
    if (chartData.length < 2) {
      return {
        currentNetWorth: 0,
        changeAmount: 0,
        changePercentage: 0,
        trend: 'neutral'
      };
    }
    
    const current = chartData[chartData.length - 1].netWorth;
    const first = chartData[0].netWorth;
    const changeAmount = current - first;
    // Store as decimal for consistent handling
    const changePercentage = first !== 0 ? changeAmount / first : 0;
    
    return {
      currentNetWorth: current,
      changeAmount,
      changePercentage,
      trend: changeAmount > 0 ? 'up' : changeAmount < 0 ? 'down' : 'neutral'
    };
  }, [chartData]);

  // Calculate growth rate (CAGR)
  const growthRate = useMemo(() => {
    if (chartData.length < 2) return 0;
    
    const firstValue = chartData[0].netWorth;
    const lastValue = chartData[chartData.length - 1].netWorth;
    const years = timeRange === '1m' ? 1/12 : 
                 timeRange === '3m' ? 3/12 : 
                 timeRange === '6m' ? 6/12 : 
                 timeRange === '1y' ? 1 : 2;
    
    // CAGR formula: (FV/PV)^(1/n) - 1
    // Store as decimal for consistent handling
    return firstValue > 0 ? Math.pow(lastValue / firstValue, 1 / years) - 1 : 0;
  }, [chartData, timeRange]);

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 py-1.5 px-2 md:py-2 md:px-3 text-[0.8rem] md:text-[0.85rem] border border-slate-700 rounded-lg shadow-lg">
          <p className="text-slate-300  font-medium">{new Date(label).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color || entry.stroke }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
          {comparisonMode !== 'none' && payload[0].payload.changePercentage && (
            <p className={payload[0].payload.changePercentage >= 0 ? 'text-green-400' : 'text-red-400'}>
              Change: {(payload[0].payload.changePercentage * 100).toFixed(2)}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mx-2 md:mx-0 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-xl font-bold text-white">Net Worth Trends</h2>
          <p className="text-slate-400 text-sm">Track your financial progress over time</p>
        </div>
        
        <div className="flex items-center space-x-3 md:space-x-4">
          <div className="bg-slate-800/60 rounded-lg overflow-hidden border border-slate-700/50 flex">
            <button
              onClick={() => setTimeRange('1m')}
              className={`px-3 py-2 text-[0.8rem] md:text-sm ${timeRange === '1m' ? 'bg-primary-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              1M
            </button>
            <button
              onClick={() => setTimeRange('3m')}
              className={`px-3 py-2 text-[0.8rem] md:text-sm  ${timeRange === '3m' ? 'bg-primary-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              3M
            </button>
            <button
              onClick={() => setTimeRange('6m')}
              className={`px-3 py-2 text-[0.8rem] md:text-sm  ${timeRange === '6m' ? 'bg-primary-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              6M
            </button>
            <button
              onClick={() => setTimeRange('1y')}
              className={`px-3 py-2 text-[0.8rem] md:text-sm  ${timeRange === '1y' ? 'bg-primary-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              1Y
            </button>
            <button
              onClick={() => setTimeRange('all')}
              className={`px-3 py-2 text-[0.8rem] md:text-sm font-semibold ${timeRange === 'all' ? 'bg-primary-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              All
            </button>
          </div>
          
          <select
            value={comparisonMode}
            onChange={(e) => setComparisonMode(e.target.value)}
            className="bg-slate-700 border border-slate-600 text-sm md:text-base text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="none">No Comparison</option>
            <option value="mom">Month over Month</option>
            <option value="yoy">Year over Year</option>
          </select>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
        {/* Current Net Worth Card */}
        <div className="bg-slate-800/60 rounded-xl overflow-hidden border border-slate-700/50 backdrop-blur-sm mx-2.5 md:mx-0 p-3 md:p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-400 text-sm font-medium">Current Net Worth</h3>
            <div className="bg-primary-500/20 rounded-full p-2">
              <TbChartLine className="h-5 w-5 text-primary-500" />
            </div>
          </div>
          <div className="font-lexend mt-1 md:mt-2">
            <div className="text-2xl font-bold text-white">{formatCurrency(metrics.currentNetWorth)}</div>
            <div className={`text-[0.8rem] md:text-sm flex items-center mt-1 ${metrics.trend === 'up' ? 'text-green-400' : metrics.trend === 'down' ? 'text-red-400' : 'text-slate-400'}`}>
              {metrics.trend === 'up' ? (
                <TbArrowUpRight className="h-4 w-4 mr-1" />
              ) : metrics.trend === 'down' ? (
                <TbArrowDownRight className="h-4 w-4 mr-1" />
              ) : null}
              {formatCurrency(Math.abs(metrics.changeAmount))} ({(metrics.changePercentage * 100).toFixed(2)}%)
            </div>
          </div>
        </div>
        
        {/* Growth Rate Card */}
        <div className="bg-slate-800/60 rounded-xl overflow-hidden border border-slate-700/50 backdrop-blur-sm mx-2.5 md:mx-0 p-3 md:p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-400 text-sm font-medium">Growth Rate (CAGR)</h3>
            <div className={`${growthRate >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'} rounded-full p-2`}>
              {growthRate >= 0 ? (
                <TbArrowUpRight className="h-5 w-5 text-green-500" />
              ) : (
                <TbArrowDownRight className="h-5 w-5 text-red-500" />
              )}
            </div>
          </div>
          <div className="font-lexend mt-1 md:mt-2">
            <div className={`text-2xl font-bold ${growthRate >= 0 ? 'text-white' : 'text-red-400'}`}>
              {(growthRate * 100).toFixed(2)}%
            </div>
            <div className="font-lexend text-[0.8rem] md:text-sm text-slate-400 mt-1">
              Annualized growth rate
            </div>
          </div>
        </div>
        
        {/* Time Period Card */}
        <div className="bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-700/50 backdrop-blur-sm mx-2.5 md:mx-0 p-3 md:p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-400 text-sm font-medium">Time Period</h3>
            <div className="bg-purple-500/20 rounded-full p-2">
              <TbCalendarStats className="h-5 w-5 text-purple-500" />
            </div>
          </div>
          <div className="font-lexend mt-1 md:mt-2">
            <div className="text-2xl font-bold text-white">
              {timeRange === '1m' ? 'Last Month' : 
               timeRange === '3m' ? 'Last 3 Months' : 
               timeRange === '6m' ? 'Last 6 Months' : 
               timeRange === '1y' ? 'Last Year' : 'All Time'}
            </div>
            <div className="text-[0.8rem] md:text-sm font-lexend text-slate-400 mt-1">
              {chartData.length > 0 ? `${new Date(chartData[0].date).toLocaleDateString()} - ${new Date(chartData[chartData.length - 1].date).toLocaleDateString()}` : 'No data available'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-700/50 backdrop-blur-sm mx-2.5 md:mx-0 py-3 md:p-6">
        <div className="flex items-center justify-between px-3 md:px-0 mb-6">
          <h3 className="text-base md:text-lg font-semibold text-primary-500">Net Worth Trend</h3>
          <button className="bg-slate-700 hover:bg-slate-600 text-sm md:text-base text-white rounded-lg px-4 py-2 flex items-center transition-colors">
            <TbFilter className="mr-2 h-4 w-4" />
            Customize
          </button>
        </div>
        
        <div className="h-96 px-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#94a3b8' }} 
                tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', year: '2-digit' })}
                fontSize={12}
              />
              <YAxis tick={{ fill: '#94a3b8' }} tickFormatter={(value) => formatCurrency(value, { notation: 'compact' })} fontSize={11} />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="netWorth" 
                name="Net Worth"
                stroke="#4F46E5" 
                strokeWidth={3}
                fill="url(#colorNetWorth)" 
                activeDot={{ r: 6, strokeWidth: 0, fill: '#4F46E5' }} 
              />
              {comparisonMode !== 'none' && (
                <Line 
                  type="monotone" 
                  dataKey="changePercentage" 
                  name="Change %" 
                  yAxisId="right" 
                  stroke="#10B981" 
                  strokeDasharray="3 3"
                  dot={false}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-6">
        {/* Assets vs Liabilities Chart */}
        <div className="bg-slate-800/60 rounded-t-2xl md:rounded-2xl overflow-hidden border border-slate-700/50 backdrop-blur-sm mx-2.5 md:mx-0 p-3 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-primary-500 mb-4">Assets vs Liabilities</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{ top: 15, right: 10, left: 10, bottom: 5 }}
                
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#94a3b8' }} 
                  tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short' })}
                  fontSize={12}
                />
                <YAxis tick={{ fill: '#94a3b8' }} tickFormatter={(value) => formatCurrency(value, { notation: 'compact' })} fontSize={11} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="assets" name="Assets" stackId="a" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="liabilities" name="Liabilities" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="netWorth" name="Net Worth" stroke="#4F46E5" strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Monthly Change Chart */}
        <div className="bg-slate-800/60 rounded-b-2xl md:rounded-2xl overflow-hidden border border-slate-700/50 backdrop-blur-sm mx-2.5 md:mx-0 p-3 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-primary-500 mb-4">Monthly Change</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData.map((item, index, array) => {
                  if (index === 0) return { ...item, change: 0 };
                  const prevItem = array[index - 1];
                  return {
                    ...item,
                    change: item.netWorth - prevItem.netWorth
                  };
                }).slice(1)} // Skip the first item as it has no change
                margin={{ top: 15, right: 10, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#94a3b8' }} 
                  tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short' })}
                  fontSize={12}
                />
                <YAxis tick={{ fill: '#94a3b8' }} tickFormatter={(value) => formatCurrency(value, { notation: 'compact' })} fontSize={11} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="change" 
                  name="Monthly Change"
                  fill={(data) => data.change >= 0 ? "#10B981" : "#EF4444"}
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-700/50 backdrop-blur-sm mx-2.5 md:mx-0 p-3 md:p-6">
        <h3 className="text-lg font-semibold text-primary-500 mb-4">Trend Insights</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-700/30 rounded-lg px-3 py-3 md:p-4">
            <h4 className="text-blue-400 font-medium mb-2">Growth Analysis</h4>
            <p className="text-slate-300 text-sm">
              {metrics.trend === 'up' 
                ? `Your net worth has grown by ${formatPercentage(metrics.changePercentage)} over this period, showing positive financial progress.`
                : metrics.trend === 'down'
                ? `Your net worth has decreased by ${formatPercentage(Math.abs(metrics.changePercentage))} over this period. Consider reviewing your spending and saving habits.`
                : 'Your net worth has remained stable over this period.'}
            </p>
            
          </div>
          
          <div className="bg-slate-700/30 rounded-lg px-3 py-3 md:p-4">
            <h4 className="text-blue-400 font-medium mb-2">Recommendations</h4>
            <ul className="text-slate-300 text-sm space-y-2">
              <li className="flex items-start">
                <TbChevronRight className="h-4 w-4 mt-0.5 mr-2 text-primary-400" />
                <span>
                  {growthRate >= 15 
                    ? 'Consider diversifying your investments to protect your impressive growth.'
                    : growthRate >= 5
                    ? 'Your growth rate is healthy. Continue your current financial strategy.'
                    : growthRate >= 0
                    ? 'Consider increasing your savings rate to accelerate growth.'
                    : 'Review your expenses and consider increasing your income sources.'}
                </span>
              </li>
              <li className="flex items-start">
                <TbChevronRight className="h-4 w-4 mt-0.5 mr-2 text-primary-400" />
                <span>Set up automatic transfers to your investment accounts to maintain growth momentum.</span>
              </li>
            </ul>
            <div className="mt-4 text-primary-400 text-sm flex items-center cursor-pointer">
              <span>Get personalized advice</span>
              <TbChevronRight className="ml-1 h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendsTabComponent;
