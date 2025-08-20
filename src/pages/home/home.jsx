import style from "./Home.module.css";

export default function Home() {
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
        <p className={style.text}>Gemensamt i en riktning</p>
        <div className={style.introText}>
          <p className={style.text}>
            Håll ihop i gruppen och följ kompasspilen
          </p>
          <p className={style.text}>Ni besöker fyra destinationer på vägen</p>
          <p className={style.text}>Samtalskort kan dras </p>
          <p className={style.text}>
            En signal spelas upp vid destinationen där ni kan utföra en
            aktivitet och läsa om platsen
          </p>
          <p className={style.text}>Är ni taggade? Tryck på knappen nedan!</p>
        </div>
        <button>Kör igång!</button>
      </div>
    </main>
  );
}
