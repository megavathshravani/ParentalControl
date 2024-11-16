import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddChildPage = () => {
  const [childEmail, setChildEmail] = useState('');
  const [connectedChildren, setConnectedChildren] = useState([]);
  const [message, setMessage] = useState('');

  // Load connected children on page load
  useEffect(() => {
    fetchConnectedChildren();
  }, []);

  // Fetch connected children from the server
  const fetchConnectedChildren = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/get-connected-children', {
        headers: {
          Authorization: token,
        },
      });
      setConnectedChildren(response.data.children);
    } catch (error) {
      console.error('Error fetching connected children:', error);
    }
  };

  // Function to handle adding a child
  const addChild = async () => {
    const parentEmail = 'parent@example.com'; // Replace with actual parent email from context or state
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        '/add-child',
        { parentEmail, childEmail },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setMessage(response.data.message);
      setChildEmail(''); // Clear input field
      fetchConnectedChildren(); // Refresh the list of connected children
    } catch (error) {
      console.error('Error adding child:', error);
      setMessage('Failed to connect with child.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Add Child</h1>
      
      <div>
        <label>Child's Email:</label>
        <input
          type="email"
          value={childEmail}
          onChange={(e) => setChildEmail(e.target.value)}
          placeholder="Enter child email"
          style={{ marginRight: '10px' }}
        />
        <button onClick={addChild}>Connect</button>
      </div>
      
      <p>{message}</p>

      <h2>Connected Children</h2>
      {connectedChildren.length > 0 ? (
        <ul>
          {connectedChildren.map((child, index) => (
            <li key={index}>{child.childEmail}</li>
          ))}
        </ul>
      ) : (
        <p>No connected children.</p>
      )}
    </div>
  );
};

export default AddChildPage;
