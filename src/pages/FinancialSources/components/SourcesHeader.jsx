import React from 'react';
import { TbPlus } from 'react-icons/tb';

const SourcesHeader = ({ onAddClick }) => {
  return (
    <div className="pb-5 px-4 md:px-0 mb-6 sm:flex sm:items-center sm:justify-between">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600">
        Financial Sources
      </h1>
      <div className="mt-3 sm:mt-0 sm:ml-4 w-full md:w-auto">
        <button
          onClick={onAddClick}
          className=" w-full md:w-auto px-4 py-2 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 shadow-primary-900/30 group"
        >
          <div className='flex items-center justify-center'>
          <TbPlus className="-ml-1 mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
          <span>Add New Source</span>
          </div>
          
        </button>
      </div>
    </div>
  );
};

export default SourcesHeader;
