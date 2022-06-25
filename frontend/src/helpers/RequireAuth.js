import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    // check if parameter (allowedRoles) is matched with role from API response
    auth?.token ? (
      <Outlet />
    ) : (
      <Navigate to="/admin/login" state={{ from: location }} replace />
    )
  );
};

export default RequireAuth;
