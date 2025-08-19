import ListItem from "../ListItem/ListItem";
import locations from "../../data/locations.json";
import { getDistanceInM } from "../../utils/distance";

export default function LocationList({ userLocation }) {
  return (
    <div>
      {locations.map((location, index) => {
        const distance = getDistanceInM(userLocation, {
          lat: location.latitude,
          lng: location.longitude,
        });

        return (
          <ListItem
            key={index}
            name={location.name}
            artist={location.artist}
            description={location.description}
            distance={distance}
            exercise={location.exercise}
          />
        );
      })}
    </div>
  );
}
