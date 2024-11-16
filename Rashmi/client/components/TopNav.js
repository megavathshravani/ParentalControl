import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import './TopNav.css';

const TopNav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="topnav">
      <input type="text" className="topnav__search" placeholder="Search..." />
      <div className="topnav__icons">
        <span className="topnav__icon">🔔</span>
        {isLoggedIn ? (
          <span className="topnav__icon" onClick={handleLogout}>👤</span>
        ) : (
          <div class="header_name">
            <h1>LOCKENST</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNav;