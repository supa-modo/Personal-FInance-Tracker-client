import React from "react";
import { TbAlertTriangle, TbTrash, TbX, TbLoader } from "react-icons/tb";
import { motion } from "framer-motion";

const DeleteModalEnhanced = ({
  isOpen,
  onClose,
  onConfirm,
  sourceName,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 text-center">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-[1.5px] transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-slate-800/90 backdrop-blur-xl rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 border border-slate-700/50 relative">
          {/* Close button */}
          <div className="absolute top-3 right-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
            >
              <TbX className="h-5 w-5" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-900/50 sm:mx-0 sm:h-10 sm:w-10 border border-red-700/50">
              <TbAlertTriangle className="h-6 w-6 text-red-300" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-white">
                Delete Financial Source
              </h3>
              <div className="mt-2">
                <p className="text-sm text-slate-300">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-white">{sourceName}</span>
                  ? This action cannot be undone and all associated balance
                  history will be permanently removed.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="button"
              className="inline-flex justify-center w-full rounded-xl border border-slate-600 px-4 py-2.5 bg-slate-700/50 text-base font-medium text-slate-300 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:text-sm transition-all duration-200"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="button"
              className="mt-3 sm:mt-0 inline-flex justify-center w-full rounded-xl border border-transparent px-4 py-2.5 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={onConfirm}
              disabled={isLoading}
            >
              <div className="flex items-center space-x-2">
                {isLoading ? (
                  <>
                    <TbLoader size={19} className="animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <TbTrash size={19} />
                    <span>Delete Source</span>
                  </>
                )}
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModalEnhanced;
