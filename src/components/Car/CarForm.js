import React, { useState } from 'react';
import axiosInstance from '../api/axios';
// import CarList from "./CarList"
import { useNavigate } from 'react-router-dom';
import './CarForm.css'; // Import the CSS file

const CarForm = ({ carData = null, onSuccess }) => {
  const [title, setTitle] = useState(carData?.title || '');
  const [description, setDescription] = useState(carData?.description || '');
  const [tags, setTags] = useState(carData?.tags?.join(', ') || '');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 10) {
      setError('You can upload up to 10 images only.');
      return;
    }
    // console.log(files);
    
    setImages((prevImages) => [...prevImages, ...files]);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const formData = new FormData();
    images.forEach((image) => formData.append('images', image));
    formData.append('title', title);
    formData.append('description', description);
    tags.split(',').map((tag) => formData.append('tags', tag.trim()));

    try {
      const url = carData
        ? `/cars/update/${carData._id}`
        : '/cars/create';
      const method = 'post';

      const response = await axiosInstance[method](url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Car successfully saved!');
      navigate('/CarList');
      // onSuccess(response.data); // Notify parent about success
    } catch (err) {
      // setError(err.response?.data?.message || 'An error occurred');
      setError("Please Login First");
    }
  };

  return (
    <div className='car-form-container'>
    <form className="car-form" onSubmit={handleSubmit}>
      <h2 className="form-title">{carData ? 'Edit Car' : 'Add New Car'}</h2>
      {error && <p className="error">{error}</p>}
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          required
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-textarea"
          required
        />
      </label>
      <label>
        Tags (comma-separated):
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="form-input"
        />
      </label>
      <label>
        Upload Images (up to 10):
        <input
          type="file"
          multiple
          onChange={handleImageUpload}
          className="form-input"
        />
      </label>
      {images.length > 0 && (
        <p className="image-info">{images.length} image(s) selected for upload.</p>
      )}
      <button type="submit" className="form-button">
        {carData ? 'Update' : 'Add'} Car
      </button>
    </form>
    </div>
  );
};

export default CarForm;
