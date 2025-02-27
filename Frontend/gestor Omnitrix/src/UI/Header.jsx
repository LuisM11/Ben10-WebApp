import { useAuth } from "../contexts/AuthContext"; // Asegúrate de importar el contexto correctamente
import Logo from "./Logo";
import { Link } from "react-router-dom";

function Header() {
  const { user, token, logout } = useAuth(); // Obtiene el usuario y la función logout
  const isAuthenticated = !!token; // Si hay token, el usuario está autenticado

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

            {/* Botón de Logout funcional */}
            <button
              onClick={logout} // Llama a la función logout del contexto
              className="flex items-center gap-2 rounded bg-red-500 px-3 py-1 hover:bg-red-600"
            >
              <span className="material-symbols-outlined sm:hidden">
                logout
              </span>
              <span className="hidden sm:block">Logout</span>
            </button>

            {/* Icono de usuario con su nombre */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gray-500"></div>
              <span className="hidden sm:block">{user?.username}</span>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="rounded bg-blue-500 px-3 py-1 hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
