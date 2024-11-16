import React, { useState } from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa'; // Import the logout icon

const Sidebar = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false); // State for theme
  const navigate = useNavigate();
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme); // Toggle the theme
  };

  const handleLogout = () => {
    // Perform any logout logic you need (clear tokens, etc.)
    navigate('/'); // Navigate to the home page (or wherever you want)
  };

  return (
    <div className={`sidebar ${isDarkTheme ? 'dark' : 'light'}`}> 
      <h2 className="sidebar__title">Child Activity</h2>
      <ul className="sidebar__menu">
        <li className="sidebar__menuItem">Progress</li>
        <li className="sidebar__menuItem">Switch Child</li>
        <li className="sidebar__menuItem">Settings</li>
        <li className="sidebar__menuItem" onClick={toggleTheme}>
          {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
        </li>
        <li className="sidebar__menuItem" onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </li>
      </ul>
    </div>
  );
};

export default Sidebar;
