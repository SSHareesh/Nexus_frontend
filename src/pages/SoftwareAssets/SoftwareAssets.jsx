import React, { useState, useEffect } from "react";
import { Search, Filter, Plus } from "lucide-react";

const SoftwareAssets = () => {
  const [softwareAssets, setSoftwareAssets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchSoftwareAssets = async () => {
      try {
        const response = await fetch("https://your-api-endpoint.com/software-assets"); 
        const data = await response.json();
        setSoftwareAssets(data);
      } catch (error) {
        console.error("Error fetching software assets:", error);
      }
    };

    fetchSoftwareAssets();
  }, []);

  const filterOptions = ["All", "Active", "Expired", "Inactive"];

  
  const filteredAssets = softwareAssets.filter((asset) => {
    return (
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedFilter === "All" || asset.status === selectedFilter)
    );
  });

  return (
    <div className="p-8">
     
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Software Assets</h1>
        <div className="flex space-x-4">
          
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-200"
              onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <Filter size={16} className="mr-2" />
              {selectedFilter}
            </button>
            {isFilterOpen && (
              <div className="absolute mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedFilter(option);
                      setIsFilterOpen(false);
                    }}
                    className={`block px-4 py-2 w-full text-left ${
                      selectedFilter === option ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                    }`}>
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Add New Button */}
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={16} className="mr-2" />
            Add New
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Version</th>
              <th className="p-3 text-left">License Key</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map((asset) => (
              <tr key={asset.id} className="border-b hover:bg-gray-100 transition">
                <td className="p-3">{asset.name}</td>
                <td className="p-3">{asset.version}</td>
                <td className="p-3">{asset.licenseKey}</td>
                <td className={`p-3 font-semibold ${
                  asset.status === "Active" ? "text-green-600" :
                  asset.status === "Expired" ? "text-red-600" : 
                  "text-yellow-600"
                }`}>
                  {asset.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAssets.length === 0 && (
          <div className="text-center p-4 text-gray-500">No matching software assets found.</div>
        )}
      </div>
    </div>
  );
};

export default SoftwareAssets;
