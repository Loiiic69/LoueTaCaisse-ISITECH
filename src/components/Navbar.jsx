import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import logo from '../img/logo.png';


function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <div className="navbar-dropdown">
        <button onClick={handleDropdownClick} className="dropbtn">
        <img src={logo}/>
        </button>
          {isDropdownOpen && (
            <div className="auth-buttons navbar-dropdown-content">
              <Link className="join-button active" to="/blog">Blog</Link>
              <Link to="/profil">Profil</Link>
              <Link to="/vehicleslist">Voitures</Link>
              <Link to="/contact">Aide</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
