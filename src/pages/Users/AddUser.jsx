import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api"; // Import API functions

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userid: "",
    name: "",
    email: "",
    phone: "",
    status: "",
    employee_type: "",
    project: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value === "" ? null : value, // Convert empty strings to null
    }));
  };
  const [error,setError] = useState("");
  const [successMessage,setSuccessMessage]=useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting user:", formData);

    try {
      const response = await api.createUser(formData);
      console.log("Response:", response.data);
      setSuccessMessage("User Added Successfully!");
      setTimeout(() => navigate("/Users"),2000);
    } catch (error) {
      console.error("Error adding user:", error.response?.data || error.message);
      setError("Failed to add user. Please try again.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add User</h1>
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg">{error}</div>}
      {successMessage && <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-300 rounded-lg">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label className="block text-gray-700 font-medium capitalize">
                {key.replace(/_/g, " ")}: 
              </label>
              <input
                type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                name={key}
                value={formData[key] || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter ${key.replace(/_/g, " ")}`}
              />
            </div>
          ))}
        </div>


          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
            Add User
          </button>
        
      </form>
    </div>
  );
};

export default AddUser;
