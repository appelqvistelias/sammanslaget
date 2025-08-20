import "./DistanceViewer.css";

export default function DistanceViewer({ distance }) {
  return (
    <div className="distanceContainer">
      <img src="seagull.png" alt="bird icon" className="goalBird" />
      <p>{distance ? distance.toFixed(1) : "--"} meter</p>
    </div>
  );
}
