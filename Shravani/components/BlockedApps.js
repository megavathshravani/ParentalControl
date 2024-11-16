// components/BlockedApps.js
import React, { useState } from 'react';
import './BlockedApps.css';  // Make sure to update the CSS file as well

const BlockedApps = () => {
  // Sample data of blocked apps (with two more apps added)
  const [blockedApps, setBlockedApps] = useState([
    { id: 1, name: 'Facebook' },
    { id: 2, name: 'Instagram' },
    { id: 3, name: 'Twitter' },
    { id: 4, name: 'Snapchat' },
    { id: 5, name: 'TikTok' }
  ]);

  // Function to unblock an app (this would update the state or make an API call)
  const unblockApp = (appId) => {
    setBlockedApps(blockedApps.filter(app => app.id !== appId)); // Remove the app from the blocked list
  };

  return (
    <div className="blocked-apps">
      <h2>Blocked Apps</h2>
      <p>Here is a list of apps that are currently blocked:</p>
      {blockedApps.length === 0 ? (
        <p>No apps are currently blocked.</p>
      ) : (
        <div className="app-cards-container">
          {blockedApps.map((app) => (
            <div className="app-card" key={app.id}>
              <div className="app-card-header">
                <span className="app-name">{app.name}</span>
              </div>
              <div className="app-card-body">
                <button className="unblock-btn" onClick={() => unblockApp(app.id)}>
                  Unblock
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default BlockedApps;


