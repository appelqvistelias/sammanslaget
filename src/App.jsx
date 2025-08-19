import "./App.css";
import Compass from "./components/Compass/Compass";
import LocationList from "./components/LocationList/LocationList";

function App() {
  return (
    <>
      <Compass />
      <LocationList userLocation={{ lat: 57.705, lng: 11.937 }} />
    </>
  );
}

export default App;
