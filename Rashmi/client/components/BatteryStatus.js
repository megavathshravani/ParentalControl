import React, { useState, useEffect } from 'react';
import { FaBatteryEmpty, FaBatteryQuarter, FaBatteryHalf, FaBatteryThreeQuarters, FaBatteryFull } from 'react-icons/fa';
import './BatteryStatus.css';

const BatteryStatus = ({ batteryLevel }) => {
  // Color logic based on battery percentage
  const getBatteryColor = (level) => {
    if (level <= 20) return 'red';
    if (level <= 50) return 'yellow';
    return 'green';
  };

  // Choose the icon based on battery level
  const getBatteryIcon = (level) => {
    if (level <= 20) return <FaBatteryEmpty />;
    if (level <= 40) return <FaBatteryQuarter />;
    if (level <= 60) return <FaBatteryHalf />;
    if (level <= 80) return <FaBatteryThreeQuarters />;
    return <FaBatteryFull />;
  };

  // Example initial battery level (this would ideally come from the connected device)
  const [battery, setBattery] = useState(batteryLevel || 75);

  // Simulate battery level change (remove this in production)
  useEffect(() => {
    const interval = setInterval(() => {
      setBattery(prevBattery => Math.max(prevBattery - 5, 0)); // decrease by 5% for example
    }, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="battery-status" style={{ color: getBatteryColor(battery) }}>
      <div className="battery-icon">{getBatteryIcon(battery)}</div>
      <p>{battery}%</p>
    </div>
  );
};

export default BatteryStatus;
