import React, { useState, useEffect } from "react";
import { Search, Plus, Eye, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../utils/api";
import { format, isPast, differenceInDays } from "date-fns";

const columnMappings = {
  softwarename: "Software Name",
  softwareversion: "Version",
  assetid: "Asset ID",
  assigneduserid: "Assigned User",
  licenseexpirydate: "Expiry Date",
  project: "Project",
  actions: "Actions",
};

const SoftwareAssets = () => {
  const [softwareAssets, setSoftwareAssets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("licenseexpirydate");
  const [sortOrder, setSortOrder] = useState("asc");
  const [message, setMessage] = useState("");
  const [showExpiringOnly, setShowExpiringOnly] = useState(false);
  const [selectedSoftware, setSelectedSoftware] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchSoftwareAssets = async () => {
      try {
        const response = await api.getSoftwareAssets();
        let sortedData = response.data.data.sort((a, b) =>
          new Date(a.licenseexpirydate) - new Date(b.licenseexpirydate)
        );

        const queryParams = new URLSearchParams(location.search);
        if (queryParams.get("filter") === "expiring") {
          sortedData = sortedData.filter(asset =>
            differenceInDays(new Date(asset.licenseexpirydate), new Date()) <= 30
          );
          setShowExpiringOnly(true);
        }

        setSoftwareAssets(sortedData);
      } catch (error) {
        console.error("Error fetching software assets:", error);
      }
    };

    fetchSoftwareAssets();
  }, [location.search]);

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

  const handleDelete = async () => {
    if (!selectedSoftware) return;

    try {
      await api.deleteSoftwareById(selectedSoftware.softwareid);
      setSoftwareAssets(softwareAssets.filter(asset => asset.softwareid !== selectedSoftware.softwareid));
      setMessage(`${selectedSoftware.softwarename} deleted successfully.`);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting software asset:", error);
      alert("Error deleting software asset")
    }
    setSelectedSoftware(null);
  };

  const filteredAssets = softwareAssets.filter((asset) =>
    asset.softwarename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedAssets = [...filteredAssets].sort((a, b) => {
    if (sortColumn === "licenseexpirydate") {
      return sortOrder === "asc"
        ? new Date(a.licenseexpirydate) - new Date(b.licenseexpirydate)
        : new Date(b.licenseexpirydate) - new Date(a.licenseexpirydate);
    }
    return sortOrder === "asc"
      ? a[sortColumn].localeCompare(b[sortColumn])
      : b[sortColumn].localeCompare(a[sortColumn]);
  });

  const getExpiryDateDisplay = (date) => {
    const expiryDate = new Date(date);
    const formattedDate = format(expiryDate, "MMMM dd, yyyy");

    if (isPast(expiryDate)) {
      return <span className="text-red-500">{formattedDate} (Expired)</span>;
    } else if (differenceInDays(expiryDate, new Date()) <= 30) {
      return <span className="text-yellow-500">{formattedDate} (Expiring Soon)</span>;
    } else {
      return formattedDate;
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-xl md:text-xl font-bold text-gray-800">Software Assets</h1>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base w-full"
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

      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-300 rounded-lg text-center">
          {message}
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
        <table className="min-w-full border-collapse text-base">
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
                <td className="p-3 text-center">{getExpiryDateDisplay(software.licenseexpirydate)}</td>
                <td className="p-3 text-center">{software.project}</td>
                <td className="px-4 py-2 border-b flex justify-center space-x-2">
                  <button className="p-2 rounded bg-blue-100 text-blue-600 hover:bg-blue-200" onClick={() => handleViewMore(software)}>
                    <Eye size={18} />
                  </button>
                  <button className="p-2 rounded bg-red-100 text-red-600 hover:bg-red-200" onClick={() => setSelectedSoftware(software)}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedSoftware && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="pb-6">Are you sure you want to delete <strong>{selectedSoftware.softwarename}</strong>?</p>
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Delete</button>
            <button onClick={() => setSelectedSoftware(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoftwareAssets;
