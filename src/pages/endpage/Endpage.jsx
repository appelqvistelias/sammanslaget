import { useNavigate } from "react-router-dom";
import style from "./Endpage.module.css";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

export default function Endpage() {
  const navigate = useNavigate();

  <main>
    <div className={style.congratulations}>
      <h1>Grattis!</h1>
      <p>Ni klarade det!</p>
    </div>
    <img
      src="/confetti.svg"
      alt="konfetti"
      onClick={() => navigate("/compass")}
    />
    <div className={style.buttons}>
      <PrimaryButton textContent={"Ny promenad"} />
      <PrimaryButton textContent={"Avsluta"} onClick={() => navigate("/")} />
    </div>
  </main>;
}
