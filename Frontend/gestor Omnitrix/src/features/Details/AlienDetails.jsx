import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAliens } from "../../contexts/AliensContext";
import ButtonTransform from "../../UI/ButtonTransform";
import ButtonStopTransform from "../../UI/ButtonStopTransform";
import TransformationTimer from "../Transformation/TransformationTimer";
import FavoriteLogicButton from "../../UI/FavoriteLogicButton";

function AlienDetails() {
  const { id } = useParams();
  const { getAlien, currentAlien, transformedAlien } = useAliens();

  useEffect(() => {
    getAlien(id);
  }, [id, getAlien]);

  const { name, description, stats, imageUrl } = currentAlien;

  return (
    <div className="my-10 rounded bg-gray-800 p-6 text-white">
      {/* Contenedor principal con imagen a la izquierda y detalles a la derecha */}
      <div className="flex">
        {/* Imagen del alien */}
        <div className="w-1/3">
          <img
            src={imageUrl}
            alt={name}
            className="h-auto w-full rounded-lg shadow-lg"
          />

          {/* Habilidades debajo de la imagen */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Habilidades</h2>
            <ul className="list-inside list-disc text-gray-400">
              {Object.entries(stats || {}).map(([key, value], index) => (
                <li key={index}>
                  {key}: {value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Información del alien y transformación */}
        <div className="w-2/3 pl-6">
          <h1 className="mb-2 text-3xl font-bold">{name}</h1>
          <p className="text-sm text-gray-300">
            {description} Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Modi, voluptas sit vero unde quo voluptatem ex laboriosam
            neque doloribus earum, quia sequi pariatur distinctio aperiam
            dolorum nobis cumque delectus voluptatum? Lorem, ipsum dolor sit
            amet consectetur adipisicing elit. Quibusdam, doloribus soluta. Quae
            esse a totam doloremque perferendis sunt fugit ipsa veniam mollitia
            quos. Consequuntur architecto, necessitatibus quis officia officiis
            nostrum?
          </p>

          {/* Sección de transformación */}
          <div className="mt-6 flex items-center">
            <ButtonTransform selectedAlien={currentAlien} />
            <ButtonStopTransform />

            {/* Temporizador al lado de la lista de habilidades */}
            <div className="ml-4">
              <TransformationTimer />
            </div>

            {/* Favoritos */}
            <FavoriteLogicButton alien={currentAlien} />

            {/* Alien actual */}
            <p className="ml-4">{`Alien actual: ${transformedAlien?.name || "Ninguno"}`}</p>
          </div>
        </div>
      </div>

      {/* Apartado para comentarios (sin estilos por ahora) */}
      <div className="mt-8 border-t border-gray-600 p-4">
        <h2 className="text-lg font-semibold">Comentarios</h2>
        <textarea
          placeholder="Escribe un comentario..."
          className="mt-2 w-full rounded bg-gray-700 p-2 text-white"
          rows="3"
        ></textarea>
        <button className="mt-2 rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-500">
          Enviar comentario
        </button>
      </div>
    </div>
  );
}

export default AlienDetails;
