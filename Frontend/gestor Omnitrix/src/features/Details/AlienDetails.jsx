import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAliens } from "../../contexts/AliensContext";
import ButtonTransform from "../../UI/ButtonTransform";
import ButtonStopTransform from "../../UI/ButtonStopTransform";
import TransformationTimer from "../Transformation/TransformationTimer";
import FavoriteLogicButton from "../../UI/FavoriteLogicButton";
import RotationCard from "../../UI/RotationCard";

function AlienDetails() {
  const { id } = useParams();
  const { getAlien, currentAlien, transformedAlien } = useAliens();

  useEffect(() => {
    getAlien(id);
  }, [id, getAlien]);

  const { name, description, stats, imageUrl } = currentAlien;

  console.log("desde Details", currentAlien);

  // console.log(currentAlien);

  return (
    <div className="my-10 rounded bg-gray-800 p-6 text-white">
      <div className="flex gap-4">
        <div className="w-1/2">
          <img src={imageUrl} alt={name} className="rounded-lg shadow-lg" />

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

        <div className="flex w-1/2 flex-col items-center text-sm sm:text-xl">
          <FavoriteLogicButton alien={currentAlien} />

          <p>
            {description} Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Modi, voluptas sit vero unde quo voluptatem ex laboriosam
            neque doloribus earum.
          </p>
          <ul className="list-inside list-disc text-sm text-gray-400 sm:text-2xl">
            {Object.entries(stats || {}).map(([key, value], index) => (
              <li key={index}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-2 flex">
        {/* <div className="flex w-1/2 flex-col items-center justify-center">
          {!transformedAlien ? (
            <ButtonTransform selectedAlien={currentAlien} />
          ) : (
            <ButtonStopTransform />
          )}

          <TransformationTimer />
        </div> */}

        <div className="w-1/2 px-3">
          {/* <ul className="list-inside list-disc text-sm text-gray-400">
            {Object.entries(stats || {}).map(([key, value], index) => (
              <li key={index}>
                {key}: {value}
              </li>
            ))}
          </ul> */}
        </div>
      </div>

      <div className="mt-2">
        <div className="flex flex-col items-center">
          {transformedAlien && (
            <>
              <div className="mt-2 w-1/2">
                {currentAlien.id === transformedAlien.id ? (
                  ""
                ) : (
                  <>
                    <div className="mb-2 flex justify-center">
                      Transformación actual
                    </div>
                    <RotationCard alien={transformedAlien} type="detailAlien" />
                  </>
                )}

                {/* <img
                  src={transformedAlien?.imageUrl}
                  alt={name}
                  className="rounded-lg shadow-lg"
                /> */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AlienDetails;
