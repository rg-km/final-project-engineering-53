import * as React from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./helpers/RequireAuth";
import UserLayout from "./components/layouts/UserLayout";

import NotFound from "./pages/404";

import Home from "./pages/Home";
import Materials from "./pages/materials/Materials";
import MaterialDetail from "./pages/materials/MaterialDetail";

import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminRegister from "./pages/admin/AdminRegister";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Profile from "./pages/user/Profile";
import AdminHome from "./pages/admin/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        {/* Public Routes  */}
        <Route path="/" element={<Home />} />
        <Route path="/materials">
          <Route index element={<Materials />} />
          <Route path=":id" element={<MaterialDetail />} />
        </Route>

        {/* User Routes  */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Admin Routes  */}
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/home" element={<AdminHome />} />

      {/* Protected Routes  */}
      <Route element={<RequireAuth allowedRoles="admin" />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Route>

      {/* Find The Missing Routes  */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
