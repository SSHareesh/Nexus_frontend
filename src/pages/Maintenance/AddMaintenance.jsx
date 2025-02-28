import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api"; // Import API functions

const AddMaintenance = () => {
  const navigate = useNavigate();
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
      [name]: value === "" ? null : value, // Convert empty strings to null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Submitting maintenance record:", formData);
    
    try {
      const response = await api.createMaintenanceRecord(formData);
      console.log("Response:", response.data);
      alert("Maintenance Record Added Successfully!");
      navigate("/MaintenanceRecords");
    } catch (error) {
      console.error("Error adding maintenance record:", error.response?.data || error.message);
      alert("Failed to add maintenance record. Please try again.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Maintenance Record</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label className="block text-gray-700 font-medium capitalize">
                {key.replace(/_/g, " ")}:
              </label>
              <input
                type="text"
                name={key}
                value={formData[key] || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter ${key.replace(/_/g, " ")}`}
              />
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
