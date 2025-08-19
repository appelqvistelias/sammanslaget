import ListItem from "../ListItem/ListItem";
import locations from "../../data/locations.json";

export default function LocationList() {
  const randomLocations = [...locations]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  // Add logic to calculate distance from current location, sort destinations based on distance

  // Add logic to save visited locations and exclude them from future lists

  return (
    <div>
      {randomLocations.map((location, index) => (
        <ListItem
          key={index}
          name={location.name}
          description={location.description}
          longitude={location.longitude}
          latitude={location.latitude}
        />
      ))}
    </div>
  );
}
