import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { Save, X, Edit } from "lucide-react";

const EditHardware = () => {
    const { id: hardwareId } = useParams();
    const navigate = useNavigate();
    const [hardware, setHardware] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
      const fetchHardwareById = async () => {
          try {
              const response = await api.getAssetById(hardwareId);
              console.log("Hardware data:", response.data); // Log response
              setHardware(response.data); // Remove `.data.data` if unnecessary
          } catch (error) {
              console.error("Error fetching hardware asset:", error);
          }
      };
      fetchHardwareById();
  }, [hardwareId]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHardware({ 
        ...hardware, 
        [name]: value.trim() === "" ? null : value  // Convert empty strings to null
    });
};


const handleSave = async () => {
  try {
      const updatedHardware = { ...hardware };

      // Ensure `null` is set for empty fields
      Object.keys(updatedHardware).forEach(key => {
          if (updatedHardware[key] === "") {
              updatedHardware[key] = null;
          }
      });

      console.log("Data being sent to API:", updatedHardware);

      await api.updateAssetById(hardwareId, updatedHardware);
      navigate("/HardwareAssets");
  } catch (error) {
      console.error("Error updating hardware asset:", error);
  }
};


    if (!hardware) return <div>Loading...</div>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Hardware Asset</h1>

            <div className="bg-white p-6 shadow-lg rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.keys(hardware).map((key) => (
                        <div key={key}>
                            <label className="block text-gray-700 font-medium capitalize">
                                {key.replace(/_/g, " ")}
                            </label>
                            <input
                                type="text"
                                name={key}
                                value={hardware[key] || ""}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full p-2 border rounded-lg focus:outline-none ${isEditing ? "focus:ring-2 focus:ring-blue-500" : "bg-gray-100"}`}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex space-x-4 mt-6">
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
                        >
                            <Edit size={18} className="inline-block mr-2" />
                            Edit
                        </button>
                    )}
                    {isEditing && (
                        <>
                            <button
                                onClick={handleSave}
                                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                            >
                                <Save size={18} className="inline-block mr-2" />
                                Save
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition"
                            >
                                <X size={18} className="inline-block mr-2" />
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditHardware;
