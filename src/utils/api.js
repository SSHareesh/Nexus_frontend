import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchCounts = async () => {
  try {
    const response = await api.get('/count');
    return response.data.counts; 
  } catch (error) {
    console.error('Error fetching counts:', error);
    return {};
  }
};



export default api;
