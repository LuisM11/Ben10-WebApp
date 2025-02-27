import { useEffect, useState } from "react";
import { useAliens } from "../contexts/AliensContext";
import { useAuth } from "../contexts/AuthContext";

function FavoriteLogicButton({ alien }) {
  const { favoritos, addToFavorites, removeFromFavorites, getFavorites } =
    useAliens();

  const { user } = useAuth(); // Obtiene el token y el usuario actual

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
      className={`text-2xl sm:text-3xl ${
        isFavorite ? "text-red-500" : "text-gray-400"
      } hover:text-red-600`}
    >
      {(isFavorite && user.id === 1 ? "❤️" : user.id === 1 && "🤍") ||
        (isFavorite && "es uno de los fav de ben")}
    </button>
  );
}

export default FavoriteLogicButton;
