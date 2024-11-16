import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// Fix for Leaflet's default icon path issue in React
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Set up default marker icon
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function LocationPage() {
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("Click the button to find your location");

  // Function to find the user's geolocation
  const geoFindMe = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating…");

      // Call geolocation API
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Position object:", position); // Log the position for debugging
          const { latitude, longitude, accuracy } = position.coords;

          if (accuracy < 500000) { // Accept locations with up to 500km accuracy
            setLocation({ latitude, longitude });
            setStatus(`Latitude: ${latitude} °, Longitude: ${longitude} °, Accuracy: ${accuracy} meters`);
            saveLocationToServer(latitude, longitude);
          } else {
            setStatus(`Location accuracy is very low: ${accuracy} meters`);
            getIPLocation(); // Fallback to IP-based geolocation
          }
        },
        (error) => {
          setStatus("Unable to retrieve your location");
          console.error("Geolocation error:", error);
          getIPLocation(); // Fallback to IP-based geolocation if there's an error
        },
        {
          enableHighAccuracy: true, // Enable high accuracy for better results
          timeout: 10000, // Timeout after 10 seconds
          maximumAge: 0, // No caching of the location
        }
      );
    }
  };

  // Fallback method to get location via IP-based geolocation
  const getIPLocation = async () => {
    try {
      const response = await axios.get('http://ip-api.com/json');
      const { lat, lon, city, country } = response.data;
      console.log("IP-based Location:", lat, lon, city, country);

      if (lat && lon) {
        setLocation({ latitude: lat, longitude: lon });
        setStatus(`Latitude: ${lat} °, Longitude: ${lon} °, City: ${city}, Country: ${country}`);
        saveLocationToServer(lat, lon);
      } else {
        setStatus("Unable to retrieve location using IP");
      }
    } catch (error) {
      console.error("IP-based location error:", error);
      setStatus("Unable to retrieve location using IP");
    }
  };

  // Save location data to the server
  const saveLocationToServer = async (latitude, longitude) => {
    try {
      const email = "user@example.com"; // Replace with actual user email if available
      await axios.post("http://localhost:5000/save-location", {
        email,
        location: { latitude, longitude },
      });
      console.log("Location saved successfully");
    } catch (error) {
      console.error("Error saving location:", error);
    }
  };

  return (
    <div>
      <h1>Find My Location</h1>
      <button onClick={geoFindMe}>Find Me</button>
      <p>{status}</p>

      {location ? (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={15}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© OpenStreetMap contributors'
          />
          <Marker position={[location.latitude, location.longitude]}>
            <Popup>You are here!</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Map will display here once location is found.</p>
      )}
    </div>
  );
}

export default LocationPage;
