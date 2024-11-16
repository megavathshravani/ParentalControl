import React, { useEffect, useState } from 'react';

const ParentComponent = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Set up a listener for messages from the child window (iframe)
    const handleMessage = (event) => {
      // Check the origin to ensure it's coming from a trusted source
      if (event.origin === window.location.origin) {
        setMessage(event.data);
      } else {
        console.warn('Message from untrusted origin:', event.origin);
      }
    };

    window.addEventListener('message', handleMessage);

    // Cleanup the listener when the component is unmounted
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const openChildWindow = () => {
    window.open('/child', '_blank', 'width=600,height=400');
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <button onClick={openChildWindow}>Open Child Window</button>
      <h2>Message from Child: {message}</h2>
    </div>
  );
};

export default ParentComponent;
