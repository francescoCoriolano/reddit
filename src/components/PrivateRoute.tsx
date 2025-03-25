import { Navigate, Outlet } from "react-router";
import { isAuthenticated } from "../auth";

// If user is authenticated, render child routes (Outlet)
// If not authenticated, redirect to login page
const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
