import React, { useEffect, useState } from 'react';
import './BatteryStatus.css';

const BatteryStatus = () => {
  const [batteryLevel, setBatteryLevel] = useState(100); // Battery level as percentage

  useEffect(() => {
    const updateBatteryStatus = async () => {
      try {
        const battery = await navigator.getBattery(); // Get battery status
        setBatteryLevel(battery.level * 100); // Set battery level as percentage
        // Listen to changes in battery status
        battery.addEventListener('levelchange', () => {
          setBatteryLevel(battery.level * 100);
        });
      } catch (error) {
        console.error('Battery API not supported:', error);
      }
    };

    // Update battery status on mount
    updateBatteryStatus();

    // Set interval to update battery status periodically
    const intervalId = setInterval(updateBatteryStatus, 10000); // Update every 10 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="battery-status">
      <span className="battery-level">
        {batteryLevel.toFixed(0)}% {batteryLevel < 15 && <span className="charge-warning">- Charge!</span>}
      </span>
    </div>
  );
};

export default BatteryStatus;
