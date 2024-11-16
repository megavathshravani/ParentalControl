// src/App.js
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import ChildDashboard from './components/ChildDashboard';
import ParentDashboard from './components/ParentDashboard';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import ChildLogin from './components/ChildLogin';
//import DashboardCardQuiz from './components/DashboardCardQuiz';
import Quiz from './components/Quiz';
import GeoLocationMap from './components/GeoLocationMap';
import Activity from './components/Activity';
import AddChildPage from './components/AddChildPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/childlogin" element={<ChildLogin setIsAuthenticated={setIsAuthenticated} />} />
        {/* Protected Routes */}
        <Route
          path="/childdashboard"
          element={ <ChildDashboard />}
        />
        <Route
          path="/parentdashboard"
          element= {<ParentDashboard />}
        />
        {/* <Route
          path="/dashboard"
         element={isAuthenticated ? <Dashboard setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />}
        /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/get-connected-children" element={<AddChildPage />} />
        <Route path="/activity-list" element={<Activity />} />
        <Route
          path="/dashboard-quiz"
          element={<Quiz /> }
        />
        
        {/* Non-protected Routes */}
        <Route path="/topnav" element={<TopNav />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/get-location" element={<GeoLocationMap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;






// // src/App.js
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import ParentDashboard from './components/ParentDashboard'; // Ensure ParentDashboard is created
// import './App.css';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           {/* Public Route - Login */}
//           <Route
//             path="/login"
//             element={<Login setIsAuthenticated={setIsAuthenticated} />}
//           />

//           {/* Private Route - Parent Dashboard */}
//           <Route
//             path="/parentdashboard"
//             element={isAuthenticated ? <ParentDashboard /> : <Navigate to="/login" />}
//           />

//           {/* Redirect root path to Login */}
//           <Route
//             path="/"
//             element={<Navigate to="/login" />}
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;






// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Signup from './components/Signup';
// import Home from './components/Home'; // Import a Home component or create one

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} /> {/* Add a route for the home page */}
//         <Route path="/signup" element={<Signup />} />
//         {/* Add more routes here if needed */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;




