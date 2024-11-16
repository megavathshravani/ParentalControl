import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();

  // Navigation functions for sidebar items
  const goToHome = () => {
    navigate('/');
  };

  const goToScreenTime = () => {
    navigate('/screen-time');
  };

  const goToBlockedApps = () => {
    navigate('/blocked-apps'); // Ensure route exists in App.js if you implement this page
  };

  const handleLogout = () => {
    onLogout();  // Call the onLogout function passed from App.js
    navigate('/login');  // Navigate to the login page
  };

  return (
    <div className="sidebar">
      <ul>
        <li onClick={goToHome}>Home</li>
        <li onClick={goToScreenTime}>Screen Time</li>
        <li onClick={goToBlockedApps}>Blocked Apps</li>
        <li onClick={handleLogout}>Logout</li> {/* Logout button */}
      </ul>
    </div>
  );
};

export default Sidebar;
