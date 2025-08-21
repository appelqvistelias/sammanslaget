import style from "./PrimaryButton.module.css";

export default function PrimaryButton({
  textContent,
  onClick,
  bgColor,
  activeBgColor,
}) {
  return (
    <button
      className={style.button}
      onClick={onClick}
      style={{
        "--button-bg": bgColor,
        "--button-active-bg": activeBgColor,
      }}
    >
      {textContent}
    </button>
  );
}
