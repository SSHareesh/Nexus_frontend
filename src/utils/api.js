import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Adjust the port if needed

const api = {
    // Asset Routes
    getAssets: () => axios.get(`${BASE_URL}/assets`),
    getAssetById: (id) => axios.get(`${BASE_URL}/assets/${id}`),
    createAsset: (data) => axios.post(`${BASE_URL}/assets`, data),
    updateAssetById: (id, data) => axios.put(`${BASE_URL}/assets/${id}`, data),
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
    getNotifications: () => axios.get(`${BASE_URL}/notifications`),
    createNotification: (data) => axios.post(`${BASE_URL}/notifications`, data),
    deleteNotificationById: (id) => axios.delete(`${BASE_URL}/notifications/${id}`),

    // Maintenance Routes
    getMaintenanceRecords: () => axios.get(`${BASE_URL}/maintenance`),
    createMaintenanceRecord: (data) => axios.post(`${BASE_URL}/maintenance`, data),
    updateMaintenanceRecordById: (id, data) => axios.put(`${BASE_URL}/maintenance/${id}`, data),
    deleteMaintenanceRecordById: (id) => axios.delete(`${BASE_URL}/maintenance/${id}`),

    // Count Routes
    getCounts: () => axios.get(`${BASE_URL}/count`),
    getCountByTable: (tableName) => axios.get(`${BASE_URL}/count?table=${tableName}`)
};

export default api;
