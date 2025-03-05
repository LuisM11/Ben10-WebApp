import { useAliens } from "../contexts/AliensContext";

import styles from "./ButtonStopTransform.module.css";

function ButtonStopTransform() {
  const { resetTransformation } = useAliens();
  return (
    <button onClick={resetTransformation} className={styles.neon__button}>
      <div className={styles.rombo}></div>
    </button>
  );
}

export default ButtonStopTransform;
