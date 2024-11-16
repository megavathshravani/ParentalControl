// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import CSS file for styles

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      if (response.status === 200) {
        setMessage(response.data.message);
        setIsAuthenticated(true);
        navigate('/get-connected-children');
      }
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🔒 LOCKNEST</h1>
        <h2>Login</h2>
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

export default Login;


// // src/components/Login.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Login.css'; // Import CSS file for styles


// function Login({ setIsAuthenticated }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false); // New loading state
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Redirect to dashboard if already logged in
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsAuthenticated(true);
//       navigate('/get-connected-children');
//     }
//   }, [navigate, setIsAuthenticated]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true); // Set loading to true when submitting

//     try {
//       const response = await axios.post('http://localhost:5000/login', { email, password });
//       if (response.status === 200) {
//         localStorage.setItem('token', response.data.token); // Store token for session persistence
//         setMessage('Login successful!');
//         setIsAuthenticated(true);
//         navigate('/parentdashboard');
//       }
//     } catch (error) {
//       // Specific error handling
//       if (error.response && error.response.status === 401) {
//         setMessage('Invalid credentials. Please try again.');
//       } else {
//         setMessage('An error occurred. Please try again later.');
//       }
//     } finally {
//       setIsLoading(false); // Reset loading state after the request completes
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h1>🔒 LOCKNEST</h1>
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit} className="login-form">
//           <input
//             type="email"
//             placeholder="📧 Email"
//             aria-label="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="🔑 Password"
//             aria-label="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit" className="login-button" disabled={isLoading}>
//             {isLoading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
//         <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
//         {message && <p className="message">{message}</p>}
//       </div>
//     </div>
//   );
// }

// export default Login;



