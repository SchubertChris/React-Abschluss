import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../layout/ContextAPI";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AppContext);

  return isAuthenticated ? children : <Navigate to="/login-register" replace />;
};

export default ProtectedRoute;

// Hier wird die ProtectedRoute-Komponente erstellt, die die children-Komponenten nur rendert, wenn der Benutzer authentifiziert ist. Andernfalls wird der Benutzer zur Login-Seite weitergeleitet.
