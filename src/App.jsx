import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/home/Home";
import CompassPage from "./pages/compass/CompassPage";
import Exercise from "./pages/exercise/Exercise";
import Location from "./pages/location/Location";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compass" element={<CompassPage />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/location" element={<Location />} />
      </Routes>
    </Router>
  );
}

export default App;
