import { useAliens } from "../contexts/AliensContext";

import styles from "./ButtonStopTransform.module.css";

function ButtonStopTransform() {
  const { resetTransformation } = useAliens();
  return (
    <button
      onClick={resetTransformation}
      // className="rounded bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
      className={styles.neon__button}
    >
      {/* Parar transformación */}
      <div className={styles.rombo}></div>
    </button>
  );
}

export default ButtonStopTransform;
