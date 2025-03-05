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
import { AuthProvider } from "./contexts/AuthContext";
import { useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";

function PrivateRoute({ children }) {
  const { token, isTokenExpired, logout } = useAuth();

  useEffect(() => {
    if (!token || isTokenExpired()) {
      logout();
    }
  }, [token, isTokenExpired, logout]);

  if (!token || isTokenExpired()) {
    return <Navigate to="/login" replace />;
  }

  return children;
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
          <RouterProvider router={router} />
        </CommentsProvider>
      </AliensProvider>
    </AuthProvider>
  );
}

export default App;
