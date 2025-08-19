import React, { useEffect, useState } from "react";
import "./Compass.css"; // import CSS file

export default function Compass() {
  const target = { lat: 59.3262, lon: 18.0726 }; // Example: Gamla Stan

  const [heading, setHeading] = useState(0);
  const [position, setPosition] = useState(null);
  const [bearing, setBearing] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);

  function getBearing(lat1, lon1, lat2, lon2) {
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x =
      Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

    let θ = Math.atan2(y, x);
    θ = (θ * 180) / Math.PI;
    return (θ + 360) % 360;
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      });
    }
  }, []);

  const startOrientation = () => {
    function handleOrientation(event) {
      if (event.absolute && event.alpha != null) {
        setHeading(event.alpha);
      }
    }
    window.addEventListener(
      "deviceorientationabsolute",
      handleOrientation,
      true
    );
    setPermissionGranted(true);
  };

  const requestPermission = async () => {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      try {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === "granted") {
          startOrientation();
        }
      } catch (err) {
        console.error("Permission denied:", err);
      }
    } else {
      startOrientation();
    }
  };

  useEffect(() => {
    if (position) {
      const b = getBearing(position.lat, position.lon, target.lat, target.lon);
      setBearing(b);
    }
  }, [position, target.lat, target.lon]);

  const angle = (bearing - heading + 360) % 360;

  return (
    <div className="compass-container">
      <h2>Compass to Target</h2>

      {!permissionGranted ? (
        <button onClick={requestPermission} className="enable-btn">
          Enable Compass
        </button>
      ) : (
        <>
          <div className="compass">
            <div
              className="needle"
              style={{ transform: `rotate(${angle}deg)` }}
            />
            <span className="north">N</span>
            <span className="east">E</span>
            <span className="south">S</span>
            <span className="west">W</span>
          </div>
          <p className="readout">
            Heading: {heading.toFixed(1)}° | Bearing: {bearing.toFixed(1)}° |
            Angle: {angle.toFixed(1)}°
          </p>
        </>
      )}
    </div>
  );
}
