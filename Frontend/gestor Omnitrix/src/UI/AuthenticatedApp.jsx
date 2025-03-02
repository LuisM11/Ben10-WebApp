// import { Routes, Route, Navigate } from "react-router-dom";
// import Favorite from "../features/Favorites/Favorite";
// import AlienDetails from "../features/Details/AlienDetails";
// import { useAuth } from "../contexts/AuthContext";
// import AppLayout from "./AppLayout";
// import Login from "../features/Login/Login";
// import Home from "./Home";
// import AppContent from "./AppContent";

// function PrivateRoute({ children }) {
//   const { token } = useAuth();
//   return token ? children : <Navigate to="/login" replace />;
// }

// function AuthenticatedApp() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />

//       <Route
//         path="/app"
//         element={
//           <PrivateRoute>
//             <AppLayout />
//           </PrivateRoute>
//         }
//       >
//         <Route index element={<AppContent />} />
//       </Route>

//       <Route
//         path="/favorites"
//         element={
//           <PrivateRoute>
//             <AppLayout />
//           </PrivateRoute>
//         }
//       >
//         <Route index element={<Favorite />} />
//       </Route>

//       <Route
//         path="/alienDetails"
//         element={
//           <PrivateRoute>
//             <AppLayout />
//           </PrivateRoute>
//         }
//       >
//         <Route path=":id" element={<AlienDetails />} />
//       </Route>
//     </Routes>
//   );
// }

// export default AuthenticatedApp;
