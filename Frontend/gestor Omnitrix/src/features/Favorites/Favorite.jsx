import { useAliens } from "../../contexts/AliensContext";

function Favorite() {
  const { favoritos, removeFromFavorites } = useAliens();
  return (
    <div className="my-10 rounded bg-gray-800 p-4 text-white">
      <h2 className="mb-4 text-xl">Favorites</h2>
      {favoritos.length === 0 ? (
        <p>No hay aliens en favoritos.</p>
      ) : (
        favoritos.map((favorito) => (
          <div
            key={favorito.favoritoId}
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
            <button
              onClick={() => removeFromFavorites(favorito.favoritoId)}
              className="text-red-400 hover:text-red-600"
            >
              🗑
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Favorite;
