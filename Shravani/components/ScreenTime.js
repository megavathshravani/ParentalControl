import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import './ScreenTime.css';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function ScreenTime() {
  const navigate = useNavigate();
  const [usageData, setUsageData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ]
      }
    ]
  });
  const [totalUsage, setTotalUsage] = useState('');
  const [unlocks, setUnlocks] = useState(0);
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    // Simulate dynamic data fetch
    const fetchData = async () => {
      // Mock dynamic data
      const fetchedData = {
        labels: ['Photos', 'Slack', 'Sync Pro', 'BBC News', 'Other'],
        data: [15, 25, 10, 30, 20],
        totalUsage: '3h 45m',
        unlocks: 50,
        notifications: 120
      };

      setUsageData(prevData => ({
        ...prevData,
        labels: fetchedData.labels,
        datasets: [
          {
            ...prevData.datasets[0],
            data: fetchedData.data
          }
        ]
      }));
      setTotalUsage(fetchedData.totalUsage);
      setUnlocks(fetchedData.unlocks);
      setNotifications(fetchedData.notifications);
    };

    fetchData();
  }, []);

  const goToScreenTimeDetails = () => {
    navigate('/screen-time-details');
  };

  return (
    <div className="screen-time" onClick={goToScreenTimeDetails}>
      <h2>Screen Time</h2>
      <div className="chart-container">
        <Doughnut data={usageData} />
      </div>
      <div className="usage-info">
        <p><strong>Usage:</strong> {totalUsage}</p>
        <p><strong>Unlocks:</strong> {unlocks}</p>
        <p><strong>Notifications:</strong> {notifications}</p>
      </div>
    </div>
  );
}

export default ScreenTime;
