import React, { useState, useEffect, useMemo } from "react";
import MainLayout from "../../components/layout/MainLayout";
import useFinancial from "../../hooks/useFinancial";
import { formatCurrency, formatDate } from "../../utils/formatters";
import {
  getNetWorthEvents,
  formatNetWorthEventsForChart,
} from "../../services/netWorth.service";

// Import component files
import DashboardHeader from "./components/DashboardHeader";
import DashboardTabs from "./components/DashboardTabs";
import StatsCards from "./components/StatsCards";
import DashboardCharts from "./components/DashboardCharts";
import FinancialSourcesList from "./components/FinancialSourcesList";
import QuickActions from "./components/QuickActions";
import { LoadingState, ErrorState } from "./components/DashboardStates";
import AssetsTabComponent from "./components/AssetsTabComponent";
import TrendsTabComponent from "./components/TrendsTabComponent";
import MpesaIcon from "../../components/ui/MpesaIcon";

// Import icons
import {
  TbBuildingBank,
  TbPigMoney,
  TbTrendingUp,
  TbCreditCard,
  TbWallet,
  TbCurrencyDollar,
  TbRefresh,
} from "react-icons/tb";
import { PiMoneyWavyDuotone } from "react-icons/pi";

const Dashboard = () => {
  const {
    financialSources,
    loading,
    error,
    netWorth,
    historicalData,
    getNetWorth,
    getHistoricalNetWorth,
    loadFinancialSources,
  } = useFinancial();

  const [timePeriod, setTimePeriod] = useState("month");
  const [activeTab, setActiveTab] = useState("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [netWorthEvents, setNetWorthEvents] = useState([]);
  const [netWorthEventsLoading, setNetWorthEventsLoading] = useState(false);

  // Load dashboard data when component mounts or when timePeriod changes
  useEffect(() => {
    const loadData = async () => {
      if (!loading) {
        try {
          // Load net worth data (now async)
          await getNetWorth();

          // Load historical data (now async)
          await getHistoricalNetWorth(timePeriod);

          // Load net worth events
          await loadNetWorthEvents(timePeriod);
        } catch (error) {
          console.error("Error loading dashboard data:", error);
        }
      }
    };

    loadData();
    // Only depend on loading and timePeriod to prevent infinite loops
    // getNetWorth and getHistoricalNetWorth are function references that shouldn't change
  }, [loading, timePeriod]);

  // Load net worth events from the API
  const loadNetWorthEvents = async (period) => {
    setNetWorthEventsLoading(true);
    try {
      // Map the dashboard time period to API period
      const apiPeriod =
        period === "week"
          ? "week"
          : period === "month"
          ? "month"
          : period === "quarter"
          ? "quarter"
          : period === "year"
          ? "year"
          : "all";

      const events = await getNetWorthEvents(apiPeriod);
      setNetWorthEvents(events);
      console.log("Loaded net worth events:", events.length);
    } catch (error) {
      console.error("Error loading net worth events:", error);
    } finally {
      setNetWorthEventsLoading(false);
    }
  };

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

      // Reload net worth events
      await loadNetWorthEvents(timePeriod);
    } catch (error) {
      console.error("Error refreshing dashboard data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Get active financial sources
  const activeSources = financialSources.filter((source) => source.isActive);

  // Get the latest balance for each source
  const sourceData = activeSources.map((source) => {
    const updates = source.updates || [];
    const latestUpdate =
      updates.length > 0
        ? updates.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )[0]
        : null;

    // Get previous update for comparison
    const previousUpdate =
      updates.length > 1
        ? updates.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )[1]
        : null;

    // Calculate change
    const currentBalance = latestUpdate ? parseFloat(latestUpdate.balance) : 0;
    const previousBalance = previousUpdate
      ? parseFloat(previousUpdate.balance)
      : 0;
    const change = currentBalance - previousBalance;
    const changePercentage =
      previousBalance !== 0 ? (change / previousBalance) * 100 : 0;

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
  const totalAssets = sourceData.reduce(
    (sum, source) => sum + source.balance,
    0
  );

  // Prepare data for pie chart
  const pieChartData = sourceData.map((source) => ({
    name: source.name,
    value: source.balance,
    color: source.colorCode,
  }));

  // Prepare data for line chart - prioritize net worth events if available
  const lineChartData = useMemo(() => {
    // Check if we have net worth events data
    if (Array.isArray(netWorthEvents) && netWorthEvents.length > 0) {
      // Format net worth events for chart display
      const formattedEvents = formatNetWorthEventsForChart(netWorthEvents);

      // Format dates for display
      const processedData = formattedEvents.map((item) => ({
        date: formatDate(new Date(item.date), {
          month: "short",
          day: "numeric",
        }),
        total: item.netWorth,
        rawDate: item.date, // Keep the raw date for sorting
      }));

      console.log(
        "Using net worth events for chart data:",
        processedData.length
      );
      return processedData;
    }

    // Fall back to historical data if no events
    if (!Array.isArray(historicalData) || historicalData.length === 0) {
      console.log("No historical data available");
      return [];
    }

    // Make a deep copy of the data to avoid modifying the original
    const processedData = historicalData.map((item) => ({
      date: formatDate(new Date(item.date), { month: "short", day: "numeric" }),
      total:
        typeof item.netWorth === "number"
          ? item.netWorth
          : typeof item.total === "number"
          ? item.total
          : parseFloat(item.netWorth || item.total || 0),
      rawDate: item.date, // Keep the raw date for sorting
    }));

    // Sort by date (oldest to newest)
    const sortedData = processedData.sort(
      (a, b) => new Date(a.rawDate) - new Date(b.rawDate)
    );

    console.log("Using historical data for chart data:", sortedData.length);
    return sortedData;
  }, [historicalData, netWorthEvents]);

  // Calculate change from previous period - prioritize net worth events if available
  const calculateChange = () => {
    // Check if we have net worth events data
    if (Array.isArray(netWorthEvents) && netWorthEvents.length >= 2) {
      // Sort events by date
      const sortedEvents = [...netWorthEvents].sort(
        (a, b) => new Date(a.event_date) - new Date(b.event_date)
      );

      // Get first and last event
      const firstEvent = sortedEvents[0];
      const lastEvent = sortedEvents[sortedEvents.length - 1];

      // Calculate change
      const currentTotal = parseFloat(lastEvent.net_worth);
      const previousTotal = parseFloat(firstEvent.net_worth);
      const change = currentTotal - previousTotal;
      const percentage =
        previousTotal !== 0 ? (change / previousTotal) * 100 : 0;

      console.log("Change calculation from events:", {
        currentTotal,
        previousTotal,
        change,
        percentage,
      });

      return {
        amount: change,
        percentage,
        isPositive: change >= 0,
      };
    }

    // Fall back to historical data if no events
    if (!Array.isArray(historicalData) || historicalData.length < 2) {
      return { amount: 0, percentage: 0, isPositive: true };
    }

    // Sort data by date to ensure correct order
    const sortedData = [...historicalData].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    // Get first and last data points after sorting
    const firstDataPoint = sortedData[0];
    const lastDataPoint = sortedData[sortedData.length - 1];

    // Extract values, ensuring they are numbers
    const currentTotal =
      typeof lastDataPoint.netWorth === "number"
        ? lastDataPoint.netWorth
        : typeof lastDataPoint.total === "number"
        ? lastDataPoint.total
        : parseFloat(lastDataPoint.netWorth || lastDataPoint.total || 0);

    const previousTotal =
      typeof firstDataPoint.netWorth === "number"
        ? firstDataPoint.netWorth
        : typeof firstDataPoint.total === "number"
        ? firstDataPoint.total
        : parseFloat(firstDataPoint.netWorth || firstDataPoint.total || 0);

    const change = currentTotal - previousTotal;
    const percentage = previousTotal !== 0 ? (change / previousTotal) * 100 : 0;

    console.log("Change calculation from historical data:", {
      currentTotal,
      previousTotal,
      change,
      percentage,
    });

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
      case "BANK_ACCOUNT":
        return "Bank Account";
      case "MONEY_MARKET":
        return "Money Market";
      case "STOCKS":
        return "Stocks";
      case "MPESA":
        return "M-Pesa";
      case "SACCO":
        return "SACCO";
      case "CASH":
        return "Cash Money";
      case "OTHER":
        return "Other";
      default:
        return type;
    }
  }

  // Helper function to get type icon
  function getTypeIcon(type) {
    switch (type) {
      case "BANK_ACCOUNT":
        return <TbBuildingBank className="h-6 w-6 text-white" />;
      case "MONEY_MARKET":
        return <TbPigMoney className="h-6 w-6 text-white" />;
      case "STOCKS":
        return <TbTrendingUp className="h-6 w-6 text-white" />;
      case "MPESA":
        return <MpesaIcon width={45} height={24} />;
      case "SACCO":
        return <TbWallet className="h-6 w-6 text-white" />;
      case "CASH":
        return <PiMoneyWavyDuotone className="h-6 w-6 text-white" />;
      case "OTHER":
        return <TbCurrencyDollar className="h-6 w-6 text-white" />;
      default:
        return <TbCurrencyDollar className="h-6 w-6 text-white" />;
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
      <div className="mb-2 md:mb-6">
        <DashboardHeader
          timePeriod={timePeriod}
          setTimePeriod={setTimePeriod}
          isRefreshing={isRefreshing}
          refreshDashboardData={refreshDashboardData}
        />
      </div>

      <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "overview" && (
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

      {activeTab === "assets" && (
        <AssetsTabComponent financialSources={financialSources} />
      )}

      {activeTab === "trends" && (
        <TrendsTabComponent
          historicalData={historicalData}
          financialSources={financialSources}
          netWorthEvents={netWorthEvents}
          loading={netWorthEventsLoading}
        />
      )}
    </MainLayout>
  );
};

export default Dashboard;
