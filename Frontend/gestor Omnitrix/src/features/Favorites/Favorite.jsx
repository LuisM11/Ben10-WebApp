import { useEffect } from "react";
import { useAliens } from "../../contexts/AliensContext";
import { useAuth } from "../../contexts/AuthContext";

function Favorite() {
  const { favoritos, removeFromFavorites, getFavorites } = useAliens();
  const { user } = useAuth();

  useEffect(() => {
    getFavorites(); // ✅ Llamamos a getFavorites() al montar el componente
  }, [getFavorites]);

  return (
    <div className="my-10 rounded bg-gray-800 p-4 text-white">
      <h2 className="mb-4 text-xl">
        {user.id === 1 ? `Tus aliens favoritos` : `Aliens favoritos de Ben`}
      </h2>

      {favoritos.length === 0 ? (
        <p>
          {user.id == 1
            ? `No hay aliens en tus favoritos.`
            : "Ben no tiene aliens en sus favoritos por ahora"}
        </p>
      ) : (
        <div className="space-y-3 p-8">
          {favoritos.map((favorito) => (
            <div
              key={favorito.id}
              className="relative h-16 overflow-hidden rounded-lg bg-gray-900"
            >
              {/* Full alien image as background */}
              <div className="absolute inset-0 h-full w-full">
                <img
                  src={favorito.imageUrl}
                  alt=""
                  className="h-full w-full object-cover opacity-50" // 🔥 Agregamos opacity-50 para hacer la imagen más transparente
                />
              </div>

              {/* Content layout with text and button */}
              <div className="relative z-10 flex h-full items-center justify-between px-4">
                {/* Left side - blank or small icon */}

                {/* Center area - name with glow */}
                <div className="flex-1 text-center">
                  <span className="rounded px-2 py-1 text-lg font-medium tracking-wide text-white shadow-sm">
                    {favorito.name}
                  </span>
                </div>

                {/* Right side - delete button */}
                {user.id === 1 && (
                  <button
                    onClick={() => removeFromFavorites(favorito.id)}
                    className="flex h-8 w-8 items-center justify-center rounded bg-gray-800/70 backdrop-blur-sm hover:bg-gray-700"
                    aria-label="Eliminar"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorite;
