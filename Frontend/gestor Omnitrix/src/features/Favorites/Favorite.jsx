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
      <h2 className="mb-4 text-xl">Favorites</h2>
      {favoritos.length === 0 ? (
        <p>No hay aliens en favoritos.</p>
      ) : (
        favoritos.map((favorito) => (
          <div
            key={favorito.id}
            className="mb-2 flex items-center justify-between rounded-lg bg-gray-700 p-2"
          >
            <div className="flex items-center">
              <img
                src={favorito.imageUrl} // ✅ Ahora está disponible
                alt={favorito.name}
                className="mr-4 h-12 w-12 rounded-lg object-cover"
              />
              <span>{favorito.name}</span> {/* ✅ Ahora está disponible */}
            </div>
            {user.id === 1 && (
              <button
                onClick={() => removeFromFavorites(favorito.id)}
                className="text-red-400 hover:text-red-600"
              >
                🗑
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Favorite;
