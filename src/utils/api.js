import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Update this if needed

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch all counts for the dashboard
export const fetchCounts = async () => {
  try {
    const response = await api.get('/count');
    return response.data.counts; // Extract only the counts object
  } catch (error) {
    console.error('Error fetching counts:', error);
    return {};
  }
};



// Export API instance for custom calls if needed
export default api;
