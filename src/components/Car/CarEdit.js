import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import './CarEdit.css'; // Import the CSS file

const CarEdit = () => {
  const { id } = useParams(); // Car ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    images: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axiosInstance.get(`/cars/detail/${id}`);
        const car = response.data;
        setFormData({
          title: car.title,
          description: car.description,
          tags: car.tags.join(', '),
          images: car.images,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      images: [...e.target.files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...formData,
        tags: formData.tags.split(',').map((tag) => tag.trim()),
      };

      await axiosInstance.put(`/cars/update/${id}`, updatedData);
      alert('Car updated successfully!');
      navigate("/CarList");
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  if (loading) return <p>Loading car data...</p>;

  return (
    <div className="car-edit-container">
      <form className="car-edit-form" onSubmit={handleSubmit}>
        <h1>Edit Car</h1>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Images</label>
          <div className="image-preview">
            {formData.images.map((image, index) => (
              <img key={index} src={image} alt={`Car ${index}`} />
            ))}
          </div>
          <input type="file" multiple onChange={handleImageChange} />
        </div>
        <button type="submit">Update Car</button>
        <button type="button" onClick={() => navigate('/CarList')}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CarEdit;
