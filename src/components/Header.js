import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Import the CSS file
import axiosInstance from '../api/axios';
// import { useLocation } from 'react-router-dom';

const Header = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // const response = await axiosInstance.get('/cars/list');
        const { data } = await axiosInstance.post('/users/login');
      } catch (error) {
        console.error('Please Log in', error);
      }
    };

    fetchUser();
  }, []);
  

  
  
  // const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem('token');
    props.setloginfalse;
    navigate('/login');
  };

  return (
    <nav className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/login" style={{color:"white"}}>MyCarApp</Link>
        </div>
        <div className="nav-links">
          {props.login ? <Link to="/CarList" style={{color:"white"}}>Home</Link> : <Link to="/login" style={{color:"white"}}>Home</Link>}
          <Link to="/add-car" style={{color:"white"}}>Add Car</Link>
          {data ? (
            <>
              <Link to="/CarList" style={{color:"white"}}>My Cars</Link>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button> 
            </>
          ) : (
            <>
              <Link to="/login" style={{color:"white"}}>Login</Link>
              <Link to="/signup" style={{color:"white"}}>Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
