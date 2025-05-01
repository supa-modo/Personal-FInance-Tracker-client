import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  TbPencil, 
  TbTrash, 
  TbEye,
  TbChevronRight,
  TbWallet,
  TbEdit,
  TbDotsVertical,
  TbX
} from 'react-icons/tb';
import { formatCurrency, getRelativeTimeString } from '../../../utils/formatters';

const SourcesList = ({ 
  sources, 
  onEditClick, 
  onDeleteClick, 
  getTypeIcon 
}) => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);
  
  const handleRowClick = (sourceId, e) => {
    // Don't navigate if the click was on a button or its children
    if (e.target.closest('button') || e.target.closest('a')) {
      return;
    }
    navigate(`/financial-sources/${sourceId}`);
  };
  
  const toggleMenu = (sourceId, e) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === sourceId ? null : sourceId);
  };
  
  const handleActionClick = (action, source, e) => {
    e.stopPropagation();
    setActiveMenu(null);
    
    if (action === 'view') {
      navigate(`/financial-sources/${source.id}`);
    } else if (action === 'edit') {
      onEditClick(source);
    } else if (action === 'delete') {
      onDeleteClick(source);
    }
  };
  return (
    <div className="bg-slate-800/60 shadow-xl rounded-t-3xl md:rounded-xl overflow-hidden border border-slate-700/50 backdrop-blur-sm hover:shadow-primary-900/20 hover:border-slate-600/50 transition-all duration-300">
      <div className="px-6 py-5 border-b border-slate-700/50">
        <h2 className="text-lg font-semibold text-white">Your Financial Sources</h2>
      </div>
      
      {sources.length === 0 ? (
        <div className="px-6 py-10 text-center">
          <div className="mx-auto w-fit p-3 bg-slate-700/50 rounded-full">
            <TbWallet className="h-10 w-10 text-slate-400" />
          </div>
          <h3 className="mt-4 text-base font-medium text-white">No financial sources found</h3>
          <p className="mt-1 text-sm text-slate-400">
            {sources.length === 0 
              ? "You haven't added any financial sources yet." 
              : "No sources match your current filters."}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden">
          <ul className="divide-y divide-slate-700/30">
            {sources.map((source) => (
              <li 
                key={source.id} 
                className="hover:bg-slate-700/30 transition-colors duration-200 cursor-pointer relative"
                onClick={(e) => handleRowClick(source.id, e)}
              >
                <div className="pl-4 pr-2 md:px-6 py-5 flex items-center justify-between">
                  <div className="flex items-center flex-1 min-w-0">
                    <div 
                      className="flex-shrink-0 h-12 w-12 rounded-lg shadow-lg flex items-center justify-center"
                      style={{ backgroundColor: source.colorCode || '#3b82f6'}}
                    >
                      {getTypeIcon(source.type)}
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-medium text-white truncate">
                          {source.name}
                        </h3>
                        <div className='flex items-center space-x-1 md:space-x-8'>

                        
                        <p className="ml-2 text-base font-semibold text-primary-500">
                          {formatCurrency(source.balance)}
                        </p>

                        <div className="ml-2 flex items-center space-x-1 md:space-x-2">
                    {/* Desktop actions */}
                    <div className="hidden md:flex items-center space-x-2">
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditClick(source);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-primary-600/40 transition-colors"
                        title="Edit source"
                      >
                        <TbEdit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteClick(source);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-red-600/40 transition-colors"
                        title="Delete source"
                      >
                        <TbTrash className="h-5 w-5" />
                      </button>
                    </div>
                    
                    
                  </div>
                      {/* Mobile menu toggle */}
                      <div className="md:hidden">
                      <button
                        onClick={(e) => toggleMenu(source.id, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
                        title="Actions"
                      >
                        <TbDotsVertical className="h-5 w-5" />
                      </button>
                      
                      {/* Mobile menu dropdown */}
                      {activeMenu === source.id && (
                        <div className="absolute right-6 mt-1 z-10 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-1 w-36">
                          
                          
                          <button
                            onClick={(e) => handleActionClick('edit', source, e)}
                            className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700/50 flex items-center"
                          >
                            <TbEdit className="h-4 w-4 mr-2" />
                            Edit
                          </button>
                          <hr className='mx-1.5 text-gray-400/50'/>
                          <button
                            onClick={(e) => handleActionClick('delete', source, e)}
                            className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-slate-700/50 flex items-center"
                          >
                            <TbTrash className="h-4 w-4 mr-2" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                    
                      </div>
                      <div className="mt-1 flex items-center text-sm">
                        <p className="text-slate-400 truncate">
                          {source.description || 'No description'}
                        </p>
                        {!source.isActive && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-900/50 text-red-300 border border-red-700/50">
                            Inactive
                          </span>
                        )}
                        {source.lastUpdated && (
                          <span className="ml-2 text-xs text-slate-500">
                            Updated {getRelativeTimeString(source.lastUpdated)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {sources.length > 0 && (
        <div className="px-6 py-4 border-t border-slate-700/50 bg-slate-700/30">
          <div className="text-center text-sm">
            <span className="text-slate-400">
              Showing {sources.length} {sources.length === 1 ? 'source' : 'sources'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SourcesList;
