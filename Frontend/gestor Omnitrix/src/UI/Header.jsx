// import { useAuth } from "../context/AuthContext"; // Asegúrate de importar el contexto
import Logo from "./Logo";
import { Link } from "react-router-dom";

function Header() {
  // const { state, dispatch } = useAuth();
  const isAuthenticated = true;

  return (
    <header className="flex flex-wrap items-center justify-between bg-gray-800 p-4 text-white">
      <Logo />

      <nav>
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <Link
              to="/favorites"
              className="flex items-center gap-2 hover:underline"
            >
              <span className="material-symbols-outlined sm:hidden">
                bookmark_star
              </span>
              <span className="hidden sm:block">Favoritos</span>
            </Link>
            <button className="flex items-center gap-2 rounded bg-red-500 px-3 py-1 hover:bg-red-600">
              <span className="material-symbols-outlined sm:hidden">
                logout
              </span>
              <span className="hidden sm:block">Logout</span>
            </button>
            <div className="h-8 w-8 rounded-full bg-gray-500"></div>{" "}
            {/* Icono de perfil */}
          </div>
        ) : (
          <button
            className="rounded bg-blue-500 px-3 py-1 hover:bg-blue-600"
            // onClick={() => dispatch({ type: "LOGIN" })}
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
