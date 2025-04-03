import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const AddMaintenance = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    assetid: "",
    issue: "",
    resolution_date: "",
    cost: "",
    vendor: "",
    approval_status: "",
    comments: "",
    request_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value === "" ? null : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting maintenance record:", formData);

    try {
      await api.createMaintenanceRecord(formData);
      setMessage("Maintenance Record Added Successfully!");
      setTimeout(() => navigate("/MaintenanceRecords"), 2000);
    } catch (error) {
      console.error("Error adding maintenance record:", error.response?.data || error.message);
      setError("Failed to add maintenance record. Please try again.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Maintenance Record</h1>
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg">{error}</div>}
      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-300 rounded-lg text-center">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label className="block text-gray-700 font-medium capitalize">
                {key.replace(/_/g, " ")}:
              </label>

              {/* Date picker for request_date and resolution_date */}
              {key === "request_date" || key === "resolution_date" ? (
                <input
                  type="date"
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : key === "approval_status" ? (
                // Dropdown for approval_status
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              ) : (
                <input
                  type="text"
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter ${key.replace(/_/g, " ")}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Add Maintenance Record
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMaintenance;
