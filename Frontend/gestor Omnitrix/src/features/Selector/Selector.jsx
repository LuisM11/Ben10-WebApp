import { useState } from "react";
import { useAliens } from "../../contexts/AliensContext";
import TransformationTimer from "../Transformation/TransformationTimer";
import ButtonTransform from "../../UI/ButtonTransform";
import ButtonStopTransform from "../../UI/ButtonStopTransform";

function Selector({ aliens }) {
  const [selectedAlien, setSelectedAlien] = useState(null);
  const { transformedAlien } = useAliens();

  // console.log(transformedAlien);

  const handleSelectChange = (event) => {
    const alienId = Number(event.target.value);
    // console.log(alienId);

    const alienFound =
      aliens.find((alien) => {
        return alien.id === alienId;
      }) || null;
    // console.log(alienFound);
    setSelectedAlien(alienFound);
  };

  // const handleTransform = () => {
  //   if (selectedAlien) {
  //     transformAlien(selectedAlien);
  //   }
  // };

  // console.log("desde Selector", selectedAlien);
  return (
    <div className="my-10 rounded bg-gray-800 p-4 text-white">
      <div className="flex items-center justify-center space-x-7">
        {/* Columna izquierda: selector y botón */}
        {!transformedAlien && (
          <div className="flex w-1/3 flex-col sm:items-center">
            <h2 className="mb-2 text-xl">Selector de Aliens</h2>
            <div className="mb-4">
              <label htmlFor="alien-select" className="mb-2 block">
                Elige un alien:
              </label>
              <select
                id="alien-select"
                className="w-full rounded bg-gray-700 p-2"
                onChange={handleSelectChange}
              >
                <option value="">Selecciona un alien</option>
                {aliens.map((alien) => (
                  <option key={alien.id} value={alien.id}>
                    {alien.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedAlien && !transformedAlien && (
              <ButtonTransform selectedAlien={selectedAlien} />
            )}
          </div>
        )}

        <div className={`${!transformedAlien ? "w-2/3" : ""} `}>
          {/* No está transformado */}

          {selectedAlien && !transformedAlien ? (
            <div className="text-center">
              <img
                src={selectedAlien.imageUrl}
                alt={selectedAlien.name}
                className="mx-auto h-32 w-32 rounded object-contain grayscale filter transition-all duration-500"
              />
              <p className="mt-2 text-gray-400">
                Alien seleccionado: {selectedAlien.name}
              </p>
            </div>
          ) : transformedAlien ? ( // Aquí validamos que transformedAlien exista antes de renderizar el bloque
            <div className="flex items-center gap-1 sm:flex-row">
              <div className="w-1/2">
                {" "}
                <img
                  src={transformedAlien.imageUrl}
                  alt={transformedAlien.name}
                  className="mx-auto h-32 w-32 rounded border-4 border-green-500 object-contain transition-all duration-500"
                />
                <p className="mt-2 text-center text-green-400">
                  Alien <strong>{transformedAlien.name}</strong> está
                  transformado
                </p>
              </div>
              <div className="flex w-1/2 flex-col items-center">
                <div>
                  <ButtonStopTransform />
                </div>
                <div>
                  <TransformationTimer />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Selector;
