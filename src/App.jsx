import { useState, useEffect } from "react";
import "./App.css";
import Compass from "./components/Compass/Compass";
import LocationList from "./components/LocationList/LocationList";

function App() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
          setUserLocation({ lat: 57.705896, lng: 11.936357 }); // Fallback position
        }
      );
    }
  }, []);

  if (!userLocation) return <p>Hämtar position…</p>;

  return (
    <>
      <Compass />
      <LocationList userLocation={userLocation} />
    </>
  );
}

export default App;
