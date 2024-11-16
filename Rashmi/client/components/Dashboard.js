// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Dashboard.css';
// import childLogo from './student.png';
// import parentLogo from './family.png';

// function Dashboard({ setIsAuthenticated }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     navigate('/');
//   };

//   const handleNavigate = (role) => {
//     if (role === 'child') {
//       navigate('/childdashboard');
//     } else if (role === 'parent') {
//       navigate('/login');
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <button onClick={handleLogout} className="logout-button">Logout</button>
//       <header className="dashboard-header">
//         <h1>LOCKNEST</h1>
//       </header>

//       <div className="dashboard-cards">
//         <div className="card" onClick={() => handleNavigate('child')}>
//           <img src={childLogo} alt="Child" className="card-logo" />
//           <p>I am a Child</p>
//         </div>
        
//         <div className="card" onClick={() => handleNavigate('parent')}>
//           <img src={parentLogo} alt="Parent" className="card-logo" />
//           <p>I am a Parent</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;




  
// Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import childLogo from './student.png';
import parentLogo from './family.png';

function Dashboard({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); // Redirects to home page or login
  };

  const handleNavigate = (role) => {
    if (role === 'child') {
      navigate('/childlogin');
    } else if (role === 'parent') {
      navigate('/login');
    }
  };

  return (
    <div className="dashboard-container">
      <button onClick={handleLogout} className="logout-button">Back To Menu</button>
      <header className="dashboard-header">
        <h1>LOCKNEST</h1>
      </header>

      <div className="dashboard-cards">
        <div className="card" onClick={() => handleNavigate('child')}>
          <img src={childLogo} alt="Child" className="card-logo" />
          <p>I am a Child</p>
        </div>
        
        <div className="card" onClick={() => handleNavigate('parent')}>
          <img src={parentLogo} alt="Parent" className="card-logo" />
          <p>I am a Parent</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
