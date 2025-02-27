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

// 🔐 Componente para proteger rutas
function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
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
