import React, { useState, useEffect } from "react";
import { Plus, Filter, Search } from "lucide-react";

function HardwareAssets() {
  const [assets, setAssets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.example.com/hardware-assets");
        if (!response.ok) {
          throw new Error("Failed to fetch assets");
        }
        const data = await response.json();
        setAssets(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const filterOptions = [
    "All",
    "In Stock",
    "Assigned",
    "Under Maintenance",
    "Disposed",
    "Expiring Soon",
  ];

  const filteredAssets = assets.filter((asset) => {
    return (
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedFilter === "All" || selectedFilter === "" || asset.status === selectedFilter)
    );
  });

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
              className="px-4 py-2 flex items-center bg-gray-200 rounded-lg hover:bg-gray-300 transition" >
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
                    }} >
                    {filter}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Add New Button */}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Plus className="inline-block mr-2" size={18} />
            Add New
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b">Asset Name</th>
              <th className="px-6 py-3 border-b">Category</th>
              <th className="px-6 py-3 border-b">Status</th>
              <th className="px-6 py-3 border-b">Location</th>
              <th className="px-6 py-3 border-b">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 border-b">{asset.name}</td>
                  <td className="px-6 py-4 border-b">{asset.category}</td>
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
                  <td className="px-6 py-4 border-b">{asset.location}</td>
                  <td className="px-6 py-4 border-b">{asset.lastUpdated}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
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
