import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles/global.css';

import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Materials from "./pages/materials/Materials";
import MaterialDetail from "./pages/materials/MaterialDetail";
import LoginPage from "./components/login/login";
import RegisterPage from "./components/register/register"

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="materials">
          <Route index element={<Materials />} />
          <Route path=":id" element={<MaterialDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}
