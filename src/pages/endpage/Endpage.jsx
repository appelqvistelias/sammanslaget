import { useNavigate } from "react-router-dom";
import style from "./Endpage.module.css";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

export default function Endpage() {
  const navigate = useNavigate();

  return (
    <main className={style.main}>
      <div className={style.wrapper}>
        <div className={style.congratulations}>
          <h1 className={style.header}>Grattis!</h1>
          <p className={style.text}>Ni klarade det!</p>
        </div>
        <img src="/confetti.svg" alt="konfetti" />
        <div className={style.buttons}>
          <PrimaryButton
            textContent={"Ny promenad"}
            onClick={() => navigate("/compass")}
          />
          <PrimaryButton
            textContent={"Avsluta"}
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    </main>
  );
}
