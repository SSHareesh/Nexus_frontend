import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Fetch counts for Dashboard
export const fetchCounts = async () => {
  try {
    const response = await api.get("/count");
    return response.data.counts || {}; // Ensure only counts are returned
  } catch (error) {
    console.error("Error fetching counts:", error);
    return {};
  }
};

/* export const fetchAssets = async () => {
  try {
    const response = await api.get('/assets');
    return response.data.data; // Return only asset data
  } catch (error) {
    console.error('Error fetching assets:', error);
    return []; // Return empty array on error
  }
}; */

// ✅ Fetch all hardware assets for HardwareAssets.jsx
export const fetchAssets = async () => {
  try {
    const response = await api.get("/assets");
    return response.data || []; // Ensure an array is returned
  } catch (error) {
    console.error("Error fetching assets:", error);
    return [];
  }
};

// ✅ Fetch a single asset by ID
export const fetchAssetById = async (id) => {
  try {
    const response = await api.get(`/assets/${id}`);
    return response.data || null; // Return null if not found
  } catch (error) {
    console.error(`Error fetching asset with ID ${id}:`, error);
    return null;
  }
};

export const updateAsset = async (id, updatedData) => {
  try {
    const response = await api.put(`/assets/${id}`, updatedData);
    return response.data; // Return updated asset data
  } catch (error) {
    console.error(`Error updating asset with ID ${id}:`, error);
    throw new Error("Failed to update asset.");
  }
};

export default api;
