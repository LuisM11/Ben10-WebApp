import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAliens } from "../../contexts/AliensContext";
import ButtonTransform from "../../UI/ButtonTransform";
import ButtonStopTransform from "../../UI/ButtonStopTransform";
import TransformationTimer from "../Transformation/TransformationTimer";
import FavoriteLogicButton from "../../UI/FavoriteLogicButton";
import RotationCard from "../../UI/RotationCard";
import CommentSection from "../../comments/CommentSection";
import { useAuth } from "../../contexts/AuthContext";

function AlienDetails() {
  const { id } = useParams();
  const { getAlien, currentAlien, transformedAlien } = useAliens();
  const { user } = useAuth();

  useEffect(() => {
    getAlien(id);
  }, [id, getAlien]);

  if (!currentAlien?.id) return <p className="text-white">Cargando...</p>;

  return (
    <div className="my-10 rounded bg-gray-800 p-6 text-white">
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Imagen del Alien */}
        <div className="w-full md:w-1/2">
          <img
            src={currentAlien.imageUrl}
            alt={currentAlien.name}
            className="rounded-lg shadow-lg"
          />
          <div className="mt-4 flex flex-col justify-center sm:flex-row sm:items-center">
            {!transformedAlien && user.id === 1 ? (
              <ButtonTransform selectedAlien={currentAlien} />
            ) : (
              <>
                <div className="flex justify-center gap-2 sm:justify-normal">
                  {user.id === 1 ? (
                    <ButtonStopTransform />
                  ) : transformedAlien ? (
                    <p>Ben 10 está transformado ahora mismo!</p>
                  ) : (
                    "Ben descansa ahora mismo"
                  )}
                </div>
                <TransformationTimer />
              </>
            )}
          </div>
        </div>

        {/* Descripción y estadísticas */}
        <div className="flex w-full flex-col items-start text-sm md:w-1/2 md:text-lg">
          {/* Botón de favoritos centrado */}
          <div className="flex w-full justify-center">
            <FavoriteLogicButton alien={currentAlien} />
          </div>

          {/* Descripción */}
          <p className="mt-4 w-full text-center">{currentAlien.description}</p>

          {/* 🔥 Lista de estadísticas con barras más delgadas */}
          <div className="mt-4 w-full space-y-3">
            {Object.entries(currentAlien.stats || {}).map(
              ([key, value], index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="capitalize">{key}</span>
                    <span className="text-xs text-gray-300">{value}/100</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-700">
                    <div
                      className="h-full rounded-full bg-[#8be308] transition-all duration-300"
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                </div>
              ),
            )}
          </div>
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
