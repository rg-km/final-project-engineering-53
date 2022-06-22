import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/global.css";

import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Materials from "./pages/materials/Materials";
import MaterialDetail from "./pages/materials/MaterialDetail";

import Login from "./pages/Login";
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

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
