import style from "./PrimaryButton.module.css";

export default function PrimaryButton({ textContent, onClick }) {
  return <button className={style.button} onClick={onClick}>{textContent}</button>;
}
