import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api"; // Import API functions
import { Save, X, Edit } from "lucide-react";

const EditHardware = () => {
  const { id } = useParams(); // Get asset ID from URL
  const navigate = useNavigate(); // For navigation
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchAssetById = async () => {
      try {
        const response = await api.getAssetById(id);
        setFormData(response.data); // Ensure data is set correctly
      } catch (error) {
        console.error("Error fetching asset:", error);
      }
    };
    fetchAssetById();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.updateAssetById(id, formData);
      alert("Hardware Asset Updated Successfully!");
      navigate("/HardwareAssets");
    } catch (error) {
      console.error("Error updating asset:", error);
      alert("Failed to update asset. Please try again.");
    }
  };

  if (!formData) {
    return <div className="p-6 text-gray-600">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Hardware Asset</h1>

      <div className="bg-white p-6 shadow-lg rounded-lg">
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
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex space-x-4">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
            >
              <Edit size={18} className="inline-block mr-2" />
              Edit
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              >
                <Save size={18} className="inline-block mr-2" />
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false); // Cancel editing mode
                  navigate("/HardwareAssets");
                }}
                className="px-6 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition"
              >
                <X size={18} className="inline-block mr-2" />
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditHardware;
