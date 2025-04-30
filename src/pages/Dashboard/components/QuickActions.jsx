import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TbWallet, 
  TbRefresh, 
  TbChartLine 
} from 'react-icons/tb';

const QuickActions = () => {
  return (
    <div className="mt-8 bg-slate-800/60 shadow-xl rounded-t-2xl md:rounded-xl overflow-hidden border border-slate-700/50 backdrop-blur-sm hover:shadow-primary-900/20 hover:border-slate-600/50 transition-all duration-300">
      <div className="px-4 md:px-6 py-4 md:py-5 border-b border-slate-700/50">
        <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
      </div>
      <div className="px-3 py-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/financial-sources"
            className="flex items-center p-4 border border-slate-700/50 rounded-xl hover:bg-slate-700/30 transition duration-300 ease-in-out shadow-md group"
          >
            <div className="flex-shrink-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg p-3 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-all duration-300">
              <TbWallet className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-white">Manage Sources</h4>
              <p className="mt-1 text-xs text-slate-400">Add, edit, or remove financial sources</p>
            </div>
          </Link>
          <Link
            to="/"
            className="flex items-center p-4 border border-slate-700/50 rounded-xl hover:bg-slate-700/30 transition duration-300 ease-in-out shadow-md group"
          >
            <div className="flex-shrink-0 bg-gradient-to-r from-green-400 to-green-600 rounded-lg p-3 shadow-lg shadow-green-500/20 group-hover:shadow-green-500/30 transition-all duration-300">
              <TbRefresh className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-white">Update Balances</h4>
              <p className="mt-1 text-xs text-slate-400">Record new balances for your accounts</p>
            </div>
          </Link>
          <Link
            to="/"
            className="flex items-center p-4 border border-slate-700/50 rounded-xl hover:bg-slate-700/30 transition duration-300 ease-in-out shadow-md group"
          >
            <div className="flex-shrink-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg p-3 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/30 transition-all duration-300">
              <TbChartLine className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-white">View Analytics</h4>
              <p className="mt-1 text-xs text-slate-400">See detailed financial analytics</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
