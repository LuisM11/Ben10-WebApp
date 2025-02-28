import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useAliens } from "../../contexts/AliensContext";
import TransformationTimer from "../Transformation/TransformationTimer";
import ButtonTransform from "../../UI/ButtonTransform";
import ButtonStopTransform from "../../UI/ButtonStopTransform";
import { useAuth } from "../../contexts/AuthContext";

function Selector({ aliens }) {
  const [selectedAlien, setSelectedAlien] = useState(null);
  const { transformedAlien } = useAliens();
  const { user } = useAuth(); // Obtiene el token y el usuario actual

  const alienImageRef = useRef(null);

  const handleSelectChange = (event) => {
    const alienId = Number(event.target.value);
    const alienFound = aliens.find((alien) => alien.id === alienId) || null;
    setSelectedAlien(alienFound);
  };

  // 🟢 Animación de vibración + Reproducir sonido al transformarse
  useGSAP(() => {
    if (transformedAlien) {
      // 🔊 Reproducir sonido de transformación
      // Vibración de la imagen
      gsap.fromTo(
        alienImageRef.current,
        { x: -5 },
        {
          x: 5,
          duration: 0.1,
          repeat: 10,
          yoyo: true,
          ease: "power1.inOut",
        },
      );
    }
  }, [transformedAlien]); // Se ejecuta solo cuando transformedAlien cambia

  return (
    <div className="my-10 rounded bg-gray-800 p-4 text-white">
      <div className="flex items-center justify-center space-x-7">
        {/* Selector y botón de transformación */}
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

            {selectedAlien && !transformedAlien && user.id === 1 ? (
              <ButtonTransform selectedAlien={selectedAlien} />
            ) : (
              <>
                <div className="flex justify-center gap-2 sm:justify-normal">
                  {user.id === 1 ? (
                    transformedAlien && <ButtonStopTransform />
                  ) : transformedAlien ? (
                    <p>Ben 10 está transformado ahora mismo...</p>
                  ) : (
                    "Ben descansa ahora mismo"
                  )}
                </div>
                <TransformationTimer />
              </>
            )}
          </div>
        )}

        {/* Imagen y efecto de transformación */}
        <div className={`${!transformedAlien ? "w-2/3" : ""}`}>
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
          ) : transformedAlien ? (
            <div className="flex items-center gap-1 sm:flex-row">
              <div className="w-1/2">
                <img
                  ref={alienImageRef}
                  src={transformedAlien.imageUrl}
                  alt={transformedAlien.name}
                  className="mx-auto h-32 w-32 rounded border-4 border-green-500 object-contain"
                />
                <p className="mt-2 text-center text-green-400">
                  {user.id === 1
                    ? `Estás transformado en ${transformedAlien.name}`
                    : `Ben 10 está transformado en ${transformedAlien.name}`}
                </p>
              </div>
              <div className="flex w-1/2 flex-col items-center">
                <div>{user.id === 1 && <ButtonStopTransform />}</div>
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
