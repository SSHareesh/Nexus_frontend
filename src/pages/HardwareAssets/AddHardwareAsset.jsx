import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api"; // Import API functions

const AddHardwareAsset = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    assetId: "",
    assetType: "",
    make: "",
    productId: "",
    purchaseDate: "",
    retailer: "",
    warrantyExpiry: "",
    assignedUserId: "",
    location: "",
    status: "",
    lastCheckoutDate: "",
    size: "",
    operatingSystem: "",
    typeofos: "",
    productKey: "",
    processor: "",
    ram: "",
    hardDiskType: "",
    hardDiskSize: "",
    hardDiskModel: "",
    resolution: "",
    graphicsCardModel: "",
    externalDongleDetails: "",
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
    console.log("Submitting asset:", formData);
    const assetData = { data: [formData] }; // Wrap in data array

    try {
      const response = await api.createAsset(assetData);
      console.log("Response:", response.data);
      setMessage("Hardware Asset Added Successfully!");
      setTimeout(() => navigate("/HardwareAssets"), 2000);
    } catch (error) {
      console.error("Error adding hardware asset:", error.response?.data || error.message);
      setError("Failed to add asset. Please try again.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Hardware Asset</h1>
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
                {key.replace(/([A-Z])/g, " $1")}:
              </label>

              {/* Date Pickers */}
              {["purchaseDate", "warrantyExpiry", "lastCheckoutDate"].includes(key) ? (
                <input
                  type="date"
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : key === "assetType" ? (
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Asset Type</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Desktop">Desktop</option>
                  <option value="Monitor">Monitor</option>
                  <option value="Printer">Printer</option>
                </select>
              ) : key === "status" ? (
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Status</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Unassigned">Unassigned</option>
                  <option value="InStock">In Stock</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Disposed">Disposed</option>
                </select>
              ) : key === "retailer" ? (
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Retailer</option>
                  <option value="Amazon">Amazon</option>
                  <option value="Best Buy">Best Buy</option>
                  <option value="Newegg">Newegg</option>
                  <option value="Walmart">Walmart</option>
                </select>
              ) : key === "ram" ? (
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select RAM Size</option>
                  <option value="4GB">4GB</option>
                  <option value="8GB">8GB</option>
                  <option value="16GB">16GB</option>
                  <option value="32GB">32GB</option>
                  <option value="64GB">64GB</option>
                </select>
              ) : key === "hardDiskType" ? (
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Hard Disk Type</option>
                  <option value="HDD">HDD</option>
                  <option value="SSD">SSD</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              ) : key === "hardDiskSize" ? (
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Hard Disk Size</option>
                  <option value="256GB">256GB</option>
                  <option value="512GB">512GB</option>
                  <option value="1TB">1TB</option>
                  <option value="2TB">2TB</option>
                </select>
              ) : (
                <input
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter ${key.replace(/([A-Z])/g, " $1")}`}
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
            Add Asset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHardwareAsset;
 