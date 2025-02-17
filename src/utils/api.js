import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Update if needed

export const fetchCounts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/count`);
    return response.data.counts; // Ensure we return only the 'counts' object
  } catch (error) {
    console.error('Error fetching counts:', error);
    return {};
  }
};
