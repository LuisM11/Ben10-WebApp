import { useState } from "react";
import FavoriteLogicButton from "./FavoriteLogicButton";
import { Link } from "react-router-dom";

function RotationCard({ alien, type }) {
  const [isFlipped, setIsFlipped] = useState(false);

  function handleFlip() {
    setIsFlipped((prev) => !prev);
  }

  const backBg = type === "detailAlien" ? "bg-black-800" : "bg-black/80";

  return (
    <div
      className="group mx-auto h-40 w-40 cursor-pointer [perspective:1200px] transition-transform duration-300 hover:scale-110"
      onClick={handleFlip}
    >
      <div
        className={`relative h-full w-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)] shadow-2xl ring-2 ring-[#30f301]" : "shadow-lg"
        }`}
      >
        {/* Frente de la tarjeta - Imagen con borde verde */}
        <div className="absolute inset-0 flex h-full w-full items-center justify-center [backface-visibility:hidden]">
          <img
            src={alien.imageUrl}
            alt={alien.name}
            className="h-40 w-40 rounded-full border-2 border-[#30f301] object-cover shadow-lg"
          />
        </div>

        {/* Dorso de la tarjeta - Más profundidad */}
        <div
          className={`absolute inset-0 flex h-full w-full flex-col items-center justify-center rounded-xl p-4 text-white shadow-2xl border-2 border-[#30f301] [backface-visibility:hidden] [transform:rotateY(180deg)] ${backBg}`}
        >
          <h2 className="text-xl font-bold">{alien.name}</h2>
          <p className="text-center text-sm opacity-90">
            {alien.description.substring(0, 60)}...
          </p>

          {/* Botón de favorito con más presencia */}
          <div className="mt-3">
            <FavoriteLogicButton alien={alien} />
          </div>

          {/* Link "Ver más" más visible */}
          <div className="mt-auto">
            <Link
              to={`/alienDetails/${alien.id}`}
              className="text-sm font-semibold text-[#30f301] hover:text-[#28d800] underline"
              onClick={(e) => e.stopPropagation()}
            >
              Ver más
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RotationCard;
