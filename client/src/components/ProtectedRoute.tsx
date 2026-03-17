import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
