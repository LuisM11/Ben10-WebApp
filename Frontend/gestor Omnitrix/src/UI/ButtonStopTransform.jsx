import { useAliens } from "../contexts/AliensContext";

function ButtonStopTransform() {
  const { resetTransformation } = useAliens();
  return (
    <button
      onClick={resetTransformation}
      className="rounded bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
    >
      Parar transformación
    </button>
  );
}

export default ButtonStopTransform;
