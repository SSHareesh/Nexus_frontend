import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { Save, X, Edit } from "lucide-react";

const EditUser = () => {
    const { id: userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUserById = async () => {
            try {
                const response = await api.getUserById(userId);
                console.log("User data:", response.data);
                setUser(response.data); 
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUserById();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value.trim() === "" ? null : value, // Convert empty fields to null
        });
    };
   const [successMessage,setSuccessMessage]=useState("");
   const [error,setError]=useState("");
    const handleSave = async () => {
        try {
            const updatedUser = { ...user };

            // Ensure `null` is set for empty fields
            Object.keys(updatedUser).forEach((key) => {
                if (updatedUser[key] === "") {
                    updatedUser[key] = null;
                }
            });
            setSuccessMessage("User details updated successfully")
            console.log("Updating user:", updatedUser);

            await api.updateUserById(userId, updatedUser);
            setTimeout(() => navigate("/Users"),2000);
        } catch (error) {
            setError("Error updating user:", error);
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit User</h1>
            {successMessage && <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-300 rounded-lg">{successMessage}</div>}
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg">{error}</div>}


            <div className="bg-white p-6 shadow-lg rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.keys(user).map((key) => (
                        <div key={key}>
                            <label className="block text-gray-700 font-medium capitalize">
                                {key.replace(/_/g, " ")}
                            </label>
                            <input
                                type="text"
                                name={key}
                                value={user[key] || ""}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full p-2 border rounded-lg focus:outline-none ${
                                    isEditing ? "focus:ring-2 focus:ring-blue-500" : "bg-gray-100"
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

export default EditUser;
