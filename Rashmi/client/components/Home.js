import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBatteryHalf, FaClock, FaChild } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">LOCKNEST</h1>
        <div className="buttons">
          <button onClick={() => navigate('/dashboard')} className="button">Login</button>
          <button onClick={() => navigate('/signup')} className="button">Signup</button>
        </div>
      </header>

      <main className="main">
        <section className="introSection">
          <button onClick={() => setShowModal(true)} className="infoButton">Learn More About LockNest</button>
          <button onClick={handleGetStarted} className="getStartedButton">Get Started</button>
        </section>

        <section className="featuresSection">
          <h2>Features</h2>
          <div className="cardContainer">
            <div className="card">
              <FaClock className="icon" />
              <h3>Screen Time Checking</h3>
              <p>Track and manage screen time usage efficiently.</p>
            </div>
            <div className="card">
              <FaBatteryHalf className="icon" />
              <h3>Battery Life Viewer</h3>
              <p>Monitor battery levels to ensure device readiness.</p>
            </div>
            <div className="card">
              <FaChild className="icon" />
              <h3>Parental Control</h3>
              <p>Set controls and view insights on children’s activity.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 LOCKNEST. All rights reserved.</p>
      </footer>

      {showModal && (
        <div className="modalOverlay" onClick={() => setShowModal(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h2>LockNest: Parental Control & Monitoring App</h2>
            <p>
              LockNest is a comprehensive parental control application designed to give parents peace
              of mind by providing insights into their children's phone activities. With a user-friendly
              interface and robust features, LockNest helps parents stay informed and involved in their
              kids’ digital lives.
            </p>
            <button onClick={() => setShowModal(false)} className="closeButton">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;


