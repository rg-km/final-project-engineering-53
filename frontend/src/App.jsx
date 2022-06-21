import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Materials from "./pages/materials/Materials";
import MaterialDetail from "./pages/materials/MaterialDetail";
import Register from "./pages/Register";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="materials">
          <Route index element={<Materials />} />
          <Route path=":id" element={<MaterialDetail />} />
        </Route>

        {/* Auth  */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
