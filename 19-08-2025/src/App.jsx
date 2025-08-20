import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MiniShop from "./components/MiniShop";
import Carts from "./components/Carts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MiniShop />} />
        <Route path="/cart" element={<Carts />} />
      </Routes>
    </Router>
  );
}

export default App;