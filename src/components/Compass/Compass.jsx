import { useEffect, useState, useRef } from "react";
import "./Compass.css"; // import CSS file

export default function Compass() {
  const target = { lat: 57.6639608448853, lon: 11.931189014191505 }; // Example: Flatås Torg
  const [heading, setHeading] = useState(0);
  const [position, setPosition] = useState(null);
  const [bearing, setBearing] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [displayAngle, setDisplayAngle] = useState(0);

  const rafRef = useRef(null);
  const watchIdRef = useRef(null);

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

  //geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        (err) => console.error("Geolocation error:", err),
        { enableHighAccuracy: true, maximumAge: 1000, timeout: 5000 }
      );
    }

    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const startOrientation = () => {
    function handleOrientation(event) {
      let deviceHeading = null;
      if (event.webkitCompassHeading != null) {
        deviceHeading = event.webkitCompassHeading;
      } else if (event.alpha != null) {
        deviceHeading = 360 - event.alpha;
      }

      if (deviceHeading != null) {
        setHeading((prev) => prev + 0.1 * (deviceHeading - prev));
      }
    }
    window.addEventListener(
      "deviceorientationabsolute",
      handleOrientation,
      true
    );
    window.addEventListener("deviceorientation", handleOrientation, true);
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
      setBearing(
        getBearing(position.lat, position.lon, target.lat, target.lon)
      );
    }
  }, [position]);

  function getShortestAngleDiff(target, current) {
    let diff = target - current;
    diff = ((diff + 540) % 360) - 180;
    return diff;
  }

  const diff = getShortestAngleDiff(bearing, heading);

  //arrow animation
  useEffect(() => {
    const animate = () => {
      if (bearing != null && heading != null) {
        // Compute the relative angle for arrow
        const relativeAngle = getShortestAngleDiff(bearing, heading);

        setDisplayAngle((prev) => {
          const step = getShortestAngleDiff(relativeAngle, prev);
          const stepSize = Math.sign(step) * Math.min(Math.abs(step), 3); // max 3°/frame
          return prev + stepSize;
        });
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [bearing, heading]);

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
