import "./ListItem.css";

export default function ListItem({ title, coordinates }) {
  return (
    <div className="list-item-container">
      <p className="title">{title}:</p>
      <p className="coordinates">{coordinates}</p>
    </div>
  );
}
