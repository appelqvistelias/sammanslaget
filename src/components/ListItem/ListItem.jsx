import "./ListItem.css";

export default function ListItem({ name, description, longitude, latitude }) {
  return (
    <div className="list-item-container">
      <p className="title">Name: {name}</p>
      <p className="description">Description: {description}:</p>
      <p className="longitude">Longitude: {longitude}</p>
      <p className="latitude">Latitude: {latitude}</p>
    </div>
  );
}
