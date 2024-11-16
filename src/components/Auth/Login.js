import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CarList from '../Car/CarList';
import API from '../../api';
import { Link} from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = (props) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  // console.log("hello");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const { data } = await API.post('/users/login', form);
      localStorage.setItem('token', data.token);
      // console.log(form.username, 'IIIIIIII');
      props.setlogin(true);
      console.log(props.login);
      // <CarList username = {form.username}/>
      // console.log(data.token.password);
      navigate('/CarList', { state: { username: form?.username } });
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      {/* <img src='./spyne1.jpg' className='bg-img'/> */}
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="login-button" type="submit">
          Login
        </button>
        <p style={{paddingTop: "10px"}}>Don't have an account? <Link to="/signup">Signup</Link></p>
      </form>
      
    </div>
  );
};

export default Login;
