import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const AddSoftware = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        softwarename: "",
        softwareversion: "",
        purchasedate: "",
        assetid: "",
        licensetype: "",
        licenseexpirydate: "",
        assigneduserid: "",
        project: "",
        userstatus: "",
        vendor: "",
        licensepurchasedate: "",
        licensekey: "",
        serialnumber: "",
        licenseduration: "",
        licensecost: "",
        username: "",
        password: "",
        expiredstatus: "",
        renewaldate: "",
        renewalcost: "",
        comments: "",
    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.softwarename || !formData.licenseduration) {
            setError("Software Name and License Duration are required!");
            return;
        }

        try {
            const response = await api.createSoftware(formData);
            setSuccessMessage("Software Asset Added Successfully!");
            setTimeout(() => navigate("/SoftwareAssets"), 2000);
        } catch (error) {
            setError("Failed to add software asset. Please try again.");
            console.error("Error adding software asset:", error);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Software Asset</h1>

            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg">{error}</div>}
            {successMessage && <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-300 rounded-lg">{successMessage}</div>}

            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.keys(formData).map((key) => (
                        <div key={key}>
                            <label className="block text-gray-700 font-medium capitalize">
                                {key.replace(/([A-Z])/g, " $1")}:
                                {key === "softwarename" || key === "licenseduration" ? <span className="text-red-500">*</span> : ""}
                            </label>
                            {[
                                "purchasedate", "licenseexpirydate", "licensepurchasedate", "renewaldate"
                            ].includes(key) ? (
                                <input
                                    type="date"
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required={key === "softwarename" || key === "licenseduration"}
                                />
                            ) : ["licensetype", "userstatus", "vendor"].includes(key) ? (
                                <select
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select {key.replace(/([A-Z])/g, " $1")}</option>
                                    {key === "licensetype" && (
                                        <>
                                            <option value="Perpetual">Perpetual</option>
                                            <option value="Subscription">Subscription</option>
                                        </>
                                    )}
                                    {key === "userstatus" && (
                                        <>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </>
                                    )}
                                    {key === "vendor" && (
                                        <>
                                            <option value="Microsoft">Microsoft</option>
                                            <option value="Adobe">Adobe</option>
                                            <option value="Oracle">Oracle</option>
                                            <option value="IBM">IBM</option>
                                        </>
                                    )}
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={`Enter ${key.replace(/([A-Z])/g, " $1")}`}
                                    required={key === "softwarename" || key === "licenseduration"}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                        Add Software
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddSoftware;