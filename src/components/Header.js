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
    <nav className="header" style={!data ? { backgroundColor: '#f8b5a2', color: 'black'  } : {}}>
      <div className="header-container">
        <div className="logo">
          {data ? <Link to="/CarList">MyCarApp</Link> : <Link to="/login" style={{color: 'black'}}>MyCarApp</Link>}
          
        </div>
        <div className="nav-links">
          {data ? <Link to="/CarList">Home</Link> : <Link to="/login" style={{color: 'black'}}>Home</Link>}
          {/* <Link to="/">Home</Link> */}
          {data ? <Link to="/add-car">Add Car</Link> : <Link to="/login" style={{color: 'black'}}>Add Car</Link>}
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
              <Link to="/login" style={!data ? { color: 'black'  } : {}}>Login</Link>
              <Link to="/signup" style={!data ? { color: 'black'  } : {}}>Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
