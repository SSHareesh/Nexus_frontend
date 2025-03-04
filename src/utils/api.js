import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Adjust the port if needed

const api = {
    // Asset Routes
    getAssets: () => axios.get(`${BASE_URL}/assets`),
    getAssetById: (id) => axios.get(`${BASE_URL}/assets/${id}`),
    createAsset: (data) => axios.post(`${BASE_URL}/assets`, data),
    updateAssetById: async (id, data) => {
        try {
            const sanitizedData = Object.fromEntries(
                Object.entries(data).map(([key, value]) => [key, value === "" ? null : value])
            );
    
            return await axios.put(`${BASE_URL}/assets/${id}`, sanitizedData);
        } catch (error) {
            console.error("Error in updateAssetById:", error);
            throw error;
        }
    },
    
    deleteAssetById: (id) => axios.delete(`${BASE_URL}/assets/${id}`),

    // Software Routes
    getSoftwareAssets: () => axios.get(`${BASE_URL}/software`),
    getSoftwareById: (id) => axios.get(`${BASE_URL}/software/${id}`),
    createSoftware: (data) => axios.post(`${BASE_URL}/software`, data),
    updateSoftwareById: (id, data) => axios.put(`${BASE_URL}/software/${id}`, data),
    deleteSoftwareById: (id) => axios.delete(`${BASE_URL}/software/${id}`),

    // User Routes
    getUsers: () => axios.get(`${BASE_URL}/users`),
    getUserById: (id) => axios.get(`${BASE_URL}/users/${id}`),
    createUser: (data) => axios.post(`${BASE_URL}/users`, data),
    updateUserById: (id, data) => axios.put(`${BASE_URL}/users/${id}`, data),
    deleteUserById: (id) => axios.delete(`${BASE_URL}/users/${id}`),

    // Notification Routes
    getNotifications: () => axios.get(`${BASE_URL}/notifications`),  // Fetch all notifications
    getMaintenanceNotifications: () => axios.get(`${BASE_URL}/notifications/maintenance`),  // Fetch maintenance notifications

    // Maintenance Routes
    getMaintenanceRecords: () => axios.get(`${BASE_URL}/maintenance`),
    getMaintenanceById:(id) => axios.get(`${BASE_URL}/maintenance/${id}`),
    createMaintenanceRecord: (data) => axios.post(`${BASE_URL}/maintenance`, data),
    updateMaintenanceRecordById: (id, data) => axios.put(`${BASE_URL}/maintenance/${id}`, data),
    deleteMaintenanceRecordById: (id) => axios.delete(`${BASE_URL}/maintenance/${id}`),

    // Count Routes
    getCounts: () => axios.get(`${BASE_URL}/count`),
    getCountByTable: (tableName) => axios.get(`${BASE_URL}/count?table=${tableName}`),

    //disposal routes
    getDisposed: ()=> axios.get(`${BASE_URL}/disposal`),
    createDisposed: (data)=> axios.post(`${BASE_URL}/disposal`, data)
};

export default api;
