import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMapMarkerAlt, faQuestionCircle, faListAlt, faBatteryFull } from '@fortawesome/free-solid-svg-icons';
import BatteryStatus from './BatteryStatus';

function Dashboard() {
  const navigate = useNavigate();

  // Navigation functions
  const goToScreenTime = () => {
    navigate('/screen-time'); // Add route for screen time
  };

  const goToActivityList = () => {
    navigate('/activity-list');
  };

  const goToLocationPage = () => {
    navigate('/location');
  };

  const goToChildQuiz = () => {
    navigate('/child-quiz');
  };

  return (
    <div className="dashboard-content">
      <div className="cards-container">
        <div className="card" onClick={goToScreenTime}> {/* Navigate to Screen Time */}
          <FontAwesomeIcon icon={faClock} className="icon" />
          <p>Screen Time</p>
        </div>
        <div className="card" onClick={goToLocationPage}>
          <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
          <p>Location</p>
        </div>
        <div className="card" onClick={goToChildQuiz}>
          <FontAwesomeIcon icon={faQuestionCircle} className="icon" />
          <p>Quiz</p>
        </div>
        <div className="card" onClick={goToActivityList}>
          <FontAwesomeIcon icon={faListAlt} className="icon" />
          <p>Activity List</p>
        </div>
        <div className="card">
          <FontAwesomeIcon icon={faBatteryFull} className="icon" />
          <p>Battery Status</p>
          <BatteryStatus />
        </div>
      </div>

      {/* Bar Graph Section */}
      <div className="bar-graph">
        <h3>App Usage</h3>
        <div className="bar" style={{ height: '60%' }}>
          <span className="bar-label">YouTube</span>
        </div>
        <div className="bar" style={{ height: '80%' }}>
          <span className="bar-label">Instagram</span>
        </div>
        <div className="bar" style={{ height: '40%' }}>
          <span className="bar-label">Snapchat</span>
        </div>
        <div className="bar" style={{ height: '90%' }}>
          <span className="bar-label">Free Fire</span>
        </div>
        <div className="bar" style={{ height: '20%' }}>
          <span className="bar-label">Google</span>
        </div>
        <div className="bar" style={{ height: '50%' }}>
          <span className="bar-label">Camera</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
