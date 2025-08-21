import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Location.module.css";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import locations from "../../data/locations.json";

export default function Location() {
  const [showActivity, setShowActivity] = useState(false);
  const navigate = useNavigate();
  const locationIndex = localStorage.getItem("destinationIndex") || 0;
  //console.log(locationIndex);

  const handleNextDestination = () => {
    const currentIndex = parseInt(
      localStorage.getItem("destinationIndex") || "0",
      10
    );
    const nextIndex = currentIndex + 1;
    localStorage.setItem("destinationIndex", String(nextIndex));
    if (nextIndex >= 4) {
      localStorage.removeItem("destinationIndex");
      navigate("/");
    } else {
      navigate("/compass");
    }
  };

  return (
    <main className={style.main}>
      <div className={style.wrapper}>
        <h1 className={style.mainHeader}>{locations[locationIndex].name}</h1>
        {!showActivity && (
          <div className={style.imageSection}>
            <p className={style.artist}>
              {locations[locationIndex].year +
                " " +
                locations[locationIndex].artist}
            </p>
            <img src="/locationOne.svg" alt="Bild på konstverket" />
            <PrimaryButton
              textContent={"Starta aktivitet"}
              onClick={() => setShowActivity(true)}
            />
          </div>
        )}
        {showActivity && (
          <div className={style.activitySection}>
            <div className={style.activityTextContainer}>
              <h2 className={style.activityHeader}>
                {locations[locationIndex].exercise.title}
              </h2>
              <p className={style.activityText}>
                {locations[locationIndex].exercise.instructions}
              </p>
            </div>
            <PrimaryButton
              textContent={"Gå vidare"}
              onClick={handleNextDestination}
            />
          </div>
        )}
        <div className={style.about}>
          <h3 className={style.aboutHeader}>Information om platsen</h3>
          <hr className={style.ruler} />
          <div className={style.aboutTextContainer}>
            <p className={style.aboutText}>
              {locations[locationIndex].description}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
