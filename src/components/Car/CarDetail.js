import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import './CarDetails.css'; // Import the CSS file for styling

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axiosInstance.get(`/cars/detail/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (!car) return <p className="loading">Loading car details...</p>;

  return (
    <div className="car-details-container">
      <h1 className="car-title">{car.title}</h1>
      <p className="car-description">{car.description}</p>
      <p className="car-tags">
        <strong>Tags:</strong> {car.tags.join(', ')}
      </p>
      <div className="car-images">
        {car.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${car.title}-${index}`}
            className="car-image"
          />
        ))}
      </div>
      <div className="car-actions">
        <button
          className="car-button edit-button"
          onClick={() => navigate(`/cars/update/${car._id}`)}
        >
          Edit
        </button>
        <button
          className="car-button back-button"
          onClick={() => navigate('/CarList')}
        >
          Back to Cars
        </button>
      </div>
    </div>
  );
};

export default CarDetails;
