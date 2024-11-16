import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './ChildDashboard.css';

const ChildDashboard = ({ loggedInParentId }) => {
  const [childId, setChildId] = useState('');
  const [childData, setChildData] = useState({});

  useEffect(() => {
    const generatedId = uuidv4();
    setChildId(generatedId);
    saveChildId(generatedId);
  }, []);

  const saveChildId = async (id) => {
    const response = await fetch('http://localhost:5000/api/save-child-id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        childId: id,
        uid: loggedInParentId,
      }),
    });

    if (!response.ok) {
      console.error('Error saving child ID:', await response.text());
    }
  };

  useEffect(() => {
    const fetchChildData = async () => {
      const response = await fetch(`http://localhost:5000/api/child-data?childId=${childId}&parentId=${loggedInParentId}`);
      const data = await response.json();
      if (response.ok) {
        setChildData(data);
      } else {
        console.error('Error fetching child data:', data.message);
      }
    };

    if (childId) {
      fetchChildData();
    }
  }, [childId, loggedInParentId]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-header">Child Dashboard</h1>
        
        <div className="unique-id-container">
          <p>Your Unique ID:</p>
          <div className="unique-id">{childId}</div>
        </div>

        <div className="info-card">
          <h2>Battery Percentage</h2>
          <p>{childData.batteryPercentage || 'N/A'}</p>
        </div>

        <div className="info-card">
          <h2>Location</h2>
          <p>{childData.location || 'N/A'}</p>
        </div>

        <div className="info-card">
          <h2>Screen Time</h2>
          <p>{childData.screenTime ? `${childData.screenTime} hours` : 'N/A'}</p>
        </div>

        {/* Additional child-related UI elements can go here */}
      </div>
    </div>
  );
};

export default ChildDashboard;






