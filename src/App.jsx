import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/home/Home";
import CompassPage from "./pages/compass/CompassPage";
import Location from "./pages/location/Location";
import Endpage from "./pages/endpage/Endpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compass" element={<CompassPage />} />
        <Route path="/location" element={<Location />} />
        <Route path="/endpage" element={<Endpage />} />
      </Routes>
    </Router>
  );
}

export default App;
