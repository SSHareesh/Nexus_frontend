import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api"; // Import API functions

const AddHardwareAsset = () => {
  const navigate = useNavigate();
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
    typeOfOS: "",
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
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("📝 Submitting asset:", formData);
    
    const assetData = { data: [formData] }; // Wrap in data array

    try {
        const response = await api.createAsset(assetData);
        console.log("✅ Response:", response.data);
        alert("Hardware Asset Added Successfully!");
        navigate("/HardwareAssets");
    } catch (error) {
        console.error("❌ Error adding hardware asset:", error.response?.data || error.message);
        alert("Failed to add asset. Please try again.");
    }
};

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Hardware Asset</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label className="block text-gray-700 font-medium capitalize">
                {key.replace(/([A-Z])/g, " $1")}:
              </label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter ${key.replace(/([A-Z])/g, " $1")}`}
              />
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
