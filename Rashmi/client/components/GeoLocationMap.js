import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';  // Import Leaflet CSS
import './GetLocation.css'

const GeoLocationMap = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          console.log("Latitude:", latitude, "Longitude:", longitude);  // Debugging line

          setLocation({ latitude, longitude });
          setError(null); // Clear any previous errors
        },
        (err) => {
          console.error('Error fetching location:', err.message);
          setError('Error fetching location. Please enable location access.');
          setLocation(null); // Clear any previous location data
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser.');
      setError('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="location-container">
      <button onClick={getLocation} className="location-btn">Get Location</button>
      {location && (
        <div className="location-info">
          <h3>Your Location:</h3>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <MapContainer
            center={[location.latitude, location.longitude]}  // Map should center here
            zoom={13}
            style={{ width: '100%', height: '400px' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[location.latitude, location.longitude]}>
              <Popup>
                <span>Your Location</span>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default GeoLocationMap;





// import React, { useState } from "react";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import axios from "axios"; // Import axios to handle HTTP requests

// // Fix for Leaflet's default icon path issue in React
// import icon from "leaflet/dist/images/marker-icon.png";
// import iconShadow from "leaflet/dist/images/marker-shadow.png";

// let DefaultIcon = L.icon({
//   iconUrl: icon,
//   shadowUrl: iconShadow,
// });

// L.Marker.prototype.options.icon = DefaultIcon;

// function GeoLocationMap() {
//     const [location, setLocation] = useState(null);
//     const [status, setStatus] = useState("Click the button to find your location");

//     const geoFindMe = () => {
//         if (!navigator.geolocation) {
//             setStatus("Geolocation is not supported by your browser");
//         } else {
//             setStatus("Locating…");
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     const { latitude, longitude } = position.coords;
//                     const locationData = { latitude, longitude };
//                     setLocation(locationData);
//                     setStatus(`Latitude: ${latitude}°, Longitude: ${longitude}°`);

//                     // Call function to save location data
//                     saveLocation(locationData);
//                 },
//                 () => {
//                     setStatus("Unable to retrieve your location");
//                 }
//             );
//         }
//     };

//     // Function to send location data to server
//     const saveLocation = async (locationData) => {
//         try {
//             // Replace with user email or a unique identifier
//             const email = "user@example.com"; 

//             await axios.post("http://localhost:5000/save-location", {
//                 email,
//                 location: locationData,
//             });
//             console.log("Location saved successfully");
//         } catch (error) {
//             console.error("Error saving location:", error);
//         }
//     };

//     return (
//         <div>
//             <h1>Find My Location</h1>
//             <button onClick={geoFindMe}>Find Me</button>
//             <p>{status}</p>

//             {location ? (
//                 <MapContainer center={[location.latitude, location.longitude]} zoom={15} style={{ height: "400px", width: "100%" }}>
//                     <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution='© OpenStreetMap contributors'
//                     />
//                     <Marker position={[location.latitude, location.longitude]}>
//                         <Popup>You are here!</Popup>
//                     </Marker>
//                 </MapContainer>
//             ) : (
//                 <p>Map will display here once location is found.</p>
//             )}
//         </div>
//     );
// }

// export default GeoLocationMap;




// import React, { useEffect, useState } from "react";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// // Fix for Leaflet's default icon path issue in React
// import icon from "leaflet/dist/images/marker-icon.png";
// import iconShadow from "leaflet/dist/images/marker-shadow.png";

// let DefaultIcon = L.icon({
//   iconUrl: icon,
//   shadowUrl: iconShadow,
// });

// L.Marker.prototype.options.icon = DefaultIcon;

// function GeoLocationMap() {
//     const [location, setLocation] = useState(null);
//     const [status, setStatus] = useState("Click the button to find your location");

//     const geoFindMe = () => {
//         if (!navigator.geolocation) {
//             setStatus("Geolocation is not supported by your browser");
//         } else {
//             setStatus("Locating…");
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     const { latitude, longitude } = position.coords;
//                     setLocation({ latitude, longitude });
//                     setStatus('Latitude: ${latitude} °, Longitude: ${longitude} °');
//                 },
//                 () => {
//                     setStatus("Unable to retrieve your location");
//                 }
//             );
//         }
//     };

//     return (
//         <div>
//             <h1>Find My Location</h1>
//             <button onClick={geoFindMe}>Find Me</button>
//             <p>{status}</p>

//             {location ? (
//                 <MapContainer center={[location.latitude, location.longitude]} zoom={15} style={{ height: "400px", width: "100%" }}>
//                     <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution='© OpenStreetMap contributors'
//                     />
//                     <Marker position={[location.latitude, location.longitude]}>
//                         <Popup>You are here!</Popup>
//                     </Marker>
//                 </MapContainer>
//             ) : (
//                 <p>Map will display here once location is found.</p>
//             )}
//         </div>
//     );
// }

// export default GeoLocationMap;