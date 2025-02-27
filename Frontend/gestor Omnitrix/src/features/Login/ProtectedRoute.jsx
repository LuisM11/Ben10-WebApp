// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function ProtectedRoute({ children }) {
  const { token } = useAuth();

  // Si no hay token, redirige a /login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Caso contrario, renderizas los children protegidos
  return children;
}
