import { useState } from "react";
import FavoriteLogicButton from "./FavoriteLogicButton";
import { Link } from "react-router-dom";

function RotationCard({ alien, type }) {
  const [isFlipped, setIsFlipped] = useState(false);
  console.log("rotationcard");

  function handleFlip() {
    setIsFlipped((prev) => !prev);
  }

  // 🔹 Definir colores según el `type`
  const backBg = type === "detailAlien" ? "bg-black-800" : "bg-black/80";

  return (
    <div
      className="group mx-auto h-52 w-40 cursor-pointer [perspective:1000px]"
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

        {/* Dorso de la tarjeta - Información con imagen tenue */}
        <div
          className={`absolute inset-0 flex h-full w-full flex-col items-center justify-between rounded-xl p-4 text-white [backface-visibility:hidden] [transform:rotateY(180deg)] ${backBg}`}
        >
          {/* 🔹 Imagen tenue de fondo */}
          <div className="absolute inset-0 opacity-10">
            <img
              src={alien.imageUrl}
              alt={alien.name}
              className="h-full w-full rounded-xl object-cover"
            />
          </div>

          {/* 🔹 Contenedor de texto con altura fija */}
          <div className="relative z-10 flex min-h-24 flex-col items-center text-center">
            <h2 className="text-xl font-bold">{alien.name}</h2>
            <p className="text-sm opacity-90">
              {alien.description.substring(0, 60)}...
            </p>
          </div>

          {/* 🔹 Botón de favorito (fijo) */}
          <div className="relative z-10">
            <FavoriteLogicButton alien={alien} />
          </div>

          {/* 🔹 Link "Ver más" (siempre dentro del borde) */}
          <div className="relative z-10 pb-2">
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
