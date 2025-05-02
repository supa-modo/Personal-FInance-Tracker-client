import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import useFinancial from "../../hooks/useFinancial";

// Import components
import SourceHeaderEnhanced from "./components/SourceHeaderEnhanced";
import SourceDetailsCardEnhanced from "./components/SourceDetailsCardEnhanced";
import BalanceChartEnhanced from "./components/BalanceChartEnhanced";
import BalanceUpdatesEnhanced from "./components/BalanceUpdatesEnhanced";
import DeleteModalEnhanced from "./components/DeleteModalEnhanced";
import UpdateBalanceModalEnhanced from "./components/UpdateBalanceModalEnhanced";
import EditFinancialSourceModalEnhanced from "./components/EditFinancialSourceModalEnhanced";
import { TbAlertCircle, TbRefresh, TbArrowLeft } from "react-icons/tb";
import { formatDate } from "../../utils/formatters";

const FinancialSourceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    financialSources,
    loading,
    error,
    deleteFinancialSource,
    addBalanceUpdate,
    updateFinancialSource,
  } = useFinancial();

  const [source, setSource] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    balance: "",
    notes: "",
  });
  const [updateErrors, setUpdateErrors] = useState({});

  // Find the source by ID
  useEffect(() => {
    if (!loading && financialSources.length > 0) {
      const foundSource = financialSources.find((s) => s.id === id);

      if (foundSource) {
        setSource(foundSource);
      } else {
        // Source not found, redirect to list
        navigate("/financial-sources");
      }
    }
  }, [id, financialSources, loading, navigate]);

  // Handle delete click
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteFinancialSource(id);
      navigate("/financial-sources");
    } catch (error) {
      console.error("Error deleting financial source:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleEditSource = async (updatedSource) => {
    try {
      // Make sure we're passing the ID and the updated source data separately
      await updateFinancialSource(source.id, updatedSource);
      setIsEditModalOpen(false);
      // Update the local source state to reflect changes immediately
      setSource((prev) => ({ ...prev, ...updatedSource }));
    } catch (error) {
      console.error("Error updating financial source:", error);
    }
  };

  // Handle update modal open
  const handleUpdateClick = () => {
    setUpdateForm({
      balance: source.balance || "",
      notes: "",
    });
    setUpdateErrors({});
    setIsUpdateModalOpen(true);
  };

  // Handle update form change
  const handleUpdateFormChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field if it exists
    if (updateErrors[name]) {
      setUpdateErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Handle form submission - now receives data from the modal component
  const handleUpdateSubmit = async (formData) => {
    try {
      // Format today's date in YYYY-MM-DD format
      const today = new Date();
      const formattedDate =
        today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(today.getDate()).padStart(2, "0");

      // Add balance update using the data from the modal
      await addBalanceUpdate(source.id, {
        balance: parseFloat(formData.balance),
        notes: formData.notes,
        date: formattedDate, // Use the formatted date in YYYY-MM-DD format
      });

      // Reset form (modal will be closed by the UpdateBalanceModalEnhanced component)
      setUpdateForm({ balance: "", notes: "" });
      setUpdateErrors({});
      
      return true; // Indicate success to the modal component
    } catch (error) {
      console.error("Error updating balance:", error);
      return false; // Indicate failure to the modal component
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-6 text-gray-600 font-medium">
              Loading financial source details...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="bg-red-50 border-l-4 border-red-500 mx-2.5 md:mx-0 p-6 mb-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="ml-2 text-center md:text-start ">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <TbAlertCircle className="h-6 w-6 text-red-500" />
                <h3 className="text-base md:text-lg font-medium text-red-800">
                  Error Loading Financial Source
                </h3>
              </div>
              <p className="mt-1 text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!source) {
    return (
      <MainLayout>
        <div className="bg-red-50 border-l-4 border-red-500 mx-2.5 md:mx-0 p-6 mb-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="ml-2 text-center md:text-start">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <TbAlertCircle className="h-6 w-6 text-red-500" />
                <div>
                  <h3 className="text-base md:text-lg font-medium text-red-800">
                    Error Loading Financial Source
                  </h3>
                  <p className="mt-1 text-sm text-red-700">{error}</p>
                </div>
              </div>
              <button
                className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => window.location.reload()}
              >
                <TbRefresh className="-ml-1 mr-2 h-4 w-4" />
                Retry
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!source) {
    return (
      <MainLayout>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 mx-2.5 md:mx-0 p-3.5 md:p-6 mb-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="ml-2 text-center md:text-start ">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <TbAlertCircle className="h-6 w-6 text-yellow-500" />
                <h3 className="text-base md:text-lg font-medium text-yellow-800">
                  Financial Source Not Found
                </h3>
              </div>
              <p className="mt-1 text-sm text-yellow-700">
                The financial source you are looking for does not exist or has
                been deleted.
              </p>
              <div className="mt-4">
                <Link
                  to="/financial-sources"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  <TbArrowLeft className="-ml-1 mr-2 h-5 w-5" />
                  Back to Financial Sources
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Prepare chart data for the balance chart
  const getChartData = (source) => {
    if (!source || !source.updates || source.updates.length === 0) {
      return [];
    }

    // Sort updates by date (using createdAt which is more reliable)
    return [...source.updates]
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .map((update) => ({
        date: formatDate(new Date(update.createdAt), {
          month: "short",
          day: "numeric",
        }),
        balance: parseFloat(update.balance),
        fullDate: update.createdAt,
        notes: update.notes,
      }));
  };

  // Get type label for display
  const getTypeLabel = (type) => {
    const typeMap = {
      BANK_ACCOUNT: "Bank Account",
      MONEY_MARKET: "Money Market Fund",
      STOCKS: "Stocks",
      MPESA: "M-Pesa",
      SACCO: "SACCO",
      CASH: "CASH",
      OTHER: "Other",
    };

    return typeMap[type] || type;
  };

  const chartData = getChartData(source);

  // Calculate the latest balance and last updated date
  const getLatestBalanceAndDate = (source) => {
    const updates = source.updates || [];
    const latestUpdate =
      updates.length > 0
        ? updates.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )[0]
        : null;

    return {
      latestBalance: latestUpdate ? parseFloat(latestUpdate.balance) : 0,
      lastUpdated: latestUpdate ? new Date(latestUpdate.createdAt) : null,
    };
  };

  const { latestBalance, lastUpdated } = getLatestBalanceAndDate(source);

  return (
    <>
      <MainLayout>
        {/* Source header with actions */}
        <SourceHeaderEnhanced
          source={source}
          id={id}
          latestBalance={latestBalance}
          lastUpdated={lastUpdated}
          onUpdateBalanceClick={handleUpdateClick}
          onDeleteClick={handleDeleteClick}
          onEditClick={handleEditClick}
        />

        {/* Main content */}
        <div className=" grid grid-cols-1 gap-0 md:gap-6 lg:grid-cols-2">
          {/* Source details card */}
          <SourceDetailsCardEnhanced
            source={source}
            getTypeLabel={getTypeLabel}
          />

          {/* Balance chart */}
          <BalanceChartEnhanced chartData={chartData} />
        </div>

        {/* Balance updates list */}
        <div className="">
          <BalanceUpdatesEnhanced source={source} />
        </div>
      </MainLayout>

      {/* Delete confirmation modal */}
      <DeleteModalEnhanced
        isOpen={isDeleteModalOpen}
        source={source}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />

      {/* Update balance modal */}
      <UpdateBalanceModalEnhanced
        isOpen={isUpdateModalOpen}
        updateForm={updateForm}
        updateErrors={updateErrors}
        source={source}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleUpdateSubmit}
        onChange={handleUpdateFormChange}
      />

      {/* Edit financial source modal */}
      <EditFinancialSourceModalEnhanced
        isOpen={isEditModalOpen}
        source={source}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSource}
      />
    </>
  );
};

export default FinancialSourceDetail;
