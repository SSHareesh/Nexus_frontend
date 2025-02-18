import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { Plus, Filter, Search, Eye, Trash2, Archive, CheckSquare, Square } from "lucide-react";
import api from "../../utils/api";

function HardwareAssets() {
  const navigate = useNavigate();  // Declare navigate hook
  const [assets, setAssets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchAssets = async () => {
      const response = await api.getAssets();
      console.log("Fetched data:", response.data.data);  // Log the data

      if (response && Array.isArray(response.data.data)) {
        setAssets(response.data.data);
      } else {
        console.error("Fetched data is not an array:", response.data.data);
        setAssets([]);
      }
    };
    fetchAssets();
  }, []);

  const handleViewMore = (asset) => {
    // Navigate to the EditHardware page with asset id as a parameter
    navigate(`/EditHardware/${asset.assetid}`);
  };

  const filterOptions = [
    "All",
    "In Stock",
    "Assigned",
    "Under Maintenance",
    "Disposed",
  ];

  const filteredAssets = assets.filter((asset) => {
    const normalizedStatus = asset.status.trim().toLowerCase();
    const matchesSearch = asset.assetid.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" ||
      selectedFilter === "" ||
      (selectedFilter === "In Stock" && normalizedStatus === "instock") ||
      (selectedFilter === "Assigned" && normalizedStatus === "assigned") ||
      (selectedFilter === "Under Maintenance" && normalizedStatus === "maintenance") ||
      (selectedFilter === "Disposed" && normalizedStatus === "disposed");

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
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold text-gray-800">Hardware Assets</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search assets..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 flex items-center bg-gray-200 rounded-lg hover:bg-gray-300 transition">
              <Filter className="mr-2" size={18} />
              Filters
            </button>
            {showFilters && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2">
                {filterOptions.map((filter, index) => (
                  <button
                    key={index}
                    className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-200 ${selectedFilter === filter ? "font-bold" : ""
                      }`}
                    onClick={() => {
                      setSelectedFilter(filter);
                      setShowFilters(false);
                    }}>
                    {filter}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Add New Button */}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Plus className="inline-block mr-2" size={18} onClick={() => navigate("/AddHardwareAsset")} />
            Add New
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-left border-collapse">
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
                  <td className="px-6 py-4 border-b">{asset.assetid}</td>
                  <td className="px-6 py-4 border-b">{asset.assettype}</td>
                  <td className="px-6 py-4 border-b">
                    <span
                      className={`px-2 py-1 text-xs rounded ${asset.status === "In Stock"
                        ? "bg-green-200 text-green-800"
                        : asset.status === "Assigned"
                          ? "bg-yellow-200 text-yellow-800"
                          : asset.status === "Maintenance"
                            ? "bg-orange-200 text-orange-800"
                            : asset.status === "Disposed" || "disposed"
                              ? "bg-red-200 text-red-800"
                              : "bg-blue-200 text-blue-800"
                        }`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b">{asset.operatingsystem}</td>
                  <td className="px-6 py-4 border-b">
                    {asset.assigneduserid ? asset.assigneduserid : " "}
                  </td>
                  <td className="px-6 py-4 border-b">{formatDate(asset.lastcheckoutdate)}</td>
                  <td className="px-6 py-4 border-b flex space-x-2">
                    {/* View More Button */}
                    <button
                      className="p-2 rounded bg-blue-100 text-blue-600 hover:bg-blue-200"
                      title="View More"
                      onClick={() => handleViewMore(asset)}
                    >
                      <Eye size={18} />
                    </button>

                    {/* Delete Button */}
                    <button
                      className="p-2 rounded bg-red-100 text-red-600 hover:bg-red-200"
                      title="Delete"
                      onClick={() => handleDelete(asset.assetid)}
                    >
                      <Trash2 size={18} />
                    </button>

                    {/* Dispose Button */}
                    <button
                      className="p-2 rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
                      title="Dispose"
                      onClick={() => handleDispose(asset.assetid)}
                    >
                      <Archive size={18} />
                    </button>

                    {/* Check-in / Check-out Button */}
                    <button
                      className={`p-2 rounded ${asset.lastcheckoutdate
                        ? "bg-green-100 text-green-600 hover:bg-green-200"
                        : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                        }`}
                      title={asset.lastcheckoutdate ? "Check-in" : "Check-out"}
                      onClick={() => handleCheckInOut(asset)}
                    >
                      {asset.lastcheckoutdate ? <CheckSquare size={18} /> : <Square size={18} />}
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
    </div>
  );
}

export default HardwareAssets;