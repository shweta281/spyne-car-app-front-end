import axios from 'axios';

const API = axios.create({
  baseURL: 'https://spyne-car-app-backend-1.onrender.com', 
});

// Add JWT to headers
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
