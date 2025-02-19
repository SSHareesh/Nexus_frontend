import React, { useState, useEffect } from "react";
import { Search, Filter, Plus, Eye, Edit, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import api from "../../utils/api";

const SoftwareAssets = () => {
  const [softwareAssets, setSoftwareAssets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("licenseexpirydate");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchSoftwareAssets = async () => {
      try {
        const response = await api.getSoftwareAssets();
        const sortedData = response.data.data.sort((a, b) => new Date(a.licenseexpirydate) - new Date(b.licenseexpirydate));
        setSoftwareAssets(sortedData);
      } catch (error) {
        console.error("Error fetching software assets:", error);
      }
    };
    fetchSoftwareAssets();
  }, []);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : sortOrder === "desc" ? "original" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedAssets = [...softwareAssets].sort((a, b) => {
    if (sortOrder === "original") return 0;
    return sortOrder === "asc"
      ? a[sortColumn] > b[sortColumn]
        ? 1
        : -1
      : a[sortColumn] < b[sortColumn]
        ? 1
        : -1;
  });

  const today = new Date();
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

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
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
            <Plus size={16} className="mr-2" /> Add New
          </button>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
        <table className="w-full border-collapse text-sm ">
          <thead className="bg-gray-200 text-gray-700 text-sm ">
            <tr>
              {["softwarename", "softwareversion", "assetid", "assigneduserid", "licenseexpirydate", "project", "actions"].map((col) => (
                <th key={col} className="p-2 text-left cursor-pointer" onClick={() => handleSort(col)}>
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                  {sortColumn === col && (
                    sortOrder === "asc" ? <ChevronUp size={12} className="inline ml-1" /> : sortOrder === "desc" ? <ChevronDown size={12} className="inline ml-1" /> : null
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedAssets.map((asset) => {
              const expiryDate = new Date(asset.licenseexpirydate);
              let dateColor = "";
              if (expiryDate < today) dateColor = "text-red-600";
              else if (expiryDate < oneMonthFromNow) dateColor = "text-yellow-600";

              return (
                <tr key={asset.id} className="border-b hover:bg-gray-100 transition text-sm ">
                  <td className="p-2">{asset.softwarename}</td>
                  <td className="p-2">{asset.softwareversion}</td>
                  <td className="p-2">{asset.assetid}</td>
                  <td className="p-2">{asset.assigneduserid}</td>
                  <td className={`p-2 ${dateColor}`}>{asset.licenseexpirydate}</td>
                  <td className="p-2">{asset.project}</td>
                  <td className="px-4 py-2 border-b flex space-x-2">
                    <button
                      className="p-2 rounded bg-blue-100 text-blue-600 hover:bg-blue-200"
                      title="View More"
                      onClick={() => handleViewMore(asset)}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="p-2 rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
                      title="Dispose"
                      onClick={() => handleDispose(asset.assetid)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="p-2 rounded bg-red-100 text-red-600 hover:bg-red-200"
                      title="Delete"
                      onClick={() => handleDelete(asset.assetid)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {sortedAssets.length === 0 && <div className="text-center p-4 text-gray-500 text-sm">No matching software assets found.</div>}
      </div>
    </div>
  );
};

export default SoftwareAssets;
