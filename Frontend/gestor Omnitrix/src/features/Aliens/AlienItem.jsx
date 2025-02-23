import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAliens } from "../../contexts/AliensContext";
import FavoriteLogicButton from "../../UI/FavoriteLogicButton";

function AlienItem({ alien }) {
  const [isFlipped, setIsFlipped] = useState(false);

  function handleFlip() {
    setIsFlipped((prev) => !prev);
  }

  return (
    <div
      className="group mx-auto h-64 w-full max-w-[180px] cursor-pointer [perspective:1000px] sm:max-w-[200px] md:max-w-[250px]"
      onClick={handleFlip}
    >
      <div
        className={`relative h-full w-full rounded-xl shadow-xl transition-all duration-300 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Frente de la tarjeta */}
        <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center rounded-xl bg-gray-100 p-4 [backface-visibility:hidden]">
          <img
            src={alien.imageUrl}
            alt={alien.name}
            className="h-32 w-32 rounded-full object-cover"
          />
          <h2 className="mt-2 text-lg font-bold">{alien.name}</h2>
        </div>

        {/* Dorso de la tarjeta */}
        <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center rounded-xl bg-black/80 p-4 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <h2 className="text-lg font-bold">{alien.name}</h2>
          <p className="text-center text-sm">
            {alien.description.substring(0, 60)}...
          </p>

          {/* Botón de favorito */}
          <FavoriteLogicButton alien={alien} />

          {/* Link a más detalles */}
          <Link
            to={`/alienDetails/${alien.id}`}
            className="mt-2 text-blue-400 hover:text-blue-600"
            onClick={(e) => e.stopPropagation()}
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AlienItem;
