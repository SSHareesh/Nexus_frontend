import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { Save, X, Edit } from "lucide-react";

const EditHardware = () => {
    const { id: hardwareId } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [hardware, setHardware] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchHardwareById = async () => {
            try {
                const response = await api.getAssetById(hardwareId);
                setHardware(response.data);
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
            [name]: value.trim() === "" ? null : value  
        });
    };

    const handleSave = async () => {
        try {
            const updatedHardware = { ...hardware };
            Object.keys(updatedHardware).forEach(key => {
                if (updatedHardware[key] === "") {
                    updatedHardware[key] = null;
                }
            });

            await api.updateAssetById(hardwareId, updatedHardware);
            setMessage("Data updated successfully");
            setTimeout(() => navigate("/HardwareAssets"), 2000);
        } catch (error) {
            console.error("Error updating hardware asset:", error);
            setError("Error updating the Asset details");
        }
    };

    if (!hardware) return <div>Loading...</div>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Hardware Asset</h1>
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg">{error}</div>}
            {message && <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-300 rounded-lg text-center">{message}</div>}
            
            <div className="bg-white p-6 shadow-lg rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.keys(hardware).map((key) => (
                        <div key={key}>
                            <label className="block text-gray-700 font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
                            {[
                                "purchaseDate", "warrantyExpiry", "lastCheckoutDate"
                            ].includes(key) ? (
                                <input
                                    type="date"
                                    name={key}
                                    value={hardware[key] || ""}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : ["assetType", "status", "retailer", "ram", "hardDiskType", "hardDiskSize"].includes(key) ? (
                                <select
                                    name={key}
                                    value={hardware[key] || ""}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select {key.replace(/([A-Z])/g, " $1")}</option>
                                    {key === "assetType" && ["Laptop", "Desktop", "Monitor", "Printer"].map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                    {key === "status" && ["Assigned", "Unassigned", "InStock", "Maintenance", "Disposed"].map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                    {key === "retailer" && ["Amazon", "Best Buy", "Newegg", "Walmart"].map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                    {key === "ram" && ["4GB", "8GB", "16GB", "32GB", "64GB"].map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                    {key === "hardDiskType" && ["HDD", "SSD", "Hybrid"].map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                    {key === "hardDiskSize" && ["256GB", "512GB", "1TB", "2TB"].map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    name={key}
                                    value={hardware[key] || ""}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={`Enter ${key.replace(/([A-Z])/g, " $1")}`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex space-x-4 mt-6">
                    {!isEditing ? (
                        <button onClick={() => setIsEditing(true)} className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition">
                            <Edit size={18} className="inline-block mr-2" /> Edit
                        </button>
                    ) : (
                        <>
                            <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                                <Save size={18} className="inline-block mr-2" /> Save
                            </button>
                            <button onClick={() => setIsEditing(false)} className="px-6 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition">
                                <X size={18} className="inline-block mr-2" /> Cancel
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditHardware;
