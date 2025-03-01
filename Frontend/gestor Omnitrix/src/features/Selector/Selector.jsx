import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useAliens } from "../../contexts/AliensContext";
import TransformationTimer from "../Transformation/TransformationTimer";
import ButtonTransform from "../../UI/ButtonTransform";
import ButtonStopTransform from "../../UI/ButtonStopTransform";
import { useAuth } from "../../contexts/AuthContext";
import ScrollLinked from "../../UI/ScrollLinked";

function Selector({ aliens }) {
  const [selectedAlien, setSelectedAlien] = useState(null);
  const { transformedAlien } = useAliens();
  const { user } = useAuth();
  const alienImageRef = useRef(null);

  const handleSelectAlien = (alien) => {
    setSelectedAlien(alien);
  };

  // 🟢 Animación de vibración + Reproducir sonido al transformarse
  useGSAP(() => {
    if (transformedAlien) {
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
  }, [transformedAlien]);

  return (
    <div className="my-10 rounded bg-gray-800 p-4 text-white">
      <div className="flex flex-col items-center space-y-6">
        {/* Título */}
        {!transformedAlien && (
          <h2 className="mb-2 text-xl font-bold">
            {user.id === 1
              ? `Elige un alien y transformate`
              : `Estos son los aliens de Ben`}
          </h2>
        )}

        {/* Scroll de Aliens (Reemplaza el Select) */}
        {!transformedAlien && (
          <ScrollLinked
            aliens={aliens}
            onSelect={handleSelectAlien}
            selectedAlien={selectedAlien}
          />
        )}

        {/* Botón de transformación */}
        {selectedAlien && !transformedAlien && user.id === 1 ? (
          <ButtonTransform selectedAlien={selectedAlien} />
        ) : (
          <>
            <div className="flex justify-center gap-2 sm:justify-normal"></div>
          </>
        )}

        {/* Imagen y Efecto de Transformación */}
        <div className={`${!transformedAlien ? "w-2/3" : ""}`}>
          {selectedAlien && !transformedAlien ? (
            <div className="text-center">
              <p className="mt-2 text-gray-400">
                Alien seleccionado: {selectedAlien.name}
              </p>
            </div>
          ) : transformedAlien ? (
            <div className="flex items-center gap-4 sm:flex-row">
              <div className="w-1/2">
                <img
                  ref={alienImageRef}
                  src={transformedAlien.imageUrl}
                  alt={transformedAlien.name}
                  className="mx-auto h-32 w-32 rounded-full border-4 border-green-500 object-contain"
                />
                <p className="mt-2 text-center text-green-400">
                  {user.id === 1
                    ? `Estás transformado en ${transformedAlien.name}`
                    : `Ben 10 está transformado en ${transformedAlien.name}`}
                </p>
              </div>
              <div className="flex w-1/2 flex-col items-center">
                {user.id === 1 && <ButtonStopTransform />}
                <TransformationTimer />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Selector;
