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

  console.log("favoritos", favoritos);
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

  return user.id === 1 ? (
    <button
      onClick={handleFavoriteClick}
      className={`text-2xl sm:text-3xl ${
        isFavorite ? "text-red-500" : "text-gray-400"
      } hover:text-red-600`}
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  ) : (
    isFavorite && (
      <p className="text-sm">{alien.name} es uno de los favoritos de Ben!</p>
    )
  );
}

export default FavoriteLogicButton;
