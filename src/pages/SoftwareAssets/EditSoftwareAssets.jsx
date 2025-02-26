import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { Save, X, Edit } from "lucide-react";

const EditSoftware = () => {
    const { id: softwareid } = useParams();
    const navigate = useNavigate();
    const [software, setSoftware] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchSoftwareById = async () => {
            try {
                const response = await api.getSoftwareById(softwareid);
                setSoftware(response.data.data);
            } catch (error) {
                console.error("Error fetching software asset:", error);
            }
        };
        fetchSoftwareById();
    }, [softwareid]);

    const handleChange = (e) => {
        setSoftware({ ...software, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            await api.updateSoftwareById(softwareid, software);
            navigate("/SoftwareAssets");
        } catch (error) {
            console.error("Error updating software asset:", error);
        }
    };

    if (!software) return <div>Loading...</div>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Software Asset</h1>

            <div className="bg-white p-6 shadow-lg rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.keys(software).map((key) => (
                        <div key={key}>
                            <label className="block text-gray-700 font-medium capitalize">
                                {key.replace(/_/g, " ")}
                            </label>
                            <input
                                type="text"
                                name={key}
                                value={software[key] || ""}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full p-2 border rounded-lg focus:outline-none ${isEditing ? "focus:ring-2 focus:ring-blue-500" : "bg-gray-100"
                                    }`}
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

export default EditSoftware;
