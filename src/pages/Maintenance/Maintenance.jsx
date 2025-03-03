import React, { useState, useEffect } from "react";
import { Search, Plus, Eye, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const columnMappings = {
  assetid: "Asset ID",
  maintenanceid: "Maintenance ID",
  issue: "Issue",
  resolution_date: "Expected Date",
  cost: "Cost",
  vendor: "Vendor",
  approval_status: "Approval Status",
  comments: "Comments",
  request_date: "Request Date",
  actions: "Actions",
};

const MaintenanceRecords = () => {
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("request_date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [message, setMessage] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await api.getMaintenanceRecords();
        setRecords(response.data.data);
      } catch (error) {
        console.error("Error fetching maintenance records:", error);
      }
    };
    fetchRecords();
  }, []);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleViewMore = (record) => {
    navigate(`/EditMaintenance/${record.maintenanceid}`);
  };

  const handleCreate = () => {
    navigate(`/AddMaintenance`);
  };

  const handleDelete = async () => {
    if (!selectedRecord) return;
    try {
      await api.deleteMaintenanceRecordById(selectedRecord.maintenanceid);
      setRecords(records.filter(record => record.maintenanceid !== selectedRecord.maintenanceid));
      setMessage(`Maintenance record deleted successfully.`);
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error("Error deleting maintenance record:", error);
      alert("Error deleting maintenance record")
    }
    setSelectedRecord(null);
  };

  const filteredRecords = records.filter((record) =>
    record.issue.toLowerCase().includes(searchQuery.toLowerCase())
  );

 
  const sortedRecords = [...filteredRecords].sort((a, b) => {
  const valA = a[sortColumn] ? a[sortColumn].toString() : "";
  const valB = b[sortColumn] ? b[sortColumn].toString() : "";
  if (sortColumn === "resolution_date" || sortColumn === "request_date") {
    return sortOrder === "asc"
      ? new Date(valA) - new Date(valB)
      : new Date(valB) - new Date(valA);
  }  
  return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
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
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-xl md:text-xl font-bold text-gray-800">Maintenance Records</h1>
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
        <table className="min-w-full border-collapse text-sm ">
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
            {sortedRecords.map((record) => (
              <tr key={record.maintenanceid} className="border-b hover:bg-gray-100 transition">
                <td className="p-3 text-center">{record.assetid}</td>
                <td className="p-3 text-center">{record.maintenanceid}</td>
                <td className="p-3 text-center">{record.issue}</td>
                <td className="p-3 text-center">{formatDate(record.resolution_date)}</td>
                <td className="p-3 text-center">{record.cost}</td>
                <td className="p-3 text-center">{record.vendor}</td>
                <td className="p-3 text-center">{record.approval_status}</td>
                <td className="p-3 text-center">{record.comments}</td>
                <td className="p-3 text-center">{formatDate(record.request_date)}</td>
                <td className="px-4 py-2 border-b flex justify-center space-x-2">
                  <button className="p-2 rounded bg-blue-100 text-blue-600 hover:bg-blue-200" onClick={() => handleViewMore(record)}>
                    <Eye size={18} />
                  </button>
                  <button className="p-2 rounded bg-red-100 text-red-600 hover:bg-red-200" onClick={() => setSelectedRecord(record)}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="pb-6">Are you sure you want to delete this maintenance record?</p>
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Delete</button>
            <button onClick={() => setSelectedRecord(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceRecords;
