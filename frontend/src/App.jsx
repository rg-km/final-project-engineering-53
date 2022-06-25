import * as React from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./helpers/RequireAuth";
import AppLayout from "./components/layouts/AppLayout";

import NotFound from "./pages/404";

import Home from "./pages/Home";
import Materials from "./pages/materials/Materials";
import MaterialDetail from "./pages/materials/MaterialDetail";

import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminRegister from "./pages/admin/AdminRegister";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* Public Routes  */}
        <Route path="/" element={<Home />} />
        <Route path="/materials">
          <Route index element={<Materials />} />
          <Route path=":id" element={<MaterialDetail />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes  */}
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Routes  */}
        <Route element={<RequireAuth allowedRoles="admin" />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>

        {/* Find The Missing Routes  */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
