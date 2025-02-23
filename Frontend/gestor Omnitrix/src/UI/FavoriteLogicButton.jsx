import { useEffect, useState } from "react";
import { useAliens } from "../contexts/AliensContext";

function FavoriteLogicButton({ alien }) {
  const { favoritos, addToFavorites, removeFromFavorites, getFavorites } =
    useAliens();

  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    getFavorites(); // ✅ Llamamos a getFavorites() al montar el componente
  }, [getFavorites]);

  useEffect(() => {
    const favoritoEncontrado = favoritos.some((fav) => fav.id === alien.id);
    setIsFavorite(favoritoEncontrado);
  }, [favoritos, alien.id]);

  function handleFavoriteClick(e) {
    e.stopPropagation();
    if (isFavorite) {
      const fav = favoritos.find((fav) => {
        return fav.id === alien.id;
      });

      if (fav) {
        removeFromFavorites(fav.id);
      }
    } else {
      addToFavorites(alien, 1);
    }
  }

  return (
    <button
      onClick={handleFavoriteClick}
      className={`mt-2 text-xl ${
        isFavorite ? "text-red-500" : "text-gray-400"
      } hover:text-red-600`}
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
}

export default FavoriteLogicButton;
