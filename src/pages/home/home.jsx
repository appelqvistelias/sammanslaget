import style from "./Home.module.css";

export default function Home() {
  return (
    <main className={style.main}>
      <div className={style.header}>
        <img src="/smallLogo.svg" className={style.logo} alt="kompassicon" />
        <div>
          <h1 className={style.mainHeading}>Aktivitets</h1>
          <h1 className={style.mainHeading}>kompassen</h1>
        </div>
      </div>
      <p>Gemensamt i en riktning</p>
      <section className={style.introText}>
        <div className={style.text}>
          <p>Håll ihop i gruppen och följ kompasspilen</p>
          <p>Ni besöker fyra destinationer på vägen</p>
          <p>Samtalskort kan dras </p>
          <p>
            En signal spelas upp vid destinationen där ni kan utföra en
            aktivitet och läsa om platsen
          </p>
          <p>Är ni taggade? Tryck på knappen nedan!</p>
        </div>
        <button>Kör igång!</button>
      </section>
    </main>
  );
}
