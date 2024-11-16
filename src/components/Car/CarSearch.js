import React, { useState } from 'react';
import axiosInstance from '../api/axios';
// import './CarSearch.css'; // Optional: Add styles here

const CarSearch = ({ onResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const response = await axiosInstance.get(`/cars/search?query=${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onResults(response.data); // Pass search results to parent
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="car-search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search cars by title, description, or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default CarSearch;
