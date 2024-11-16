import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../api';

import './Signup.css'; // Import the CSS file

const Signup = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/users/signup', form);
      navigate('/login');
    } catch (error) {
      alert('Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="signup-title">Signup</h2>
        <input
          className="signup-input"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          className="signup-input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="signup-button" type="submit">
          Signup
        </button>
        <p style={{paddingTop: "10px"}}>Already have an account? <Link to="/login">Log in</Link></p>
      </form>
    </div>
  );
};

export default Signup;
