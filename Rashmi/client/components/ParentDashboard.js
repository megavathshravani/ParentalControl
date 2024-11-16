import React from 'react';
import { Link } from 'react-router-dom';
import { FaBatteryHalf, FaMapMarkerAlt, FaLaptop, FaChartLine, FaClock, FaClipboardList } from 'react-icons/fa';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import './ParentDashboard.css';

const iconStyle = { fontSize: '50px', color: 'purple' }; // Consistent style for all icons

const ParentDashboard = () => {
  return (
    <div className="parent-dashboard">
      <TopNav /> {/* Top navigation bar */}
      <div className="dashboard-layout">
        <Sidebar /> {/* Sidebar on the left */}
        
        <div className="dashboard-content">
          <div className="dashboard__cards">
            {/* Battery Card */}
            <div className="dashboard__card">
              <div className="stat-placeholder">
                <FaBatteryHalf style={iconStyle} />
              </div>
              <h3>Battery Percentage</h3>
            </div>
            
            {/* Location Tracker Card */}
            <div className="dashboard__card">
              <Link to="/geolocation" className="link">
                <div className="stat-placeholder">
                  <FaMapMarkerAlt style={iconStyle} />
                </div>
                <h3>Location Tracker</h3>
              </Link>
            </div>

            {/* Screen Time Manager Card */}
            <div className="dashboard__card">
              <div className="stat-placeholder">
                <FaLaptop style={iconStyle} />
              </div>
              <h3>Screen Time Manager</h3>
            </div>

            {/* Activity List Card */}
            <div className="dashboard__card">
              <Link to="/activity-list" className="link">
                <div className="stat-placeholder">
                  <FaChartLine style={iconStyle} />
                </div>
                <h3>Activity List</h3>
              </Link>
            </div>

            {/* Quiz Card */}
            <div className="dashboard__card">
              <Link to="/dashboard-quiz" className="link">
                <div className="stat-placeholder">
                  <FaClipboardList style={iconStyle} />
                </div>
                <h3>Quiz</h3>
              </Link>
            </div>

            {/* App Usage Card */}
            <div className="dashboard__card">
              <div className="stat-placeholder">
                <FaClock style={iconStyle} />
              </div>
              <h3>App Usage</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;












// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import TopNav from './TopNav';
// import './ParentDashboard.css';

// const ParentDashboard = () => {
//   const [showAddChild, setShowAddChild] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedOption, setSelectedOption] = useState('');
//   const [inputValue, setInputValue] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleAddChildClick = () => setShowModal(true);
//   const handleOptionChange = (option) => setSelectedOption(option);
//   const handleInputChange = (e) => setInputValue(e.target.value);
  
//   const handleConnect = () => {
//     if (inputValue) {
//       setSuccessMessage("Child connected successfully!");
//       setShowModal(false);
//       setShowAddChild(false); // Hide Add Child card and display main dashboard content
//     }
//   };

//   return (
//     <div className="parent-dashboard">
//       <TopNav />
//       <div className="dashboard-layout">
//         <Sidebar />
//         <div className="dashboard-content">
//           {showAddChild ? (
//             <div className="add-child-card" onClick={handleAddChildClick}>
//               <div className="add-child-icon">+</div>
//               <h3>Add Child</h3>
//             </div>
//           ) : (
//             <>
//               <div className="dashboard__stats">
//                 <div className="dashboard__card">
//                   <h3>Battery Percentage</h3>
//                   <div className="stat-placeholder">[Battery Level]</div>
//                 </div>
//                 <div className="dashboard__charts">
//                 <div className="dashboard__chart">
//                   <Link to="/dashboard-quiz" className="chart-placeholder">
//                     <h3>Location Tracker</h3>
//                     <div className="stat-placeholder">[Scheduled Time]</div>
//                   </Link>
//                 </div>
//                 <div className="dashboard__chart">
//                   <h3>App Usage</h3>
//                   <div className="chart-placeholder">[Doughnut Chart]</div>
//                 </div>
//               </div>
//                 <div className="dashboard__card">
//                   <h3>Screen Time Manager</h3>
//                   <div className="stat-placeholder">[ScreenTimeManager]</div>
//                 </div>
//                 <div className="dashboard__card">
//                   <h3>
//                     <Link to="/activity-list" className="link">Activity List</Link>
//                   </h3>
//                   <div className="stat-placeholder">[Activity List Overview]</div>
//                 </div>
//               </div>

//               <div className="dashboard__charts">
//                 <div className="dashboard__chart">
//                   <Link to="/dashboard-quiz" className="chart-placeholder">
//                     <h3>Quiz</h3>
//                     <div className="stat-placeholder">[Scheduled Time]</div>
//                   </Link>
//                 </div>
//                 <div className="dashboard__chart">
//                   <h3>App Usage</h3>
//                   <div className="chart-placeholder">[Doughnut Chart]</div>
//                 </div>
//               </div>
//             </>
//           )}

//           {showModal && (
//             <div className="modal">
//               <div className="modal-content">
//                 <h3>Enter Child Details</h3>
//                 <div className="option-buttons">
//                   <button onClick={() => handleOptionChange('email')}>Email ID</button>
//                   <button onClick={() => handleOptionChange('uniqueID')}>Unique ID</button>
//                 </div>
//                 {selectedOption && (
//                   <div className="input-section">
//                     <input
//                       type="text"
//                       placeholder={`Enter ${selectedOption === 'email' ? 'Email ID' : 'Unique ID'}`}
//                       value={inputValue}
//                       onChange={handleInputChange}
//                     />
//                     <button className="connect-button" onClick={handleConnect}>Connect</button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {successMessage && <p className="success-message">{successMessage}</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ParentDashboard;














// import React, { useState } from 'react';
// import { Modal, Card, Input, message } from 'antd';
// import { Bar } from 'react-chartjs-2';
// import 'chart.js/auto';
// import Sidebar from './Sidebar';
// import TopNav from './TopNav';
// import './ParentDashboard.css';

// const ParentDashboard = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [uniqueId, setUniqueId] = useState('');
//   const [isConnected, setIsConnected] = useState(false);
//   const [childData, setChildData] = useState({
//     battery: 0,
//     screenTime: 0,
//     location: '',
//   });

//   const handleAddChild = () => {
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     if (uniqueId) {
//       message.success('Connected successfully!');
//       setIsConnected(true);
//       setChildData({
//         battery: 80,
//         screenTime: 120,
//         location: '123 Example St, Cityville',
//       });
//       setIsModalVisible(false);
//     } else {
//       message.error('Please enter a valid unique ID or email.');
//     }
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const batteryData = {
//     labels: ['Battery'],
//     datasets: [
//       {
//         label: 'Battery (%)',
//         data: [childData.battery],
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//       },
//     ],
//   };

//   const screenTimeData = {
//     labels: ['Screen Time'],
//     datasets: [
//       {
//         label: 'Screen Time (hours)',
//         data: [childData.screenTime / 60],
//         backgroundColor: 'rgba(255, 99, 132, 0.6)',
//       },
//     ],
//   };

//   return (
//     <div className="parent-dashboard">
//       <Sidebar />

//       <div className="dashboard-main">
//         <TopNav /> {/* Add TopNav here */}
        
//         <div className="dashboard-content" style={{ padding: '20px', textAlign: 'center' }}>
//           <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Parent Dashboard</h2>

//           <Card
//             title="Add Child"
//             style={{
//               width: 300,
//               margin: '0 auto',
//               border: '1px solid #eaeaea',
//               borderRadius: '8px',
//               padding: '20px',
//               cursor: 'pointer',
//             }}
//             onClick={handleAddChild}
//           >
//             <p>Click here to add a child</p>
//           </Card>

//           <Modal
//             title="Connect to Child"
//             visible={isModalVisible}
//             onOk={handleOk}
//             onCancel={handleCancel}
//             okText="Connect"
//           >
//             <Input
//               placeholder="Enter Child's Unique ID or Email"
//               value={uniqueId}
//               onChange={(e) => setUniqueId(e.target.value)}
//             />
//           </Modal>

//           {isConnected && (
//             <div style={{ marginTop: '40px' }}>
//               <h3>Child Device Information</h3>
//               <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
//                 <Card title="Battery Status">
//                   <Bar data={batteryData} />
//                 </Card>

//                 <Card title="Screen Time">
//                   <Bar data={screenTimeData} />
//                 </Card>

//                 <Card title="Location">
//                   <p>{childData.location}</p>
//                 </Card>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ParentDashboard;






// import React, { useEffect, useState } from 'react';

// const ParentDashboard = ({ childId, loggedInParentId }) => {
//   const [childData, setChildData] = useState({});
//   const [errorMessage, setErrorMessage] = useState('');

//   // Function to fetch child data from the server
//   const fetchChildData = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/child-data?childId=${childId}&parentId=${loggedInParentId}`);
//       const data = await response.json();

//       if (response.ok) {
//         setChildData(data);
//       } else {
//         setErrorMessage(data.message || 'Failed to fetch child data');
//       }
//     } catch (error) {
//       console.error('Error fetching child data:', error);
//       setErrorMessage('Error fetching child data');
//     }
//   };

//   // Fetch child data when the component mounts or childId changes
//   useEffect(() => {
//     if (childId) {
//       fetchChildData();
//     }
//   }, [childId]);

//   return (
//     <div>
//       <h1>Parent Dashboard</h1>
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//       {childData.batteryPercentage !== undefined && (
//         <>
//           <h2>Child Data:</h2>
//           <p>Battery Percentage: {childData.batteryPercentage}%</p>
//           <p>Location: {childData.location}</p>
//           <p>Screen Time: {childData.screenTime} hours</p>
//         </>
//       )}
//       {/* Additional parent-related UI elements */}
//     </div>
//   );
// };

// export default ParentDashboard;


