// // src/components/Login.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './ChildLogin.css'; // Import CSS file for styles
//  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//  import { faCat, faDog, faFish } from "@fortawesome/free-solid-svg-icons";

// function ChildLogin({ setIsAuthenticated }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/childlogin', { email, password });
//       if (response.status === 200) {
//         setMessage(response.data.message);
//         setIsAuthenticated(true);
//         navigate('/parentdashboard');
//       }
//     } catch (error) {
//       setMessage('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="icons-container">
//          <FontAwesomeIcon icon={faCat} size="2x" />
//          <FontAwesomeIcon icon={faDog} size="2x" />
//          <FontAwesomeIcon icon={faFish} size="2x" />
//        </div>
       
//     <div className="login-container">
//       <div className="login-box">
//         <h1>🔒 LOCKNEST</h1>
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit} className="login-form">
//           <input
//             type="email"
//             placeholder="📧 Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="🔑 Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit" className="login-button">Login</button>
//         </form>
//         <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
//         {message && <p className="message">{message}</p>}
        
//       </div>
      
//     </div>
//        <div className="icons-container">
//          <FontAwesomeIcon icon={faCat} size="2x" />
//          <FontAwesomeIcon icon={faDog} size="2x" />
//          <FontAwesomeIcon icon={faFish} size="2x" />
//        </div>
       
//        </div>
//   );

  
// }

// export default ChildLogin;



// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ChildLogin.css'; // Import CSS file for styles

function ChildLogin({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/childlogin', { email, password });
      if (response.status === 200) {
        setMessage(response.data.message);
        setIsAuthenticated(true);
        navigate('/childdashboard');
      }
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🔒 LOCKNEST</h1>
        <h2>Login Child</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="📧 Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="🔑 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default ChildLogin;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import "./ChildLogin.css"; // Add custom styles here
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCat, faDog, faFish } from "@fortawesome/free-solid-svg-icons";

// function ChildLogin({setIsAuthenticated }) {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/child-login', { email, password });
//       if (response.status === 200) {
//         setMessage(response.data.message);
//         setIsAuthenticated(true);
//         navigate('/childdashboard');
//       }
//     } catch (error) {
//       setMessage('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="icons-container">
//         <FontAwesomeIcon icon={faCat} size="2x" />
//         <FontAwesomeIcon icon={faDog} size="2x" />
//         <FontAwesomeIcon icon={faFish} size="2x" />
//       </div>
//       <div className="login-form">
//         <h2>Welcome to the Child Login</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="First Name"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Last Name"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <button type="submit">Login</button>
//         </form>
//       </div>
//       <div className="icons-container">
//         <FontAwesomeIcon icon={faDog} size="2x" />
//         <FontAwesomeIcon icon={faCat} size="2x" />
//         <FontAwesomeIcon icon={faFish} size="2x" />
//       </div>
//     </div>
//   );
// }

// export default ChildLogin;

