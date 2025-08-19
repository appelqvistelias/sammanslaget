import { useEffect, useState, useRef } from "react";
import "./Compass.css"; // import CSS file

export default function Compass() {
  const target = { lat: 57.6639608448853, lon: 11.931189014191505 }; // Example: Flatås Torg
  //57.70986997664876, 11.939058824329294 Karlatornet
  //57.6639608448853, 11.931189014191505 Flatås Torg
  const [heading, setHeading] = useState(0);
  const [position, setPosition] = useState(null);
  const [bearing, setBearing] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [displayAngle, setDisplayAngle] = useState(0);

  const rafRef = useRef(null);

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

  function getShortestAngleDiff(target, current) {
    let diff = target - current;
    diff = ((diff + 540) % 360) - 180;
    return diff;
  }

  const diff = getShortestAngleDiff(bearing, heading);

  //arrow animation
  useEffect(() => {
    const animate = () => {
      setDisplayAngle((prev) => {
        const step = getShortestAngleDiff(diff, prev);
        const stepSize = Math.sign(step) * Math.min(Math.abs(step), 3);
        return prev + stepSize;
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [diff]);

  return (
    <div className="compass-container">
      <h2>Find Your Way</h2>

      {!permissionGranted ? (
        <button onClick={requestPermission} className="enable-btn">
          Enable Compass
        </button>
      ) : (
        <>
          <div className="compass">
            <img
              src="arrowTarget.svg"
              alt="target arrow"
              className="arrow"
              style={{ transform: `rotate(${displayAngle}deg)` }}
            />
          </div>
          {/* <p className="readout">
            Heading: {heading.toFixed(1)}° | Bearing: {bearing.toFixed(1)}° |
            Angle: {angle.toFixed(1)}°
          </p> */}
        </>
      )}
    </div>
  );
}
