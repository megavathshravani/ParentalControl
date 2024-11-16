import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ParentLocation = () => {
  const [childLocation, setChildLocation] = useState(null);

  const fetchLocation = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-location", {
        params: { email: childEmail },
      });
      setChildLocation(response.data);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <div>
      <button onClick={fetchLocation}>Check Child's Location</button>
      {childLocation && (
        <div>
          <p>Latitude: {childLocation.latitude}</p>
          <p>Longitude: {childLocation.longitude}</p>
        </div>
      )}
    </div>
  );
};

export default ParentLocation;
