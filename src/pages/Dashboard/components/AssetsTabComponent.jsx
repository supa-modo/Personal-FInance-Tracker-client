import React, { useState, useMemo } from 'react';
import { 
  TbArrowUpRight, 
  TbArrowDownRight, 
  TbChevronRight,
  TbFilter,
  TbSearch,
  TbSortAscending,
  TbSortDescending,
  TbChartPie,
  TbChartBar,
  TbWallet,
  TbCreditCard,
  TbBuildingBank,
  TbCurrencyDollar,
  TbPigMoney
} from 'react-icons/tb';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts';
import { formatCurrency, formatPercentage } from '../../../utils/formatters';
import MpesaIcon from '../../../components/ui/MpesaIcon';

const AssetsTabComponent = ({ financialSources }) => {
  const [sortBy, setSortBy] = useState('balance');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Get source icon based on type
  const getSourceIcon = (type) => {
    switch (type) {
      case 'BANK_ACCOUNT':
        return <TbBuildingBank className="h-5 w-5" />;
      case 'STOCKS':
        return <TbChartBar className="h-5 w-5" />;
      case 'MONEY_MARKET':
        return <TbPigMoney className="h-5 w-5" />;
      case 'MPESA':
        return <MpesaIcon width={45} height={24} />;
      case 'SACCO':
        return <TbWallet className="h-5 w-5" />;
      case 'CASH':
        return <TbCurrencyDollar className="h-5 w-5" />;
      default:
        return <TbWallet className="h-5 w-5" />;
    }
  };

  // Get color for source type
  const getTypeColor = (type) => {
    switch (type) {
      case 'BANK_ACCOUNT':
        return '#4F46E5';
      case 'STOCKS':
        return '#10B981';
      case 'MONEY_MARKET':
        return '#F59E0B';
      case 'MPESA':
        return '#EC4899';
      case 'SACCO':
        return '#8B5CF6';
      case 'CASH':
        return '#06B6D4';
      default:
        return '#6366F1';
    }
  };

  // Helper function to get the latest balance from a source's updates
  const getLatestBalance = (source) => {
    if (!source.updates || source.updates.length === 0) return 0;
    
    // Sort updates by date (newest first) and get the first one
    const latestUpdate = [...source.updates].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    )[0];
    
    return latestUpdate.balance || 0;
  };
  
  // Helper function to get the last updated date
  const getLastUpdated = (source) => {
    if (!source.updates || source.updates.length === 0) return null;
    
    // Sort updates by date (newest first) and get the first one's date
    const latestUpdate = [...source.updates].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    )[0];
    
    return latestUpdate.createdAt;
  };
  
  // Filter and sort sources
  const filteredSources = useMemo(() => {
    if (!financialSources) return [];
    
    return financialSources
      .filter(source => {
        const matchesSearch = searchTerm === '' || 
          source.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === 'all' || source.type === selectedType;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        let comparison = 0;
        
        if (sortBy === 'name') {
          comparison = a.name.localeCompare(b.name);
        } else if (sortBy === 'balance') {
          comparison = getLatestBalance(b) - getLatestBalance(a);
        } else if (sortBy === 'type') {
          comparison = a.type.localeCompare(b.type);
        } else if (sortBy === 'lastUpdated') {
          const dateA = getLastUpdated(a) ? new Date(getLastUpdated(a)) : new Date(0);
          const dateB = getLastUpdated(b) ? new Date(getLastUpdated(b)) : new Date(0);
          comparison = dateB - dateA;
        }
        
        return sortDirection === 'asc' ? -comparison : comparison;
      });
  }, [financialSources, searchTerm, selectedType, sortBy, sortDirection]);

  // Calculate asset distribution by type
  const assetDistribution = useMemo(() => {
    if (!financialSources || financialSources.length === 0) {
      return [];
    }
    
    // Create a simplified array of sources with their balances
    const sourcesWithBalances = financialSources.map(source => ({
      type: source.type,
      balance: getLatestBalance(source),
      color: getTypeColor(source.type)
    }));
    
    // Calculate total balance
    const totalBalance = sourcesWithBalances.reduce((sum, source) => sum + source.balance, 0);
    
    // Avoid division by zero
    if (totalBalance === 0) return [];
    
    // Group by type
    const typeGroups = {};
    
    sourcesWithBalances.forEach(source => {
      if (!typeGroups[source.type]) {
        typeGroups[source.type] = {
          type: source.type,
          value: 0,
          color: source.color
        };
      }
      
      typeGroups[source.type].value += source.balance;
    });
    
    // Convert to array and calculate percentages - percentage is already a decimal value (0-1 range)
    const result = Object.values(typeGroups).map(group => {
      // Calculate percentage as a decimal (0-1 range) for the formatter to handle correctly
      const percentage = group.value / totalBalance;
      
      return {
        ...group,
        percentage
      };
    });
    
    return result;
  }, [financialSources]);

  // Calculate top assets
  const topAssets = useMemo(() => {
    if (!financialSources || financialSources.length === 0) {
      return [];
    }
    
    return [...financialSources]
      .map(source => ({
        id: source.id,
        name: source.name,
        value: getLatestBalance(source),
        color: source.colorCode || getTypeColor(source.type)
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
      
  }, [financialSources]);

  // Calculate total assets value
  const totalAssetsValue = useMemo(() => {
    if (!financialSources) return 0;
    return financialSources.reduce((sum, source) => sum + getLatestBalance(source), 0);
  }, [financialSources]);

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 py-1.5 px-2 md:py-2 md:px-3 text-[0.8rem] md:text-[0.85rem] border border-slate-700 rounded-lg shadow-lg">
          <p className="text-slate-300 font-medium">{payload[0].name}</p>
          <p className="text-white font-semibold">{formatCurrency(payload[0].value)}</p>
          {payload[0].payload.percentage && (
            <p className="text-slate-400">{formatPercentage(payload[0].payload.percentage)}</p>
          )}
        </div>
      );
    }
    return null;
  };

  // Get asset type name
  const getTypeName = (type) => {
    switch (type) {
      case 'BANK_ACCOUNT':
        return 'Bank Account';
      case 'STOCKS':
        return 'Stocks';
      case 'MONEY_MARKET':
        return 'Money Market';
      case 'MPESA':
        return 'Mobile Money';
      case 'SACCO':
        return 'SACCO';
      case 'CASH':
        return 'Cash';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 mx-2.5 md:mx-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-xl font-bold text-white">Assets Overview</h2>
          <p className="text-slate-400 text-sm">Track and manage your financial assets</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-700 border border-slate-600 text-white rounded-lg pl-10 pr-4 py-2 w-48 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <TbSearch className="h-4 w-4 text-slate-400" />
            </div>
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Types</option>
            <option value="BANK_ACCOUNT">Bank Accounts</option>
            <option value="STOCKS">Stocks</option>
            <option value="MONEY_MARKET">Money Market</option>
            <option value="MPESA">Mobile Money</option>
            <option value="SACCO">SACCO</option>
            <option value="CASH">Cash</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
        {/* Total Assets Card */}
        <div className="bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-700/50 backdrop-blur-sm p-3 md:p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-400 text-sm font-medium">Total Assets Value</h3>
            <div className="bg-primary-500/20 rounded-full p-2">
              <TbWallet className="h-5 w-5 text-primary-500" />
            </div>
          </div>
          <div className="mt-1 md:mt-2 font-lexend">
            <div className="text-2xl font-bold text-white">{formatCurrency(totalAssetsValue)}</div>
            <div className="text-[0.75rem] md:text-[0.85rem] font-medium font-lexend text-primary-400 mt-1">Across {financialSources?.length || 0} sources</div>
          </div>
        </div>
        
        {/* Highest Value Asset */}
        <div className="bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-700/50 backdrop-blur-sm p-3 md:p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-400 text-sm font-medium">Highest Value Asset</h3>
            <div className="bg-green-500/20 rounded-full p-2">
              <TbArrowUpRight className="h-5 w-5 text-green-500" />
            </div>
          </div>
          <div className="mt-1 md:mt-2">
            {topAssets.length > 0 ? (
              <>
                <div className="text-2xl font-bold text-white">{formatCurrency(topAssets[0].value)}</div>
                <div className="text-[0.75rem] md:text-[0.85rem] font-medium font-lexend text-green-400 mt-1">{topAssets[0].name}</div>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-white">$0.00</div>
                <div className="text-[0.78rem] md:text-sm text-slate-400 mt-1">No assets available</div>
              </>
            )}
          </div>
        </div>
        
        {/* Most Diverse Category */}
        <div className="bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-700/50 backdrop-blur-sm p-3 md:p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-400 text-sm font-medium">Largest Asset Category</h3>
            <div className="bg-blue-500/20 rounded-full p-2">
              <TbChartPie className="h-5 w-5 text-blue-500" />
            </div>
          </div>
          <div className="mt-1 md:mt-2 font-lexend">
            {assetDistribution.length > 0 ? (
              <>
                <div className="text-2xl font-bold text-white">
                  {getTypeName(assetDistribution.sort((a, b) => b.value - a.value)[0].type)}
                </div>
                <div className="text-[0.78rem] md:text-sm font-lexend text-blue-400 mt-1">
                  {(assetDistribution.sort((a, b) => b.value - a.value)[0].percentage * 100).toFixed(2)}% of portfolio
                </div>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-white">None</div>
                <div className="text-[0.78rem] md:text-sm text-slate-400 mt-1">No assets available</div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-6">
        {/* Asset Distribution Chart */}
        <div className="bg-slate-800/60 rounded-t-2xl md:rounded-2xl overflow-hidden border border-slate-700/50 backdrop-blur-sm p-3 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-primary-500 mb-4">Asset Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="type"
                  fontSize={11}
                  label={({ type, percentage }) => `${getTypeName(type)}: ${(percentage * 100).toFixed(0)}%`}
                >
                  {assetDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 md:mt-4 text-sm space-y-2">
            {assetDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: item.color }}></div>
                  <span className="text-slate-300">{getTypeName(item.type)}</span>
                </div>
                <div className="text-white font-lexend font-medium">{(item.percentage * 100).toFixed(2)}%</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Top Assets Chart */}
        <div className="bg-slate-800/60 rounded-b-2xl md:rounded-2xl overflow-hidden border border-slate-700/50 backdrop-blur-sm p-3 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-primary-500 mb-4">Top Assets</h3>
          <div className="h-80 ">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topAssets}
                layout="vertical"
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#334155" />
                <XAxis type="number" tick={{ fill: '#94a3b8' }} tickFormatter={(value) => formatCurrency(value, { notation: 'compact' })} fontSize={11} />
                <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#94a3b8' }} fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" nameKey="name" radius={[0, 4, 4, 0]}>
                  {topAssets.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Assets Table */}
      <div className="bg-slate-800/60 rounded-xl overflow-hidden border border-slate-700/50 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">All Assets</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                className="bg-slate-700 hover:bg-slate-600 text-white rounded-lg p-2 transition-colors"
              >
                {sortDirection === 'asc' ? <TbSortAscending className="h-5 w-5" /> : <TbSortDescending className="h-5 w-5" />}
              </button>
              <button
                className="bg-slate-700 hover:bg-slate-600 text-white rounded-lg p-2 transition-colors"
              >
                <TbFilter className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700">
              <thead>
                <tr>
                  <th 
                    scope="col" 
                    className={`px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer ${sortBy === 'name' ? 'text-primary-400' : ''}`}
                    onClick={() => setSortBy('name')}
                  >
                    Name
                  </th>
                  <th 
                    scope="col" 
                    className={`px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer ${sortBy === 'type' ? 'text-primary-400' : ''}`}
                    onClick={() => setSortBy('type')}
                  >
                    Type
                  </th>
                  <th 
                    scope="col" 
                    className={`px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer ${sortBy === 'balance' ? 'text-primary-400' : ''}`}
                    onClick={() => setSortBy('balance')}
                  >
                    Balance
                  </th>
                  <th 
                    scope="col" 
                    className={`px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer ${sortBy === 'lastUpdated' ? 'text-primary-400' : ''}`}
                    onClick={() => setSortBy('lastUpdated')}
                  >
                    Last Updated
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {filteredSources.length > 0 ? (
                  filteredSources.map((source, index) => (
                    <tr key={source.id || index} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full" style={{ backgroundColor: source.colorCode || getTypeColor(source.type) }}>
                            {getSourceIcon(source.type)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{source.name}</div>
                            <div className="text-sm text-slate-400">{source.institution || 'Institution(TBA)'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-[0.8rem] leading-5 font-semibold rounded-full border border-gray-300 bg-slate-700 text-primary-500">
                          {getTypeName(source.type)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-lexend">
                        <div className="text-sm text-white">{formatCurrency(getLatestBalance(source))}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 font-lexend">
                        {getLastUpdated(source) ? new Date(getLastUpdated(source)).toLocaleDateString() : 'Never'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href={`/financial-sources/${source.id}`} className="text-primary-400 hover:text-primary-300">
                          Details
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-slate-400">
                      No assets found. {searchTerm || selectedType !== 'all' ? 'Try adjusting your filters.' : 'Add your first asset to get started.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetsTabComponent;
