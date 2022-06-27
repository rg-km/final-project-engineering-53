import * as React from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./helpers/RequireAuth";
import { UserLayout } from "./components/layouts/UserLayout";
import { AdminLayout } from "./components/layouts/AdminLayout";

import NotFound from "./pages/404";
import Home from "./pages/Home";
import Materials from "./pages/materials/Materials";
import MaterialDetail from "./pages/materials/MaterialDetail";

import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Profile from "./pages/user/Profile";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import Dashboard from "./pages/admin/Dashboard";
import AdminHome from "./pages/admin/AdminHome";
import AdminMaterials from "./pages/admin/Materials";

export default function App() {
  return (
    <Routes>
      {/* User Layout */}
      <Route path="/" element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/materials">
          <Route index element={<Materials />} />
          <Route path=":id" element={<MaterialDetail />} />
        </Route>
        <Route path="/profile" element={<Profile />} />

        {/* Auth Routes - User */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Auth Routes - Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
      </Route>
      {/* User Layout */}

      {/* Admin Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/materials" element={<AdminMaterials />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth allowedRoles="admin" />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
      </Route>
      {/* Admin Layout */}

      {/* Find The Missing Routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
