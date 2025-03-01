import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import AppLayout from "./UI/AppLayout";
import Login from "./features/Login/Login";
import Home from "./UI/Home";
import AppContent from "./UI/AppContent";
import Favorite from "./features/Favorites/Favorite";
import AlienDetails from "./features/Details/AlienDetails";
import { AliensProvider } from "./contexts/AliensContext";
import { CommentsProvider } from "./contexts/CommentsContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";

// 🔐 Componente para proteger rutas
function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

// 🔄 Nuevo componente para el interceptor
function AuthInterceptor() {
  const { logout } = useAuth();

  useEffect(() => {
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      const res = await originalFetch(...args);
      if (res.status === 401) {
        logout();
        window.location.href = "/login";
      }
      return res;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [logout]);

  return null; // No renderiza nada
}

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  {
    path: "/app",
    element: (
      <PrivateRoute>
        <AppLayout />
      </PrivateRoute>
    ),
    children: [{ index: true, element: <AppContent /> }],
  },
  {
    path: "/favorites",
    element: (
      <PrivateRoute>
        <AppLayout />
      </PrivateRoute>
    ),
    children: [{ index: true, element: <Favorite /> }],
  },
  {
    path: "/alienDetails",
    element: (
      <PrivateRoute>
        <AppLayout />
      </PrivateRoute>
    ),
    children: [{ path: ":id", element: <AlienDetails /> }],
  },
]);

function App() {
  return (
    <AuthProvider>
      <AliensProvider>
        <CommentsProvider>
          {/* 🔄 Agregar el interceptor dentro de los providers */}
          <AuthInterceptor />
          <RouterProvider router={router} />
        </CommentsProvider>
      </AliensProvider>
    </AuthProvider>
  );
}

export default App;
