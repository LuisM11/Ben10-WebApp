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
      className="group mx-auto mt-2 h-52 w-40 cursor-pointer [perspective:1000px]"
      onClick={handleFlip}
    >
      <div
        className={`relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div className="absolute inset-0 flex h-full w-full items-center justify-center [backface-visibility:hidden]">
          <img
            src={alien.imageUrl}
            alt={alien.name}
            className="h-40 w-40 rounded-full border-4 border-white object-cover"
          />
        </div>

        <div
          className={`absolute inset-0 flex h-full w-full flex-col items-center justify-between rounded-xl p-4 text-white [backface-visibility:hidden] [transform:rotateY(180deg)] ${backBg}`}
        >
          <div className="absolute inset-0 opacity-10">
            <img
              src={alien.imageUrl}
              alt={alien.name}
              className="h-full w-full rounded-xl object-cover"
            />
          </div>

          <div className="relative z-10 flex min-h-24 flex-col items-center text-center">
            <h2 className="text-xl font-bold">{alien.name}</h2>
            <p className="text-sm opacity-90">
              {alien.description.substring(0, 60)}...
            </p>
          </div>

          <div className="relative z-10">
            <FavoriteLogicButton alien={alien} />
          </div>

          <div className="relative z-10 pb-2">
            <Link
              to={`/alienDetails/${alien.id}`}
              className="text-sm font-semibold text-blue-400 hover:text-blue-600"
              onClick={(e) => e.stopPropagation()}
            >
              Detalles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RotationCard;
