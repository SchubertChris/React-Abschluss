import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../layout/ContextAPI";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AppContext);

  return isAuthenticated ? children : <Navigate to="/login-register" replace />;
};

export default ProtectedRoute;
