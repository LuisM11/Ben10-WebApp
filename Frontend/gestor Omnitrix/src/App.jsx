import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./UI/AppLayout";
import Login from "./features/Login/Login";
import Home from "./UI/Home";
import AppContent, { loader as aliensLoader } from "./UI/AppContent";
import Favorite from "./features/Favorites/Favorite";
import AlienDetails from "./features/Details/AlienDetails";
import { AliensProvider } from "./contexts/AliensContext";
import { CommentsProvider } from "./contexts/CommentsContext";
// import { CommentsProvider } from "./contexts/CommentsContext";

const router = createBrowserRouter([
  { path: "/", element: <Home /> }, // Home sin Header
  { path: "/login", element: <Login /> }, // Login sin Header
  {
    path: "/app",
    element: <AppLayout />, // Usa un Layout con Header
    children: [{ index: true, element: <AppContent />, loader: aliensLoader }], // Selector y Aliens
  },
  {
    path: "/favorites",
    element: <AppLayout />, // Usa el mismo Layout con Header
    children: [{ index: true, element: <Favorite /> }], // Página de favoritos
  },
  {
    path: "/alienDetails",
    element: <AppLayout />,
    children: [{ path: ":id", element: <AlienDetails /> }],
  },
]);

function App() {
  return (
    <AliensProvider>
      <CommentsProvider>
        <RouterProvider router={router} />
      </CommentsProvider>
    </AliensProvider>
  );
}

export default App;
