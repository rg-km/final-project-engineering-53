import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const isAdmin = localStorage.getItem("role");

  return (
    // check if parameter (allowedRoles) is matched with role from API response
    auth && isAdmin === allowedRoles ? (
      <Outlet />
    ) : (
      <Navigate to="/admin/login" state={{ from: location }} replace />
    )
  );
};

export default RequireAuth;
