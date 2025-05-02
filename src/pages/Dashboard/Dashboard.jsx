import React, { useState, useEffect, useMemo } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import useFinancial from '../../hooks/useFinancial';
import { formatCurrency, formatDate } from '../../utils/formatters';

// Import component files
import DashboardHeader from './components/DashboardHeader';
import DashboardTabs from './components/DashboardTabs';
import StatsCards from './components/StatsCards';
import DashboardCharts from './components/DashboardCharts';
import FinancialSourcesList from './components/FinancialSourcesList';
import QuickActions from './components/QuickActions';
import { LoadingState, ErrorState } from './components/DashboardStates';
import AssetsTabComponent from './components/AssetsTabComponent';
import TrendsTabComponent from './components/TrendsTabComponent';
import ReportsComponent from './components/ReportsComponent';

// Import icons
import {
  TbBuildingBank,
  TbPigMoney,
  TbTrendingUp,
  TbCreditCard,
  TbWallet,
  TbCurrencyDollar,
  TbRefresh
} from 'react-icons/tb';
import { PiMoneyWavyDuotone } from 'react-icons/pi';

const Dashboard = () => {
  const { 
    financialSources, 
    loading, 
    error, 
    netWorth,
    historicalData,
    getNetWorth,
    getHistoricalNetWorth,
    loadFinancialSources
  } = useFinancial();
  
  const [timePeriod, setTimePeriod] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Load dashboard data when component mounts or when timePeriod changes
  useEffect(() => {
    const loadData = async () => {
      if (!loading) {
        try {
          // Load net worth data (now async)
          await getNetWorth();
          
          // Load historical data (now async)
          await getHistoricalNetWorth(timePeriod);
        } catch (error) {
          console.error('Error loading dashboard data:', error);
        }
      }
    };
    
    loadData();
    // Only depend on loading and timePeriod to prevent infinite loops
    // getNetWorth and getHistoricalNetWorth are function references that shouldn't change
  }, [loading, timePeriod]);
  
  // Function to refresh all dashboard data
  const refreshDashboardData = async () => {
    setIsRefreshing(true);
    try {
      // Reload all financial sources
      await loadFinancialSources();
      
      // Reload net worth data
      await getNetWorth();
      
      // Reload historical data
      await getHistoricalNetWorth(timePeriod);
    } catch (error) {
      console.error('Error refreshing dashboard data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };
  
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
  const lineChartData = useMemo(() => {
    if (!Array.isArray(historicalData) || historicalData.length === 0) {
      console.log('No historical data available');
      return [];
    }
    
    // Make a deep copy of the data to avoid modifying the original
    const processedData = historicalData.map(item => ({
      date: formatDate(new Date(item.date), { month: 'short', day: 'numeric' }),
      total: typeof item.netWorth === 'number' ? item.netWorth : 
             typeof item.total === 'number' ? item.total : 
             parseFloat(item.netWorth || item.total || 0),
      rawDate: item.date, // Keep the raw date for sorting
    }));
    
    // Sort by date (oldest to newest)
    const sortedData = processedData.sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate));
    
    console.log('Processed line chart data:', sortedData);
    return sortedData;
  }, [historicalData]);
  
  // Calculate change from previous period
  const calculateChange = () => {
    if (!Array.isArray(historicalData) || historicalData.length < 2) {
      return { amount: 0, percentage: 0, isPositive: true };
    }
    
    // Sort data by date to ensure correct order
    const sortedData = [...historicalData].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Get first and last data points after sorting
    const firstDataPoint = sortedData[0];
    const lastDataPoint = sortedData[sortedData.length - 1];
    
    // Extract values, ensuring they are numbers
    const currentTotal = typeof lastDataPoint.netWorth === 'number' ? lastDataPoint.netWorth : 
                         typeof lastDataPoint.total === 'number' ? lastDataPoint.total : 
                         parseFloat(lastDataPoint.netWorth || lastDataPoint.total || 0);
                         
    const previousTotal = typeof firstDataPoint.netWorth === 'number' ? firstDataPoint.netWorth : 
                          typeof firstDataPoint.total === 'number' ? firstDataPoint.total : 
                          parseFloat(firstDataPoint.netWorth || firstDataPoint.total || 0);
    
    const change = currentTotal - previousTotal;
    const percentage = previousTotal !== 0 ? (change / previousTotal) * 100 : 0;
    
    console.log('Change calculation:', { currentTotal, previousTotal, change, percentage });
    
    return {
      amount: change,
      percentage,
      isPositive: change >= 0,
    };
  };
  
  const change = calculateChange();
  
  // Helper function to get type label
  function getTypeLabel(type) {
    switch (type) {
      case 'BANK_ACCOUNT': return 'Bank Account';
      case 'MONEY_MARKET': return 'Money Market';
      case 'STOCKS': return 'Stocks';
      case 'MPESA': return 'M-Pesa';
      case 'SACCO': return 'SACCO';
      case 'CASH': return 'Cash Money';
      case 'OTHER': return 'Other';
      default: return type;
    }
  }
  
  // Helper function to get type icon
  function getTypeIcon(type) {
    switch (type) {
      case 'BANK_ACCOUNT': return <TbBuildingBank className="h-6 w-6 text-white" />;
      case 'MONEY_MARKET': return <TbPigMoney className="h-6 w-6 text-white" />;
      case 'STOCKS': return <TbTrendingUp className="h-6 w-6 text-white" />;
      case 'MPESA': return <TbCreditCard className="h-6 w-6 text-white" />;
      case 'SACCO': return <TbWallet className="h-6 w-6 text-white" />;
      case 'CASH': return <PiMoneyWavyDuotone className="h-6 w-6 text-white" />;
      case 'OTHER': return <TbCurrencyDollar className="h-6 w-6 text-white" />;
      default: return <TbCurrencyDollar className="h-6 w-6 text-white" />;
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <LoadingState />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <ErrorState error={error} />
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <DashboardHeader 
          timePeriod={timePeriod} 
          setTimePeriod={setTimePeriod} 
        />
        <button 
          onClick={refreshDashboardData}
          disabled={isRefreshing}
          className="flex items-center justify-center p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          title="Refresh dashboard data"
        >
          <TbRefresh className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <DashboardTabs 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      {activeTab === 'overview' && (
        <>
          <StatsCards 
            netWorth={netWorth}
            totalAssets={totalAssets}
            change={change}
            activeSources={activeSources.length}
            sourceData={sourceData}
          />
          <QuickActions />
          
          <DashboardCharts 
            lineChartData={lineChartData}
            pieChartData={pieChartData}
          />
          
          {/* <ReportsComponent 
            financialSources={financialSources}
            historicalData={historicalData}
          /> */}
          
          <FinancialSourcesList 
            sourceData={sourceData}
            getTypeIcon={getTypeIcon}
            getTypeLabel={getTypeLabel}
          />
        </>
      )}
      
      {activeTab === 'assets' && (
        <AssetsTabComponent 
          financialSources={financialSources}
        />
      )}
      
      {activeTab === 'trends' && (
        <TrendsTabComponent 
          historicalData={historicalData}
          financialSources={financialSources}
        />
      )}
    </MainLayout>
  );
};

export default Dashboard;