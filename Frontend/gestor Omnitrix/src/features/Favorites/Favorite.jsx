import { useEffect } from "react";
import { useAliens } from "../../contexts/AliensContext";
import { useAuth } from "../../contexts/AuthContext";
import FavoriteItem from "./FavoriteItem";

function Favorite() {
  const { favoritos, removeFromFavorites, getFavorites } = useAliens();
  const { user } = useAuth();

  useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  const isOwner = user.id === 1;

  return (
    <div className="my-10 rounded p-4 text-white">
      <h2 className="mb-4 text-xl">
        {isOwner ? `Tus aliens favoritos` : `Aliens favoritos de Ben`}
      </h2>

      {favoritos.length === 0 ? (
        <p>
          {isOwner
            ? `No hay aliens en tus favoritos.`
            : "Ben no tiene aliens en sus favoritos por ahora"}
        </p>
      ) : (
        <div className="space-y-3 p-8">
          {favoritos.map((favorito) => (
            <FavoriteItem
              key={favorito.id}
              favorito={favorito}
              onRemove={removeFromFavorites}
              isOwner={isOwner}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorite;
