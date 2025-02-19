import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";  // Import update function
import { Save, Trash2, X, Edit } from "lucide-react";   // For Save/Cancel buttons

const EditHardware = () => {
  const { id } = useParams();  // Get asset ID from URL
  const navigate = useNavigate();  // For navigation
  const [asset, setAsset] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchAssetById = async () => {
      const data = await api.getAssetById(id);
      setAsset(data.data);  // Set asset data
    };
    fetchAssetById();
  }, [id]);

  const handleChange = (e) => {
    setAsset({
      ...asset,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      // Update the asset using the updateAsset function
      const updatedAsset = await api.updateAssetById(id, asset);
      console.log("Updated asset", updatedAsset);
      navigate("/HardwareAssets");  // After saving, navigate back to the assets list
    } catch (error) {
      console.error("Error saving asset:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const handleCancel = () => {
    // Navigate back to the HardwareAssets page without saving
    navigate("/HardwareAssets");
  };

  const handleEdit = () => {
    setIsEditing(true);  // Enable edit mode
  };

  if (!asset) {
    return <div>Loading...</div>; // Show loading if data is not yet fetched
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800">Edit Hardware Asset</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mt-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Fields arranged in grid */}
            <div>
              <label className="font-medium">Asset ID</label>
              <input
                type="text"
                name="assetid"
                value={asset.assetid}
                disabled={!isEditing}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Make</label>
              <input
                type="text"
                name="make"
                value={asset.make}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Category</label>
              <input
                type="text"
                name="assettype"
                value={asset.assettype}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Product ID</label>
              <input
                type="text"
                name="productid"
                value={asset.productid}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Purchase Date</label>
              <input
                type="text"
                name="purchasedate"
                value={asset.purchasedate}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Retailer</label>
              <input
                type="text"
                name="retailer"
                value={asset.retailer}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Warranty Expiry</label>
              <input
                type="text"
                name="warrantyexpiry"
                value={asset.warrantyexpiry}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Assigned user id</label>
              <input
                type="text"
                name="assigneduserid"
                value={asset.assigneduserid}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={asset.location}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Status</label>
              <select
                name="status"
                value={asset.status}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg"
              >
                <option value="In Stock">In Stock</option>
                <option value="Assigned">Assigned</option>
                <option value="Under Maintenance">Under Maintenance</option>
                <option value="Disposed">Disposed</option>
              </select>
            </div>
            <div>
              <label className="font-medium">Last Checkout date</label>
              <input
                type="text"
                name="lastcheckoutdate"
                value={asset.lastcheckoutdate}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Size</label>
              <input
                type="text"
                name="size"
                value={asset.size}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">OS</label>
              <input
                type="text"
                name="operatingsystem"
                value={asset.operatingsystem}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Type of OS</label>
              <input
                type="text"
                name="typeofos"
                value={asset.typeofos}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Product Key</label>
              <input
                type="text"
                name="productkey"
                value={asset.productkey}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Processor</label>
              <input
                type="text"
                name="processor"
                value={asset.processor}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Ram</label>
              <input
                type="text"
                name="ram"
                value={asset.ram}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Hard disk type</label>
              <input
                type="text"
                name="harddisktype"
                value={asset.harddisktype}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Hard disk size</label>
              <input
                type="text"
                name="harddisksize"
                value={asset.harddisksize}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Hard disk Model</label>
              <input
                type="text"
                name="harddiskmodel"
                value={asset.harddiskmodel}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Resolution</label>
              <input
                type="text"
                name="resolution"
                value={asset.resolution}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Graphics card Model </label>
              <input
                type="text"
                name="graphicscardmodel"
                value={asset.graphicscardmodel}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">External dongle</label>
              <input
                type="text"
                name="externaldongle"
                value={asset.externaldongledetails}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Check in</label>
              <input
                type="text"
                name="check_in"
                value={asset.check_in}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            {/* Add more fields as necessary */}
          </div>

          <div className="flex space-x-4 mt-4">
            {/* Edit Button */}
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Edit size={18} className="inline-block mr-2" />
                Edit
              </button>
            )}

            {/* Save and Cancel buttons appear when editing */}
            {isEditing && (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Save size={18} className="inline-block mr-2" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  <X size={18} className="inline-block mr-2" />
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHardware;
