import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://spyne-car-app-backend-1.onrender.com', 
});
// const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api', 
//   timeout: 10000, // Request timeout (10 seconds)
// });

// Request interceptor to attach the Authorization token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling (optional)
axiosInstance.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access globally
      alert('Session expired. Please log in again.');
      localStorage.removeItem('token'); // Clear the token
      window.location.href = '/login'; // Redirect to the login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
