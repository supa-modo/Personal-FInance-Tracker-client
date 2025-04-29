import React from 'react';
import { 
  TbBuildingBank, 
  TbPigMoney, 
  TbTrendingUp, 
  TbCreditCard, 
  TbWallet, 
  TbCurrencyDollar 
} from 'react-icons/tb';

// Map source types to readable labels
export const getTypeLabel = (type) => {
  switch (type) {
    case 'BANK_ACCOUNT':
      return 'Bank Account';
    case 'MONEY_MARKET':
      return 'Money Market Fund';
    case 'STOCKS':
      return 'Stocks';
    case 'MPESA':
      return 'M-Pesa';
    case 'SACCO':
      return 'SACCO';
    case 'OTHER':
      return 'Other';
    default:
      return type;
  }
};

// Helper function to get type icon
export const getTypeIcon = (type) => {
  switch (type) {
    case 'BANK_ACCOUNT': return <TbBuildingBank className="h-5 w-5 text-white" />;
    case 'MONEY_MARKET': return <TbPigMoney className="h-5 w-5 text-white" />;
    case 'STOCKS': return <TbTrendingUp className="h-5 w-5 text-white" />;
    case 'MPESA': return <TbCreditCard className="h-5 w-5 text-white" />;
    case 'SACCO': return <TbWallet className="h-5 w-5 text-white" />;
    case 'OTHER': return <TbCurrencyDollar className="h-5 w-5 text-white" />;
    default: return <TbCurrencyDollar className="h-5 w-5 text-white" />;
  }
};

// Prepare data for charts
export const getChartData = (source) => {
  if (!source || !source.balanceUpdates || source.balanceUpdates.length === 0) {
    return [];
  }
  
  return [...source.balanceUpdates]
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .map(update => ({
      date: update.createdAt,
      balance: update.balance,
      notes: update.notes
    }));
};

// Get the latest balance from balance updates
export const getLatestBalance = (source) => {
  if (!source || !source.balanceUpdates || source.balanceUpdates.length === 0) {
    return source?.initialBalance || 0;
  }
  
  const latestUpdate = [...source.balanceUpdates].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )[0];
  
  return latestUpdate.balance;
};
