import { useAuth } from "../contexts/AuthContext";
import Logo from "./Logo";
import { Link } from "react-router-dom";

function Header() {
  const { user, token, logout } = useAuth();
  const isAuthenticated = !!token;

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-opacity-80 p-4 text-white shadow-md backdrop-blur-md">
      <div className="flex items-center gap-3">
        <Logo />
      </div>

      <nav>
        {isAuthenticated ? (
          <div className="flex items-center space-x-6">
            <Link
              to="/favorites"
              className="flex items-center gap-2 transition-colors hover:text-green-400"
            >
              <span className="material-symbols-outlined text-xl">
                bookmark
              </span>
              <span className="hidden font-semibold sm:block">Favoritos</span>
            </Link>

            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold transition-transform hover:bg-red-700 active:scale-95"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
              <span className="hidden sm:block">Salir</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-green-400 bg-gray-700 text-sm font-bold uppercase">
                {user?.username[0]}
              </div>
              <span className="hidden font-medium text-green-300 sm:block">
                {user?.username}
              </span>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="rounded-lg bg-green-500 px-4 py-2 font-semibold text-gray-900 transition-colors hover:bg-green-600"
          >
            Iniciar sesión
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
