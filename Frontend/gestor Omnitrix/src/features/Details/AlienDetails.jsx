import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAliens } from "../../contexts/AliensContext";
import ButtonTransform from "../../UI/ButtonTransform";
import ButtonStopTransform from "../../UI/ButtonStopTransform";
import TransformationTimer from "../Transformation/TransformationTimer";
import FavoriteLogicButton from "../../UI/FavoriteLogicButton";
import RotationCard from "../../UI/RotationCard";
import CommentSection from "../../comments/CommentSection";

function AlienDetails() {
  const { id } = useParams();
  const { getAlien, currentAlien, transformedAlien } = useAliens();

  useEffect(() => {
    getAlien(id);
  }, [id, getAlien]);

  if (!currentAlien?.id) return <p className="text-white">Cargando...</p>;

  return (
    <div className="my-10 rounded bg-gray-800 p-6 text-white">
      <div className="flex gap-4">
        <div className="w-1/2">
          <img
            src={currentAlien.imageUrl}
            alt={currentAlien.name}
            className="rounded-lg shadow-lg"
          />
          <div className="mt-4 flex flex-col justify-center sm:flex-row sm:items-center">
            {!transformedAlien ? (
              <ButtonTransform selectedAlien={currentAlien} />
            ) : (
              <>
                <div className="flex justify-center gap-2 sm:justify-normal">
                  <ButtonStopTransform />
                </div>
                <TransformationTimer />
              </>
            )}
          </div>
        </div>

        <div className="flex w-1/2 flex-col items-center text-sm md:text-lg">
          <FavoriteLogicButton alien={currentAlien} />
          <p>{currentAlien.description}</p>
          <ul className="list-inside list-disc text-sm text-gray-400 md:text-lg">
            {Object.entries(currentAlien.stats || {}).map(
              ([key, value], index) => (
                <li key={index}>
                  {key}: {value}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      {transformedAlien && (
        <div className="mt-2 flex flex-col items-center">
          {currentAlien.id !== transformedAlien.id && (
            <div className="mt-2 w-1/2">
              <div className="mb-2 flex justify-center">
                Transformación actual
              </div>
              <RotationCard alien={transformedAlien} type="detailAlien" />
            </div>
          )}
        </div>
      )}

      {/* 🔥 Sección de comentarios */}
      <CommentSection />
    </div>
  );
}

export default AlienDetails;
