import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Import the CSS file

const Header = () => {
  const navigate = useNavigate();
  const data = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="header" >
      <div className="header-container">
        <div className="logo">
          {data ? <Link to="/CarList">MyCarApp</Link> : <Link to="/login">MyCarApp</Link>}
          
        </div>
        <div className="nav-links">
          {data ? <Link to="/CarList">Home</Link> : <Link to="/login">Home</Link>}
          {/* <Link to="/">Home</Link> */}
          {data ? <Link to="/add-car">Add Car</Link> : <Link to="/login">Add Car</Link>}
          {/* <>
              <Link to="/CarList">My Cars</Link>
              
            </>
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
            <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button> */}
          {/* <Link to="/add-car">Add Car</Link> */}
          {data ? (
            <>
              <Link to="/CarList">My Cars</Link>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
