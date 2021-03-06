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
import AboutUs from "./pages/AboutUs";
import Profile from "./pages/user/Profile";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminMaterials from "./pages/admin/Materials";
import AdminProfile from "./pages/admin/Profile";

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
        <Route path="/about-us" element={<AboutUs />} />
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
      <Route element={<RequireAuth allowedRoles="admin" />}>
        {/* Protected Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/materials" element={<AdminMaterials />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
        </Route>
      </Route>
      {/* Admin Layout */}

      {/* Find The Missing Routes */}
      <Route path="/*" element={<UserLayout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
