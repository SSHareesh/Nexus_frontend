import React, { useState, useEffect } from "react";
import { Plus, Filter, Search, Edit, Trash2, Eye } from "lucide-react";
import { fetchAssets } from "../../utils/api"; // Import API function

function HardwareAssets() {
  const [assets, setAssets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAssets();
        console.log("Fetched Assets:", data); // Debugging API Response
        setAssets(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchData();
  }, []);

  // Filter Options
  const filterOptions = ["In Stock", "Assigned", "Under Maintenance", "Disposed"];

  // Handle filter selection
  const toggleFilter = (filter) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter) ? prevFilters.filter((f) => f !== filter) : [...prevFilters, filter]
    );
    setShowFilters(false);
  };

  // Remove selected filter
  const removeFilter = (filter) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter));
  };

  // Apply search and filters
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.assetid.toString().includes(searchQuery);
    const matchesFilter =
      selectedFilters.length === 0 || selectedFilters.includes(asset.status);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold text-gray-800">Hardware Assets</h1>
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by Asset ID..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Selected Filters Display */}
          <div className="flex space-x-2">
            {selectedFilters.map((filter) => (
              <span key={filter} className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full flex items-center">
                {filter} <button className="ml-2" onClick={() => removeFilter(filter)}>❌</button>
              </span>
            ))}
          </div>

          {/* Filter Button */}
          <div className="relative">
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
                      selectedFilters.includes(filter) ? "font-bold" : ""
                    }`}
                    onClick={() => toggleFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Add New Asset Button */}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Plus className="inline-block mr-2" size={18} />
            Add New
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b">Asset ID</th>
              <th className="px-6 py-3 border-b">OS Type</th>
              <th className="px-6 py-3 border-b">Assigned User ID</th>
              <th className="px-6 py-3 border-b">Last Checkout Date</th>
              <th className="px-6 py-3 border-b">Status</th>
              <th className="px-6 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 border-b">{asset.assetid}</td>
                  <td className="px-6 py-4 border-b">{asset.ostype}</td>
                  <td className="px-6 py-4 border-b">{asset.assigneduserid}</td>
                  <td className="px-6 py-4 border-b">{asset.lastcheckoutdate}</td>
                  <td className="px-6 py-4 border-b">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        asset.status === "In Stock"
                          ? "bg-green-200 text-green-800"
                          : asset.status === "Assigned"
                          ? "bg-yellow-200 text-yellow-800"
                          : asset.status === "Under Maintenance"
                          ? "bg-orange-200 text-orange-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye size={18} />
                    </button>
                    <button className="text-green-600 hover:text-green-800">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
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
