import { useNavigate } from "react-router-dom";
import style from "./Home.module.css";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className={style.main}>
      <div className={style.header}>
        <img src="/smallLogo.svg" alt="kompassicon" />
        <div className={style.mainHeaderContainer}>
          <h1 className={style.mainHeader}>Aktivitets</h1>
          <h1 className={style.mainHeader}>kompassen</h1>
        </div>
      </div>

      <div className={style.hero}>
        <p className={style.heroText}>Gemensamt i en riktning</p>
        <div className={style.introText}>
          <p className={style.heroText}>
            Håll ihop i gruppen och följ kompasspilen
          </p>
          <p className={style.heroText}>
            Ni besöker fyra destinationer på vägen
          </p>
          <p className={style.heroText}>Samtalskort kan dras </p>
          <p className={style.heroText}>
            En signal spelas upp vid destinationen där ni kan utföra en
            aktivitet och läsa om platsen
          </p>
          <p className={style.heroText}>
            Är ni taggade? Tryck på knappen nedan!
          </p>
        </div>
        <PrimaryButton
          textContent="Kör igång!"
          onClick={() => navigate("/compass")}
        />
        <div className={style.about}>
          <h2 className={style.secondaryHeader}>Om webbplatsen</h2>
          <hr className={style.ruler} />
          <div className={style.aboutTextContainer}>
            <p className={style.aboutText}>
              Aktivitetskompassen är en webbapp för att enkelt och lättsamt lära
              känna personer bättre. Den fungerar både för att lära känna nya
              personer samt för personer som redan känner varandra. Syftet är gå
              promenader tillsammans och upptäcka kultur och historiska platser
              på Lindholmen samt göra gruppaktiviteter längs vägen.{" "}
            </p>
            <p className={style.aboutText}>
              Är det lite stelt? Ingen fara! Dra ett samtalskort så får ni
              förslag på ämnen att prata om.{" "}
            </p>
            <p className={style.aboutText}>
              Vårt mål är att skapa en trygg miljö där ni som grupp får uppleva
              glädje och gemenskap med varandra och samtidigt lära sig mer om
              kultur och historiska platser på Lindholmen.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
