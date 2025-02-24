import { useState } from "react";
import FavoriteLogicButton from "./FavoriteLogicButton";
import { Link } from "react-router-dom";

function RotationCard({ alien, type }) {
  const [isFlipped, setIsFlipped] = useState(false);

  function handleFlip() {
    setIsFlipped((prev) => !prev);
  }

  // 🔹 Definir colores según el `type`
  const frontBg = type === "detailAlien" ? "bg-neutral-500" : "bg-gray-100";
  const backBg = type === "detailAlien" ? "bg-black-800" : "bg-black/80";

  return (
    <div
      className="group mx-auto h-40 w-40 cursor-pointer [perspective:1000px]"
      onClick={handleFlip}
    >
      <div
        className={`relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Frente de la tarjeta - SOLO IMAGEN */}
        <div className="absolute inset-0 flex h-full w-full items-center justify-center [backface-visibility:hidden]">
          <img
            src={alien.imageUrl}
            alt={alien.name}
            className="h-40 w-40 rounded-full object-cover"
          />
        </div>

        {/* Dorso de la tarjeta - Información con mejor diseño */}
        <div
          className={`absolute inset-0 flex h-full w-full flex-col items-center justify-center rounded-xl p-4 text-white [backface-visibility:hidden] [transform:rotateY(180deg)] ${backBg}`}
        >
          <h2 className="text-xl font-bold">{alien.name}</h2>
          <p className="text-center text-sm opacity-90">
            {alien.description.substring(0, 60)}...
          </p>

          {/* Botón de favorito con mejor espaciado */}
          <div className="mt-2">
            <FavoriteLogicButton alien={alien} />
          </div>

          {/* Link "Ver más" mejor alineado */}
          <div className="mt-auto">
            <Link
              to={`/alienDetails/${alien.id}`}
              className="text-sm font-semibold text-blue-400 hover:text-blue-600"
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
