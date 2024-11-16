import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { useLocation } from 'react-router-dom';
import './CarList.css'; // Add a CSS file for styling

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // For the search bar
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state || {}; // Username passed from the previous screen
 
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axiosInstance.get('/cars/list');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const handleDelete = async (carId) => {
    try {
      await axiosInstance.delete(`/cars/delete/${carId}`);
      setCars(cars.filter((car) => car._id !== carId));
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  // Filter cars based on the search term
  const filteredCars = cars.filter((car) =>
    car.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="car-list-container">
      <h1 className="welcome-message">Welcome {username || 'User'}</h1>
      <h2 className="car-list-title">Your Garage</h2>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search cars by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredCars.length > 0 ? (
        <div className="car-list">
          {filteredCars.map((car) => (
            <div key={car._id} className="car-item">
              <h3 className="car-title">{car.title}</h3>
              <p className="car-description">{car.description}</p>
              <div className="car-actions">
                <Link to={`/car/${car._id}`} className="car-link">
                  View Details
                </Link>
                <button
                  className="car-button"
                  onClick={() => navigate(`/cars/update/${car._id}`)}
                >
                  Edit
                </button>
                <button
                  className="car-button delete-button"
                  onClick={() => handleDelete(car._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-cars-message">No cars found. Add a car to get started!</p>
      )}
      <Link to="/add-car" style={{color: "white"}}>Add More Cars Here</Link>
    </div>
  );
};

export default CarList;
