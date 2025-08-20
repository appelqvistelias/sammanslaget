export default function Home() {
  return (
    <main className="main">
      <div className="mainHeading">
        <img src="/smallLogo.svg" className="logo" alt="kompassicon" />
        <h1>Aktivitets</h1>
        <h1>kompassen</h1>
      </div>
      <section className="introText">
        <div className="text">
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
