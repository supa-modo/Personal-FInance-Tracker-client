import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TbArrowLeft, 
  TbChevronRight, 
  TbPencil, 
  TbTrash, 
  TbPlus 
} from 'react-icons/tb';
import { getTypeIcon, getTypeLabel } from '../utils.jsx';

const SourceHeader = ({ source, id, handleUpdateClick, handleDeleteClick }) => {
  return (
    <div className="mb-6">
      {/* Breadcrumb navigation */}
      <div className="flex items-center">
        <Link
          to="/financial-sources"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <TbArrowLeft className="mr-1 h-5 w-5" />
          Financial Sources
        </Link>
        <TbChevronRight className="mx-2 h-5 w-5 text-gray-400" />
        <span className="text-sm font-medium text-gray-900 truncate">{source.name}</span>
      </div>

      {/* Source header with actions */}
      <div className="mt-4 md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            <div
              className="flex-shrink-0 inline-flex items-center justify-center h-12 w-12 rounded-lg shadow-sm"
              style={{ backgroundColor: source.colorCode }}
            >
              {getTypeIcon(source.type)}
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:truncate">{source.name}</h1>
              <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  {getTypeLabel(source.type)}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    source.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {source.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={handleUpdateClick}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <TbPlus className="-ml-1 mr-2 h-5 w-5" />
            Update Balance
          </button>
          <button
            onClick={handleEditClick}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <TbPencil className="-ml-1 mr-2 h-5 w-5" />
            Edit
          </button>
          <button
            type="button"
            onClick={handleDeleteClick}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <TbTrash className="-ml-1 mr-2 h-5 w-5" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SourceHeader;
