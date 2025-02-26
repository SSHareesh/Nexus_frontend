import React, { useState, useEffect } from "react";
import { Search, Plus, Eye, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const columnMappings = {
  softwarename: "Software Name",
  softwareversion: "Version",
  assetid: "Asset ID",
  assigneduserid: "Assigned User",
  licenseexpirydate: "Expiry Date",
  project: "Project",
  actions: "Actions"
};

const SoftwareAssets = () => {
  const [softwareAssets, setSoftwareAssets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("licenseexpirydate");
  const [sortOrder, setSortOrder] = useState("asc");
  const [message, setMessage] = useState(""); // State for success message
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSoftwareAssets = async () => {
      try {
        const response = await api.getSoftwareAssets();
        const sortedData = response.data.data.sort((a, b) =>
          new Date(a.licenseexpirydate) - new Date(b.licenseexpirydate)
        );
        setSoftwareAssets(sortedData);
      } catch (error) {
        console.error("Error fetching software assets:", error);
      }
    };
    fetchSoftwareAssets();
  }, []);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleViewMore = (software) => {
    navigate(`/EditSoftwareAssets/${software.softwareid}`);
  };

  const handleCreate = () => {
    navigate(`/AddSoftware`);
  };

  const handleDelete = async (softwareId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this software asset?");
    if (!isConfirmed) return;

    try {
      const response = await api.deleteSoftwareById(softwareId);
      setSoftwareAssets(softwareAssets.filter((asset) => asset.softwareid !== softwareId)); // Remove deleted asset
      setMessage(response.data.message); // Show success message
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error("Error deleting software asset:", error);
    }
  };

  const sortedAssets = [...softwareAssets].sort((a, b) =>
    sortOrder === "asc" ? (a[sortColumn] > b[sortColumn] ? 1 : -1) : (a[sortColumn] < b[sortColumn] ? 1 : -1)
  );


  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Software Assets</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
          </div>
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-base"
            onClick={handleCreate}
          >
            <Plus size={18} className="mr-2" /> Add New
          </button>
        </div>
      </div>

      {/* Success Message */}
      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-300 rounded-lg text-center">
          {message}
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full border-collapse text-base">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              {Object.keys(columnMappings).map((col) => (
                <th key={col} className="p-3 text-center cursor-pointer" onClick={() => handleSort(col)}>
                  {columnMappings[col]}
                  <span className="ml-1 inline-block">
                    {sortColumn === col ? (
                      sortOrder === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    ) : (
                      <ChevronUp size={14} className="text-gray-400" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedAssets.map((software) => (
              <tr key={software.softwareid} className="border-b hover:bg-gray-100 transition">
                <td className="p-3 text-center">{software.softwarename}</td>
                <td className="p-3 text-center">{software.softwareversion}</td>
                <td className="p-3 text-center">{software.assetid}</td>
                <td className="p-3 text-center">{software.assigneduserid}</td>
                <td className="p-3 text-center">{software.licenseexpirydate}</td>
                <td className="p-3 text-center">{software.project}</td>
                <td className="px-4 py-2 border-b flex justify-center space-x-2">
                  <button
                    className="p-2 rounded bg-blue-100 text-blue-600 hover:bg-blue-200"
                    title="View More"
                    onClick={() => handleViewMore(software)}
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    className="p-2 rounded bg-red-100 text-red-600 hover:bg-red-200"
                    title="Delete"
                    onClick={() => handleDelete(software.softwareid)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sortedAssets.length === 0 && (
          <div className="text-center p-4 text-gray-500 text-base">
            No matching software assets found.
          </div>
        )}
      </div>
    </div>
  );
};

export default SoftwareAssets;
