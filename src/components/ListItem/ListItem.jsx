import "./ListItem.css";

export default function ListItem({
  name,
  artist,
  description,
  distance,
  exercise,
}) {
  return (
    <div className="list-item-container">
      <p className="title">Namn: {name}</p>
      <p className="artist">Konstnär: {artist}</p>
      <p className="description">{description}</p>
      <p className="distance">Avstånd: {distance.toFixed(0)} m</p>
      <p className="exercise-title">Övning: {exercise.title}</p>
      <p className="exercise-instructions">{exercise.instructions}</p>
    </div>
  );
}
