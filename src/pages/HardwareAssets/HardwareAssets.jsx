import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import api from "../../utils/api"; // Ensure correct path
import { Search, Filter, Plus, Eye, CheckSquare, Square, Recycle, Trash2, X } from "lucide-react";


function HardwareAssets() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialFilter = queryParams.get("filter") || "";
  const [assets, setAssets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [message,setMessage] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showDisposeModal, setShowDisposeModal] = useState(false);
  const [disposalDetails, setDisposalDetails] = useState({
    repairedOn: "",
    disposalDate: "",
    reason: "",
    comments: "",
  });

  useEffect(() => {


    const fetchAssets = async () => {
      try {
        const response = await api.getAssets();
        console.log("Fetched data:", response.data.data);

        if (response && Array.isArray(response.data.data)) {
          setAssets(response.data.data);
        } else {
          console.error("Fetched data is not an array:", response.data.data);
          setAssets([]);
        }
      } catch (error) {
        console.error("Error fetching assets:", error);
        setAssets([]);
      }
    };
    fetchAssets();
  }, []);

  useEffect(() => {
    setSelectedFilter(initialFilter);
  }, [initialFilter]);

  const handleViewMore = (asset) => {
    navigate(`/EditHardware/${asset.assetid}`);
  };

  const handleDisposeClick = (asset) => {
    setSelectedAsset(asset);
    setShowDisposeModal(true);
  };

  const handleDisposalChange = (e) => {
    const { name, value } = e.target;
    setDisposalDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleDisposalSubmit = async () => {
    if (!disposalDetails.reason || !disposalDetails.disposalDate) {
        alert("Please fill in all required fields.");
        return;
    }

    const disposalData = {
        assetid: selectedAsset.assetid,
        repaired_on: disposalDetails.repairedOn || null,
        disposaldate: disposalDetails.disposalDate,
        reason: disposalDetails.reason,
        comments: disposalDetails.comments || "",
    };

    try {
        // Step 1: Update asset status
        await api.updateAssetById(selectedAsset.assetid, {
            status: "Disposed"
        });

        // Step 2: Create a disposal record
        await api.createDisposed(disposalData);

        await api.deleteAssetById(selectedAsset.assetid);

        setMessage("Asset successfully disposed and removed from asset management.");

        setShowDisposeModal(false);
        window.location.reload();
    } catch (error) {
        console.error("Error disposing asset:", error);
        alert("Failed to dispose asset.");
    }
};


  const filterOptions = ["All", "In Stock", "Assigned", "Under Maintenance", "Disposed"];

  // Fix for error: Ensure asset.status is not null before calling trim()
  const filteredAssets = assets.filter((asset) => {
    const normalizedStatus = asset.status ? asset.status.trim().toLowerCase() : "";
    const matchesSearch = asset.assetid?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" ||
      selectedFilter === "" ||
      (selectedFilter.toLowerCase() === "in stock" && normalizedStatus === "instock") ||
      (selectedFilter.toLowerCase() === "assigned" && normalizedStatus === "assigned") ||
      (selectedFilter.toLowerCase() === "under maintenance" && normalizedStatus === "maintenance") ||
      (selectedFilter.toLowerCase() === "disposed" && normalizedStatus === "disposed");

    return matchesSearch && matchesFilter;
  });

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 ">
        <h1 className="text-xl font-bold text-gray-800">Hardware Assets</h1>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-2.5  text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search assets..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative w-full md:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 flex items-center bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              <Filter className="mr-2" size={18} />
              Filters
            </button>
            {showFilters && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2">
                {filterOptions.map((filter, index) => (
                  <button
                    key={index}
                    className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-200 ${
                      selectedFilter === filter ? "font-bold" : ""
                    }`}
                    onClick={() => {
                      setSelectedFilter(filter);
                      setShowFilters(false);
                    }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Add New Button */}
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={() => navigate("/AddHardwareAsset")}>
            <Plus className=" mr-2" size={18}  />
            Add New
          </button>
        </div>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-300 rounded-lg text-center">
          {message}
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-left border-collapse text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b">Asset ID</th>
              <th className="px-6 py-3 border-b">Category</th>
              <th className="px-6 py-3 border-b">Status</th>
              <th className="px-6 py-3 border-b">OS</th>
              <th className="px-6 py-3 border-b">Assigned User</th>
              <th className="px-6 py-3 border-b">Last CheckOut</th>
              <th className="px-6 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 border-b">{asset.assetid || "N/A"}</td>
                  <td className="px-6 py-4 border-b">{asset.assettype || "N/A"}</td>
                  <td className="px-6 py-4 border-b">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        asset.status === "In Stock"
                          ? "bg-green-200 text-green-800"
                          : asset.status === "Assigned"
                          ? "bg-yellow-200 text-yellow-800"
                          : asset.status === "Maintenance"
                          ? "bg-orange-200 text-orange-800"
                          : asset.status === "Disposed"
                          ? "bg-red-200 text-red-800"
                          : "bg-blue-200 text-blue-800"
                      }`}
                    >
                      {asset.status || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b">{asset.operatingsystem || "N/A"}</td>
                  <td className="px-6 py-4 border-b">{asset.assigneduserid || "N/A"}</td>
                  <td className="px-6 py-4 border-b">{formatDate(asset.lastcheckoutdate)}</td>
                  <td className="px-6 py-4 border-b flex space-x-2">
                    <button
                      className="p-2 rounded bg-blue-100 text-blue-600 hover:bg-blue-200"
                      title="View More"
                      onClick={() => handleViewMore(asset)}
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      className={`p-2 rounded ${
                        asset.lastcheckoutdate
                          ? "bg-green-100 text-green-600 hover:bg-green-200"
                          : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                      }`}
                      title={asset.lastcheckoutdate ? "Check-in" : "Check-out"}
                    >
                      {asset.lastcheckoutdate ? <CheckSquare size={18} /> : <Square size={18} />}
                    </button>
                    <button onClick={() => handleDisposeClick(asset)}
                      className="p-2 rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
                      title="Dispose"
                    >
                      <Recycle size={18} />
                    </button>
                    <button
                      className="p-2 rounded bg-red-100 text-red-600 hover:bg-red-200"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No assets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showDisposeModal && (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
      <button
        onClick={() => setShowDisposeModal(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <X size={20} />
      </button>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Dispose Asset</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Repaired On (Optional)</label>
        <input
          type="date"
          name="repairedOn"
          onChange={handleDisposalChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Disposal Date</label>
        <input
          type="date"
          name="disposalDate"
          onChange={handleDisposalChange}
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Reason for Disposal</label>
        <textarea
          name="reason"
          placeholder="Enter reason..."
          onChange={handleDisposalChange}
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          rows="3"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Comments</label>
        <textarea
          name="comments"
          placeholder="Enter your comments..."
          onChange={handleDisposalChange}
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          rows="3"
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleDisposalSubmit}
          className="w-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Dispose
        </button>
        <button
          onClick={() => setShowDisposeModal(false)}
          className="w-1/2 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition ml-2"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
  

export default HardwareAssets;
