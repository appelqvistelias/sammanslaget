import style from "./Location.module.css";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

export default function Location() {
  return (
    <main className={style.main}>
      <h1 className={style.mainHeader}>Namn på platsen</h1>
      <p className={style.artist}>Årtal, Konstnär</p>
      <div className={style.imageSection}>
        <img />
        <PrimaryButton textContent={"Starta aktivitet"} />
      </div>
      <div className={style.activitySection}>
        <div className={style.activityTextContainer}>
          <h2 className={style.activityHeader}>Aktivitet</h2>
          <p className={style.activityText}>Beskrivning av aktivteten</p>
        </div>
        <PrimaryButton textContent={"Gå vidare"} />
      </div>
      <div className={style.about}>
        <h3 className={style.secondaryHeader}>Information om platsen</h3>
        <hr className={style.ruler} />
        <div className={style.aboutTextContainer}>
          <p className={style.aboutText}>Text om platsen</p>
        </div>
      </div>
    </main>
  );
}
