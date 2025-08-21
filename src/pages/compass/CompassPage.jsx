import { useEffect, useState } from "react";
import Compass from "../../components/Compass/Compass";
import locations from "../../data/locations.json";
import starters from "../../data/conversationStarters.json";
import { useNavigate } from "react-router-dom";
import styles from "./CompassPage.module.css";

//gets a conversation topic from the converstion topics json list
function getRandomStarter() {
  const index = Math.floor(Math.random() * starters.length);
  return starters[index].question;
}

export default function CompassPage() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [starter, setStarter] = useState("");
  const [showStarter, setShowStarter] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const requestPermission = async () => {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      try {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === "granted") {
          setPermissionGranted(true);
        }
      } catch (err) {
        console.error("Permission denied:", err);
      }
    } else {
      // Android doesn’t need explicit request
      setPermissionGranted(true);
    }
  };

  useEffect(() => {
    //loads progress from local storage or picks first from destinations list
    const currentIndex = parseInt(
      localStorage.getItem("destinationIndex") || "0",
      10
    );

    if (currentIndex >= 4) {
      navigate("/end");
      return;
    }

    setDestination(locations[currentIndex]);
    setStarter(getRandomStarter());
  }, [navigate]);

  const handleArrived = () => {
    const currentIndex = parseInt(
      localStorage.getItem("destinationIndex") || "0",
      10
    );
    //save an index to local storage
    localStorage.setItem("destinationIndex", currentIndex + 1);
    //add navigation to location page
    navigate(`/location`);
  };

  const handleStarterClick = () => {
    setStarter(getRandomStarter());
    setShowStarter(true);
  };

  if (!destination) return <p>Laddar..</p>;

  return (
    <div className={styles.page}>
      {!permissionGranted ? (
        <button onClick={requestPermission} className={styles.enableBtn}>
          Enable Compass
        </button>
      ) : (
        <Compass target={destination} onArrived={handleArrived} />
      )}
      <section className={styles.conversationContainer}>
        <article className={styles.conversationCard}>
          {!showStarter ? (
            <p>Följ pilen för att komma fram till första upplevelsen</p>
          ) : (
            <p>{starter}</p>
          )}
        </article>
        <button onClick={handleStarterClick}>
          {showStarter ? "Nytt ämne" : "Samtalsämne"}
        </button>
      </section>
    </div>
  );
}
