import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UseUserContext";

const ProtectedRoute = () => {
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
