import { useEffect, useState, useRef } from "react";
import "./Compass.css"; // import CSS file
import DistanceViewer from "../DistanceViewer/DistanceViewer";
import { getBearing, getDistance, getShortestAngleDiff } from "../../utils/geo";

export default function Compass({ target }) {
  const [heading, setHeading] = useState(0);
  const [position, setPosition] = useState(null);
  const [bearing, setBearing] = useState(0);
  const [distance, setDistance] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [displayAngle, setDisplayAngle] = useState(0);
  const [arrived, setArrived] = useState(false);

  const rafRef = useRef(null);
  const watchIdRef = useRef(null);

  //geolocation user position
  useEffect(() => {
    if (navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const userPosition = {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          };
          setPosition(userPosition);

          //Update distance and bearing
          const dist = getDistance(
            userPosition.lat,
            userPosition.lon,
            target.lat,
            target.lon
          );
          setDistance(dist);
          setBearing(
            getBearing(
              userPosition.lat,
              userPosition.lon,
              target.lat,
              target.lon
            )
          );

          //Check 'has arrvied'-state, true if users current position is equal or closer than 20 meters to destination.
          if (dist <= 20) {
            setArrived(true);
          }
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
  }, [target]);

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
          <DistanceViewer distance={distance} />
        </>
      )}
    </div>
  );
}
